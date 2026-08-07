import { z } from 'zod';

// --- Auth Schemas ---
export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional().default(false),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Confirm password must be at least 8 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

// --- Tenant Schemas ---
export const createTenantSchema = z.object({
  name: z.string().min(2, 'Tenant name must be at least 2 characters').max(50, 'Tenant name max 50 characters'),
  slug: z
    .string()
    .min(2, 'Slug must be at least 2 characters')
    .max(30, 'Slug max 30 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  ownerEmail: z.string().email('Valid owner email is required'),
  ownerName: z.string().min(2, 'Owner name is required'),
  customDomain: z.string().optional().or(z.literal('')),
});

export type CreateTenantInput = z.infer<typeof createTenantSchema>;

export const updateTenantSchema = createTenantSchema.partial().omit({ ownerEmail: true });

export type UpdateTenantInput = z.infer<typeof updateTenantSchema>;

export const tenantSettingsSchema = z.object({
  currency: z.string().length(3, 'Currency code must be 3 characters (e.g. USD)'),
  timezone: z.string().min(1, 'Timezone is required'),
  locale: z.string().min(2, 'Locale is required'),
  primaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Invalid hex color').optional(),
  accentColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Invalid hex color').optional(),
  supportEmail: z.string().email('Invalid support email').optional(),
});

export type TenantSettingsInput = z.infer<typeof tenantSettingsSchema>;

// --- User Management Schemas ---
export const inviteUserSchema = z.object({
  email: z.string().email('Valid email is required'),
  roleId: z.string().min(1, 'Role selection is required'),
});

export type InviteUserInput = z.infer<typeof inviteUserSchema>;

export const updateProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  avatarUrl: z.string().url('Invalid avatar URL').optional().or(z.literal('')),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

// --- Pagination Query Schema ---
export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export type PaginationQueryInput = z.infer<typeof paginationQuerySchema>;
