"use server";

import { prisma, Prisma } from '@commercex/database';
import { RoleScope } from '@prisma/client';

export async function seedDefaultsAction() {
  try {
    // 1. Auto-discover Modules from Prisma DMMF
    const allModels = Prisma.dmmf.datamodel.models.map(m => m.name);
    
    // Filter out junction tables and internal tables
    const ignoredModels = [
      'UserPlatformRole', 
      'RolePermission', 
      'StoreProduct',
      'StoreCategory',
      'StoreCollection',
      'MembershipRole',
      'ThemeAsset'
    ];
    
    const modules = allModels
      .filter(m => !ignoredModels.includes(m))
      // Format CamelCase to spaced words if needed, but the model name is usually PascalCase
      .map(m => m.replace(/([A-Z])/g, ' $1').trim());

    const actions = ['read', 'create', 'update', 'delete'];

    const permissionsToCreate = [];
    for (const mod of modules) {
      for (const act of actions) {
        permissionsToCreate.push({
          key: `${mod.toLowerCase().replace(/\s+/g, '-')}:${act}`,
          name: `${act.charAt(0).toUpperCase() + act.slice(1)} ${mod}`,
          category: `${mod} Management`,
          description: `Allow user to ${act} ${mod.toLowerCase()}`,
        });
      }
    }

    for (const p of permissionsToCreate) {
      await prisma.permission.upsert({
        where: { key: p.key },
        update: {},
        create: p,
      });
    }

    // 2. Seed Predefined Roles
    const predefinedRoles = [
      { name: 'SUPER_ADMIN', description: 'Full platform access', scope: RoleScope.PLATFORM, isSystem: true },
    ];

    for (const r of predefinedRoles) {
      await prisma.role.upsert({
        where: { name: r.name },
        update: {},
        create: {
          name: r.name,
          description: r.description,
          scope: r.scope,
          isSystem: r.isSystem
        }
      });
    }

    // Assign all permissions to SUPER_ADMIN
    const superAdminRole = await prisma.role.findUnique({ where: { name: 'SUPER_ADMIN' } });
    if (superAdminRole) {
      const allPerms = await prisma.permission.findMany();
      await prisma.$transaction([
        prisma.rolePermission.deleteMany({ where: { roleId: superAdminRole.id } }),
        ...allPerms.map(p => prisma.rolePermission.create({
          data: { roleId: superAdminRole.id, permissionId: p.id }
        }))
      ]);
    }

    // 3. Seed Super Admin User
    const superAdminEmail = 'superadmin@commercex.com';
    let user = await prisma.user.findUnique({ where: { email: superAdminEmail } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          name: 'Super Admin',
          email: superAdminEmail,
        }
      });
    }

    // 4. Assign SUPER_ADMIN role to super admin user
    if (superAdminRole && user) {
      await prisma.userPlatformRole.upsert({
        where: {
          userId_roleId: {
            userId: user.id,
            roleId: superAdminRole.id
          }
        },
        update: {},
        create: {
          userId: user.id,
          roleId: superAdminRole.id
        }
      });
    }

    return { success: true, message: "Defaults seeded successfully" };
  } catch (error: any) {
    console.error("Seed error:", error);
    return { success: false, error: error.message || "Failed to seed defaults" };
  }
}
