import { Router } from 'express';
import { triageIssue } from '../controllers/ai.js';
import { rateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// Public but rate limited endpoint for AI triage
router.post('/triage', rateLimiter({ max: 10, windowMs: 60 * 1000, message: 'Too many AI requests. Please try again after 1 minute.' }), triageIssue);

export default router;
