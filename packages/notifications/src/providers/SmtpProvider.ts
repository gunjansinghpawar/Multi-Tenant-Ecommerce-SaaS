import nodemailer from 'nodemailer';
import { EmailProvider, SendEmailPayload, NotificationResult, SendEmailPayloadSchema } from '../types';

export class SmtpProvider implements EmailProvider {
  public code: string;
  private transporter: nodemailer.Transporter;
  private defaultFromEmail: string;

  constructor(code: string, credentials?: any, defaultFromEmail?: string) {
    this.code = code;
    
    const host = credentials?.host || process.env.SMTP_HOST;
    const port = credentials?.port || process.env.SMTP_PORT || 587;
    const secure = credentials?.secure !== undefined ? credentials.secure : process.env.SMTP_SECURE === 'true';
    const user = credentials?.user || process.env.SMTP_USER;
    const pass = credentials?.pass || process.env.SMTP_PASS;

    this.defaultFromEmail = defaultFromEmail || process.env.SMTP_FROM_EMAIL || 'noreply@localhost';
    
    if (!host || !user || !pass) {
      console.warn(`[SmtpProvider] Missing required SMTP credentials for ${code}. Fallback to env also failed.`);
    }

    this.transporter = nodemailer.createTransport({
      host,
      port: Number(port),
      secure,
      auth: {
        user,
        pass,
      },
    });
  }

  async send(payload: SendEmailPayload): Promise<NotificationResult> {
    try {
      // 1. Validate Payload
      const validatedPayload = SendEmailPayloadSchema.parse(payload);

      // 2. Execute
      const info = await this.transporter.sendMail({
        from: validatedPayload.fromEmail || this.defaultFromEmail,
        to: validatedPayload.to,
        subject: validatedPayload.subject,
        html: validatedPayload.html,
        text: validatedPayload.text,
        replyTo: validatedPayload.replyTo,
      });

      return {
        success: true,
        providerMessageId: info.messageId,
        isRetryable: false,
        rawResponse: info,
      };
    } catch (error: any) {
      console.error(`[SmtpProvider] Error sending email:`, error);
      
      // Zod Validation Error
      if (error.name === 'ZodError') {
        return {
          success: false,
          error: `Validation Error: ${error.errors.map((e: any) => e.message).join(', ')}`,
          errorCode: 'VALIDATION_ERROR',
          isRetryable: false,
        };
      }
      
      // Determine if error is retryable (e.g. connection timeout vs authentication failure)
      const isAuthError = error.responseCode === 535 || error.code === 'EAUTH';
      const isRetryable = !isAuthError; 

      return {
        success: false,
        error: error.message,
        errorCode: error.code || String(error.responseCode),
        isRetryable,
      };
    }
  }
}
