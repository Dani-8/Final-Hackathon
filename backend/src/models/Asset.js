import mongoose from 'mongoose';

const assetSchema = new mongoose.Schema({
    assetCode: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    location: { type: String, required: true },
    condition: { type: String, required: true },
    status: { type: String, required: true },
    assignedTechnician: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    lastServiceDate: { type: Date, default: null },
    nextServiceDate: { type: Date, default: null },
    publicUrlSlug: { type: String, required: true, unique: true },
    qrCodeUrl: { type: String, default: null },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    isRetired: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

assetSchema.pre('save', function () {
    this.updatedAt = new Date();
});

const Asset = mongoose.models.Asset || mongoose.model('Asset', assetSchema);
export default Asset;
