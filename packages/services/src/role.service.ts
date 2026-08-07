import { prisma } from '@commercex/database';

export class RoleService {

  // ─── Role CRUD ───────────────────────────────────────────

  async getRoles() {
    return prisma.role.findMany({
      include: {
        permissions: {
          include: { permission: true }
        },
        _count: {
          select: { users: true }
        }
      },
      orderBy: { createdAt: 'asc' }
    });
  }

  async getRoleById(roleId: string) {
    return prisma.role.findUnique({
      where: { id: roleId },
      include: {
        permissions: {
          include: { permission: true }
        },
        _count: {
          select: { users: true }
        }
      }
    });
  }

  async getRoleByName(name: string) {
    return prisma.role.findUnique({
      where: { name },
      include: {
        permissions: {
          include: { permission: true }
        },
        _count: {
          select: { users: true }
        }
      }
    });
  }

  async createRole(data: { name: string; description?: string; isSystem?: boolean }) {
    return prisma.role.create({
      data: {
        name: data.name,
        description: data.description || null,
        isSystem: data.isSystem || false,
      },
      include: {
        permissions: {
          include: { permission: true }
        },
        _count: {
          select: { users: true }
        }
      }
    });
  }

  async updateRole(roleId: string, data: { name?: string; description?: string }) {
    // Prevent editing system roles' names
    const role = await prisma.role.findUnique({ where: { id: roleId } });
    if (!role) throw new Error('Role not found');
    if (role.isSystem && data.name && data.name !== role.name) {
      throw new Error('Cannot rename a system role');
    }

    return prisma.role.update({
      where: { id: roleId },
      data: {
        name: data.name ?? undefined,
        description: data.description ?? undefined,
      },
      include: {
        permissions: {
          include: { permission: true }
        },
        _count: {
          select: { users: true }
        }
      }
    });
  }

  async deleteRole(roleId: string) {
    const role = await prisma.role.findUnique({ where: { id: roleId } });
    if (!role) throw new Error('Role not found');
    if (role.isSystem) throw new Error('Cannot delete a system role');

    return prisma.role.delete({ where: { id: roleId } });
  }

  // ─── Permission Assignment ───────────────────────────────

  async updateRolePermissions(roleId: string, permissionIds: string[]) {
    const role = await prisma.role.findUnique({ where: { id: roleId } });
    if (!role) throw new Error('Role not found');

    // Transaction: delete existing, insert new
    await prisma.$transaction([
      prisma.rolePermission.deleteMany({ where: { roleId } }),
      ...permissionIds.map(permissionId =>
        prisma.rolePermission.create({
          data: { roleId, permissionId }
        })
      ),
    ]);

    return this.getRoleById(roleId);
  }

  // ─── User Role Assignment ────────────────────────────────

  async assignRoleToUser(userId: string, roleId: string) {
    // Check if already assigned
    const existing = await prisma.userRole.findUnique({
      where: {
        userId_roleId: { userId, roleId }
      }
    });
    if (existing) return existing;

    return prisma.userRole.create({
      data: { userId, roleId }
    });
  }

  async removeRoleFromUser(userId: string, roleId: string) {
    return prisma.userRole.delete({
      where: {
        userId_roleId: { userId, roleId }
      }
    });
  }

  async getUserRoles(userId: string) {
    return prisma.userRole.findMany({
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
  }

  // ─── Permission Queries ──────────────────────────────────

  async getAllPermissions() {
    return prisma.permission.findMany({
      orderBy: [{ category: 'asc' }, { key: 'asc' }]
    });
  }

  async getPermissionsByCategory() {
    const permissions = await this.getAllPermissions();
    const grouped: Record<string, typeof permissions> = {};
    for (const perm of permissions) {
      if (!grouped[perm.category]) grouped[perm.category] = [];
      grouped[perm.category].push(perm);
    }
    return grouped;
  }

  // ─── Authorization Check ─────────────────────────────────

  async userHasPermission(userId: string, permissionKey: string): Promise<boolean> {
    const userRoles = await this.getUserRoles(userId);
    for (const ur of userRoles) {
      // Super admin has everything
      if (ur.role.name === 'SUPER_ADMIN') return true;
      for (const rp of ur.role.permissions) {
        if (rp.permission.key === permissionKey) return true;
      }
    }
    return false;
  }

  async userHasAnyPermission(userId: string, permissionKeys: string[]): Promise<boolean> {
    for (const key of permissionKeys) {
      if (await this.userHasPermission(userId, key)) return true;
    }
    return false;
  }
}
