"use server";

import { AuthService } from "@commercex/services";
import { createServerSupabaseClient } from "@commercex/auth";
import { cookies, headers } from "next/headers";
import { prisma } from '@commercex/database';
import { UAParser } from "ua-parser-js";
import { getLocationFromIP } from "../utils/geo";

async function getAuthService() {
  const cookieStore = await cookies();
  const client = createServerSupabaseClient(cookieStore);
  return new AuthService(client);
}

export async function loginAction(data: any) {
  try {
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || "Unknown";
    const ipAddress = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "Unknown IP";

    const parser = new UAParser(userAgent);
    const browser = parser.getBrowser();
    const os = parser.getOS();
    const device = parser.getDevice();

    const deviceType = device.type || "desktop";
    const browserCode = `${browser.name || 'Unknown'} ${browser.version || ''}`.trim();
    const osCode = `${os.name || 'Unknown'} ${os.version || ''}`.trim();
    const deviceName = `${device.vendor || ''} ${device.model || ''}`.trim() || osCode;

    const cookieStore = await cookies();
    let deviceCode = cookieStore.get("device_id")?.value;
    if (!deviceCode) {
      deviceCode = crypto.randomUUID();
      cookieStore.set("device_id", deviceCode, {
        maxAge: 60 * 60 * 24 * 365, // 1 year
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      });
    }

    const location = await getLocationFromIP(ipAddress);
    const tokenVersion = crypto.randomUUID();

    const authService = await getAuthService();
    const reqMetadata = {
      ipAddress,
      userAgent,
      deviceType,
      browserCode,
      osCode,
      deviceName,
      deviceCode,
      location,
      tokenVersion
    };

    const response = await authService.login(data, reqMetadata);
    return { success: true, user: response.user };
  } catch (error: any) {
    // Generic error to prevent detail leaking
    return { error: "Invalid credentials or authentication failed." };
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

export async function loginWithGoogleAction(redirectTo: string) {
  try {
    const authService = await getAuthService();
    const response = await authService.signInWithOAuth('google', redirectTo);
    return { success: true, url: response.url };
  } catch (error: any) {
    return { error: error.message || "Failed to initiate Google login" };
  }
}

export async function loginWithOtpAction(email: string, redirectTo: string) {
  try {
    const authService = await getAuthService();
    await authService.signInWithOtp(email, redirectTo);
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to send Magic Link" };
  }
}

export async function getCurrentUserAction() {
  try {
    const cookieStore = await cookies();
    const client = createServerSupabaseClient(cookieStore);
    const { data: { user } } = await client.auth.getUser();

    if (!user) {
      return { success: false, error: "Not authenticated" };
    }

    let dbUser = null;
    try {
      dbUser = await prisma.user.findUnique({
        where: { email: user.email }
      });
    } catch (e: any) {
      console.error("Prisma error in getCurrentUserAction:", e);
    }

    if (!dbUser) {
      return {
        success: false,
        error: "Super Admin record not found in database. Access denied."
      };
    }

    return {
      success: true,
      data: {
        id: dbUser.id,
        email: dbUser.email,
        name: dbUser.name,
        avatarUrl: dbUser.avatarUrl || "",
        initials: dbUser.name.substring(0, 2).toUpperCase()
      }
    };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to get current user" };
  }
}
