/**
 * The standard interface every Webhook Provider must implement.
 */
export interface IWebhookProvider {
  /**
   * The name of the provider (e.g., 'stripe', 'shopify').
   */
  name: string;

  /**
   * Verifies the cryptographic signature of the incoming webhook.
   * Throws an error if the signature is invalid.
   * 
   * @param rawBody - The raw, unparsed string body of the request
   * @param signatureHeader - The signature header value provided by the sender
   * @param secret - The webhook endpoint secret configured in the environment
   */
  verifySignature(rawBody: string, signatureHeader: string, secret: string): void;

  /**
   * Extracts the timestamp from the webhook payload or headers.
   * Used for replay protection.
   * 
   * @param payload - The parsed JSON body of the webhook
   * @param headers - The request headers
   * @returns A unix timestamp (milliseconds) or Date object
   */
  extractTimestamp(payload: any, headers: Record<string, string>): number;

  /**
   * Extracts a unique identifier from the webhook payload or headers.
   * Used for exact-once idempotency.
   * 
   * @param payload - The parsed JSON body of the webhook
   * @param headers - The request headers
   * @returns A unique string ID for the event
   */
  extractIdempotencyKey(payload: any, headers: Record<string, string>): string;
}
