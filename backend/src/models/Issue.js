import mongoose from 'mongoose';

const issueSchema = new mongoose.Schema({
    issueNumber: { type: String, required: true, unique: true },
    asset: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    priority: { type: String, enum: ['low', 'medium', 'high', 'critical'], required: true },
    status: { type: String, required: true },
    reporterName: { type: String, required: true },
    reporterContact: { type: String, default: '' },
    evidenceUrls: [{ type: String }],
    assignedTechnician: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    aiSuggested: {
        title: { type: String, default: '' },
        category: { type: String, default: '' },
        priority: { type: String, default: '' },
        causes: [{ type: String }],
        checks: [{ type: String }]
    },
    aiFieldsEdited: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

issueSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const Issue = mongoose.models.Issue || mongoose.model('Issue', issueSchema);
export default Issue;
