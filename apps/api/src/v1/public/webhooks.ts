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

// --- Notification Webhooks ---

// We handle raw webhooks from Resend for delivery tracking (Bounces, Delivered, etc)
// Resend uses Svix for signature verification, but for this simplified implementation we just accept the raw post
webhooksRouter.post('/notifications/resend', async (c) => {
  try {
    const rawBody = await c.req.json();
    
    // Save to DB webhook log
    const { prisma } = await import('@commercex/database');
    await prisma.notificationWebhook.create({
      data: {
        providerCode: 'RESEND',
        providerMessageId: rawBody.data?.email_id || 'UNKNOWN',
        status: rawBody.type || 'UNKNOWN',
        rawPayload: rawBody,
      }
    });

    // Update the notification log
    if (rawBody.data?.email_id) {
      let mappedStatus = 'PROCESSING';
      if (rawBody.type === 'email.delivered') mappedStatus = 'DELIVERED';
      if (rawBody.type === 'email.bounced') mappedStatus = 'FAILED';
      if (rawBody.type === 'email.complained') mappedStatus = 'FAILED';

      // Use updateMany so it doesn't crash if ID isn't found
      await prisma.notificationLog.updateMany({
        where: { providerMessageId: rawBody.data.email_id },
        data: {
          status: mappedStatus,
          ...(mappedStatus === 'DELIVERED' ? { deliveredAt: new Date() } : {}),
          ...(mappedStatus === 'FAILED' ? { failedAt: new Date(), errorMessage: rawBody.type } : {}),
        }
      });
    }

    return c.text('OK');
  } catch (error) {
    console.error('Resend webhook error:', error);
    return c.text('Internal Server Error', 500);
  }
});
