import { supabase as defaultSupabase } from '@commercex/auth';

export class AuthService {
  private client: any;
  
  constructor(client?: any) {
    this.client = client || defaultSupabase;
  }

  async register(data: { email: string; password: string; [key: string]: any }) {
    console.log('Registering user with Supabase:', data.email);
    const { data: authData, error } = await this.client.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          // store additional user metadata here
          ...data
        }
      }
    });

    if (error) {
      throw new Error(`Registration failed: ${error.message}`);
    }

    return authData;
  }

  async login(data: { email: string; password: string }, reqMetadata?: any) {
    console.log('Logging in user with Supabase:', data.email);
    
    // Supabase handles device tracking internally if configured, 
    // or we can pass reqMetadata to our own tracking tables later.
    const { data: authData, error } = await this.client.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      throw new Error(`Login failed: ${error.message}`);
    }

    return authData;
  }

  async logout(sessionToken?: string) {
    console.log('Logging out session');
    const { error } = await this.client.auth.signOut();
    if (error) {
      throw new Error(`Logout failed: ${error.message}`);
    }
  }

  async refreshToken(refreshToken: string) {
    console.log('Refreshing token');
    const { data, error } = await this.client.auth.refreshSession({ refresh_token: refreshToken });
    
    if (error) {
      throw new Error(`Token refresh failed: ${error.message}`);
    }
    
    return data;
  }

  async initiatePasswordReset(email: string) {
    console.log('Initiating password reset for', email);
    const { error } = await this.client.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.APP_URL || 'http://localhost:3000'}/auth/reset-password`,
    });
    
    if (error) {
      throw new Error(`Password reset initiation failed: ${error.message}`);
    }
  }

  async resetPassword(password: string) {
    console.log('Resetting password');
    const { data, error } = await this.client.auth.updateUser({
      password: password
    });

    if (error) {
      throw new Error(`Password reset failed: ${error.message}`);
    }
    return data;
  }

  async verifyEmail(email: string, token: string) {
    console.log('Verifying email with OTP');
    const { data, error } = await this.client.auth.verifyOtp({
      email,
      token,
      type: 'email'
    });

    if (error) {
      throw new Error(`Email verification failed: ${error.message}`);
    }
    
    return data;
  }

  async verifyMFA(factorId: string, code: string) {
    console.log('Verifying MFA');
    const { data, error } = await this.client.auth.mfa.challengeAndVerify({
      factorId,
      code
    });

    if (error) {
      throw new Error(`MFA verification failed: ${error.message}`);
    }
    
    return data;
  }
}
