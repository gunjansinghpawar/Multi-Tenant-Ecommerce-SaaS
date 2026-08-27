export * from './types';
export * from './service';
export * from './providers/ResendProvider';
export * from './providers/SmtpProvider';
export * from './providers/Msg91SmsProvider';
export * from './providers/TwilioSmsProvider';
export * from './providers/MetaWhatsappProvider';
export * from './EventBus';

// Legacy template helpers (keep for backward compatibility)
export function renderInvitationEmailTemplate(inviteUrl: string, tenantName: string, roleName: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
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
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
      <h2 style="color: #111827;">Reset Your Password</h2>
      <p style="color: #4b5563;">Click the button below to reset your CommerceX account password.</p>
      <p style="margin: 24px 0;">
        <a href="${resetUrl}" style="background-color: #000; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 6px; display: inline-block;">Reset Password</a>
      </p>
      <p style="color: #6b7280; font-size: 12px;">This link will expire in 1 hour.</p>
    </div>
  `;
}
