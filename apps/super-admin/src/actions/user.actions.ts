"use server";

import { UserService, RoleService } from "@commercex/services";

const userService = new UserService();
const roleService = new RoleService();

export async function getUsersAction() {
  try {
    const users = await userService.getUsers({
      where: {
        platformRoles: {
          some: {}
        }
      }
    });
    return { success: true, data: users };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to fetch users" };
  }
}

export async function createUserAction(data: { name: string; email: string; roleId?: string }) {
  try {
    // 1. Create the user
    const user = await userService.createUser({
      name: data.name,
      email: data.email,
    });

    // 2. Assign role if provided
    if (data.roleId) {
      await roleService.assignRoleToUser(user.id, data.roleId);
    }

    return { success: true, data: user };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to create user" };
  }
}

export async function updateUserAction(userId: string, data: { name?: string; email?: string; roleId?: string }) {
  try {
    const existingRoles = await roleService.getUserRoles(userId);
    const isSuperAdmin = existingRoles.some((r: any) => r.role.name === 'SUPER_ADMIN');
    if (isSuperAdmin) {
      throw new Error("Cannot modify a Super Admin user.");
    }

    const updateData: any = {};
    if (data.name) updateData.name = data.name;
    if (data.email) updateData.email = data.email;

    if (Object.keys(updateData).length > 0) {
      await userService.updateUser(userId, updateData);
    }

    if (data.roleId !== undefined) {
      // clear existing platform roles and add new one
      const existingRoles = await roleService.getUserRoles(userId);
      for (const r of existingRoles) {
        await roleService.removeRoleFromUser(userId, r.roleId);
      }
      if (data.roleId) {
        await roleService.assignRoleToUser(userId, data.roleId);
      }
    }

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to update user" };
  }
}

export async function deleteUserAction(userId: string) {
  try {
    const existingRoles = await roleService.getUserRoles(userId);
    const isSuperAdmin = existingRoles.some((r: any) => r.role.name === 'SUPER_ADMIN');
    if (isSuperAdmin) {
      throw new Error("Cannot delete a Super Admin user.");
    }

    await userService.deleteUser(userId);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to delete user" };
  }
}
