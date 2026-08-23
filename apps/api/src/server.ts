import { serve } from '@hono/node-server';
import { OpenAPIHono } from '@hono/zod-openapi';
import { cors } from 'hono/cors';
import { csrf } from 'hono/csrf';
import { secureHeaders } from 'hono/secure-headers';
import { logger } from 'hono/logger';

import { env } from './config/env';
import { globalErrorHandler } from './utils/error-handler';
import { requestIdMiddleware } from './middlewares/core';
import { validationHook } from './utils/validation-hook';

// Import V1 routers
import { apiV1 } from './v1';

// Import Workers
import { startNotificationWorker } from './workers/notification.worker';

const app = new OpenAPIHono({
  defaultHook: validationHook
});

// Global Error Handler
app.onError(globalErrorHandler);

// Global Middlewares
app.use('*', logger());
app.use('*', requestIdMiddleware);

// Security Headers (HSTS, X-Content-Type-Options, Frame-Options, etc)
app.use('*', secureHeaders({
  // Note: CSP is slightly relaxed by default here for API, but can be strictly defined for Storefront later
  xFrameOptions: 'DENY',
  xXssProtection: '1; mode=block',
  crossOriginResourcePolicy: 'cross-origin' // Depending on integrations, this may need tweaking
}));

// Strict CORS Configuration based on environment origins
app.use('*', cors({
  origin: env.ALLOWED_ORIGINS.split(',').map(o => o.trim()),
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true, // Required for secure cookie strategies
}));

// CSRF Protection
// Ensures state-changing requests come from our own origin
app.use('*', csrf({
  origin: env.ALLOWED_ORIGINS.split(',').map(o => o.trim()),
}));

// Base health route
app.get('/', (c) => {
  return c.text('CommerceX API Server is running');
});

// Mount V1 API
app.route('/api/v1', apiV1);

// Generate OpenAPI spec
app.doc('/doc', {
  openapi: '3.1.0',
  info: {
    version: '1.0.0',
    title: 'CommerceX API',
    description: 'Multi-Tenant Ecommerce SaaS API'
  }
});

// Start server
const port = parseInt(process.env.PORT || '3001', 10);
console.log(`Starting Hono server on port ${port}...`);

// Start workers
startNotificationWorker();

serve({
  fetch: app.fetch,
  port
});
