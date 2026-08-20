import { OpenAPIHono, createRoute } from '@hono/zod-openapi';
import { createWebhookMiddleware } from '../../middlewares/webhook';
import { StripeMockProvider } from '../../webhooks/providers/stripe-provider';

export const webhooksRouter = new OpenAPIHono();

// Instantiate the provider (in production, the secret comes from env vars)
const stripeProvider = new StripeMockProvider();
const STRIPE_WEBHOOK_SECRET = 'whsec_dummy123';

const stripeWebhookRoute = createRoute({
  method: 'post',
  path: '/stripe',
  summary: 'Stripe Webhook Receiver',
  description: 'Endpoint to receive async events from Stripe. Highly secured via signature verification, replay protection, and exact-once idempotency.',
  middleware: [createWebhookMiddleware(stripeProvider, STRIPE_WEBHOOK_SECRET)] as const,
  responses: {
    200: {
      description: 'Webhook received and queued successfully',
    },
    400: {
      description: 'Webhook verification failed',
    }
  }
});

// We apply the middleware exactly on this endpoint.
// It will intercept the raw request, verify it, enqueue it, and automatically return 200 OK.
webhooksRouter.openapi(
  stripeWebhookRoute,
  (c) => {
    // This inner handler will actually never be executed because the middleware intercepts 
    // and early-returns 200 OK to the provider after enqueuing.
    // Hono zod-openapi requires a handler function nonetheless.
    return c.json({ received: true } as any, 200);
  }
);
