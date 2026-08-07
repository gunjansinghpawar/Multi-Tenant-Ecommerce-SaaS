/**
 * Domain Interfaces & Types for CommerceX Platform
 */

// --- Base Entity ---
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// --- Tenant Types ---
export type TenantStatus = 'ACTIVE' | 'SUSPENDED' | 'PENDING' | 'DELETED';

export interface Tenant extends BaseEntity {
  name: string;
  slug: string;
  customDomain?: string | null;
  status: TenantStatus;
  ownerId: string;
  settings?: TenantSettings | null;
  theme?: ThemeAssignment | null;
}

export interface TenantSettings extends BaseEntity {
  tenantId: string;
  currency: string;
  timezone: string;
  locale: string;
  brandingLogoUrl?: string | null;
  brandingFaviconUrl?: string | null;
  primaryColor?: string | null;
  accentColor?: string | null;
  supportEmail?: string | null;
}

export interface ThemeAssignment extends BaseEntity {
  tenantId: string;
  themeKey: string;
  customCss?: string | null;
}

// --- User & Auth Types ---
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'PENDING_VERIFICATION';

export interface User extends BaseEntity {
  email: string;
  emailVerified: boolean;
  name: string;
  avatarUrl?: string | null;
  status: UserStatus;
  tenantId?: string | null; // Nullable for Super Admin
  roles?: UserRole[];
}

export type RoleName = 'SUPER_ADMIN' | 'TENANT_ADMIN' | 'STAFF' | 'CUSTOMER';

export interface Role extends BaseEntity {
  name: RoleName;
  description?: string | null;
  isSystem: boolean;
  permissions?: Permission[];
}

export interface Permission extends BaseEntity {
  key: string;
  name: string;
  description?: string | null;
  category: string;
}

export interface UserRole {
  userId: string;
  roleId: string;
  role?: Role;
}

export interface Session extends BaseEntity {
  userId: string;
  token: string;
  expiresAt: Date;
  ipAddress?: string | null;
  userAgent?: string | null;
  tenantId?: string | null;
}

export interface Invitation extends BaseEntity {
  email: string;
  token: string;
  roleId: string;
  roleName: RoleName;
  tenantId: string;
  invitedById: string;
  expiresAt: Date;
  acceptedAt?: Date | null;
}

// --- Audit Logging ---
export type AuditAction =
  | 'AUTH_LOGIN'
  | 'AUTH_LOGOUT'
  | 'AUTH_PASSWORD_RESET'
  | 'TENANT_CREATE'
  | 'TENANT_UPDATE'
  | 'TENANT_SUSPEND'
  | 'TENANT_DELETE'
  | 'USER_CREATE'
  | 'USER_UPDATE'
  | 'USER_DEACTIVATE'
  | 'ROLE_UPDATE'
  | 'SETTINGS_UPDATE';

export interface AuditLog extends BaseEntity {
  action: AuditAction;
  actorId: string;
  actorEmail: string;
  tenantId?: string | null;
  resourceType: string;
  resourceId?: string | null;
  details?: Record<string, unknown> | null;
  ipAddress?: string | null;
  userAgent?: string | null;
}

// --- API & Pagination Envelopes ---
export interface PaginationQuery {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  timestamp: string;
}

export interface TenantContext {
  tenantId: string;
  tenantSlug: string;
  userId: string;
  userRole: RoleName;
}
