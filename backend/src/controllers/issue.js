import { isMongoConnected } from '../config/db.js';
import Issue from '../models/Issue.js';
import Asset from '../models/Asset.js';
import User from '../models/User.js';
import { localDb } from '../services/localDbService.js';
import { generateIssueNumber } from '../utils/generateIssueNumber.js';
import { createHistoryLog } from '../services/historyService.js';
import { validateIssueCreate } from '../validators/issue.js';
import { apiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ISSUE_STATUS, isValidIssueStatusTransition } from '../constants/issueStatus.js';
import { ASSET_STATUS } from '../constants/assetStatus.js';

// POST /public/issues (Public Route, Rate Limited)
export const createIssue = asyncHandler(async (req, res) => {
  const validation = validateIssueCreate(req.body);
  if (!validation.success) {
    const errorMsg = validation.error.errors.map(e => e.message).join(', ');
    return apiResponse.error(res, errorMsg, 400);
  }

  const { assetId, title, description, category, priority, reporterName, reporterContact, evidenceUrls, aiSuggested, aiFieldsEdited } = req.body;

  // Verify asset exists
  let asset = null;
  if (isMongoConnected()) {
    asset = await Asset.findById(assetId);
  } else {
    asset = localDb.assets.findById(assetId);
  }

  if (!asset) {
    return apiResponse.error(res, 'Asset not found', 404);
  }

  if (asset.isRetired) {
    return apiResponse.error(res, 'Reporting new issues on retired assets is strictly prohibited.', 400);
  }

  const issueNumber = generateIssueNumber();

  const issueData = {
    issueNumber,
    asset: asset._id,
    title,
    description,
    category,
    priority,
    status: ISSUE_STATUS.REPORTED,
    reporterName,
    reporterContact: reporterContact || '',
    evidenceUrls: evidenceUrls || [],
    aiSuggested: aiSuggested || { title: '', category: '', priority: '', causes: [], checks: [] },
    aiFieldsEdited: !!aiFieldsEdited,
    assignedTechnician: null
  };

  let issue = null;
  if (isMongoConnected()) {
    issue = new Issue(issueData);
    await issue.save();
  } else {
    issue = localDb.issues.create(issueData);
  }

  // Update asset status to "Issue Reported" or "Out of Service" if critical
  const newAssetStatus = priority === 'critical' ? ASSET_STATUS.OUT_OF_SERVICE : ASSET_STATUS.ISSUE_REPORTED;

  if (isMongoConnected()) {
    await Asset.findByIdAndUpdate(asset._id, { status: newAssetStatus });
  } else {
    localDb.assets.findByIdAndUpdate(asset._id, { status: newAssetStatus });
  }

  // Create History Logs
  await createHistoryLog({
    assetId: asset._id,
    issueId: issue._id,
    actor: reporterName,
    actorRole: 'public',
    action: 'Issue Reported',
    description: `Issue #${issueNumber} reported: "${title}" (Priority: ${priority}).`
  });

  await createHistoryLog({
    assetId: asset._id,
    issueId: issue._id,
    actor: 'System Auto',
    actorRole: 'system',
    action: 'Asset Status Auto-Updated',
    description: `Asset status set to '${newAssetStatus}' due to reported issue.`
  });

  return apiResponse.success(res, issue, 'Issue reported successfully', 201);
});

// GET /api/issues (Admin/Technician Auth)
export const getAllIssues = asyncHandler(async (req, res) => {
  const { status, priority, category, technicianId, assignedTechnician, assetId } = req.query;
  const filter = {};

  if (status) filter.status = status;
  if (priority) filter.priority = priority;
  if (category) filter.category = category;
  if (assetId) filter.asset = assetId;

  // If user is a technician, restrict them to their own assigned issues
  if (req.user && req.user.role === 'technician') {
    filter.assignedTechnician = req.user._id || req.user.id;
  } else {
    const techId = technicianId || assignedTechnician;
    if (techId) {
      filter.assignedTechnician = techId;
    }
  }

  let issues = [];
  if (isMongoConnected()) {
    issues = await Issue.find(filter)
      .populate('asset', 'name assetCode location status category publicUrlSlug')
      .populate('assignedTechnician', 'name email role')
      .sort({ createdAt: -1 });
  } else {
    issues = localDb.issues.find(filter);
    // Populate mock data
    issues = issues.map(iss => {
      const copy = { ...iss };
      const a = localDb.assets.findById(iss.asset);
      copy.asset = a ? { _id: a._id, name: a.name, assetCode: a.assetCode, location: a.location, status: a.status, category: a.category, publicUrlSlug: a.publicUrlSlug } : null;

      if (iss.assignedTechnician) {
        const u = localDb.users.findById(iss.assignedTechnician);
        copy.assignedTechnician = u ? { _id: u._id, name: u.name, email: u.email, role: u.role } : null;
      }
      return copy;
    });
    // Sort manually
    issues.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  return apiResponse.success(res, issues, 'Issues fetched successfully');
});

// GET /api/issues/:id (Admin/Technician Auth)
export const getIssueById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  let issue = null;
  if (isMongoConnected()) {
    issue = await Issue.findById(id)
      .populate('asset', 'name assetCode location status condition category publicUrlSlug')
      .populate('assignedTechnician', 'name email role');
  } else {
    issue = localDb.issues.findById(id);
    if (issue) {
      const copy = { ...issue };
      const a = localDb.assets.findById(issue.asset);
      copy.asset = a ? { _id: a._id, name: a.name, assetCode: a.assetCode, location: a.location, status: a.status, condition: a.condition, category: a.category, publicUrlSlug: a.publicUrlSlug } : null;

      if (issue.assignedTechnician) {
        const u = localDb.users.findById(issue.assignedTechnician);
        copy.assignedTechnician = u ? { _id: u._id, name: u.name, email: u.email, role: u.role } : null;
      }
      issue = copy;
    }
  }

  if (!issue) {
    return apiResponse.error(res, 'Issue not found', 404);
  }

  return apiResponse.success(res, issue, 'Issue details fetched successfully');
});

// PATCH /api/issues/:id/assign (Admin Auth)
export const assignTechnician = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { technicianId } = req.body;

  if (!technicianId) {
    return apiResponse.error(res, 'Technician ID is required', 400);
  }

  let issue = null;
  if (isMongoConnected()) {
    issue = await Issue.findById(id);
  } else {
    issue = localDb.issues.findById(id);
  }

  if (!issue) {
    return apiResponse.error(res, 'Issue not found', 404);
  }

  // Verify tech is technician
  let techUser = null;
  if (isMongoConnected()) {
    techUser = await User.findById(technicianId);
  } else {
    techUser = localDb.users.findById(technicianId);
  }

  if (!techUser || techUser.role !== 'technician') {
    return apiResponse.error(res, 'Assigned user must exist and have the Technician role', 400);
  }

  const updateData = {
    assignedTechnician: technicianId,
    status: ISSUE_STATUS.ASSIGNED
  };

  let updatedIssue = null;
  if (isMongoConnected()) {
    updatedIssue = await Issue.findByIdAndUpdate(id, updateData, { new: true })
      .populate('asset')
      .populate('assignedTechnician', 'name email');
  } else {
    updatedIssue = localDb.issues.findByIdAndUpdate(id, updateData);
  }

  // Update Asset's technician assign
  if (isMongoConnected()) {
    await Asset.findByIdAndUpdate(issue.asset, { assignedTechnician: technicianId });
  } else {
    localDb.assets.findByIdAndUpdate(issue.asset, { assignedTechnician: technicianId });
  }

  // Create History Logs
  await createHistoryLog({
    assetId: issue.asset,
    issueId: issue._id,
    actor: req.user.name,
    actorRole: req.user.role,
    action: 'Technician Assigned',
    description: `Issue #${issue.issueNumber} assigned to technician: ${techUser.name}.`
  });

  return apiResponse.success(res, updatedIssue, 'Technician assigned successfully');
});

// PATCH /api/issues/:id/status (Technician / Admin Auth)
export const updateIssueStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return apiResponse.error(res, 'Issue status is required', 400);
  }

  let issue = null;
  if (isMongoConnected()) {
    issue = await Issue.findById(id);
  } else {
    issue = localDb.issues.findById(id);
  }

  if (!issue) {
    return apiResponse.error(res, 'Issue not found', 404);
  }

  // Technician Authorization Check
  if (req.user.role === 'technician' && (!issue.assignedTechnician || issue.assignedTechnician.toString() !== req.user._id.toString())) {
    return apiResponse.error(res, 'Unauthorized. Technicians can only update issues assigned to them.', 403);
  }

  // Status workflow rules
  if (issue.status === ISSUE_STATUS.CLOSED) {
    if (status !== ISSUE_STATUS.REOPENED) {
      return apiResponse.error(res, 'Closed issues are immutable until explicitly reopened.', 400);
    }
  }

  if (!isValidIssueStatusTransition(issue.status, status)) {
    return apiResponse.error(res, `Invalid issue status transition from '${issue.status}' to '${status}'`, 400);
  }

  const updateData = { status };
  let updatedIssue = null;
  if (isMongoConnected()) {
    updatedIssue = await Issue.findByIdAndUpdate(id, updateData, { new: true })
      .populate('asset')
      .populate('assignedTechnician', 'name email');
  } else {
    updatedIssue = localDb.issues.findByIdAndUpdate(id, updateData);
  }

  // Sync Asset status based on business rules
  let newAssetStatus = null;
  if (status === ISSUE_STATUS.INSPECTION_STARTED) {
    newAssetStatus = ASSET_STATUS.UNDER_INSPECTION;
  } else if (status === ISSUE_STATUS.MAINTENANCE_IN_PROGRESS || status === ISSUE_STATUS.WAITING_FOR_PARTS) {
    newAssetStatus = ASSET_STATUS.UNDER_MAINTENANCE;
  } else if (status === ISSUE_STATUS.RESOLVED) {
    newAssetStatus = ASSET_STATUS.OPERATIONAL;
  } else if (status === ISSUE_STATUS.REOPENED) {
    newAssetStatus = ASSET_STATUS.ISSUE_REPORTED;
  }

  if (newAssetStatus) {
    if (isMongoConnected()) {
      await Asset.findByIdAndUpdate(issue.asset, { status: newAssetStatus });
    } else {
      localDb.assets.findByIdAndUpdate(issue.asset, { status: newAssetStatus });
    }

    await createHistoryLog({
      assetId: issue.asset,
      issueId: issue._id,
      actor: 'System Auto',
      actorRole: 'system',
      action: 'Asset Status Synced',
      description: `Asset status set to '${newAssetStatus}' to align with issue status of '${status}'.`
    });
  }

  // Create History Log
  await createHistoryLog({
    assetId: issue.asset,
    issueId: issue._id,
    actor: req.user.name,
    actorRole: req.user.role,
    action: 'Issue Status Updated',
    description: `Issue #${issue.issueNumber} status was changed from '${issue.status}' to '${status}'.`
  });

  return apiResponse.success(res, updatedIssue, 'Issue status updated successfully');
});

// GET /public/issues/:issueNumber/status (Public Lookup, No Auth)
export const getPublicIssueStatusByNumber = asyncHandler(async (req, res) => {
  const { issueNumber } = req.params;

  let issue = null;
  if (isMongoConnected()) {
    issue = await Issue.findOne({ issueNumber })
      .populate('asset', 'name assetCode status location category publicUrlSlug')
      .select('issueNumber title description category priority status createdAt updatedAt');
  } else {
    issue = localDb.issues.findOne({ issueNumber });
    if (issue) {
      const copy = { ...issue };
      const a = localDb.assets.findById(issue.asset);
      copy.asset = a ? { name: a.name, assetCode: a.assetCode, status: a.status, location: a.location, category: a.category, publicUrlSlug: a.publicUrlSlug } : null;
      issue = copy;
    }
  }

  if (!issue) {
    return apiResponse.error(res, 'Issue not found with the provided issue number', 404);
  }

  return apiResponse.success(res, issue, 'Public issue status loaded successfully');
});
