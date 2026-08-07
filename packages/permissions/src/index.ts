import type { RoleName } from '@commercex/types';

// ─────────────────────────────────────────────────────────────
// Permission Keys — organized by domain
// ─────────────────────────────────────────────────────────────

export const PERMISSIONS = {
  // ── Platform (Super Admin only) ──
  PLATFORM_METRICS_READ: 'platform:metrics:read',
  PLATFORM_SETTINGS_MANAGE: 'platform:settings:manage',

  // ── Tenant Management ──
  TENANT_CREATE: 'tenant:create',
  TENANT_READ: 'tenant:read',
  TENANT_UPDATE: 'tenant:update',
  TENANT_DELETE: 'tenant:delete',
  TENANT_SUSPEND: 'tenant:suspend',

  // ── User Management ──
  USER_CREATE: 'user:create',
  USER_READ: 'user:read',
  USER_UPDATE: 'user:update',
  USER_DELETE: 'user:delete',
  USER_INVITE: 'user:invite',

  // ── Role Management ──
  ROLE_CREATE: 'role:create',
  ROLE_READ: 'role:read',
  ROLE_UPDATE: 'role:update',
  ROLE_DELETE: 'role:delete',
  ROLE_ASSIGN: 'role:assign',

  // ── Store Settings ──
  STORE_SETTINGS_READ: 'store:settings:read',
  STORE_SETTINGS_UPDATE: 'store:settings:update',
  STORE_BRANDING_UPDATE: 'store:branding:update',

  // ── Staff ──
  STAFF_MANAGE: 'staff:manage',

  // ── Audit Logs ──
  AUDIT_READ: 'audit:read',

  // ── Products (Phase 2, defined early) ──
  PRODUCT_CREATE: 'product:create',
  PRODUCT_READ: 'product:read',
  PRODUCT_UPDATE: 'product:update',
  PRODUCT_DELETE: 'product:delete',

  // ── Orders (Phase 2, defined early) ──
  ORDER_READ: 'order:read',
  ORDER_UPDATE: 'order:update',
  ORDER_CANCEL: 'order:cancel',
  ORDER_REFUND: 'order:refund',

  // ── Customers (Phase 2) ──
  CUSTOMER_READ: 'customer:read',
  CUSTOMER_UPDATE: 'customer:update',
  CUSTOMER_DELETE: 'customer:delete',

  // ── Analytics ──
  ANALYTICS_READ: 'analytics:read',

  // ── Discounts (Phase 2) ──
  DISCOUNT_CREATE: 'discount:create',
  DISCOUNT_READ: 'discount:read',
  DISCOUNT_UPDATE: 'discount:update',
  DISCOUNT_DELETE: 'discount:delete',
} as const;

export type PermissionKey = typeof PERMISSIONS[keyof typeof PERMISSIONS];

// ─────────────────────────────────────────────────────────────
// Permission metadata — used for seed and UI display
// ─────────────────────────────────────────────────────────────

export interface PermissionDefinition {
  key: PermissionKey;
  name: string;
  description: string;
  category: string;
}

export const PERMISSION_DEFINITIONS: PermissionDefinition[] = [
  // Platform
  { key: PERMISSIONS.PLATFORM_METRICS_READ, name: 'View Platform Metrics', description: 'View system-wide analytics and health metrics.', category: 'Platform' },
  { key: PERMISSIONS.PLATFORM_SETTINGS_MANAGE, name: 'Manage Platform Settings', description: 'Modify global platform configuration.', category: 'Platform' },

  // Tenant
  { key: PERMISSIONS.TENANT_CREATE, name: 'Create Tenant', description: 'Create new tenant stores on the platform.', category: 'Tenant' },
  { key: PERMISSIONS.TENANT_READ, name: 'View Tenants', description: 'View tenant details and listings.', category: 'Tenant' },
  { key: PERMISSIONS.TENANT_UPDATE, name: 'Update Tenant', description: 'Edit tenant information and settings.', category: 'Tenant' },
  { key: PERMISSIONS.TENANT_DELETE, name: 'Delete Tenant', description: 'Permanently delete a tenant.', category: 'Tenant' },
  { key: PERMISSIONS.TENANT_SUSPEND, name: 'Suspend Tenant', description: 'Suspend or reactivate a tenant.', category: 'Tenant' },

  // User
  { key: PERMISSIONS.USER_CREATE, name: 'Create User', description: 'Create new user accounts.', category: 'Users' },
  { key: PERMISSIONS.USER_READ, name: 'View Users', description: 'View user profiles and listings.', category: 'Users' },
  { key: PERMISSIONS.USER_UPDATE, name: 'Update User', description: 'Edit user details and status.', category: 'Users' },
  { key: PERMISSIONS.USER_DELETE, name: 'Delete User', description: 'Permanently delete a user account.', category: 'Users' },
  { key: PERMISSIONS.USER_INVITE, name: 'Invite User', description: 'Send invitations to new users.', category: 'Users' },

  // Role
  { key: PERMISSIONS.ROLE_CREATE, name: 'Create Role', description: 'Define new roles.', category: 'Roles' },
  { key: PERMISSIONS.ROLE_READ, name: 'View Roles', description: 'View role definitions and permissions.', category: 'Roles' },
  { key: PERMISSIONS.ROLE_UPDATE, name: 'Update Role', description: 'Modify role permissions.', category: 'Roles' },
  { key: PERMISSIONS.ROLE_DELETE, name: 'Delete Role', description: 'Remove a role from the system.', category: 'Roles' },
  { key: PERMISSIONS.ROLE_ASSIGN, name: 'Assign Role', description: 'Assign or remove roles from users.', category: 'Roles' },

  // Store Settings
  { key: PERMISSIONS.STORE_SETTINGS_READ, name: 'View Store Settings', description: 'View store configuration and settings.', category: 'Store' },
  { key: PERMISSIONS.STORE_SETTINGS_UPDATE, name: 'Update Store Settings', description: 'Modify store settings like currency and timezone.', category: 'Store' },
  { key: PERMISSIONS.STORE_BRANDING_UPDATE, name: 'Update Store Branding', description: 'Modify store logo, colors, and theme.', category: 'Store' },

  // Staff
  { key: PERMISSIONS.STAFF_MANAGE, name: 'Manage Staff', description: 'Manage team members and their access.', category: 'Staff' },

  // Audit
  { key: PERMISSIONS.AUDIT_READ, name: 'View Audit Logs', description: 'View system activity and change history.', category: 'Audit' },

  // Products
  { key: PERMISSIONS.PRODUCT_CREATE, name: 'Create Product', description: 'Add new products to the store.', category: 'Products' },
  { key: PERMISSIONS.PRODUCT_READ, name: 'View Products', description: 'View product catalog and details.', category: 'Products' },
  { key: PERMISSIONS.PRODUCT_UPDATE, name: 'Update Product', description: 'Edit product information and pricing.', category: 'Products' },
  { key: PERMISSIONS.PRODUCT_DELETE, name: 'Delete Product', description: 'Remove products from the store.', category: 'Products' },

  // Orders
  { key: PERMISSIONS.ORDER_READ, name: 'View Orders', description: 'View order details and history.', category: 'Orders' },
  { key: PERMISSIONS.ORDER_UPDATE, name: 'Update Order', description: 'Update order status and details.', category: 'Orders' },
  { key: PERMISSIONS.ORDER_CANCEL, name: 'Cancel Order', description: 'Cancel pending or active orders.', category: 'Orders' },
  { key: PERMISSIONS.ORDER_REFUND, name: 'Refund Order', description: 'Process order refunds.', category: 'Orders' },

  // Customers
  { key: PERMISSIONS.CUSTOMER_READ, name: 'View Customers', description: 'View customer profiles and data.', category: 'Customers' },
  { key: PERMISSIONS.CUSTOMER_UPDATE, name: 'Update Customer', description: 'Edit customer information.', category: 'Customers' },
  { key: PERMISSIONS.CUSTOMER_DELETE, name: 'Delete Customer', description: 'Remove customer records.', category: 'Customers' },

  // Analytics
  { key: PERMISSIONS.ANALYTICS_READ, name: 'View Analytics', description: 'View store analytics and reports.', category: 'Analytics' },

  // Discounts
  { key: PERMISSIONS.DISCOUNT_CREATE, name: 'Create Discount', description: 'Create promotional discounts and coupons.', category: 'Discounts' },
  { key: PERMISSIONS.DISCOUNT_READ, name: 'View Discounts', description: 'View active and past discounts.', category: 'Discounts' },
  { key: PERMISSIONS.DISCOUNT_UPDATE, name: 'Update Discount', description: 'Edit discount rules and conditions.', category: 'Discounts' },
  { key: PERMISSIONS.DISCOUNT_DELETE, name: 'Delete Discount', description: 'Remove discounts.', category: 'Discounts' },
];

// ─────────────────────────────────────────────────────────────
// Role → Permission matrix
// ─────────────────────────────────────────────────────────────

export const ROLE_PERMISSIONS_MATRIX: Record<RoleName, PermissionKey[]> = {
  SUPER_ADMIN: Object.values(PERMISSIONS),
  TENANT_ADMIN: [
    // Store
    PERMISSIONS.STORE_SETTINGS_READ,
    PERMISSIONS.STORE_SETTINGS_UPDATE,
    PERMISSIONS.STORE_BRANDING_UPDATE,
    // Users
    PERMISSIONS.USER_CREATE,
    PERMISSIONS.USER_READ,
    PERMISSIONS.USER_UPDATE,
    PERMISSIONS.USER_DELETE,
    PERMISSIONS.USER_INVITE,
    // Roles
    PERMISSIONS.ROLE_CREATE,
    PERMISSIONS.ROLE_READ,
    PERMISSIONS.ROLE_UPDATE,
    PERMISSIONS.ROLE_DELETE,
    PERMISSIONS.ROLE_ASSIGN,
    // Staff
    PERMISSIONS.STAFF_MANAGE,
    // Audit
    PERMISSIONS.AUDIT_READ,
    // Products
    PERMISSIONS.PRODUCT_CREATE,
    PERMISSIONS.PRODUCT_READ,
    PERMISSIONS.PRODUCT_UPDATE,
    PERMISSIONS.PRODUCT_DELETE,
    // Orders
    PERMISSIONS.ORDER_READ,
    PERMISSIONS.ORDER_UPDATE,
    PERMISSIONS.ORDER_CANCEL,
    PERMISSIONS.ORDER_REFUND,
    // Customers
    PERMISSIONS.CUSTOMER_READ,
    PERMISSIONS.CUSTOMER_UPDATE,
    PERMISSIONS.CUSTOMER_DELETE,
    // Analytics
    PERMISSIONS.ANALYTICS_READ,
    // Discounts
    PERMISSIONS.DISCOUNT_CREATE,
    PERMISSIONS.DISCOUNT_READ,
    PERMISSIONS.DISCOUNT_UPDATE,
    PERMISSIONS.DISCOUNT_DELETE,
  ],
  STAFF: [
    PERMISSIONS.STORE_SETTINGS_READ,
    PERMISSIONS.USER_READ,
    PERMISSIONS.ROLE_READ,
    PERMISSIONS.PRODUCT_READ,
    PERMISSIONS.PRODUCT_UPDATE,
    PERMISSIONS.ORDER_READ,
    PERMISSIONS.ORDER_UPDATE,
    PERMISSIONS.CUSTOMER_READ,
    PERMISSIONS.ANALYTICS_READ,
    PERMISSIONS.DISCOUNT_READ,
  ],
  CUSTOMER: [],
};

// ─────────────────────────────────────────────────────────────
// Role definitions for seeding
// ─────────────────────────────────────────────────────────────

export interface RoleDefinition {
  name: RoleName;
  description: string;
  isSystem: boolean;
}

export const ROLE_DEFINITIONS: RoleDefinition[] = [
  { name: 'SUPER_ADMIN', description: 'Platform-wide superuser with unrestricted access to all features, tenants, and system settings.', isSystem: true },
  { name: 'TENANT_ADMIN', description: 'Store owner with full control over their own tenant, including products, orders, team, and settings.', isSystem: true },
  { name: 'STAFF', description: 'Store team member with limited permissions defined by the tenant admin.', isSystem: true },
  { name: 'CUSTOMER', description: 'End-user who browses and purchases from the storefront.', isSystem: true },
];

// ─────────────────────────────────────────────────────────────
// Utility functions
// ─────────────────────────────────────────────────────────────

/**
 * Check if a role possesses a target permission
 */
export function hasPermission(role: RoleName, permission: PermissionKey): boolean {
  if (role === 'SUPER_ADMIN') return true;
  const granted = ROLE_PERMISSIONS_MATRIX[role] || [];
  return granted.includes(permission);
}

/**
 * Check if a role possesses all required permissions
 */
export function hasAllPermissions(role: RoleName, permissions: PermissionKey[]): boolean {
  return permissions.every((p) => hasPermission(role, p));
}

/**
 * Check if a role possesses any of the specified permissions
 */
export function hasAnyPermission(role: RoleName, permissions: PermissionKey[]): boolean {
  return permissions.some((p) => hasPermission(role, p));
}

/**
 * Get all permission definitions for a given category
 */
export function getPermissionsByCategory(category: string): PermissionDefinition[] {
  return PERMISSION_DEFINITIONS.filter(p => p.category === category);
}

/**
 * Get all unique categories
 */
export function getPermissionCategories(): string[] {
  return [...new Set(PERMISSION_DEFINITIONS.map(p => p.category))];
}
