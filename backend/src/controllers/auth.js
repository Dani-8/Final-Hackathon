import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { isMongoConnected } from '../config/db.js';
import User from '../models/User.js';
import { localDb } from '../services/localDbService.js';
import { validateRegister, validateLogin } from '../validators/auth.js';
import { apiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const register = asyncHandler(async (req, res) => {
    const validation = validateRegister(req.body);
    if (!validation.success) {
        const errorMsg = validation.error.errors.map(e => e.message).join(', ');
        return apiResponse.error(res, errorMsg, 400);
    }

    const { name, email, password, role, specialty } = req.body;
    const lowerEmail = email.toLowerCase();

    // Check if email already exists
    let existingUser = null;
    if (isMongoConnected()) {
        existingUser = await User.findOne({ email: lowerEmail });
    } else {
        existingUser = localDb.users.findOne({ email: lowerEmail });
    }

    if (existingUser) {
        return apiResponse.error(res, 'Email already registered', 400);
    }

    const passwordHash = await bcrypt.hash(password, 10);
    let user = null;

    if (isMongoConnected()) {
        user = new User({
            name,
            email: lowerEmail,
            passwordHash,
            role,
            specialty: specialty || 'General'
        });
        await user.save();
    } else {
        user = localDb.users.create({
            name,
            email: lowerEmail,
            passwordHash,
            role,
            specialty: specialty || 'General'
        });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, env.JWT_SECRET, { expiresIn: '7d' });

    return apiResponse.success(res, {
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            specialty: user.specialty
        }
    }, 'Registration successful', 201);
});

export const login = asyncHandler(async (req, res) => {
    const validation = validateLogin(req.body);
    if (!validation.success) {
        const errorMsg = validation.error.errors.map(e => e.message).join(', ');
        return apiResponse.error(res, errorMsg, 400);
    }

    const { email, password } = req.body;
    const lowerEmail = email.toLowerCase();

    let user = null;
    if (isMongoConnected()) {
        user = await User.findOne({ email: lowerEmail });
    } else {
        user = localDb.users.findOne({ email: lowerEmail });
    }

    if (!user) {
        return apiResponse.error(res, 'Invalid email or password', 401);
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
        return apiResponse.error(res, 'Invalid email or password', 401);
    }

    const token = jwt.sign({ id: user._id, role: user.role }, env.JWT_SECRET, { expiresIn: '7d' });

    return apiResponse.success(res, {
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            specialty: user.specialty || 'General'
        }
    }, 'Login successful');
});

export const getMe = asyncHandler(async (req, res) => {
    if (!req.user) {
        return apiResponse.error(res, 'Unauthenticated', 401);
    }
    return apiResponse.success(res, { user: req.user });
});
