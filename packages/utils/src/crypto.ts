import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const SALT_LENGTH = 64;
const TAG_LENGTH = 16;
const KEY_LENGTH = 32; // 256 bits

/**
 * Encrypts a string (or JSON stringified object) using AES-256-GCM.
 * It expects ENCRYPTION_KEY environment variable. 
 * Format returned: `iv:salt:authTag:encryptedData` (all base64)
 */
export function encryptCredentials(text: string, secretKey?: string): string {
  const keySource = secretKey || process.env.ENCRYPTION_KEY;
  if (!keySource) {
    throw new Error('ENCRYPTION_KEY is required for securing credentials');
  }

  const iv = crypto.randomBytes(IV_LENGTH);
  const salt = crypto.randomBytes(SALT_LENGTH);

  // Derive a strong key using PBKDF2
  const key = crypto.pbkdf2Sync(keySource, salt, 100000, KEY_LENGTH, 'sha512');

  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  
  let encrypted = cipher.update(text, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  
  const authTag = cipher.getAuthTag();

  return `${iv.toString('base64')}:${salt.toString('base64')}:${authTag.toString('base64')}:${encrypted}`;
}

/**
 * Decrypts a string that was encrypted with `encryptCredentials`.
 */
export function decryptCredentials(encryptedText: string, secretKey?: string): string {
  const keySource = secretKey || process.env.ENCRYPTION_KEY;
  if (!keySource) {
    throw new Error('ENCRYPTION_KEY is required for decrypting credentials');
  }

  const parts = encryptedText.split(':');
  if (parts.length !== 4) {
    throw new Error('Invalid encrypted text format');
  }

  const [ivBase64, saltBase64, authTagBase64, encryptedDataBase64] = parts;

  const iv = Buffer.from(ivBase64, 'base64');
  const salt = Buffer.from(saltBase64, 'base64');
  const authTag = Buffer.from(authTagBase64, 'base64');

  const key = crypto.pbkdf2Sync(keySource, salt, 100000, KEY_LENGTH, 'sha512');

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(encryptedDataBase64, 'base64', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}
