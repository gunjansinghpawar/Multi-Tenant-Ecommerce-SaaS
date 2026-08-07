import { PrismaClient } from '@prisma/client';

export interface TenantScopedClientOptions {
  tenantId: string;
}

/**
 * Helper function to inject tenantId filter into Prisma query arguments safely
 */
export function applyTenantScope<T extends { where?: Record<string, unknown> }>(args: T, tenantId: string): T {
  return {
    ...args,
    where: {
      ...args?.where,
      tenantId,
    },
  };
}

/**
 * Creates a Prisma Client extension enforcing explicit tenant context on multi-tenant entity queries.
 */
export function createTenantScopedClient(prisma: PrismaClient, tenantId: string) {
  if (!tenantId) {
    throw new Error('Tenant ID context is required to construct a tenant-scoped database client.');
  }

  return prisma.$extends({
    query: {
      user: {
        async findMany({ args, query }: { args: { where?: Record<string, unknown> }; query: (args: unknown) => Promise<unknown> }) {
          return query(applyTenantScope(args, tenantId));
        },
        async findFirst({ args, query }: { args: { where?: Record<string, unknown> }; query: (args: unknown) => Promise<unknown> }) {
          return query(applyTenantScope(args, tenantId));
        },
        async count({ args, query }: { args: { where?: Record<string, unknown> }; query: (args: unknown) => Promise<unknown> }) {
          return query(applyTenantScope(args, tenantId));
        },
      },
      auditLog: {
        async findMany({ args, query }: { args: { where?: Record<string, unknown> }; query: (args: unknown) => Promise<unknown> }) {
          return query(applyTenantScope(args, tenantId));
        },
        async count({ args, query }: { args: { where?: Record<string, unknown> }; query: (args: unknown) => Promise<unknown> }) {
          return query(applyTenantScope(args, tenantId));
        },
      },
      invitation: {
        async findMany({ args, query }: { args: { where?: Record<string, unknown> }; query: (args: unknown) => Promise<unknown> }) {
          return query(applyTenantScope(args, tenantId));
        },
      },
    },
  });
}
