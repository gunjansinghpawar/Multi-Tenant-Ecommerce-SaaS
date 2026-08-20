import { prisma } from '@commercex/database';
import { TenantContext } from '@commercex/middleware';

/**
 * Resolves a Tenant ID securely from the domain or slug context.
 * This guarantees we never trust a browser-provided tenant ID for storefronts.
 */
export async function resolveTenantFromContext(context: TenantContext): Promise<string> {
  // If the context somehow already resolved the ID (e.g. from an internal trusted source), return it.
  if (context.tenantId) return context.tenantId;

  if (context.customDomain) {
    const tenant = await prisma.tenant.findUnique({
      where: { customDomain: context.customDomain },
      select: { id: true, status: true }
    });

    if (tenant && tenant.status === 'ACTIVE') return tenant.id;
  }

  if (context.slug) {
    const tenant = await prisma.tenant.findUnique({
      where: { slug: context.slug },
      select: { id: true, status: true }
    });

    if (tenant && tenant.status === 'ACTIVE') return tenant.id;
  }

  throw new Error("UNAUTHORIZED: Could not securely resolve active tenant from domain context.");
}

/**
 * Resolves a Tenant ID securely from an authenticated user's session.
 * Used for Admin API routes to guarantee the user actually has access to the requested tenant.
 */
export async function resolveTenantFromSession(userId: string, requestedTenantId: string): Promise<string> {
  const membership = await prisma.membership.findUnique({
    where: {
      userId_tenantId: {
        userId,
        tenantId: requestedTenantId
      }
    }
  });

  if (!membership) {
    throw new Error("FORBIDDEN: User does not have access to this tenant.");
  }

  return membership.tenantId;
}
