import { Router } from 'express';
import { getTechnicians, getUsers, createUser, deleteUser, updateUser } from '../controllers/user.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';

const router = Router();

// Technicians list for ticket assignment (Admins/Supervisors can query)
router.get('/technicians', authMiddleware, roleMiddleware(['admin', 'supervisor']), getTechnicians);

// Admin-only staff/team operations
router.get('/', authMiddleware, roleMiddleware(['admin']), getUsers);
router.post('/', authMiddleware, roleMiddleware(['admin']), createUser);
router.put('/:id', authMiddleware, roleMiddleware(['admin']), updateUser);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteUser);

export default router;
