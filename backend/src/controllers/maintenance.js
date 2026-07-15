import { isMongoConnected } from '../config/db.js';
import MaintenanceRecord from '../models/MaintenanceRecord.js';
import Issue from '../models/Issue.js';
import Asset from '../models/Asset.js';
import { localDb } from '../services/localDbService.js';
import { createHistoryLog } from '../services/historyService.js';
import { validateMaintenance } from '../validators/maintenance.js';
import { apiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ISSUE_STATUS } from '../constants/issueStatus.js';
import { ASSET_STATUS } from '../constants/assetStatus.js';

export const createMaintenanceRecord = asyncHandler(async (req, res) => {
    const { id: issueId } = req.params; // issue ID

    const validation = validateMaintenance(req.body);
    if (!validation.success) {
        const errorMsg = validation.error.errors.map(e => e.message).join(', ');
        return apiResponse.error(res, errorMsg, 400);
    }

    const { inspectionNotes, workPerformed, partsReplaced, evidenceUrls, finalCondition, nextServiceDate } = req.body;

    let issue = null;
    if (isMongoConnected()) {
        issue = await Issue.findById(issueId);
    } else {
        issue = localDb.issues.findById(issueId);
    }

    if (!issue) {
        return apiResponse.error(res, 'Issue not found', 404);
    }

    // Auth check
    if (req.user.role === 'technician' && (!issue.assignedTechnician || issue.assignedTechnician.toString() !== req.user._id.toString())) {
        return apiResponse.error(res, 'Unauthorized. Only the assigned technician can perform maintenance on this issue.', 403);
    }

    // Cost calculation
    let totalCost = 0;
    if (partsReplaced && partsReplaced.length > 0) {
        for (let part of partsReplaced) {
            if (part.cost < 0) {
                return apiResponse.error(res, 'Maintenance costs cannot be negative', 400);
            }
            totalCost += part.cost;
        }
    }

    // Next service date validation
    let nextService = null;
    if (nextServiceDate) {
        nextService = new Date(nextServiceDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (nextService < today) {
            return apiResponse.error(res, 'Next service date cannot be before the maintenance completion date (today).', 400);
        }
    }

    // Save Maintenance Record
    const recordData = {
        issue: issue._id,
        technician: req.user._id,
        inspectionNotes,
        workPerformed,
        partsReplaced: partsReplaced || [],
        totalCost,
        evidenceUrls: evidenceUrls || [],
        finalCondition,
        resolvedAt: new Date()
    };

    let record = null;
    if (isMongoConnected()) {
        record = new MaintenanceRecord(recordData);
        await record.save();
    } else {
        record = localDb.maintenanceRecords.create(recordData);
    }

    // Update Issue to "Resolved"
    if (isMongoConnected()) {
        await Issue.findByIdAndUpdate(issue._id, { status: ISSUE_STATUS.RESOLVED });
    } else {
        localDb.issues.findByIdAndUpdate(issue._id, { status: ISSUE_STATUS.RESOLVED });
    }

    // Update Asset parameters (lastServiceDate, nextServiceDate, status, condition)
    const assetUpdate = {
        status: ASSET_STATUS.OPERATIONAL,
        condition: finalCondition,
        lastServiceDate: new Date()
    };
    if (nextService) {
        assetUpdate.nextServiceDate = nextService;
    }

    if (isMongoConnected()) {
        await Asset.findByIdAndUpdate(issue.asset, assetUpdate);
    } else {
        localDb.assets.findByIdAndUpdate(issue.asset, assetUpdate);
    }

    // Write History Log
    await createHistoryLog({
        assetId: issue.asset,
        issueId: issue._id,
        actor: req.user.name,
        actorRole: req.user.role,
        action: 'Maintenance Completed',
        description: `Maintenance completed for Issue #${issue.issueNumber}. Cost: $${totalCost.toFixed(2)}. Condition: ${finalCondition}.`
    });

    await createHistoryLog({
        assetId: issue.asset,
        issueId: issue._id,
        actor: 'System Auto',
        actorRole: 'system',
        action: 'Asset Re-commissioned',
        description: `Asset set back to 'Operational' after successful inspection and repair.`
    });

    return apiResponse.success(res, record, 'Maintenance record created and issue resolved successfully', 201);
});
