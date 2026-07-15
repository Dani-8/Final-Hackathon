import HistoryLog from '../models/HistoryLog.js';
import { isMongoConnected } from '../config/db.js';
import { localDb } from './localDbService.js';

export async function createHistoryLog({ assetId, issueId = null, actor, actorRole, action, description }) {
    try {
        const logData = {
            asset: assetId,
            issue: issueId,
            actor: actor || 'Public',
            actorRole: actorRole || 'public',
            action,
            description,
            createdAt: new Date()
        };

        if (isMongoConnected()) {
            const log = new HistoryLog(logData);
            await log.save();
            return log;
        } else {
            return localDb.historyLogs.create(logData);
        }
    } catch (err) {
        console.error('❌ Failed to write history log:', err.message);
        return null;
    }
}
