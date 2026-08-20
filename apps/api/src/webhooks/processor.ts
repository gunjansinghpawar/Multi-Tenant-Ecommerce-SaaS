export type WebhookStatus = 'PENDING' | 'PROCESSED' | 'FAILED' | 'DLQ';

export interface WebhookEventRecord {
  id: string; // The idempotency key / event ID from the provider
  provider: string;
  payload: any;
  status: WebhookStatus;
  attempts: number;
  nextRetryAt?: number;
  error?: string;
  createdAt: number;
  updatedAt: number;
}

// In-memory fallback for the Event Log and Queue
// MUST be replaced by Postgres/Prisma and a real message broker in production
const eventStore = new Map<string, WebhookEventRecord>();

const MAX_RETRIES = 3;
const RETRY_BACKOFF_MS = [0, 5000, 30000, 60000]; // initial, 5s, 30s, 1m

export class WebhookProcessor {
  /**
   * Logs the event and adds it to the queue for asynchronous processing.
   * Called synchronously by the webhook route handler.
   */
  static async enqueueEvent(id: string, provider: string, payload: any): Promise<void> {
    if (eventStore.has(id)) {
      // Idempotency: We already have this event logged. Do nothing.
      return;
    }

    const record: WebhookEventRecord = {
      id,
      provider,
      payload,
      status: 'PENDING',
      attempts: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    eventStore.set(id, record);
    
    // Fire-and-forget the processing background task
    // Note: In production, this would be `queue.add(job)`
    setImmediate(() => {
      this.processEvent(id).catch(console.error);
    });
  }

  /**
   * The core background worker that attempts to process the event.
   */
  private static async processEvent(id: string): Promise<void> {
    const record = eventStore.get(id);
    if (!record || record.status !== 'PENDING') return;

    record.attempts += 1;
    record.updatedAt = Date.now();

    try {
      // Route the event to the correct internal business logic based on provider/payload
      await this.executeBusinessLogic(record);
      
      // Success
      record.status = 'PROCESSED';
      eventStore.set(id, record);
      console.log(`[Webhook] Event ${id} processed successfully.`);
    } catch (error: any) {
      console.error(`[Webhook] Event ${id} failed (Attempt ${record.attempts}):`, error.message);
      
      if (record.attempts >= MAX_RETRIES) {
        // Dead-Letter Queue
        record.status = 'DLQ';
        record.error = error.message;
        console.error(`[Webhook] Event ${id} moved to DLQ.`);
      } else {
        // Schedule Retry
        const backoff = RETRY_BACKOFF_MS[record.attempts];
        record.nextRetryAt = Date.now() + backoff;
        record.error = error.message;
        
        // Use setTimeout to simulate background retry scheduling
        setTimeout(() => {
          this.processEvent(id).catch(console.error);
        }, backoff);
      }
      
      eventStore.set(id, record);
    }
  }

  /**
   * Dummy routing logic where the actual business domain logic runs
   */
  private static async executeBusinessLogic(record: WebhookEventRecord): Promise<void> {
    // e.g. if provider === 'stripe' && payload.type === 'payment_intent.succeeded' -> update db
    
    // Simulate some work
    await new Promise(resolve => setTimeout(resolve, 100));

    // For testing DLQ, if the payload has a specific structure, we force an error
    if (record.payload?.force_fail === true) {
      throw new Error('Simulated business logic failure');
    }
  }

  // --- Utility methods for inspection ---
  static getEventLog(id: string) {
    return eventStore.get(id);
  }
}
