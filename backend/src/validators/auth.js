import { z } from 'zod';

export const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum(['admin', 'technician', 'supervisor']),
    specialty: z.string().optional()
});

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required')
});

export function validateRegister(data) {
    return registerSchema.safeParse(data);
}

export function validateLogin(data) {
    return loginSchema.safeParse(data);
}
