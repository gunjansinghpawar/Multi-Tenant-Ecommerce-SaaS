import { createMiddleware } from 'hono/factory';
import { errorResponse } from '../utils/response';
import { HttpStatus } from '../utils/http-status';

// Simple in-memory store for idempotency keys. 
// Note: This MUST be replaced with Redis or a database in production for distributed locking.
interface CachedResponse {
  status: number;
  headers: Record<string, string>;
  body: string;
}

const idempotencyStore = new Map<string, CachedResponse>();

/**
 * Idempotency Middleware
 * Intercepts POST/PUT/PATCH/DELETE requests and ensures that operations with the same
 * 'Idempotency-Key' header are not processed twice. Returns the cached response if found.
 */
export const idempotencyMiddleware = createMiddleware(async (c, next) => {
  const method = c.req.method.toUpperCase();
  
  // Idempotency usually only applies to mutating requests
  if (!['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
    return await next();
  }

  const idempotencyKey = c.req.header('idempotency-key');
  
  if (!idempotencyKey) {
    return errorResponse(
      c, 
      HttpStatus.BAD_REQUEST, 
      'MISSING_IDEMPOTENCY_KEY', 
      'An Idempotency-Key header is required for this operation.'
    );
  }

  // To prevent collisions across tenants/users, we should combine the key
  // with the tenantId or userId if available.
  const tenantId = c.get('tenantId') || 'unknown-tenant';
  const userId = c.get('userId') || 'unknown-user';
  
  const cacheKey = `${tenantId}:${userId}:${idempotencyKey}`;

  const cached = idempotencyStore.get(cacheKey);
  
  if (cached) {
    // Return the exact same cached response
    return new Response(cached.body, {
      status: cached.status,
      headers: {
        ...cached.headers,
        'X-Idempotent-Replayed': 'true' // Indicate that this is a replayed response
      }
    });
  }

  // No cache found, proceed to process the request
  await next();

  // After the handler runs, we cache the response before it goes out
  const res = c.res;
  
  // We only cache successful mutating responses (e.g., 200, 201, 202, 204)
  // We don't cache 4xx or 5xx so the user can safely retry a failed request.
  if (res.status >= 200 && res.status < 300) {
    const clonedRes = res.clone();
    const bodyText = await clonedRes.text();
    
    const headersRecord: Record<string, string> = {};
    clonedRes.headers.forEach((value, key) => {
      headersRecord[key] = value;
    });

    idempotencyStore.set(cacheKey, {
      status: clonedRes.status,
      headers: headersRecord,
      body: bodyText
    });
  }
});
