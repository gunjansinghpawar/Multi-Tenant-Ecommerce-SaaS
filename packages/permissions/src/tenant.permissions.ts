export const TenantPermissions = {
  CREATE_TENANT: 'tenant:create',
  READ_TENANT: 'tenant:read',
  UPDATE_TENANT: 'tenant:update',
  DELETE_TENANT: 'tenant:delete',
  MANAGE_BILLING: 'tenant:billing:manage',
} as const;

export type TenantPermission = typeof TenantPermissions[keyof typeof TenantPermissions];
