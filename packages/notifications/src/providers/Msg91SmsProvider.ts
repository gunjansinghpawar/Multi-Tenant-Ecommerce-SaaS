import { SmsProvider, SendSmsPayload, NotificationResult } from '../types';

export class Msg91SmsProvider implements SmsProvider {
  public code: string;
  private authKey: string;
  private defaultSenderId: string;
  private defaultRoute: string;

  constructor(code: string, credentials: any, defaultSenderId: string) {
    this.code = code;
    this.authKey = credentials.authKey;
    this.defaultSenderId = defaultSenderId;
    this.defaultRoute = credentials.route || '4'; // 4 is transactional
  }

  async send(payload: SendSmsPayload): Promise<NotificationResult> {
    try {
      const url = `https://api.msg91.com/api/v5/flow/`;
      
      const body = {
        template_id: payload.templateId,
        sender: this.defaultSenderId,
        short_url: '0',
        recipients: [
          {
            mobiles: payload.to.replace('+', ''), // MSG91 typically expects country code without +
            ...payload.variables
          }
        ]
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'authkey': this.authKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const status = response.status;
        const isRetryable = status >= 500;

        return {
          success: false,
          error: errorData.message || 'MSG91 API Error',
          errorCode: String(status),
          isRetryable,
          rawResponse: errorData,
        };
      }

      const data = await response.json();
      
      if (data.type === 'error') {
        return {
          success: false,
          error: data.message || 'MSG91 Error',
          errorCode: data.code || 'MSG91_ERROR',
          isRetryable: false,
          rawResponse: data,
        };
      }

      return {
        success: true,
        providerMessageId: data.message, // MSG91 returns request id in message field on success
        isRetryable: false,
        rawResponse: data,
      };
    } catch (error: any) {
      console.error(`[Msg91SmsProvider] Network error:`, error);
      return {
        success: false,
        error: error.message,
        errorCode: 'NETWORK_ERROR',
        isRetryable: true,
      };
    }
  }
}
