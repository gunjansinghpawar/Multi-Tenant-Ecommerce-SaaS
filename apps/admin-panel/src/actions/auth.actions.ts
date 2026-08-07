"use server";

import { AuthService } from "@commercex/services";
import { createServerSupabaseClient } from "@commercex/auth";
import { cookies } from "next/headers";

async function getAuthService() {
  const cookieStore = await cookies();
  const client = createServerSupabaseClient(cookieStore);
  return new AuthService(client);
}

export async function loginAction(data: any) {
  try {
    const authService = await getAuthService();
    const response = await authService.login(data);
    return { success: true, user: response.user };
  } catch (error: any) {
    return { error: error.message || "Failed to login" };
  }
}

export async function registerAction(data: any) {
  try {
    const authService = await getAuthService();
    await authService.register(data);
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to register" };
  }
}

export async function logoutAction() {
  try {
    const authService = await getAuthService();
    await authService.logout();
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to logout" };
  }
}

export async function forgotPasswordAction(data: any) {
  try {
    const authService = await getAuthService();
    await authService.initiatePasswordReset(data.email);
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to initiate reset" };
  }
}

export async function resetPasswordAction(data: any) {
  try {
    const authService = await getAuthService();
    await authService.resetPassword(data.password);
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to reset password" };
  }
}

export async function verifyMfaAction(data: any) {
  try {
    const authService = await getAuthService();
    await authService.verifyMFA(data.factorId, data.code);
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Invalid code" };
  }
}

export async function verifyEmailAction(data: any) {
  try {
    const authService = await getAuthService();
    await authService.verifyEmail(data.email, data.token);
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Invalid token" };
  }
}
