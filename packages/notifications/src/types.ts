import { z } from 'zod';

export type NotificationChannel = 'EMAIL' | 'SMS' | 'WHATSAPP';

export const SendEmailPayloadSchema = z.object({
  to: z.string().email(),
  subject: z.string().min(1),
  html: z.string().min(1),
  text: z.string().optional(),
  replyTo: z.string().email().optional(),
  fromName: z.string().optional(),
  fromEmail: z.string().email().optional(),
});
export type SendEmailPayload = z.infer<typeof SendEmailPayloadSchema>;

export const SendSmsPayloadSchema = z.object({
  to: z.string().regex(/^\+[1-9]\d{1,14}$/, 'Must be a valid E.164 phone number'),
  message: z.string().min(1),
  templateId: z.string().optional(),
  variables: z.record(z.any()).optional(),
});
export type SendSmsPayload = z.infer<typeof SendSmsPayloadSchema>;

export const SendWhatsappPayloadSchema = z.object({
  to: z.string().regex(/^\+[1-9]\d{1,14}$/, 'Must be a valid E.164 phone number'),
  templateName: z.string().min(1),
  language: z.string().default('en_US'),
  variables: z.record(z.any()).optional(),
});
export type SendWhatsappPayload = z.infer<typeof SendWhatsappPayloadSchema>;

export interface NotificationResult {
  success: boolean;
  providerMessageId?: string;
  error?: string;
  errorCode?: string;
  isRetryable: boolean; // True if it's a temporary error (e.g., rate limit, timeout)
  rawResponse?: any;
}

export interface BaseProviderConfig {
  id: string;
  code: string;
  credentials: Record<string, any>; // Decrypted in memory
}

export interface EmailProvider {
  code: string;
  send(payload: SendEmailPayload): Promise<NotificationResult>;
}

export interface SmsProvider {
  code: string;
  send(payload: SendSmsPayload): Promise<NotificationResult>;
}

export interface WhatsappProvider {
  code: string;
  sendTemplate(payload: SendWhatsappPayload): Promise<NotificationResult>;
}

export interface TriggerEventParams {
  tenantId: string;
  eventName: string;
  variables: Record<string, any>;
  recipients: {
    email?: string;
    phone?: string; // E.164 string format used for SMS & WhatsApp
  };
  userId?: string;
  customerId?: string;
  category?: string;
}
