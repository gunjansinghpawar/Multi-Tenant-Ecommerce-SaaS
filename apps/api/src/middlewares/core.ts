import { createMiddleware } from 'hono/factory';
import { errorResponse } from '../utils/response';
import { HttpStatus } from '../utils/http-status';

/**
 * Injects a unique requestId into every request.
 */
export const requestIdMiddleware = createMiddleware(async (c, next) => {
  const reqId = c.req.header('x-request-id') || 'req_' + crypto.randomUUID();
  c.set('requestId', reqId);
  await next();
});

/**
 * Resolves the tenant context.
 */
export const tenantMiddleware = createMiddleware(async (c, next) => {
  const tenantId = c.req.header('x-tenant-id');
  if (!tenantId) {
    return errorResponse(c, HttpStatus.UNAUTHORIZED, 'MISSING_TENANT', 'Tenant context is missing.');
  }
  c.set('tenantId', tenantId);
  await next();
});

/**
 * Verifies authentication status.
 */
export const authGuard = createMiddleware(async (c, next) => {
  const authHeader = c.req.header('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return errorResponse(c, HttpStatus.UNAUTHORIZED, 'UNAUTHORIZED', 'Missing or invalid authentication token.');
  }
  
  // Here we would verify JWT/Session
  // Stubbing for now
  c.set('userId', 'usr_placeholder');
  await next();
});
