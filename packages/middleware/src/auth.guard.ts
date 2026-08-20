import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@commercex/database';

export interface GuardOptions {
  requiredPermissions?: string[];
  requireAdmin?: boolean;
}

/**
 * Authorization Guard: Layer 3 of Tenant Isolation
 * Validates that the authenticated user possesses the required permissions.
 * Evaluates both Platform-level and Tenant-level roles for granular authorization.
 */
export async function withAuthorizationGuard(
  req: NextRequest,
  userId: string,
  tenantId?: string | null,
  options: GuardOptions = {}
) {
  try {
    // 1. Fetch User Platform Roles (Global Access)
    const platformAccess = await prisma.userPlatformRole.findMany({
      where: { userId },
      include: {
        role: {
          include: {
            permissions: {
              include: { permission: true }
            }
          }
        }
      }
    });

    const platformRoles = platformAccess.map(pa => pa.role);
    const isPlatformAdmin = platformRoles.some(r => r.name === 'SUPER_ADMIN' || r.name === 'PLATFORM_SUPPORT');
    
    // 2. Fetch Tenant Membership (if a tenant context is requested)
    let membershipRoles: any[] = [];
    if (tenantId) {
      const membership = await prisma.membership.findUnique({
        where: {
          userId_tenantId: {
            userId,
            tenantId
          }
        },
        include: {
          roles: {
            include: {
              role: {
                include: {
                  permissions: {
                    include: { permission: true }
                  }
                }
              }
            }
          }
        }
      });
      
      // If user doesn't belong to the store AND isn't a platform super-admin, reject immediately
      if (!membership && !isPlatformAdmin) {
        return NextResponse.json(
          { success: false, error: { code: 'FORBIDDEN', message: 'User does not belong to this tenant' } },
          { status: 403 }
        );
      }

      if (membership) {
        membershipRoles = membership.roles.map(mr => mr.role);
      }
    } else if (!isPlatformAdmin) {
      // If no tenant is specified, they must be a platform admin to perform global actions
      return NextResponse.json(
        { success: false, error: { code: 'FORBIDDEN', message: 'Global platform access denied' } },
        { status: 403 }
      );
    }

    const allRoles = [...platformRoles, ...membershipRoles];
    
    // 3. Check for Admin Override
    const isAdmin = allRoles.some(r => 
      r.name === 'SUPER_ADMIN' || r.name === 'OWNER' || r.name === 'ADMIN'
    );
    
    if (options.requireAdmin && !isAdmin) {
      return NextResponse.json(
        { success: false, error: { code: 'FORBIDDEN', message: 'Admin privileges required' } },
        { status: 403 }
      );
    }

    // 4. Verify Granular Permissions
    if (options.requiredPermissions && options.requiredPermissions.length > 0) {
      const userPermissions = new Set(
        allRoles.flatMap(r => r.permissions.map((rp: any) => rp.permission.key))
      );

      const hasAllPermissions = options.requiredPermissions.every(p => userPermissions.has(p));
      
      // We generally allow Admins/Owners to bypass granular checks,
      // but in a strict zero-trust model, you might require explicit permissions even for them.
      // For CommerceX, we maintain the admin bypass.
      if (!hasAllPermissions && !isAdmin) {
        return NextResponse.json(
          { success: false, error: { code: 'FORBIDDEN', message: 'Insufficient permissions for this action' } },
          { status: 403 }
        );
      }
    }

    return null; // Null means guard passed

  } catch (error) {
    console.error("[AuthGuard] Error validating permissions:", error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to authorize request' } },
      { status: 500 }
    );
  }
}
