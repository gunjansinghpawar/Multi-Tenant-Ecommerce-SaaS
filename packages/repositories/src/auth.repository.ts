// import { prisma } from '@commercex/database';

export class AuthRepository {
  // --- Sessions ---
  async createSession(data: any) { return null; }
  async getSessionByToken(token: string) { return null; }
  async revokeSession(id: string) { return null; }

  // --- Tokens ---
  async createVerificationToken(userId: string, token: string, expiresAt: Date) { return null; }
  async getVerificationToken(token: string) { return null; }
  
  async createPasswordToken(userId: string, token: string, expiresAt: Date) { return null; }
  async getPasswordToken(token: string) { return null; }

  // --- Devices ---
  async trackDevice(data: any) { return null; }
  async getDevicesForUser(userId: string) { return []; }
}
