import { createMiddleware } from 'hono/factory';
import { errorResponse } from '../utils/response';
import { HttpStatus } from '../utils/http-status';
import { IWebhookProvider } from '../webhooks/providers/provider.interface';
import { WebhookProcessor } from '../webhooks/processor';

const FIVE_MINUTES_MS = 5 * 60 * 1000;

/**
 * Creates a webhook security middleware bound to a specific provider adapter.
 * 
 * Guarantees:
 * 1. Cryptographic signature verification.
 * 2. Replay protection via strict timestamp validation.
 * 3. Enqueuing for exactly-once asynchronous processing.
 */
export const createWebhookMiddleware = (provider: IWebhookProvider, secret: string) => {
  return createMiddleware(async (c, next): Promise<Response | void> => {
    try {
      // 1. Raw Body extraction for strict cryptographic signature matching
      const rawBody = await c.req.text();
      
      // Hono's c.req.header() makes keys lowercase
      const headers: Record<string, string> = {};
      Object.keys(c.req.header()).forEach(k => {
        headers[k.toLowerCase()] = c.req.header(k) || '';
      });
      
      const signatureHeaderName = `${provider.name}-signature`;
      const signatureHeader = headers[signatureHeaderName] || '';

      // 2. Signature Verification (Throws on failure)
      provider.verifySignature(rawBody, signatureHeader, secret);

      // 3. Payload parsing
      let payload: any;
      try {
        payload = JSON.parse(rawBody);
      } catch (e) {
        return errorResponse(c, HttpStatus.BAD_REQUEST, 'MALFORMED_JSON', 'Could not parse JSON payload.');
      }

      // 4. Timestamp & Replay Protection
      const timestampMs = provider.extractTimestamp(payload, headers);
      const now = Date.now();
      
      if (Math.abs(now - timestampMs) > FIVE_MINUTES_MS) {
        return errorResponse(
          c, 
          HttpStatus.BAD_REQUEST, 
          'REPLAY_ATTACK', 
          'Timestamp is outside of the acceptable tolerance window.'
        );
      }

      // 5. Idempotency Key Extraction
      const idempotencyKey = provider.extractIdempotencyKey(payload, headers);

      // 6. Asynchronous Queueing (Fire-and-forget logic so we can instantly return 200 OK)
      await WebhookProcessor.enqueueEvent(idempotencyKey, provider.name, payload);
      
      // We do NOT call `await next()` here because the webhook is now queued and 
      // the handler itself shouldn't process it synchronously.
      // We directly return 200 OK to the provider to satisfy its retry conditions.
      return c.json({ received: true }, HttpStatus.OK);
      
    } catch (error: any) {
      console.error(`[Webhook Middleware - ${provider.name}] Security failure:`, error.message);
      return errorResponse(
        c, 
        HttpStatus.BAD_REQUEST, 
        'WEBHOOK_VERIFICATION_FAILED', 
        error.message || 'Webhook failed security checks.'
      );
    }
  });
};
