import express from 'express';
import path from 'path';
import cors from 'cors';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import assetRoutes from './routes/asset.js';
import issueRoutes from './routes/issue.js';
import aiRoutes from './routes/ai.js';
import userRoutes from './routes/user.js';
import categoryRoutes from './routes/category.js';
import { errorHandler } from './middleware/errorHandler.js';
import { upload } from './middleware/uploadMiddleware.js';
import { uploadImage } from './services/cloudinaryService.js';
import { apiResponse } from './utils/apiResponse.js';

const app = express();

// Enable cors and json body parsing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to Database immediately when app launches (await fixes the Vercel race condition)
await connectDB();

// Serve local upload evidence files
const uploadsPath = path.join(process.cwd(), 'app', 'backend', 'src', 'uploads');
app.use('/api/uploads', express.static(uploadsPath));

// API Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

// Mounting resources routes
app.use('/api/auth', authRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/issues', issueRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);

// Direct Cloudinary / Local storage Upload Route
app.post('/api/uploads/evidence', upload.single('evidence'), async (req, res, next) => {
    try {
        if (!req.file) {
            return apiResponse.error(res, 'No file was uploaded.', 400);
        }
        const fileUrl = await uploadImage(req.file);
        return apiResponse.success(res, { url: fileUrl }, 'File uploaded successfully', 201);
    } catch (err) {
        next(err);
    }
});

// Centralized Error Handling Middleware
app.use(errorHandler);

export default app;
