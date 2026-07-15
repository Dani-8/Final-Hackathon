import { isMongoConnected } from '../config/db.js';
import HistoryLog from '../models/HistoryLog.js';
import { localDb } from '../services/localDbService.js';
import { apiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getAssetHistory = asyncHandler(async (req, res) => {
    const { id: assetId } = req.params;

    let history = []
    
    if (isMongoConnected()) {
        history = await HistoryLog.find({ asset: assetId })
            .sort({ createdAt: -1 });
    } else {
        history = localDb.historyLogs.find({ asset: assetId })
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return apiResponse.success(res, history, 'Asset history logs fetched successfully');
});
