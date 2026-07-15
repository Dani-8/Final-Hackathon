import mongoose from 'mongoose';

const historyLogSchema = new mongoose.Schema({
    asset: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset', required: true },
    issue: { type: mongoose.Schema.Types.ObjectId, ref: 'Issue', default: null },
    actor: { type: String, required: true }, // E.g., User ID or User Name, or "Public"
    actorRole: { type: String, default: 'public' }, // E.g., 'admin', 'technician', 'public', 'system'
    action: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const HistoryLog = mongoose.models.HistoryLog || mongoose.model('HistoryLog', historyLogSchema);
export default HistoryLog;
