"use server";

import { RoleService } from "@commercex/services";
import { RoleScope } from "@prisma/client";

const roleService = new RoleService();

export async function getRolesAction(scope?: RoleScope) {
  try {
    const roles = await roleService.getRoles(scope);
    return { success: true, data: roles };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to fetch roles" };
  }
}

export async function getRoleAction(roleId: string) {
  try {
    const role = await roleService.getRoleById(roleId);
    if (!role) return { success: false, error: "Role not found" };
    return { success: true, data: role };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to fetch role" };
  }
}

export async function createRoleAction(data: { name: string; description?: string; scope?: RoleScope }) {
  try {
    const role = await roleService.createRole(data);
    return { success: true, data: role };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to create role" };
  }
}

export async function updateRoleAction(roleId: string, data: { name?: string; description?: string }) {
  try {
    const role = await roleService.updateRole(roleId, data);
    return { success: true, data: role };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to update role" };
  }
}

export async function deleteRoleAction(roleId: string) {
  try {
    await roleService.deleteRole(roleId);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to delete role" };
  }
}

export async function updateRolePermissionsAction(roleId: string, permissionIds: string[]) {
  try {
    const role = await roleService.updateRolePermissions(roleId, permissionIds);
    return { success: true, data: role };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to update permissions" };
  }
}

export async function getPermissionsAction() {
  try {
    const permissions = await roleService.getAllPermissions();
    return { success: true, data: permissions };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to fetch permissions" };
  }
}

export async function getPermissionsByCategoryAction() {
  try {
    const grouped = await roleService.getPermissionsByCategory();
    return { success: true, data: grouped };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to fetch permissions" };
  }
}

export async function createPermissionAction(data: { key: string; name: string; category: string; description?: string }) {
  try {
    const permission = await roleService.createPermission(data);
    return { success: true, data: permission };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to create permission" };
  }
}
