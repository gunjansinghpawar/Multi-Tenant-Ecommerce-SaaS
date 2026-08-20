import { createMiddleware } from 'hono/factory';

// Simple in-memory store for rate limiting (fallback for local dev)
// IN PRODUCTION: This MUST be replaced with a Redis-backed store for distributed limiting
const memoryStore = new Map<string, { count: number, resetAt: number }>();

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  message?: string;
  keyGenerator?: (c: any) => string;
}

/**
 * Creates a rate limiting middleware.
 * Implements sliding window or fixed window counting to prevent brute force and abuse.
 */
export const rateLimit = (config: RateLimitConfig) => {
  return createMiddleware(async (c, next) => {
    // Generate a key based on IP (or user ID if authenticated)
    const ip = c.req.header('x-forwarded-for') || '127.0.0.1';
    const key = config.keyGenerator ? config.keyGenerator(c) : `rate-limit:${ip}`;
    
    const now = Date.now();
    const record = memoryStore.get(key);

    if (!record || now > record.resetAt) {
      memoryStore.set(key, { count: 1, resetAt: now + config.windowMs });
    } else {
      record.count += 1;
      if (record.count > config.maxRequests) {
        c.header('Retry-After', Math.ceil((record.resetAt - now) / 1000).toString());
        return c.json({
          success: false,
          error: {
            code: 'RATE_LIMIT_EXCEEDED',
            message: config.message || 'Too many requests, please try again later.'
          }
        }, 429);
      }
    }

    // Set RateLimit headers
    const currentRecord = memoryStore.get(key)!;
    c.header('X-RateLimit-Limit', config.maxRequests.toString());
    c.header('X-RateLimit-Remaining', Math.max(0, config.maxRequests - currentRecord.count).toString());
    c.header('X-RateLimit-Reset', Math.ceil(currentRecord.resetAt / 1000).toString());

    await next();
  });
};

// --- Pre-configured limiters for critical paths ---

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5, // Strict limit for login/register/OTP to prevent brute force
  message: 'Too many authentication attempts. Please try again later.'
});

export const apiRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 60, // 1 req/sec standard limit
});

export const webhookRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 200, // Higher limit for webhooks
});
