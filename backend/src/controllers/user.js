import bcrypt from 'bcryptjs';
import { isMongoConnected } from '../config/db.js';
import User from '../models/User.js';
import { localDb } from '../services/localDbService.js';
import { apiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getTechnicians = asyncHandler(async (req, res) => {
    let technicians = [];
    if (isMongoConnected()) {
        technicians = await User.find({ role: 'technician' }).select('-passwordHash').sort({ name: 1 });
    } else {
        technicians = localDb.users.find({ role: 'technician' }).map(({ passwordHash, ...safe }) => safe);
        technicians.sort((a, b) => a.name.localeCompare(b.name));
    }

    return apiResponse.success(res, technicians, 'Technicians list fetched successfully');
});

// GET /api/users (Admin-only: fetch all users)
export const getUsers = asyncHandler(async (req, res) => {
    let users = [];
    if (isMongoConnected()) {
        users = await User.find({}).select('-passwordHash').sort({ role: 1, name: 1 });
    } else {
        users = localDb.users.find({}).map(({ passwordHash, ...safe }) => safe);
        users.sort((a, b) => a.role.localeCompare(b.role) || a.name.localeCompare(b.name));
    }

    return apiResponse.success(res, users, 'Users list fetched successfully');
});

// POST /api/users (Admin-only: create a new user)
export const createUser = asyncHandler(async (req, res) => {
    const { name, email, password, role, specialty } = req.body;

    if (!name || !email || !password || !role) {
        return apiResponse.error(res, 'All fields (name, email, password, role) are required', 400);
    }

    const lowerEmail = email.toLowerCase().trim();
    const allowedRoles = ['admin', 'technician', 'supervisor'];
    if (!allowedRoles.includes(role)) {
        return apiResponse.error(res, `Invalid role. Allowed roles are: ${allowedRoles.join(', ')}`, 400);
    }

    if (password.length < 6) {
        return apiResponse.error(res, 'Password must be at least 6 characters long', 400);
    }

    // Check if user exists
    let existingUser = null;
    if (isMongoConnected()) {
        existingUser = await User.findOne({ email: lowerEmail });
    } else {
        existingUser = localDb.users.findOne({ email: lowerEmail });
    }

    if (existingUser) {
        return apiResponse.error(res, 'A user with this email already exists', 400);
    }

    const passwordHash = await bcrypt.hash(password, 10);
    let user = null;

    if (isMongoConnected()) {
        user = new User({
            name: name.trim(),
            email: lowerEmail,
            passwordHash,
            role,
            specialty: specialty || 'General'
        });
        await user.save();
    } else {
        user = localDb.users.create({
            name: name.trim(),
            email: lowerEmail,
            passwordHash,
            role,
            specialty: specialty || 'General'
        });
    }

    const userResponse = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        specialty: user.specialty,
        createdAt: user.createdAt
    };

    return apiResponse.success(res, userResponse, 'User created successfully', 201);
});

// DELETE /api/users/:id (Admin-only: delete a user)
export const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Prevent an admin from deleting themselves
    if (req.user && String(req.user._id || req.user.id) === String(id)) {
        return apiResponse.error(res, 'You cannot delete your own administrative account', 400);
    }

    let deletedUser = null;
    if (isMongoConnected()) {
        deletedUser = await User.findByIdAndDelete(id);
    } else {
        deletedUser = localDb.users.findByIdAndDelete(id);
    }

    if (!deletedUser) {
        return apiResponse.error(res, 'User not found', 404);
    }

    return apiResponse.success(res, null, 'User deleted successfully');
});

// PUT /api/users/:id (Admin-only: update user details)
export const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, email, password, role, specialty } = req.body;

    let user = null;
    if (isMongoConnected()) {
        user = await User.findById(id);
    } else {
        user = localDb.users.findById(id);
    }

    if (!user) {
        return apiResponse.error(res, 'User not found', 404);
    }

    const updates = {};
    if (name) updates.name = name.trim();

    if (email) {
        const lowerEmail = email.toLowerCase().trim();
        if (lowerEmail !== user.email) {
            let existingUser = null;
            if (isMongoConnected()) {
                existingUser = await User.findOne({ email: lowerEmail });
            } else {
                existingUser = localDb.users.findOne({ email: lowerEmail });
            }
            if (existingUser) {
                return apiResponse.error(res, 'A user with this email already exists', 400);
            }
            updates.email = lowerEmail;
        }
    }

    if (role) {
        const allowedRoles = ['admin', 'technician', 'supervisor'];
        if (!allowedRoles.includes(role)) {
            return apiResponse.error(res, `Invalid role. Allowed roles are: ${allowedRoles.join(', ')}`, 400);
        }
        updates.role = role;
    }

    const finalRole = role || user.role;
    if (finalRole === 'admin') {
        updates.specialty = 'Administrative Support';
    } else if (finalRole === 'supervisor') {
        updates.specialty = 'Management & Supervision';
    } else if (specialty) {
        updates.specialty = specialty;
    }

    if (password && password.trim() !== '') {
        if (password.length < 6) {
            return apiResponse.error(res, 'Password must be at least 6 characters long', 400);
        }
        updates.passwordHash = await bcrypt.hash(password, 10);
    }

    let updatedUser = null;
    if (isMongoConnected()) {
        updatedUser = await User.findByIdAndUpdate(id, updates, { new: true }).select('-passwordHash');
    } else {
        updatedUser = localDb.users.findByIdAndUpdate(id, updates);
    }

    const userResponse = {
        id: updatedUser._id || updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        specialty: updatedUser.specialty,
        createdAt: updatedUser.createdAt
    };

    return apiResponse.success(res, userResponse, 'User updated successfully');
});

