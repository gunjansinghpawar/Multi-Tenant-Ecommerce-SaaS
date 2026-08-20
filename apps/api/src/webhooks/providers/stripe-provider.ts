import { IWebhookProvider } from './provider.interface';

/**
 * A mock adapter simulating Stripe's webhook verification strategy.
 * Stripe sends a signature like: `t=1492774577,v1=5257a869e7ecebeda32affa62cdca3fa51cad7e77a0e56ff536d0ce8e108d8bd`
 */
export class StripeMockProvider implements IWebhookProvider {
  name = 'stripe';

  verifySignature(rawBody: string, signatureHeader: string, secret: string): void {
    if (!signatureHeader) {
      throw new Error('Missing stripe signature header');
    }
    
    // In a real implementation, we would use the official Stripe SDK:
    // stripe.webhooks.constructEvent(rawBody, signatureHeader, secret);
    
    // For this mock, we just ensure the header is present and simulate failure on a specific dummy string
    if (signatureHeader === 'invalid_signature') {
      throw new Error('Invalid signature');
    }
    
    // Success simulation
  }

  extractTimestamp(payload: any, headers: Record<string, string>): number {
    // Stripe payload includes `created` as a unix timestamp in seconds
    if (payload && typeof payload.created === 'number') {
      return payload.created * 1000;
    }
    
    // Fallback: extract from signature header (e.g. `t=123456...`)
    const sigHeader = headers['stripe-signature'];
    if (sigHeader) {
      const parts = sigHeader.split(',');
      const tPart = parts.find(p => p.trim().startsWith('t='));
      if (tPart) {
        return parseInt(tPart.split('=')[1], 10) * 1000;
      }
    }

    throw new Error('Could not extract timestamp from Stripe webhook');
  }

  extractIdempotencyKey(payload: any, headers: Record<string, string>): string {
    // Stripe payloads have a unique `id` field for the event (e.g. evt_12345)
    if (payload && payload.id) {
      return payload.id;
    }
    
    throw new Error('Could not extract idempotency key (event id) from Stripe webhook');
  }
}
