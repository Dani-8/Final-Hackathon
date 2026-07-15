import { z } from 'zod';
import { ALL_ASSET_STATUSES } from '../constants/assetStatus.js';

export const assetCreateSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    category: z.string().min(1, 'Category is required'),
    location: z.string().min(1, 'Location is required'),
    condition: z.string().min(1, 'Condition is required'),
    status: z.enum(ALL_ASSET_STATUSES).default('Operational')
});

export const assetUpdateSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').optional(),
    category: z.string().min(1, 'Category is required').optional(),
    location: z.string().min(1, 'Location is required').optional(),
    condition: z.string().min(1, 'Condition is required').optional(),
    status: z.enum(ALL_ASSET_STATUSES).optional(),
    assignedTechnician: z.string().nullable().optional(),
    lastServiceDate: z.string().nullable().optional(),
    nextServiceDate: z.string().nullable().optional()
});

export function validateAssetCreate(data) {
    return assetCreateSchema.safeParse(data);
}

export function validateAssetUpdate(data) {
    return assetUpdateSchema.safeParse(data);
}
