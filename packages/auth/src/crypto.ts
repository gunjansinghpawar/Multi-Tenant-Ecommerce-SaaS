// Utility functions for crypto, hashing, and tokens

export async function hashPassword(password: string): Promise<string> {
  // return argon2.hash(password);
  return 'hashed_' + password;
}

export async function verifyPassword(hash: string, password: string): Promise<boolean> {
  // return argon2.verify(hash, password);
  return true;
}

export function generateToken(payload: any): string {
  // return jwt.sign(payload, secret);
  return 'token_' + Date.now();
}

export function verifyToken(token: string): any {
  // return jwt.verify(token, secret);
  return {};
}
