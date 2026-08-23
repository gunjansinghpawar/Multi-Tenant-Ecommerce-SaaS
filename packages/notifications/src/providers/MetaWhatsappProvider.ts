import { WhatsappProvider, SendWhatsappPayload, NotificationResult, SendWhatsappPayloadSchema } from '../types';

export class MetaWhatsappProvider implements WhatsappProvider {
  public code: string;
  private accessToken: string;
  private phoneNumberId: string;

  constructor(code: string, credentials?: any) {
    this.code = code;
    this.accessToken = credentials?.accessToken || process.env.WHATSAPP_ACCESS_TOKEN || '';
    this.phoneNumberId = credentials?.phoneNumberId || process.env.WHATSAPP_PHONE_NUMBER_ID || '';

    if (!this.accessToken || !this.phoneNumberId) {
      console.warn(`[MetaWhatsappProvider] Missing required Meta Whatsapp credentials for ${code}. Fallback to env also failed.`);
    }
  }

  async sendTemplate(payload: SendWhatsappPayload): Promise<NotificationResult> {
    try {
      // 1. Validate Payload
      const validatedPayload = SendWhatsappPayloadSchema.parse(payload);

      const url = `https://graph.facebook.com/v17.0/${this.phoneNumberId}/messages`;
      
      const components = validatedPayload.variables ? [
        {
          type: 'body',
          parameters: Object.keys(validatedPayload.variables).map(key => ({
            type: 'text',
            text: String(validatedPayload.variables![key])
          }))
        }
      ] : [];

      const body = {
        messaging_product: 'whatsapp',
        to: validatedPayload.to.replace('+', ''), 
        type: 'template',
        template: {
          name: validatedPayload.templateName,
          language: {
            code: validatedPayload.language || 'en_US'
          },
          components
        }
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const status = response.status;
        
        const isRetryable = status >= 500 || status === 429;

        return {
          success: false,
          error: errorData.error?.message || 'Meta API Error',
          errorCode: String(errorData.error?.code || status),
          isRetryable,
          rawResponse: errorData,
        };
      }

      const data = await response.json();
      return {
        success: true,
        providerMessageId: data.messages?.[0]?.id, 
        isRetryable: false,
        rawResponse: data,
      };
    } catch (error: any) {
      console.error(`[MetaWhatsappProvider] Network or validation error:`, error);
      
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
