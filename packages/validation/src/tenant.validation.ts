import { z } from 'zod';

export const createTenantSchema = z.object({
  name: z.string().min(2).max(100),
  slug: z.string().min(2).max(50).regex(/^[a-z0-9-]+$/),
  planId: z.string().uuid(),
});

export const updateTenantSchema = createTenantSchema.partial().extend({
  status: z.enum(['active', 'suspended', 'pending_verification']).optional(),
});
