import { supabase as defaultSupabase } from '@commercex/auth';
import { prisma } from '@commercex/database';

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
    
    // Attempt to find the user in our Prisma database by email
    const user = await prisma.user.findUnique({
      where: { email: data.email }
    });
    
    // Supabase handles device tracking internally if configured, 
    // or we can pass reqMetadata to our own tracking tables later.
    const { data: authData, error } = await this.client.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      // Log failed attempt
      await prisma.loginAttempt.create({
        data: {
          userId: user ? user.id : null,
          email: data.email,
          ipAddress: reqMetadata?.ipAddress || null,
          userAgent: reqMetadata?.userAgent || null,
          status: 'FAILED',
        }
      });
      
      if (user) {
        await prisma.auditLog.create({
          data: {
            action: 'LOGIN_FAILED',
            actorId: user.id,
            actorEmail: user.email,
            resourceType: 'AUTHENTICATION',
            ipAddress: reqMetadata?.ipAddress || null,
            userAgent: reqMetadata?.userAgent || null,
            details: {
              reason: error.message,
              deviceType: reqMetadata?.deviceType,
              browser: reqMetadata?.browserCode,
              os: reqMetadata?.osCode,
              location: reqMetadata?.location,
              tokenVersion: reqMetadata?.tokenVersion
            }
          }
        });
      }
      throw new Error(`Login failed: ${error.message}`);
    }

    // Log successful attempt
    await prisma.loginAttempt.create({
      data: {
        userId: user ? user.id : null,
        email: data.email,
        ipAddress: reqMetadata?.ipAddress || null,
        userAgent: reqMetadata?.userAgent || null,
        status: 'SUCCESS',
      }
    });

    if (user) {
      try {
        if (reqMetadata?.deviceCode) {
          const locationStr = reqMetadata.location ? (typeof reqMetadata.location === 'string' ? reqMetadata.location : JSON.stringify(reqMetadata.location)) : undefined;
          await prisma.device.upsert({
            where: {
              userId_identifier: {
                userId: user.id,
                identifier: reqMetadata.deviceCode
              }
            },
            create: {
              userId: user.id,
              identifier: reqMetadata.deviceCode,
              name: reqMetadata.deviceName || "Unknown Device",
              type: reqMetadata.deviceType || "desktop",
              os: reqMetadata.osCode,
              browser: reqMetadata.browserCode,
              location: locationStr,
              lastIp: reqMetadata.ipAddress || null,
            },
            update: {
              lastIp: reqMetadata.ipAddress || null,
              location: locationStr,
              lastActive: new Date()
            }
          });
        }

        await prisma.auditLog.create({
          data: {
            action: 'LOGIN_SUCCESS',
            actorId: user.id,
            actorEmail: user.email,
            resourceType: 'AUTHENTICATION',
            ipAddress: reqMetadata?.ipAddress || null,
            userAgent: reqMetadata?.userAgent || null,
            details: {
              deviceType: reqMetadata?.deviceType,
              browser: reqMetadata?.browserCode,
              os: reqMetadata?.osCode,
              location: reqMetadata?.location,
              tokenVersion: reqMetadata?.tokenVersion
            }
          }
        });
      } catch (trackingError) {
        console.error('Failed to log device or audit success:', trackingError);
        // We don't throw here to avoid failing the user's login just because tracking failed
      }
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

  async signInWithOAuth(provider: 'google' | 'github' | 'apple', redirectTo: string) {
    console.log(`Initiating OAuth login with ${provider}`);
    const { data, error } = await this.client.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo,
      },
    });

    if (error) {
      throw new Error(`OAuth initiation failed: ${error.message}`);
    }

    return data; // returns { provider: 'google', url: 'https://...' }
  }

  async signInWithOtp(email: string, redirectTo?: string) {
    console.log(`Sending Magic Link/OTP to ${email}`);
    const { data, error } = await this.client.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo,
      },
    });

    if (error) {
      // In a real app, log failed attempts for rate limiting/auditing
      throw new Error(`Failed to send OTP: ${error.message}`);
    }

    return data;
  }
}
