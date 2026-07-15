import { Router } from 'express';
import { createAsset, getAllAssets, getAssetById, updateAsset, deleteAsset, getPublicAssetBySlug, getPublicAssetByCode } from '../controllers/asset.js';
import { getAssetHistory } from '../controllers/history.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';

const router = Router();

// Public routes (No auth)
router.get('/public/code/:code', getPublicAssetByCode);
router.get('/public/:slug', getPublicAssetBySlug);

// Admin-only routes
router.post('/', authMiddleware, roleMiddleware(['admin']), createAsset);
router.patch('/:id', authMiddleware, roleMiddleware(['admin']), updateAsset);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteAsset);

// Admin & Technician routes
router.get('/', authMiddleware, roleMiddleware(['admin', 'technician']), getAllAssets);
router.get('/:id', authMiddleware, roleMiddleware(['admin', 'technician']), getAssetById);
router.get('/:id/history', authMiddleware, roleMiddleware(['admin', 'technician']), getAssetHistory);

export default router;
