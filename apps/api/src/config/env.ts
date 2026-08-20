import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.string().default('3001'),
  
  // CORS & Security
  ALLOWED_ORIGINS: z.string().default('http://localhost:3000'), // Comma separated list of origins
  
  // Secrets (Must be provided, but defaults provided for local dev if missing to not break existing flows immediately, though ideally these should fail without default)
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters long for security.').default('super_secret_jwt_key_for_local_dev_only_replace_in_prod'),
  STRIPE_WEBHOOK_SECRET: z.string().min(1, 'STRIPE_WEBHOOK_SECRET is required.').default('whsec_dummy123'),
});

const parseEnv = () => {
  const parsed = envSchema.safeParse(process.env);
  
  if (!parsed.success) {
    console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
    process.exit(1);
  }
  
  return parsed.data;
};

export const env = parseEnv();
