import { AuthService } from '@commercex/services';
import { loginSchema, forgotPasswordSchema, resetPasswordSchema, LoginInput, ForgotPasswordInput, ResetPasswordInput } from '@commercex/validation';
import { z } from 'zod';

export class AuthController {
  private authService: AuthService;

  constructor(authService?: AuthService) {
    this.authService = authService || new AuthService();
  }

  async register(data: any) {
    try {
      // Assuming a generic register schema exists or we type it properly
      const result = await this.authService.register(data);
      return { success: true, data: result };
    } catch (e: any) {
      return { success: false, error: { message: e.message } };
    }
  }

  async login(inputData: LoginInput, metadata?: any) {
    try {
      const data = loginSchema.parse(inputData);
      const result = await this.authService.login(data, metadata);
      return { success: true, data: result };
    } catch (e: any) {
      if (e instanceof z.ZodError) {
        return { success: false, error: { message: 'Validation failed', details: e.errors } };
      }
      return { success: false, error: { message: e.message } };
    }
  }

  async logout() {
    try {
      await this.authService.logout();
      return { success: true };
    } catch (e: any) {
      return { success: false, error: { message: e.message } };
    }
  }

  async forgotPassword(inputData: ForgotPasswordInput) {
    try {
      const data = forgotPasswordSchema.parse(inputData);
      await this.authService.initiatePasswordReset(data.email);
      return { success: true, message: 'Password reset email sent' };
    } catch (e: any) {
      if (e instanceof z.ZodError) {
        return { success: false, error: { message: 'Validation failed', details: e.errors } };
      }
      return { success: false, error: { message: e.message } };
    }
  }

  async resetPassword(inputData: ResetPasswordInput) {
    try {
      const data = resetPasswordSchema.parse(inputData);
      const result = await this.authService.resetPassword(data.password);
      return { success: true, data: result };
    } catch (e: any) {
      if (e instanceof z.ZodError) {
        return { success: false, error: { message: 'Validation failed', details: e.errors } };
      }
      return { success: false, error: { message: e.message } };
    }
  }

  async verifyEmail(email: string, token: string) {
    try {
      if (!email || !token) throw new Error('Email and token are required');
      const result = await this.authService.verifyEmail(email, token);
      return { success: true, data: result };
    } catch (e: any) {
      return { success: false, error: { message: e.message } };
    }
  }

  async refreshToken(refreshToken: string) {
    try {
      if (!refreshToken) throw new Error('Refresh token is required');
      const result = await this.authService.refreshToken(refreshToken);
      return { success: true, data: result };
    } catch (e: any) {
      return { success: false, error: { message: e.message } };
    }
  }

  async verifyMfa(factorId: string, code: string) {
    try {
      if (!factorId || !code) throw new Error('Factor ID and code are required');
      const result = await this.authService.verifyMFA(factorId, code);
      return { success: true, data: result };
    } catch (e: any) {
      return { success: false, error: { message: e.message } };
    }
  }
}
