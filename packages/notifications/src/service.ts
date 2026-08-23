import { PrismaClient, NotificationLog } from '@prisma/client';
import Handlebars from 'handlebars';
import { 
  NotificationChannel, 
  SendEmailPayload, 
  SendSmsPayload, 
  SendWhatsappPayload, 
  EmailProvider, 
  SmsProvider, 
  WhatsappProvider,
  TriggerEventParams
} from './types';
import { decryptCredentials } from '@commercex/utils';
import { SmtpProvider } from './providers/SmtpProvider';
import { ResendProvider } from './providers/ResendProvider';
import { TwilioSmsProvider } from './providers/TwilioSmsProvider';
import { Msg91SmsProvider } from './providers/Msg91SmsProvider';
import { MetaWhatsappProvider } from './providers/MetaWhatsappProvider';

export class NotificationService {
  constructor(private prisma: PrismaClient) {}

  /**
   * High-level event dispatcher that compiles templates and routes messages.
   * e.g., triggerEvent({ eventName: 'USER_REGISTER', variables: { name: 'John' }, recipients: { email: 'x@y.com' } })
   */
  async triggerEvent(params: TriggerEventParams): Promise<{ success: boolean; results: any[] }> {
    const settings = await this.prisma.notificationSettings.findUnique({
      where: { tenantId: params.tenantId }
    });

    if (!settings) {
      return { success: false, results: [{ error: 'Notification settings not configured for tenant' }] };
    }

    const results: any[] = [];

    // 1. Process EMAIL
    if (settings.emailEnabled && params.recipients.email) {
      const emailTemplate = await this.prisma.emailTemplate.findFirst({
        where: { tenantId: params.tenantId, name: params.eventName }
      }) as any; // Cast to any to bypass TS error until Prisma is generated

      if (emailTemplate) {
        try {
          const compiledHtml = Handlebars.compile(emailTemplate.html)(params.variables);
          const compiledSubject = Handlebars.compile(emailTemplate.subject || params.eventName)(params.variables);

          const result = await this.send({
            tenantId: params.tenantId,
            channel: 'EMAIL',
            eventType: params.eventName,
            payload: {
              to: params.recipients.email,
              subject: compiledSubject,
              html: compiledHtml,
            },
            userId: params.userId,
            customerId: params.customerId,
            category: params.category,
          });
          results.push({ channel: 'EMAIL', ...result });
        } catch (e: any) {
          results.push({ channel: 'EMAIL', success: false, error: e.message });
        }
      } else {
        results.push({ channel: 'EMAIL', success: false, error: 'Template not found' });
      }
    }

    // 2. Process SMS
    if (settings.smsEnabled && params.recipients.phone) {
      const smsTemplate = await this.prisma.smsTemplate.findFirst({
        // @ts-ignore - name field was just added to schema, bypass until prisma generate is run
        where: { tenantId: params.tenantId, name: params.eventName }
      }) as any;

      if (smsTemplate) {
        try {
          const compiledContent = Handlebars.compile(smsTemplate.content)(params.variables);

          const result = await this.send({
            tenantId: params.tenantId,
            channel: 'SMS',
            eventType: params.eventName,
            payload: {
              to: params.recipients.phone,
              message: compiledContent,
            },
            userId: params.userId,
            customerId: params.customerId,
            category: params.category,
          });
          results.push({ channel: 'SMS', ...result });
        } catch (e: any) {
          results.push({ channel: 'SMS', success: false, error: e.message });
        }
      } else {
        results.push({ channel: 'SMS', success: false, error: 'Template not found' });
      }
    }

    // 3. Process WHATSAPP
    if (settings.whatsappEnabled && params.recipients.phone) {
      const waTemplate = await this.prisma.whatsappTemplate.findFirst({
        where: { tenantId: params.tenantId, name: params.eventName }
      });

      if (waTemplate) {
        try {
          // Note: Meta WhatsApp expects variables to be an array or object of strings.
          // Handlebars isn't needed for Meta API template matching unless we're just injecting into a generic text body.
          // Since it's a template payload, we just pass variables to the provider.
          const result = await this.send({
            tenantId: params.tenantId,
            channel: 'WHATSAPP',
            eventType: params.eventName,
            payload: {
              to: params.recipients.phone,
              templateName: waTemplate.name, // Meta template name
              language: 'en_US', // Should ideally come from the DB template record
              variables: params.variables,
            },
            userId: params.userId,
            customerId: params.customerId,
            category: params.category,
          });
          results.push({ channel: 'WHATSAPP', ...result });
        } catch (e: any) {
          results.push({ channel: 'WHATSAPP', success: false, error: e.message });
        }
      } else {
        results.push({ channel: 'WHATSAPP', success: false, error: 'Template not found' });
      }
    }

    return { 
      success: results.some(r => r.success), 
      results 
    };
  }

  /**
   * Main entry point for sending a notification.
   * Handles tenant settings, preferences, primary/fallback routing, and logging.
   */
  async send(params: {
    tenantId: string;
    channel: NotificationChannel;
    eventType: string;
    payload: any; // SendEmailPayload | SendSmsPayload | SendWhatsappPayload
    userId?: string;
    customerId?: string;
    category?: string; 
  }): Promise<{ success: boolean; logId?: string; error?: string }> {
    
    // 1. Check Tenant Settings
    const settings = await this.prisma.notificationSettings.findUnique({
      where: { tenantId: params.tenantId }
    });

    if (!settings) {
      return { success: false, error: 'Notification settings not configured for tenant' };
    }

    if (params.channel === 'EMAIL' && !settings.emailEnabled) return { success: false, error: 'Email disabled' };
    if (params.channel === 'SMS' && !settings.smsEnabled) return { success: false, error: 'SMS disabled' };
    if (params.channel === 'WHATSAPP' && !settings.whatsappEnabled) return { success: false, error: 'WhatsApp disabled' };

    // 2. Check User Preferences (if applicable)
    if (params.category && (params.userId || params.customerId)) {
      const pref = await this.prisma.notificationPreference.findFirst({
        where: {
          tenantId: params.tenantId,
          channel: params.channel,
          category: params.category,
          ...(params.userId ? { userId: params.userId } : {}),
          ...(params.customerId ? { customerId: params.customerId } : {}),
        }
      });
      
      if (pref && !pref.isOptedIn) {
        return { success: false, error: 'User opted out of this notification category' };
      }
    }

    // 3. Determine Providers
    let primaryProviderId: string | null = null;
    let fallbackProviderId: string | null = null;

    if (params.channel === 'EMAIL') {
      primaryProviderId = settings.primaryEmailProviderId;
      fallbackProviderId = settings.fallbackEmailProviderId;
    } else if (params.channel === 'SMS') {
      primaryProviderId = settings.primarySmsProviderId;
      fallbackProviderId = settings.fallbackSmsProviderId;
    } else if (params.channel === 'WHATSAPP') {
      primaryProviderId = settings.primaryWaProviderId;
      fallbackProviderId = settings.fallbackWaProviderId;
    }

    if (!primaryProviderId) {
      console.warn(`[NotificationService] No primary provider configured for ${params.channel}, attempting platform fallback`);
      primaryProviderId = 'PLATFORM_FALLBACK';
    }

    // 4. Create Initial Log
    const log = await this.prisma.notificationLog.create({
      data: {
        tenantId: params.tenantId,
        channel: params.channel,
        providerCode: 'PENDING',
        eventType: params.eventType,
        recipient: params.payload.to,
        status: 'PROCESSING',
      }
    });

    // 5. Attempt Primary
    let result = await this.executeProvider(primaryProviderId, params.channel, params.payload, settings);
    
    // 6. Attempt Fallback if Primary Failed and error is permanent (or if we want to fallback on any failure)
    if (!result.success && fallbackProviderId) {
      console.warn(`[NotificationService] Primary failed, attempting fallback for log ${log.id}`);
      const fallbackResult = await this.executeProvider(fallbackProviderId, params.channel, params.payload, settings);
      
      // If fallback succeeds, we use its result
      if (fallbackResult.success) {
        result = fallbackResult;
      }
    }

    // 7. Update Log
    await this.prisma.notificationLog.update({
      where: { id: log.id },
      data: {
        status: result.success ? 'SENT' : 'FAILED',
        providerCode: result.providerCode || 'UNKNOWN',
        providerMessageId: (result as any).providerMessageId,
        errorCode: (result as any).errorCode,
        errorMessage: result.error,
        sentAt: result.success ? new Date() : null,
        failedAt: !result.success ? new Date() : null,
        metadata: (result as any).rawResponse ? ((result as any).rawResponse as any) : undefined,
        attempts: 1, // In a real queue context, this would increment
      }
    });

    // 8. Return
    // If it failed and isRetryable is true, we could throw an error here so the Queue Worker retries it.
    if (!result.success && result.isRetryable) {
      throw new Error(`RETRYABLE_ERROR: ${result.error}`);
    }

    return { success: result.success, logId: log.id, error: result.error };
  }

  private async executeProvider(providerId: string, channel: NotificationChannel, payload: any, settings: any) {
    try {
      let credentials: any = {};
      let providerCode = '';

      if (providerId === 'PLATFORM_FALLBACK') {
        if (channel === 'EMAIL') providerCode = 'SMTP';
        else if (channel === 'SMS') providerCode = 'TWILIO';
        else if (channel === 'WHATSAPP') providerCode = 'META';
      } else {
        const providerRecord = await this.prisma.notificationProvider.findUnique({
          where: { id: providerId }
        });

        if (!providerRecord || providerRecord.status !== 'ACTIVE') {
          return { success: false, error: 'Provider not found or inactive', providerCode: providerRecord?.code };
        }
        credentials = JSON.parse(decryptCredentials(providerRecord.credentials));
        providerCode = providerRecord.code;
      }

      let providerInstance: EmailProvider | SmsProvider | WhatsappProvider;

      // Instantiate Provider Adapter
      if (channel === 'EMAIL') {
        if (providerCode === 'RESEND') {
          providerInstance = new ResendProvider(providerCode, credentials, settings.defaultFromEmail);
        } else {
          providerInstance = new SmtpProvider(providerCode, credentials, settings.defaultFromEmail);
        }
        const res = await (providerInstance as EmailProvider).send(payload as SendEmailPayload);
        return { ...res, providerCode };
      } 
      
      else if (channel === 'SMS') {
        if (providerCode === 'TWILIO') {
          providerInstance = new TwilioSmsProvider(providerCode, credentials, credentials.fromNumber);
        } else {
          providerInstance = new Msg91SmsProvider(providerCode, credentials, credentials.senderId);
        }
        const res = await (providerInstance as SmsProvider).send(payload as SendSmsPayload);
        return { ...res, providerCode };
      }

      else if (channel === 'WHATSAPP') {
        if (providerCode === 'META') {
          providerInstance = new MetaWhatsappProvider(providerCode, credentials);
        } else {
          // Fallback to Meta for now if Twilio WA is not fully implemented
          providerInstance = new MetaWhatsappProvider(providerCode, credentials);
        }
        const res = await (providerInstance as WhatsappProvider).sendTemplate(payload as SendWhatsappPayload);
        return { ...res, providerCode };
      }

      return { success: false, error: 'Unsupported channel/provider combination', providerCode };
    } catch (err: any) {
      return { success: false, error: err.message, isRetryable: false, providerCode: 'UNKNOWN' };
    }
  }
}
