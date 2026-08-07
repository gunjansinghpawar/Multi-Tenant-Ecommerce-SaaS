export interface SendEmailPayload {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export interface EmailService {
  sendEmail(payload: SendEmailPayload): Promise<{ success: boolean; id?: string }>;
}

export class ResendEmailService implements EmailService {
  private apiKey: string;
  private fromEmail: string;

  constructor(apiKey?: string, fromEmail = 'noreply@commercex.local') {
    this.apiKey = apiKey || process.env.RESEND_API_KEY || '';
    this.fromEmail = fromEmail;
  }

  async sendEmail(payload: SendEmailPayload): Promise<{ success: boolean; id?: string }> {
    if (!this.apiKey) {
      console.log(`[Email Mock Output] To: ${payload.to} | Subject: ${payload.subject}`);
      return { success: true, id: `mock-${Date.now()}` };
    }

    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: this.fromEmail,
          to: payload.to,
          subject: payload.subject,
          html: payload.html,
          text: payload.text,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to send email via Resend:', errorText);
        return { success: false };
      }

      const data = (await response.json()) as { id: string };
      return { success: true, id: data.id };
    } catch (err) {
      console.error('Error sending email:', err);
      return { success: false };
    }
  }
}

// --- Email Template Helpers ---
export function renderInvitationEmailTemplate(inviteUrl: string, tenantName: string, roleName: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; rounded-radius: 8px;">
      <h2 style="color: #111827;">You have been invited to join ${tenantName}</h2>
      <p style="color: #4b5563;">You have been assigned the role of <strong>${roleName}</strong>.</p>
      <p style="margin: 24px 0;">
        <a href="${inviteUrl}" style="background-color: #000; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 6px; display: inline-block;">Accept Invitation</a>
      </p>
      <p style="color: #6b7280; font-size: 12px;">If you did not request this invite, please ignore this message.</p>
    </div>
  `;
}

export function renderPasswordResetEmailTemplate(resetUrl: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; rounded-radius: 8px;">
      <h2 style="color: #111827;">Reset Your Password</h2>
      <p style="color: #4b5563;">Click the button below to reset your CommerceX account password.</p>
      <p style="margin: 24px 0;">
        <a href="${resetUrl}" style="background-color: #000; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 6px; display: inline-block;">Reset Password</a>
      </p>
      <p style="color: #6b7280; font-size: 12px;">This link will expire in 1 hour.</p>
    </div>
  `;
}
