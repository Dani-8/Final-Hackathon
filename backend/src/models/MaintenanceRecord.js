import mongoose from 'mongoose';

const maintenanceRecordSchema = new mongoose.Schema({
    issue: { type: mongoose.Schema.Types.ObjectId, ref: 'Issue', required: true },
    technician: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    inspectionNotes: { type: String, required: true },
    workPerformed: { type: String, required: true },
    partsReplaced: [
        {
            name: { type: String, required: true },
            cost: { type: Number, required: true, min: 0 }
        }
    ],
    totalCost: { type: Number, required: true, min: 0 },
    evidenceUrls: [{ type: String }],
    finalCondition: { type: String, required: true },
    resolvedAt: { type: Date, default: Date.now }
});

const MaintenanceRecord = mongoose.models.MaintenanceRecord || mongoose.model('MaintenanceRecord', maintenanceRecordSchema);
export default MaintenanceRecord;
