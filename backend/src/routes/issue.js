import { Router } from 'express';
import { createIssue, getAllIssues, getIssueById, assignTechnician, updateIssueStatus, getPublicIssueStatusByNumber, updateIssueChecks } from '../controllers/issue.js';
import { createMaintenanceRecord } from '../controllers/maintenance.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';
import { rateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// Public routes (No Auth, rate limited)
router.post('/public', rateLimiter({ max: 10, windowMs: 60 * 1000, message: 'Too many issue reports. Please try again after 1 minute.' }), createIssue);
router.get('/public/:issueNumber/status', getPublicIssueStatusByNumber);

// Admin & Technician routes
router.get('/', authMiddleware, roleMiddleware(['admin', 'technician']), getAllIssues);
router.patch('/:id/assign', authMiddleware, roleMiddleware(['admin']), assignTechnician);

// Admin & Technician routes
router.get('/:id', authMiddleware, roleMiddleware(['admin', 'technician']), getIssueById);
router.patch('/:id/status', authMiddleware, roleMiddleware(['admin', 'technician']), updateIssueStatus);
router.patch('/:id/checks', authMiddleware, roleMiddleware(['admin', 'technician']), updateIssueChecks);

// Technician-only maintenance completion
router.post('/:id/maintenance', authMiddleware, roleMiddleware(['technician', 'admin']), createMaintenanceRecord);

export default router;
