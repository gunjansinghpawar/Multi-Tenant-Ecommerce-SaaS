import { EmailProvider, SendEmailPayload, NotificationResult } from '../types';

export class ResendProvider implements EmailProvider {
  public code: string;
  private apiKey: string;
  private defaultFromEmail: string;

  constructor(code: string, credentials: any, defaultFromEmail: string) {
    this.code = code;
    this.apiKey = credentials.apiKey;
    this.defaultFromEmail = defaultFromEmail;
  }

  async send(payload: SendEmailPayload): Promise<NotificationResult> {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: payload.fromEmail || this.defaultFromEmail,
          to: payload.to,
          subject: payload.subject,
          html: payload.html,
          text: payload.text,
          reply_to: payload.replyTo,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const status = response.status;
        
        // 429 Too Many Requests -> retryable
        // 5xx Server Errors -> retryable
        const isRetryable = status === 429 || status >= 500;

        return {
          success: false,
          error: errorData.message || 'Resend API Error',
          errorCode: String(status),
          isRetryable,
          rawResponse: errorData,
        };
      }

      const data = await response.json();
      return {
        success: true,
        providerMessageId: data.id,
        isRetryable: false,
        rawResponse: data,
      };
    } catch (error: any) {
      console.error(`[ResendProvider] Network error:`, error);
      return {
        success: false,
        error: error.message,
        errorCode: 'NETWORK_ERROR',
        isRetryable: true, // Network errors are usually retryable
      };
    }
  }
}
