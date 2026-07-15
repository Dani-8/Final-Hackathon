import { z } from 'zod';
import { ALL_PRIORITIES } from '../constants/priorities.js';

export const issueCreateSchema = z.object({
  assetId: z.string().min(1, 'Asset ID is required'),
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(5, 'Description must be at least 5 characters'),
  category: z.string().min(1, 'Category is required'),
  priority: z.enum(ALL_PRIORITIES),
  reporterName: z.string().min(1, 'Reporter name is required'),
  reporterContact: z.string().optional(),
  evidenceUrls: z.array(z.string()).optional(),
  aiSuggested: z.object({
    title: z.string().optional(),
    category: z.string().optional(),
    priority: z.string().optional(),
    causes: z.array(z.string()).optional(),
    checks: z.array(z.string()).optional()
  }).optional(),
  aiFieldsEdited: z.boolean().optional()
});

export function validateIssueCreate(data) {
  return issueCreateSchema.safeParse(data);
}
