/**
 * Seed Notification Templates
 * ===========================
 * Seeds Email, SMS, and WhatsApp templates for all platform notification events
 * under the special "PLATFORM" tenant (used by Super Admin).
 *
 * Usage:
 *   node scripts/seed-notifications.js
 *
 * Requirements:
 *   - DATABASE_URL set in environment (or .env file at workspace root)
 *   - Prisma client generated: npx prisma generate
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PrismaClient } = require("@prisma/client");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require("dotenv");

// Load env from monorepo root
dotenv.config({ path: path.resolve(__dirname, "../.env") });
dotenv.config({ path: path.resolve(__dirname, "../packages/database/.env") });

// Use a fresh client per batch to avoid P1017 "Server has closed the connection"
// errors caused by Supabase/PgBouncer idle-connection timeouts.
function makePrisma() {
  return new PrismaClient({
    datasources: { db: { url: process.env.DATABASE_URL } },
  });
}

async function withRetry(fn, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    const client = makePrisma();
    try {
      const result = await fn(client);
      await client.$disconnect();
      return result;
    } catch (err) {
      await client.$disconnect().catch(() => { });
      const isConnErr = err.code === "P1017" || err.code === "P1001" || err.code === "P1002";
      if (isConnErr && attempt < retries) {
        console.warn(`\n  ⚠ Connection dropped (attempt ${attempt}/${retries}), retrying in 2s…`);
        await new Promise((r) => setTimeout(r, 2000));
      } else {
        throw err;
      }
    }
  }
}

const PLATFORM_TENANT_ID = "PLATFORM";

// ---------------------------------------------------------------------------
// Template Definitions
// ---------------------------------------------------------------------------

/**
 * @typedef {{ name: string; email?: { subject: string; html: string }; sms?: string; whatsapp?: string }} EventTemplate
 */

/** @type {EventTemplate[]} */
const TEMPLATES = [
  // ── Auth Events ──────────────────────────────────────────────────────────

  {
    name: "LOGIN_SUCCESS",
    email: {
      subject: "New login to your account — {{email}}",
      html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Login Alert</title></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Inter,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
  <tr><td align="center">
    <table width="580" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
      <tr><td style="background:linear-gradient(135deg,#1e293b,#334155);padding:32px 40px;">
        <h1 style="color:#ffffff;margin:0;font-size:24px;font-weight:700;">Successful Login</h1>
        <p style="color:#94a3b8;margin:8px 0 0;font-size:14px;">Security notification</p>
      </td></tr>
      <tr><td style="padding:32px 40px;">
        <p style="color:#374151;font-size:16px;">Hi <strong>{{name}}</strong>,</p>
        <p style="color:#6b7280;font-size:14px;line-height:1.6;">
          A new login was detected on your account. Here are the details:
        </p>
        <table style="background:#f8fafc;border:1px solid #e5e7eb;border-radius:8px;padding:16px;width:100%;margin:16px 0;">
          <tr><td style="color:#6b7280;font-size:13px;padding:4px 0;">📧 Email</td><td style="color:#111827;font-size:13px;font-weight:600;">{{email}}</td></tr>
          <tr><td style="color:#6b7280;font-size:13px;padding:4px 0;">🖥 Device</td><td style="color:#111827;font-size:13px;font-weight:600;">{{device}}</td></tr>
          <tr><td style="color:#6b7280;font-size:13px;padding:4px 0;">🌐 IP Address</td><td style="color:#111827;font-size:13px;font-weight:600;">{{ip}}</td></tr>
          <tr><td style="color:#6b7280;font-size:13px;padding:4px 0;">🕐 Time</td><td style="color:#111827;font-size:13px;font-weight:600;">{{loginTime}}</td></tr>
        </table>
        <p style="color:#6b7280;font-size:14px;">If this was you, no action is needed. If you didn't log in, please secure your account immediately.</p>
      </td></tr>
      <tr><td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:20px 40px;text-align:center;">
        <p style="color:#9ca3af;font-size:12px;margin:0;">This is an automated security alert from CommerceX Platform.</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`,
    },
    sms: "CommerceX: New login detected for {{email}} from {{device}} ({{ip}}) at {{loginTime}}. Not you? Secure your account immediately.",
    whatsapp: "login_success_alert_en",
  },

  {
    name: "LOGIN_FAILED",
    email: {
      subject: "⚠️ Failed login attempts detected on your account",
      html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Login Failed Alert</title></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Inter,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
  <tr><td align="center">
    <table width="580" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
      <tr><td style="background:linear-gradient(135deg,#7f1d1d,#991b1b);padding:32px 40px;">
        <h1 style="color:#ffffff;margin:0;font-size:24px;font-weight:700;">⚠️ Security Alert</h1>
        <p style="color:#fca5a5;margin:8px 0 0;font-size:14px;">Failed login attempts detected</p>
      </td></tr>
      <tr><td style="padding:32px 40px;">
        <p style="color:#374151;font-size:16px;">We detected <strong>{{attemptCount}} failed login attempt(s)</strong> for <strong>{{email}}</strong>.</p>
        <table style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:16px;width:100%;margin:16px 0;">
          <tr><td style="color:#6b7280;font-size:13px;padding:4px 0;">🌐 IP Address</td><td style="color:#991b1b;font-size:13px;font-weight:600;">{{ip}}</td></tr>
          <tr><td style="color:#6b7280;font-size:13px;padding:4px 0;">🕐 Time</td><td style="color:#991b1b;font-size:13px;font-weight:600;">{{time}}</td></tr>
          <tr><td style="color:#6b7280;font-size:13px;padding:4px 0;">🔢 Attempts</td><td style="color:#991b1b;font-size:13px;font-weight:600;">{{attemptCount}}</td></tr>
        </table>
        <p style="color:#6b7280;font-size:14px;">If this was you, reset your password and enable 2FA. If you didn't attempt to login, your credentials may be compromised.</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`,
    },
    sms: "ALERT: {{attemptCount}} failed login attempt(s) for {{email}} from IP {{ip}} at {{time}}. If this wasn't you, secure your account now.",
    whatsapp: "login_failed_alert_en",
  },

  {
    name: "OTP_CREATED",
    email: {
      subject: "Your verification code is {{otpCode}}",
      html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>OTP Verification</title></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Inter,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
  <tr><td align="center">
    <table width="580" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
      <tr><td style="background:linear-gradient(135deg,#4f46e5,#7c3aed);padding:32px 40px;text-align:center;">
        <h1 style="color:#ffffff;margin:0;font-size:24px;font-weight:700;">Verification Code</h1>
        <p style="color:#c4b5fd;margin:8px 0 0;">Use the code below to verify your identity</p>
      </td></tr>
      <tr><td style="padding:40px;text-align:center;">
        <p style="color:#374151;font-size:16px;margin-bottom:24px;">Hi <strong>{{name}}</strong>, here is your one-time verification code:</p>
        <div style="display:inline-block;background:#f3f4f6;border:2px dashed #6366f1;border-radius:12px;padding:24px 48px;margin:0 auto;">
          <span style="font-size:42px;font-weight:800;letter-spacing:12px;color:#4f46e5;font-family:monospace;">{{otpCode}}</span>
        </div>
        <p style="color:#9ca3af;font-size:13px;margin-top:24px;">This code expires in <strong>{{expiryMins}} minutes</strong>.</p>
        <p style="color:#9ca3af;font-size:12px;">Never share this code with anyone, including CommerceX staff.</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`,
    },
    sms: "CommerceX OTP: {{otpCode}} — Valid for {{expiryMins}} mins. Do NOT share this code with anyone.",
    whatsapp: "otp_verification_en",
  },

  {
    name: "USER_REGISTER",
    email: {
      subject: "Welcome to CommerceX, {{name}}! Verify your email",
      html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Welcome</title></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Inter,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
  <tr><td align="center">
    <table width="580" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
      <tr><td style="background:linear-gradient(135deg,#0f172a,#1e293b);padding:40px;text-align:center;">
        <h1 style="color:#ffffff;margin:0;font-size:28px;font-weight:800;">Welcome to CommerceX 🚀</h1>
        <p style="color:#94a3b8;margin:12px 0 0;">Your account is almost ready</p>
      </td></tr>
      <tr><td style="padding:40px;">
        <p style="color:#374151;font-size:16px;">Hi <strong>{{name}}</strong>,</p>
        <p style="color:#6b7280;font-size:14px;line-height:1.7;">
          Your account for <strong>{{storeName}}</strong> has been created. 
          Please verify your email address to activate your account and start building your store.
        </p>
        <div style="text-align:center;margin:32px 0;">
          <a href="{{verifyLink}}" style="display:inline-block;background:#4f46e5;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;padding:14px 32px;border-radius:8px;">
            Verify My Email →
          </a>
        </div>
        <p style="color:#9ca3af;font-size:12px;text-align:center;">Or copy this link: <a href="{{verifyLink}}" style="color:#4f46e5;">{{verifyLink}}</a></p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`,
    },
    sms: "Welcome to CommerceX, {{name}}! Verify your email to activate your {{storeName}} account: {{verifyLink}}",
    whatsapp: "user_registration_welcome_en",
  },

  {
    name: "PASSWORD_RESET",
    email: {
      subject: "Reset your CommerceX password",
      html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Password Reset</title></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Inter,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
  <tr><td align="center">
    <table width="580" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
      <tr><td style="background:linear-gradient(135deg,#1e40af,#3b82f6);padding:32px 40px;">
        <h1 style="color:#ffffff;margin:0;font-size:24px;font-weight:700;">Password Reset Request</h1>
      </td></tr>
      <tr><td style="padding:40px;">
        <p style="color:#374151;font-size:16px;">Hi <strong>{{name}}</strong>,</p>
        <p style="color:#6b7280;font-size:14px;line-height:1.7;">We received a request to reset your password. Click the button below to set a new one. This link will expire in <strong>{{expiryHours}} hours</strong>.</p>
        <div style="text-align:center;margin:32px 0;">
          <a href="{{resetLink}}" style="display:inline-block;background:#1e40af;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;padding:14px 32px;border-radius:8px;">
            Reset My Password →
          </a>
        </div>
        <p style="color:#9ca3af;font-size:12px;text-align:center;">If you didn't request this, you can safely ignore this email.</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`,
    },
    sms: "CommerceX: Reset your password using this link (expires in {{expiryHours}}h): {{resetLink}} — Ignore if you didn't request this.",
    whatsapp: "password_reset_en",
  },

  // ── Billing Events ───────────────────────────────────────────────────────

  {
    name: "SUBSCRIPTION_PURCHASED",
    email: {
      subject: "🎉 You're subscribed! {{planName}} plan is now active",
      html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Subscription Confirmed</title></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Inter,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
  <tr><td align="center">
    <table width="580" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
      <tr><td style="background:linear-gradient(135deg,#064e3b,#065f46);padding:32px 40px;text-align:center;">
        <h1 style="color:#ffffff;margin:0;font-size:26px;font-weight:700;">🎉 Subscription Activated!</h1>
        <p style="color:#6ee7b7;margin:8px 0 0;">Your {{planName}} plan is now live</p>
      </td></tr>
      <tr><td style="padding:32px 40px;">
        <p style="color:#374151;font-size:16px;">Hi <strong>{{storeName}}</strong>,</p>
        <p style="color:#6b7280;font-size:14px;line-height:1.7;">Your subscription has been successfully activated. Here's a summary:</p>
        <table style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:16px;width:100%;margin:16px 0;">
          <tr><td style="color:#6b7280;font-size:13px;padding:6px 0;">Plan</td><td style="color:#065f46;font-size:13px;font-weight:700;">{{planName}}</td></tr>
          <tr><td style="color:#6b7280;font-size:13px;padding:6px 0;">Amount</td><td style="color:#065f46;font-size:13px;font-weight:700;">{{amount}} {{currency}}</td></tr>
          <tr><td style="color:#6b7280;font-size:13px;padding:6px 0;">Billing Cycle</td><td style="color:#065f46;font-size:13px;font-weight:700;">{{billingCycle}}</td></tr>
          <tr><td style="color:#6b7280;font-size:13px;padding:6px 0;">Next Billing Date</td><td style="color:#065f46;font-size:13px;font-weight:700;">{{nextBillingDate}}</td></tr>
        </table>
        <p style="color:#6b7280;font-size:14px;">Thank you for choosing CommerceX. Start building your store today!</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`,
    },
    sms: "CommerceX: {{storeName}} — Your {{planName}} subscription is active! Amount: {{amount}} {{currency}}/{{billingCycle}}. Next billing: {{nextBillingDate}}.",
    whatsapp: "subscription_purchased_en",
  },

  {
    name: "SUBSCRIPTION_FAILED",
    email: {
      subject: "⚠️ Payment failed for your {{planName}} subscription",
      html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Payment Failed</title></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Inter,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
  <tr><td align="center">
    <table width="580" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
      <tr><td style="background:linear-gradient(135deg,#7f1d1d,#b91c1c);padding:32px 40px;">
        <h1 style="color:#ffffff;margin:0;font-size:24px;font-weight:700;">⚠️ Payment Failed</h1>
        <p style="color:#fca5a5;margin:8px 0 0;">Action required to keep your store active</p>
      </td></tr>
      <tr><td style="padding:32px 40px;">
        <p style="color:#374151;font-size:16px;">Hi <strong>{{storeName}}</strong>,</p>
        <p style="color:#6b7280;font-size:14px;line-height:1.7;">
          We were unable to process your payment of <strong>{{amount}}</strong> for the <strong>{{planName}}</strong> plan.
        </p>
        <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:16px;margin:16px 0;">
          <p style="color:#991b1b;font-size:13px;margin:0;"><strong>Reason:</strong> {{failureReason}}</p>
          <p style="color:#991b1b;font-size:13px;margin:8px 0 0;"><strong>Retry Date:</strong> {{retryDate}}</p>
        </div>
        <div style="text-align:center;margin:28px 0;">
          <a href="{{updateCardLink}}" style="display:inline-block;background:#b91c1c;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;padding:14px 32px;border-radius:8px;">
            Update Payment Method →
          </a>
        </div>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`,
    },
    sms: "ALERT: {{storeName}} — Payment of {{amount}} for {{planName}} failed. Reason: {{failureReason}}. Retry: {{retryDate}}. Update card: {{updateCardLink}}",
    whatsapp: "subscription_payment_failed_en",
  },

  {
    name: "SUBSCRIPTION_RENEWED",
    email: {
      subject: "✅ Your {{planName}} subscription has been renewed",
      html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Subscription Renewed</title></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Inter,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
  <tr><td align="center">
    <table width="580" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
      <tr><td style="background:linear-gradient(135deg,#1e3a5f,#1e40af);padding:32px 40px;">
        <h1 style="color:#ffffff;margin:0;font-size:24px;font-weight:700;">✅ Subscription Renewed</h1>
        <p style="color:#bfdbfe;margin:8px 0 0;">Your plan continues without interruption</p>
      </td></tr>
      <tr><td style="padding:32px 40px;">
        <p style="color:#374151;font-size:16px;">Hi <strong>{{storeName}}</strong>,</p>
        <p style="color:#6b7280;font-size:14px;line-height:1.7;">Your <strong>{{planName}}</strong> subscription has been successfully renewed. Your store will remain fully active.</p>
        <table style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:16px;width:100%;margin:16px 0;">
          <tr><td style="color:#6b7280;font-size:13px;padding:6px 0;">Plan</td><td style="color:#1e40af;font-size:13px;font-weight:700;">{{planName}}</td></tr>
          <tr><td style="color:#6b7280;font-size:13px;padding:6px 0;">Amount Charged</td><td style="color:#1e40af;font-size:13px;font-weight:700;">{{amount}} {{currency}}</td></tr>
          <tr><td style="color:#6b7280;font-size:13px;padding:6px 0;">Next Renewal</td><td style="color:#1e40af;font-size:13px;font-weight:700;">{{nextBillingDate}}</td></tr>
        </table>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`,
    },
    sms: "CommerceX: {{storeName}} — {{planName}} subscription renewed. {{amount}} {{currency}} charged. Next renewal: {{nextBillingDate}}.",
    whatsapp: "subscription_renewed_en",
  },

  {
    name: "SUBSCRIPTION_CANCELLED",
    email: {
      subject: "Your CommerceX subscription has been cancelled",
      html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Subscription Cancelled</title></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Inter,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
  <tr><td align="center">
    <table width="580" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
      <tr><td style="background:linear-gradient(135deg,#374151,#6b7280);padding:32px 40px;">
        <h1 style="color:#ffffff;margin:0;font-size:24px;font-weight:700;">Subscription Cancelled</h1>
        <p style="color:#d1d5db;margin:8px 0 0;">We're sorry to see you go</p>
      </td></tr>
      <tr><td style="padding:32px 40px;">
        <p style="color:#374151;font-size:16px;">Hi <strong>{{storeName}}</strong>,</p>
        <p style="color:#6b7280;font-size:14px;line-height:1.7;">
          Your <strong>{{planName}}</strong> subscription has been cancelled as of <strong>{{cancelledAt}}</strong>.
          You'll continue to have access until <strong>{{activeUntil}}</strong>.
        </p>
        <p style="color:#6b7280;font-size:14px;">We'd love to have you back. Reactivate anytime from your dashboard.</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`,
    },
    sms: "CommerceX: {{storeName}} — Your {{planName}} subscription was cancelled on {{cancelledAt}}. Access continues until {{activeUntil}}.",
    whatsapp: "subscription_cancelled_en",
  },

  {
    name: "PAYMENT_REMINDER",
    email: {
      subject: "💳 Upcoming payment reminder — {{planName}} subscription",
      html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Payment Reminder</title></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Inter,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
  <tr><td align="center">
    <table width="580" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
      <tr><td style="background:linear-gradient(135deg,#92400e,#b45309);padding:32px 40px;">
        <h1 style="color:#ffffff;margin:0;font-size:24px;font-weight:700;">💳 Payment Reminder</h1>
        <p style="color:#fde68a;margin:8px 0 0;">Your next billing date is approaching</p>
      </td></tr>
      <tr><td style="padding:32px 40px;">
        <p style="color:#374151;font-size:16px;">Hi <strong>{{storeName}}</strong>,</p>
        <p style="color:#6b7280;font-size:14px;line-height:1.7;">
          Just a friendly reminder that your <strong>{{planName}}</strong> subscription will be charged <strong>{{amount}}</strong> on <strong>{{dueDate}}</strong>.
        </p>
        <p style="color:#6b7280;font-size:14px;">Ensure your payment method is up to date to avoid any interruption.</p>
        <div style="text-align:center;margin:28px 0;">
          <a href="{{updateCardLink}}" style="display:inline-block;background:#b45309;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;padding:14px 32px;border-radius:8px;">
            Review Payment Method →
          </a>
        </div>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`,
    },
    sms: "CommerceX Reminder: {{storeName}} — {{planName}} renews on {{dueDate}} for {{amount}}. Update card: {{updateCardLink}}",
    whatsapp: "payment_reminder_en",
  },

  {
    name: "PAYMENT_REMAINING",
    email: {
      subject: "⚡ Outstanding balance of {{remainingAmount}} {{currency}} — Action needed",
      html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Payment Outstanding</title></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Inter,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
  <tr><td align="center">
    <table width="580" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
      <tr><td style="background:linear-gradient(135deg,#7c2d12,#ea580c);padding:32px 40px;">
        <h1 style="color:#ffffff;margin:0;font-size:24px;font-weight:700;">⚡ Balance Outstanding</h1>
        <p style="color:#fed7aa;margin:8px 0 0;">Payment required to avoid service interruption</p>
      </td></tr>
      <tr><td style="padding:32px 40px;">
        <p style="color:#374151;font-size:16px;">Hi <strong>{{storeName}}</strong>,</p>
        <p style="color:#6b7280;font-size:14px;line-height:1.7;">
          You have an outstanding balance of <strong>{{remainingAmount}} {{currency}}</strong> due by <strong>{{dueDate}}</strong>.
          Failure to pay may result in service suspension.
        </p>
        <div style="text-align:center;margin:28px 0;">
          <a href="{{payNowLink}}" style="display:inline-block;background:#ea580c;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;padding:14px 32px;border-radius:8px;">
            Pay Now →
          </a>
        </div>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`,
    },
    sms: "URGENT: {{storeName}} — Outstanding balance of {{remainingAmount}} {{currency}} due by {{dueDate}}. Pay now: {{payNowLink}}",
    whatsapp: "payment_remaining_notice_en",
  },

  // ── Commerce Events ──────────────────────────────────────────────────────

  {
    name: "ORDER_PLACED",
    email: {
      subject: "Order Confirmed — #{{orderId}} from {{storeName}}",
      html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Order Confirmed</title></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Inter,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
  <tr><td align="center">
    <table width="580" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
      <tr><td style="background:linear-gradient(135deg,#064e3b,#059669);padding:32px 40px;text-align:center;">
        <h1 style="color:#ffffff;margin:0;font-size:26px;font-weight:700;">✅ Order Confirmed!</h1>
        <p style="color:#a7f3d0;margin:8px 0 0;">Thank you for your purchase</p>
      </td></tr>
      <tr><td style="padding:32px 40px;">
        <p style="color:#374151;font-size:16px;">Hi <strong>{{customerName}}</strong>,</p>
        <p style="color:#6b7280;font-size:14px;line-height:1.7;">Your order has been placed successfully. Here's a summary:</p>
        <table style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:16px;width:100%;margin:16px 0;">
          <tr><td style="color:#6b7280;font-size:13px;padding:6px 0;">Order ID</td><td style="color:#065f46;font-size:13px;font-weight:700;">#{{orderId}}</td></tr>
          <tr><td style="color:#6b7280;font-size:13px;padding:6px 0;">Store</td><td style="color:#065f46;font-size:13px;font-weight:700;">{{storeName}}</td></tr>
          <tr><td style="color:#6b7280;font-size:13px;padding:6px 0;">Total Amount</td><td style="color:#065f46;font-size:13px;font-weight:700;">{{totalAmount}}</td></tr>
        </table>
        <div style="text-align:center;margin:24px 0;">
          <a href="{{orderLink}}" style="display:inline-block;background:#059669;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;padding:14px 32px;border-radius:8px;">View Order →</a>
        </div>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`,
    },
    sms: "Order confirmed! {{storeName}} — Order #{{orderId}} for {{totalAmount}} placed. Track: {{orderLink}}",
    whatsapp: "order_placed_confirmation_en",
  },

  {
    name: "ORDER_SHIPPED",
    email: {
      subject: "📦 Your order #{{orderId}} is on the way!",
      html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Order Shipped</title></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Inter,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
  <tr><td align="center">
    <table width="580" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
      <tr><td style="background:linear-gradient(135deg,#1e40af,#2563eb);padding:32px 40px;text-align:center;">
        <h1 style="color:#ffffff;margin:0;font-size:26px;font-weight:700;">📦 Your Order is Shipped!</h1>
        <p style="color:#bfdbfe;margin:8px 0 0;">It's on its way to you</p>
      </td></tr>
      <tr><td style="padding:32px 40px;">
        <p style="color:#374151;font-size:16px;">Hi <strong>{{customerName}}</strong>,</p>
        <p style="color:#6b7280;font-size:14px;line-height:1.7;">Great news! Your order has been dispatched.</p>
        <table style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:16px;width:100%;margin:16px 0;">
          <tr><td style="color:#6b7280;font-size:13px;padding:6px 0;">Order ID</td><td style="color:#1e40af;font-size:13px;font-weight:700;">#{{orderId}}</td></tr>
          <tr><td style="color:#6b7280;font-size:13px;padding:6px 0;">Courier</td><td style="color:#1e40af;font-size:13px;font-weight:700;">{{courierName}}</td></tr>
          <tr><td style="color:#6b7280;font-size:13px;padding:6px 0;">Tracking #</td><td style="color:#1e40af;font-size:13px;font-weight:700;">{{trackingNumber}}</td></tr>
        </table>
        <div style="text-align:center;margin:24px 0;">
          <a href="{{trackingUrl}}" style="display:inline-block;background:#2563eb;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;padding:14px 32px;border-radius:8px;">Track My Order →</a>
        </div>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`,
    },
    sms: "{{storeName}}: Your order #{{orderId}} has shipped via {{courierName}} ({{trackingNumber}}). Track: {{trackingUrl}}",
    whatsapp: "order_shipped_notification_en",
  },

  {
    name: "ORDER_DELIVERED",
    email: {
      subject: "🎉 Your order #{{orderId}} has been delivered!",
      html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Order Delivered</title></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Inter,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
  <tr><td align="center">
    <table width="580" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
      <tr><td style="background:linear-gradient(135deg,#14532d,#16a34a);padding:32px 40px;text-align:center;">
        <h1 style="color:#ffffff;margin:0;font-size:26px;font-weight:700;">🎉 Delivered!</h1>
        <p style="color:#bbf7d0;margin:8px 0 0;">Your order has arrived</p>
      </td></tr>
      <tr><td style="padding:32px 40px;">
        <p style="color:#374151;font-size:16px;">Hi <strong>{{customerName}}</strong>,</p>
        <p style="color:#6b7280;font-size:14px;line-height:1.7;">Your order <strong>#{{orderId}}</strong> from <strong>{{storeName}}</strong> was delivered on <strong>{{deliveredAt}}</strong>. We hope you love it!</p>
        <p style="color:#6b7280;font-size:14px;">Please leave a review to help other shoppers.</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`,
    },
    sms: "{{storeName}}: Your order #{{orderId}} was delivered on {{deliveredAt}}! Enjoy your purchase. - CommerceX",
    whatsapp: "order_delivered_confirmation_en",
  },

  {
    name: "PAYMENT_FAILED",
    email: {
      subject: "❌ Payment failed for order #{{orderId}}",
      html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Payment Failed</title></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Inter,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
  <tr><td align="center">
    <table width="580" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
      <tr><td style="background:linear-gradient(135deg,#7f1d1d,#dc2626);padding:32px 40px;">
        <h1 style="color:#ffffff;margin:0;font-size:24px;font-weight:700;">❌ Payment Failed</h1>
        <p style="color:#fca5a5;margin:8px 0 0;">Your payment could not be processed</p>
      </td></tr>
      <tr><td style="padding:32px 40px;">
        <p style="color:#374151;font-size:16px;">Hi <strong>{{customerName}}</strong>,</p>
        <p style="color:#6b7280;font-size:14px;line-height:1.7;">
          Unfortunately, your payment of <strong>{{amount}}</strong> for order <strong>#{{orderId}}</strong> could not be processed.
        </p>
        <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:14px;margin:16px 0;">
          <p style="color:#991b1b;font-size:13px;margin:0;"><strong>Reason:</strong> {{failureReason}}</p>
        </div>
        <div style="text-align:center;margin:28px 0;">
          <a href="{{retryLink}}" style="display:inline-block;background:#dc2626;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;padding:14px 32px;border-radius:8px;">Retry Payment →</a>
        </div>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`,
    },
    sms: "Payment failed for order #{{orderId}} ({{amount}}). Reason: {{failureReason}}. Retry: {{retryLink}}",
    whatsapp: "payment_failed_notification_en",
  },

  {
    name: "REFUND_PROCESSED",
    email: {
      subject: "Refund of {{refundAmount}} {{currency}} processed for order #{{orderId}}",
      html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Refund Processed</title></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Inter,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
  <tr><td align="center">
    <table width="580" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
      <tr><td style="background:linear-gradient(135deg,#1e3a5f,#3b82f6);padding:32px 40px;">
        <h1 style="color:#ffffff;margin:0;font-size:24px;font-weight:700;">💸 Refund Processed</h1>
        <p style="color:#bfdbfe;margin:8px 0 0;">Your refund is on its way</p>
      </td></tr>
      <tr><td style="padding:32px 40px;">
        <p style="color:#374151;font-size:16px;">Hi <strong>{{customerName}}</strong>,</p>
        <p style="color:#6b7280;font-size:14px;line-height:1.7;">Your refund has been successfully processed. Please allow 5–10 business days for it to appear in your account.</p>
        <table style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:16px;width:100%;margin:16px 0;">
          <tr><td style="color:#6b7280;font-size:13px;padding:6px 0;">Order ID</td><td style="color:#1e40af;font-size:13px;font-weight:700;">#{{orderId}}</td></tr>
          <tr><td style="color:#6b7280;font-size:13px;padding:6px 0;">Refund ID</td><td style="color:#1e40af;font-size:13px;font-weight:700;">#{{refundId}}</td></tr>
          <tr><td style="color:#6b7280;font-size:13px;padding:6px 0;">Refund Amount</td><td style="color:#1e40af;font-size:13px;font-weight:700;">{{refundAmount}} {{currency}}</td></tr>
        </table>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`,
    },
    sms: "Refund of {{refundAmount}} {{currency}} (Refund #{{refundId}}) for order #{{orderId}} has been processed. Allow 5–10 business days.",
    whatsapp: "refund_processed_notification_en",
  },
];

// ---------------------------------------------------------------------------
// Main Seed Function
// ---------------------------------------------------------------------------

async function withRetry(operation) {
  const MAX_RETRIES = 3;
  for (let i = 0; i < MAX_RETRIES; i++) {
    const prisma = new PrismaClient();
    try {
      return await operation(prisma);
    } catch (error) {
      if (i === MAX_RETRIES - 1) throw error;
      await new Promise((res) => setTimeout(res, 1000 * (i + 1)));
    } finally {
      await prisma.$disconnect();
    }
  }
}

async function seedNotifications() {
  console.log("\n🌱 CommerceX — Seeding Notification Templates\n");
  console.log(`📌 Using tenant ID: "${PLATFORM_TENANT_ID}"\n`);

  // Ensure the PLATFORM tenant exists
  await withRetry((prisma) =>
    prisma.tenant.upsert({
      where: { id: PLATFORM_TENANT_ID },
      update: {},
      create: {
        id: PLATFORM_TENANT_ID,
        name: "CommerceX Platform",
        slug: "platform",
        status: "ACTIVE",
        ownerId: "system",
      },
    })
  );
  console.log(`✅ PLATFORM tenant ensured.\n`);

  let emailCount = 0;
  let smsCount = 0;
  let waCount = 0;

  for (const template of TEMPLATES) {
    const { name: eventName, email, sms, whatsapp } = template;
    process.stdout.write(`  📧 ${eventName.padEnd(30)}`);

    // Email — stored as JSON { subject, html } in notificationTemplate.content
    if (email) {
      await withRetry(async (prisma) => {
        const key = `EMAIL::${eventName}`;
        const content = JSON.stringify({ subject: email.subject, html: email.html });
        const existing = await prisma.notificationTemplate.findFirst({
          where: { tenantId: PLATFORM_TENANT_ID, name: key },
        });
        if (existing) {
          await prisma.notificationTemplate.update({ where: { id: existing.id }, data: { content } });
        } else {
          await prisma.notificationTemplate.create({ data: { tenantId: PLATFORM_TENANT_ID, name: key, content } });
        }
      });
      emailCount++;
      process.stdout.write("email ✓  ");
    }

    // SMS — stored as plain text in notificationTemplate.content
    if (sms) {
      await withRetry(async (prisma) => {
        const key = `SMS::${eventName}`;
        const existing = await prisma.notificationTemplate.findFirst({
          where: { tenantId: PLATFORM_TENANT_ID, name: key },
        });
        if (existing) {
          await prisma.notificationTemplate.update({ where: { id: existing.id }, data: { content: sms } });
        } else {
          await prisma.notificationTemplate.create({ data: { tenantId: PLATFORM_TENANT_ID, name: key, content: sms } });
        }
      });
      smsCount++;
      process.stdout.write("sms ✓  ");
    }

    // WhatsApp — stored as Meta template name in notificationTemplate.content
    if (whatsapp) {
      await withRetry(async (prisma) => {
        const key = `WA::${eventName}`;
        const existing = await prisma.notificationTemplate.findFirst({
          where: { tenantId: PLATFORM_TENANT_ID, name: key },
        });
        if (existing) {
          await prisma.notificationTemplate.update({ where: { id: existing.id }, data: { content: whatsapp } });
        } else {
          await prisma.notificationTemplate.create({ data: { tenantId: PLATFORM_TENANT_ID, name: key, content: whatsapp } });
        }
      });
      waCount++;
      process.stdout.write("whatsapp ✓");
    }

    console.log("");
  }

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Seeding complete!

  📧 Email templates:     ${emailCount}
  💬 SMS templates:       ${smsCount}
  📱 WhatsApp templates:  ${waCount}
  📊 Total events:        ${TEMPLATES.length}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
}

seedNotifications()
  .catch((err) => {
    console.error("\n❌ Seeding failed:", err.message);
    console.error(err);
    process.exit(1);
  });
