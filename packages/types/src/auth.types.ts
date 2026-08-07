export interface User {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  isEmailVerified: boolean;
  mfaEnabled: boolean;
  mfaSecret?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  deviceId?: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}

export interface VerificationToken {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
}

export interface PasswordToken {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
}

export interface Device {
  id: string;
  userId: string;
  deviceId: string;
  name?: string;
  lastActive: Date;
  isTrusted: boolean;
}

export interface RegisterDTO {
  email: string;
  password?: string;
  name: string;
}

export interface LoginDTO {
  email: string;
  password?: string;
  rememberMe?: boolean;
}
