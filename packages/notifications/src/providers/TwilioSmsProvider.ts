import { SmsProvider, SendSmsPayload, NotificationResult, SendSmsPayloadSchema } from '../types';

export class TwilioSmsProvider implements SmsProvider {
  public code: string;
  private accountSid: string;
  private authToken: string;
  private defaultFromNumber: string;

  constructor(code: string, credentials?: any, defaultFromNumber?: string) {
    this.code = code;
    this.accountSid = credentials?.accountSid || process.env.TWILIO_ACCOUNT_SID || '';
    this.authToken = credentials?.authToken || process.env.TWILIO_AUTH_TOKEN || '';
    this.defaultFromNumber = defaultFromNumber || process.env.TWILIO_FROM_NUMBER || '';

    if (!this.accountSid || !this.authToken) {
      console.warn(`[TwilioSmsProvider] Missing required Twilio credentials for ${code}. Fallback to env also failed.`);
    }
  }

  async send(payload: SendSmsPayload): Promise<NotificationResult> {
    try {
      // 1. Validate Payload
      const validatedPayload = SendSmsPayloadSchema.parse(payload);

      const authHeader = Buffer.from(`${this.accountSid}:${this.authToken}`).toString('base64');
      const url = `https://api.twilio.com/2010-04-01/Accounts/${this.accountSid}/Messages.json`;
      
      const body = new URLSearchParams();
      body.append('To', validatedPayload.to);
      body.append('From', this.defaultFromNumber);
      body.append('Body', validatedPayload.message);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${authHeader}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const status = response.status;
        
        // 429 Too Many Requests -> retryable
        // 5xx Server Errors -> retryable
        const isRetryable = status === 429 || status >= 500;

        return {
          success: false,
          error: errorData.message || 'Twilio API Error',
          errorCode: String(errorData.code || status),
          isRetryable,
          rawResponse: errorData,
        };
      }

      const data = await response.json();
      return {
        success: true,
        providerMessageId: data.sid, // Twilio SID
        isRetryable: false,
        rawResponse: data,
      };
    } catch (error: any) {
      console.error(`[TwilioSmsProvider] Network or validation error:`, error);
      
      // Zod Validation Error
      if (error.name === 'ZodError') {
        return {
          success: false,
          error: `Validation Error: ${error.errors.map((e: any) => e.message).join(', ')}`,
          errorCode: 'VALIDATION_ERROR',
          isRetryable: false,
        };
      }

      return {
        success: false,
        error: error.message,
        errorCode: 'NETWORK_ERROR',
        isRetryable: true,
      };
    }
  }
}
