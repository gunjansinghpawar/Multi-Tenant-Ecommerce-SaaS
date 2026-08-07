import { z } from 'zod';

export const envSchema = z.object({
  // Node Environment
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  
  // Database Configuration
  DATABASE_URL: z.string().url('DATABASE_URL must be a valid PostgreSQL connection URL'),
  DIRECT_URL: z.string().url('DIRECT_URL must be a valid direct PostgreSQL connection URL').optional(),
  
  // App Base URLs
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_SUPER_ADMIN_URL: z.string().url().default('http://localhost:3001'),
  NEXT_PUBLIC_ADMIN_URL: z.string().url().default('http://localhost:3002'),
  NEXT_PUBLIC_STOREFRONT_URL: z.string().url().default('http://localhost:3000'),
  
  // Better Auth Configuration
  BETTER_AUTH_SECRET: z.string().min(32, 'BETTER_AUTH_SECRET must be at least 32 characters long').default('development_secret_change_in_production_min_32_chars'),
  BETTER_AUTH_URL: z.string().url().default('http://localhost:3000'),

  // Supabase Configuration
  SUPABASE_URL: z.string().url().optional(),
  SUPABASE_ANON_KEY: z.string().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  
  // Logging & Telemetry
  LOG_LEVEL: z.enum(['info', 'warn', 'error', 'debug']).default('info'),
  SENTRY_DSN: z.string().url().optional(),
  
  // Email / Resend Abstraction
  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().email().default('noreply@commercex.local'),
});

export type Env = z.infer<typeof envSchema>;

let _env: Env | null = null;

export function getEnv(): Env {
  if (_env) return _env;
  
  const parseResult = envSchema.safeParse(process.env);
  
  if (!parseResult.success) {
    console.error('❌ Invalid environment variables configuration:');
    console.error(JSON.stringify(parseResult.error.format(), null, 2));
    throw new Error('Invalid environment variables');
  }
  
  _env = parseResult.data;
  return _env;
}

export function isProduction(): boolean {
  return (process.env.NODE_ENV || 'development') === 'production';
}

export function isDevelopment(): boolean {
  return (process.env.NODE_ENV || 'development') === 'development';
}

export function isTest(): boolean {
  return process.env.NODE_ENV === 'test';
}
