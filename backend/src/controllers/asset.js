import { isMongoConnected } from '../config/db.js';
import Asset from '../models/Asset.js';
import User from '../models/User.js';
import { localDb } from '../services/localDbService.js';
import { generateAssetCode } from '../utils/generateAssetCode.js';
import { generateQrCode } from '../services/qrService.js';
import { createHistoryLog } from '../services/historyService.js';
import { validateAssetCreate, validateAssetUpdate } from '../validators/asset.js';
import { apiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ASSET_STATUS, isValidAssetStatusTransition } from '../constants/assetStatus.js';
import { env } from '../config/env.js';

export const createAsset = asyncHandler(async (req, res) => {
    const validation = validateAssetCreate(req.body);
    if (!validation.success) {
        const errorMsg = validation.error.errors.map(e => e.message).join(', ');
        return apiResponse.error(res, errorMsg, 400);
    }

    const { name, category, location, condition, status, assignedTechnician, lastServiceDate, nextServiceDate } = req.body;
    const assetCode = generateAssetCode();
    const slug = `${assetCode.toLowerCase()}-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

    // Public URL encoded in QR
    const publicUrl = `${env.APP_URL}/public/assets/${slug}`;
    const qrCodeUrl = await generateQrCode(publicUrl);

    const assetData = {
        assetCode,
        name,
        category,
        location,
        condition,
        status: status || ASSET_STATUS.OPERATIONAL,
        assignedTechnician: assignedTechnician || null,
        lastServiceDate: lastServiceDate ? new Date(lastServiceDate) : null,
        nextServiceDate: nextServiceDate ? new Date(nextServiceDate) : null,
        publicUrlSlug: slug,
        qrCodeUrl,
        createdBy: req.user ? req.user._id : null,
        isRetired: false
    };

    let asset = null;
    if (isMongoConnected()) {
        asset = new Asset(assetData);
        await asset.save();
    } else {
        asset = localDb.assets.create(assetData);
    }

    // Log in History
    await createHistoryLog({
        assetId: asset._id,
        actor: req.user ? req.user.name : 'System Admin',
        actorRole: req.user ? req.user.role : 'system',
        action: 'Asset Created',
        description: `Asset ${name} (Code: ${assetCode}) was registered successfully.`
    });

    return apiResponse.success(res, asset, 'Asset registered successfully', 201);
});

export const getAllAssets = asyncHandler(async (req, res) => {
    const { search, category, status, condition, isRetired } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (status) filter.status = status;
    if (condition) filter.condition = condition;

    if (isRetired !== undefined) {
        filter.isRetired = isRetired === 'true';
    }

    let assets = [];
    if (isMongoConnected()) {
        // MongoDB Query with Search
        let query = Asset.find(filter);
        if (search) {
            query = query.or([
                { name: { $regex: search, $options: 'i' } },
                { assetCode: { $regex: search, $options: 'i' } },
                { location: { $regex: search, $options: 'i' } }
            ]);
        }
        assets = await query.populate('assignedTechnician', 'name email role').sort({ createdAt: -1 });
    } else {
        // Local DB mock
        assets = localDb.assets.find(filter);
        if (search) {
            const s = search.toLowerCase();
            assets = assets.filter(a =>
                a.name.toLowerCase().includes(s) ||
                a.assetCode.toLowerCase().includes(s) ||
                a.location.toLowerCase().includes(s)
            );
        }
        // Sort manually
        assets.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // Populate assignedTechnician mock
        assets = assets.map(a => {
            const copy = { ...a };
            if (a.assignedTechnician) {
                const u = localDb.users.findById(a.assignedTechnician);
                copy.assignedTechnician = u ? { _id: u._id, name: u.name, email: u.email, role: u.role } : null;
            }
            return copy;
        });
    }

    return apiResponse.success(res, assets, 'Assets fetched successfully');
});

export const getAssetById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    let asset = null;
    if (isMongoConnected()) {
        asset = await Asset.findById(id).populate('assignedTechnician', 'name email role');
    } else {
        asset = localDb.assets.findById(id);
        if (asset && asset.assignedTechnician) {
            const u = localDb.users.findById(asset.assignedTechnician);
            asset = {
                ...asset,
                assignedTechnician: u ? { _id: u._id, name: u.name, email: u.email, role: u.role } : null
            };
        }
    }

    if (!asset) {
        return apiResponse.error(res, 'Asset not found', 404);
    }

    return apiResponse.success(res, asset, 'Asset details fetched successfully');
});

export const updateAsset = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const validation = validateAssetUpdate(req.body);
    if (!validation.success) {
        const errorMsg = validation.error.errors.map(e => e.message).join(', ');
        return apiResponse.error(res, errorMsg, 400);
    }

    let asset = null;
    if (isMongoConnected()) {
        asset = await Asset.findById(id);
    } else {
        asset = localDb.assets.findById(id);
    }

    if (!asset) {
        return apiResponse.error(res, 'Asset not found', 404);
    }

    if (asset.isRetired) {
        return apiResponse.error(res, 'Retired assets cannot be modified', 400);
    }

    // Enforce status transitions
    if (req.body.status && req.body.status !== asset.status) {
        if (!isValidAssetStatusTransition(asset.status, req.body.status)) {
            return apiResponse.error(res, `Invalid asset status transition from '${asset.status}' to '${req.body.status}'`, 400);
        }

        // Write log for status transition
        await createHistoryLog({
            assetId: asset._id,
            actor: req.user ? req.user.name : 'System Admin',
            actorRole: req.user ? req.user.role : 'system',
            action: 'Status Updated',
            description: `Asset status transitioned from '${asset.status}' to '${req.body.status}'.`
        });
    }

    // Update logic
    const updateData = { ...req.body };
    if (updateData.assignedTechnician === '') {
        updateData.assignedTechnician = null;
    }

    let updatedAsset = null;
    if (isMongoConnected()) {
        updatedAsset = await Asset.findByIdAndUpdate(id, updateData, { new: true }).populate('assignedTechnician', 'name email role');
    } else {
        updatedAsset = localDb.assets.findByIdAndUpdate(id, updateData);
        if (updatedAsset && updatedAsset.assignedTechnician) {
            const u = localDb.users.findById(updatedAsset.assignedTechnician);
            updatedAsset.assignedTechnician = u ? { _id: u._id, name: u.name, email: u.email, role: u.role } : null;
        }
    }

    // Log other changes
    await createHistoryLog({
        assetId: asset._id,
        actor: req.user ? req.user.name : 'System Admin',
        actorRole: req.user ? req.user.role : 'system',
        action: 'Asset Updated',
        description: `Asset attributes were updated by administrator.`
    });

    return apiResponse.success(res, updatedAsset, 'Asset updated successfully');
});

export const deleteAsset = asyncHandler(async (req, res) => {
    const { id } = req.params;

    let asset = null;
    if (isMongoConnected()) {
        asset = await Asset.findById(id);
    } else {
        asset = localDb.assets.findById(id);
    }

    if (!asset) {
        return apiResponse.error(res, 'Asset not found', 404);
    }

    const updateData = { isRetired: true, status: ASSET_STATUS.RETIRED };

    let retiredAsset = null;
    if (isMongoConnected()) {
        retiredAsset = await Asset.findByIdAndUpdate(id, updateData, { new: true });
    } else {
        retiredAsset = localDb.assets.findByIdAndUpdate(id, updateData);
    }

    // Log retirement
    await createHistoryLog({
        assetId: asset._id,
        actor: req.user ? req.user.name : 'System Admin',
        actorRole: req.user ? req.user.role : 'system',
        action: 'Asset Retired',
        description: `Asset has been soft-deleted/retired and is no longer available for active issue reporting.`
    });

    return apiResponse.success(res, retiredAsset, 'Asset retired successfully (soft deleted)');
});

// GET /public/assets/:slug (No Auth)
export const getPublicAssetBySlug = asyncHandler(async (req, res) => {
    const { slug } = req.params;

    let asset = null;
    if (isMongoConnected()) {
        asset = await Asset.findOne({ publicUrlSlug: slug }).select('assetCode name category location condition status lastServiceDate nextServiceDate isRetired qrCodeUrl');
    } else {
        asset = localDb.assets.findOne({ publicUrlSlug: slug });
    }

    if (!asset) {
        return apiResponse.error(res, 'Asset not found', 404);
    }

    // Fetch recent history logs (safe records only, like creation, inspected, resolved)
    let safeHistory = [];
    if (isMongoConnected()) {
        const HistoryLog = (await import('../models/HistoryLog.js')).default;
        safeHistory = await HistoryLog.find({ asset: asset._id })
            .select('action description createdAt')
            .sort({ createdAt: -1 })
            .limit(5);
    } else {
        const historyLogs = localDb.historyLogs.find({ asset: asset._id.toString() });
        safeHistory = historyLogs
            .map(log => ({
                action: log.action,
                description: log.description,
                createdAt: log.createdAt
            }))
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5);
    }

    return apiResponse.success(res, {
        asset,
        recentActivity: safeHistory
    }, 'Public asset details loaded');
});

// GET /public/assets/code/:code (No Auth)
export const getPublicAssetByCode = asyncHandler(async (req, res) => {
    const { code } = req.params;
    if (!code) {
        return apiResponse.error(res, 'Asset code is required', 400);
    }

    let asset = null;
    const cleanCode = code.trim().toUpperCase();

    if (isMongoConnected()) {
        asset = await Asset.findOne({ assetCode: { $regex: new RegExp(`^${cleanCode}$`, 'i') } }).select('publicUrlSlug');
    } else {
        asset = localDb.assets.find().find(a => a.assetCode.toUpperCase() === cleanCode);
    }

    if (!asset) {
        return apiResponse.error(res, `No asset found with code "${code.toUpperCase()}"`, 404);
    }

    return apiResponse.success(res, { publicUrlSlug: asset.publicUrlSlug }, 'Asset found');
});

