import { z } from 'zod';

export const maintenanceSchema = z.object({
    inspectionNotes: z.string().min(5, 'Inspection notes must be at least 5 characters'),
    workPerformed: z.string().min(5, 'Work performed must be at least 5 characters'),
    
    partsReplaced: z.array(z.object({
        name: z.string().min(1, 'Part name is required'),
        cost: z.number().min(0, 'Part cost cannot be negative')
    })).optional().default([]),

    evidenceUrls: z.array(z.string()).optional(),
    finalCondition: z.string().min(1, 'Final condition is required'),
    nextServiceDate: z.string().optional() // optional next service date string
});

export function validateMaintenance(data) {
    return maintenanceSchema.safeParse(data);
}
