import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { isMongoConnected } from '../config/db.js';
import User from '../models/User.js';
import { localDb } from '../services/localDbService.js';
import { apiResponse } from '../utils/apiResponse.js';

export async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return apiResponse.error(res, 'Authentication required. Access token missing.', 401);
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, env.JWT_SECRET)

        let user = null;

        if (isMongoConnected()) {
            user = await User.findById(decoded.id).select('-passwordHash');
        } else {
            const found = localDb.users.findById(decoded.id)

            if (found) {
                const { passwordHash, ...safeUser } = found;
                user = safeUser;
            }
        }

        if (!user) {
            return apiResponse.error(res, 'User not found or session invalid.', 401);
        }

        req.user = user;
        next();
    } catch (err) {
        console.warn('⚠️ Token verification failed:', err.message);
        return apiResponse.error(res, 'Invalid or expired access token.', 401);
    }
}


export default authMiddleware;
