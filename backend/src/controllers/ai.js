import { isMongoConnected } from '../config/db.js';
import Asset from '../models/Asset.js';
import HistoryLog from '../models/HistoryLog.js';
import { localDb } from '../services/localDbService.js';
import { aiTriage } from '../services/aiService.js';
import { apiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const triageIssue = asyncHandler(async (req, res) => {
    const { assetId, complaint } = req.body;

    if (!assetId) {
        return apiResponse.error(res, 'Asset ID is required', 400);
    }
    if (!complaint || complaint.trim().length < 5) {
        return apiResponse.error(res, 'Complaint must be at least 5 characters long', 400);
    }

    // Fetch asset details
    let asset = null

    if (isMongoConnected()) {
        asset = await Asset.findById(assetId);
    } else {
        asset = localDb.assets.findById(assetId);
    }

    if (!asset) {
        return apiResponse.error(res, 'Asset not found', 404);
    }

    // Fetch some recent history logs to provide context for potential recurring patterns
    let logs = []

    if (isMongoConnected()) {
        logs = await HistoryLog.find({ asset: assetId }).sort({ createdAt: -1 }).limit(5);
    } else {
        logs = localDb.historyLogs.find({ asset: assetId.toString() }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
    }

    const recentHistory = logs.map(l => ({
        action: l.action,
        description: l.description,
        createdAt: l.createdAt
    }));

    const assetContext = {
        name: asset.name,
        category: asset.category,
        location: asset.location,
        condition: asset.condition,
        recentHistory
    };

    const analysis = await aiTriage(assetContext, complaint);

    return apiResponse.success(res, analysis, 'AI triage completed successfully');
});

