"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@commercex/database";
import { NotificationService } from "@commercex/notifications";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/**
 * Super Admin platform-level tenant ID.
 * All platform-wide templates are stored under this tenant.
 */
const PLATFORM_TENANT_ID = "PLATFORM";

/**
 * Key format: "CHANNEL::EVENT_NAME"
 * e.g. "EMAIL::LOGIN_SUCCESS", "SMS::OTP_CREATED", "WA::PAYMENT_FAILED"
 * Using NotificationTemplate (which has tenantId + name + content in the
 * generated client) instead of the stale SmsTemplate/WhatsappTemplate models.
 */
function templateKey(channel: "EMAIL" | "SMS" | "WA", eventName: string) {
  return `${channel}::${eventName}`;
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TemplateData {
  id?: string;
  subject?: string; // Email only — stored as JSON in content: { subject, html }
  content: string;
}

export interface ProviderConfig {
  id?: string;
  channel: "EMAIL" | "SMS" | "WHATSAPP";
  code: string;   // RESEND | SES | TWILIO | MSG91 | META
  name: string;
  credentials: Record<string, string>;
  isPrimary: boolean;
  status: "ACTIVE" | "INACTIVE";
}

// ---------------------------------------------------------------------------
// Template Actions
// ---------------------------------------------------------------------------

export async function getTemplatesForEvent(eventName: string) {
  try {
    // Fetch all three channel templates in one query using OR
    const templates = await prisma.notificationTemplate.findMany({
      where: {
        tenantId: PLATFORM_TENANT_ID,
        name: { in: [
          templateKey("EMAIL", eventName),
          templateKey("SMS", eventName),
          templateKey("WA", eventName),
        ]},
      },
    });

    const emailRec  = templates.find(t => t.name === templateKey("EMAIL", eventName));
    const smsRec    = templates.find(t => t.name === templateKey("SMS", eventName));
    const waRec     = templates.find(t => t.name === templateKey("WA", eventName));

    // Email content is stored as JSON: { subject, html }
    let emailParsed: { subject: string; html: string } | null = null;
    if (emailRec) {
      try { emailParsed = JSON.parse(emailRec.content); } catch { emailParsed = { subject: "", html: emailRec.content }; }
    }

    return {
      success: true,
      templates: {
        EMAIL:    emailRec    ? { id: emailRec.id,  subject: emailParsed?.subject ?? "", content: emailParsed?.html ?? "" } : null,
        SMS:      smsRec      ? { id: smsRec.id,    content: smsRec.content }    : null,
        WHATSAPP: waRec       ? { id: waRec.id,     content: waRec.content }     : null,
      },
    };
  } catch (error: any) {
    console.error("Error fetching templates:", error);
    return { success: false, error: error.message };
  }
}

export async function saveTemplate(
  eventName: string,
  channel: "EMAIL" | "SMS" | "WHATSAPP",
  data: TemplateData
) {
  try {
    const ch = channel === "WHATSAPP" ? "WA" : channel as "EMAIL" | "SMS";
    const key = templateKey(ch, eventName);

    // Email stores { subject, html } as JSON; SMS/WA store raw text
    const contentToStore =
      channel === "EMAIL"
        ? JSON.stringify({ subject: data.subject ?? "", html: data.content })
        : data.content;

    const existing = await prisma.notificationTemplate.findFirst({
      where: { tenantId: PLATFORM_TENANT_ID, name: key },
    });

    if (existing) {
      await prisma.notificationTemplate.update({
        where: { id: existing.id },
        data: { content: contentToStore },
      });
    } else {
      await prisma.notificationTemplate.create({
        data: {
          tenantId: PLATFORM_TENANT_ID,
          name: key,
          content: contentToStore,
        },
      });
    }

    revalidatePath("/notifications");
    return { success: true };
  } catch (error: any) {
    console.error(`Error saving ${channel} template:`, error);
    return { success: false, error: error.message };
  }
}

export async function deleteTemplate(eventName: string, channel: "EMAIL" | "SMS" | "WHATSAPP") {
  try {
    const ch = channel === "WHATSAPP" ? "WA" : channel as "EMAIL" | "SMS";
    const key = templateKey(ch, eventName);

    const existing = await prisma.notificationTemplate.findFirst({
      where: { tenantId: PLATFORM_TENANT_ID, name: key },
    });
    if (existing) {
      await prisma.notificationTemplate.delete({ where: { id: existing.id } });
    }

    revalidatePath("/notifications");
    return { success: true };
  } catch (error: any) {
    console.error(`Error deleting ${channel} template:`, error);
    return { success: false, error: error.message };
  }
}

// ---------------------------------------------------------------------------
// Provider Actions
// ---------------------------------------------------------------------------

export async function getProviders() {
  try {
    const providers = await prisma.notificationProvider.findMany({
      where: { tenantId: null }, // null = platform-level providers
      orderBy: { createdAt: "asc" },
    });

    return {
      success: true,
      providers: providers.map(p => ({
        id: p.id,
        channel:     p.channel as "EMAIL" | "SMS" | "WHATSAPP",
        code:        p.code,
        name:        p.name,
        credentials: (() => { try { return JSON.parse(p.credentials); } catch { return {}; } })(),
        isPrimary:   p.isPrimary,
        status:      p.status as "ACTIVE" | "INACTIVE",
      })),
    };
  } catch (error: any) {
    console.error("Error fetching providers:", error);
    return { success: false, providers: [], error: error.message };
  }
}

export async function upsertProvider(config: ProviderConfig) {
  try {
    const credentialsJson = JSON.stringify(config.credentials);

    if (config.id) {
      // Update existing
      const updated = await prisma.notificationProvider.update({
        where: { id: config.id },
        data: {
          name:        config.name,
          code:        config.code,
          channel:     config.channel,
          credentials: credentialsJson,
          isPrimary:   config.isPrimary,
          status:      config.status,
        },
      });

      // If setting as primary, demote others in same channel
      if (config.isPrimary) {
        await prisma.notificationProvider.updateMany({
          where: {
            tenantId: null,
            channel: config.channel,
            id: { not: updated.id },
          },
          data: { isPrimary: false },
        });
      }
    } else {
      // Create new
      const created = await prisma.notificationProvider.create({
        data: {
          tenantId:    null,
          channel:     config.channel,
          code:        config.code,
          name:        config.name,
          credentials: credentialsJson,
          isPrimary:   config.isPrimary,
          status:      config.status,
        },
      });

      if (config.isPrimary) {
        await prisma.notificationProvider.updateMany({
          where: {
            tenantId: null,
            channel: config.channel,
            id: { not: created.id },
          },
          data: { isPrimary: false },
        });
      }
    }

    revalidatePath("/notifications");
    return { success: true };
  } catch (error: any) {
    console.error("Error upserting provider:", error);
    return { success: false, error: error.message };
  }
}

export async function toggleProviderStatus(id: string, status: "ACTIVE" | "INACTIVE") {
  try {
    await prisma.notificationProvider.update({
      where: { id },
      data: { status },
    });
    revalidatePath("/notifications");
    return { success: true };
  } catch (error: any) {
    console.error("Error toggling provider:", error);
    return { success: false, error: error.message };
  }
}

export async function setPrimaryProvider(id: string, channel: "EMAIL" | "SMS" | "WHATSAPP") {
  try {
    // Demote all in channel, then promote selected
    await prisma.notificationProvider.updateMany({
      where: { tenantId: null, channel },
      data: { isPrimary: false },
    });
    await prisma.notificationProvider.update({
      where: { id },
      data: { isPrimary: true, status: "ACTIVE" },
    });
    revalidatePath("/notifications");
    return { success: true };
  } catch (error: any) {
    console.error("Error setting primary provider:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteProvider(id: string) {
  try {
    await prisma.notificationProvider.delete({ where: { id } });
    revalidatePath("/notifications");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting provider:", error);
    return { success: false, error: error.message };
  }
}

// ---------------------------------------------------------------------------
// Notification Settings Actions (channel-level enable/disable)
// ---------------------------------------------------------------------------

export async function getNotificationSettings() {
  try {
    const settings = await prisma.notificationSettings.findUnique({
      where: { tenantId: PLATFORM_TENANT_ID },
    });

    if (!settings) {
      // Return defaults
      return {
        success: true,
        settings: {
          emailEnabled:    true,
          smsEnabled:      false,
          whatsappEnabled: false,
        },
      };
    }

    return {
      success: true,
      settings: {
        emailEnabled:    settings.emailEnabled,
        smsEnabled:      settings.smsEnabled,
        whatsappEnabled: settings.whatsappEnabled,
      },
    };
  } catch (error: any) {
    console.error("Error fetching notification settings:", error);
    return { success: false, settings: { emailEnabled: true, smsEnabled: false, whatsappEnabled: false } };
  }
}

export async function updateNotificationSettings(patch: {
  emailEnabled?: boolean;
  smsEnabled?: boolean;
  whatsappEnabled?: boolean;
}) {
  try {
    await prisma.notificationSettings.upsert({
      where: { tenantId: PLATFORM_TENANT_ID },
      update: patch,
      create: {
        tenantId:        PLATFORM_TENANT_ID,
        emailEnabled:    patch.emailEnabled    ?? true,
        smsEnabled:      patch.smsEnabled      ?? false,
        whatsappEnabled: patch.whatsappEnabled ?? false,
      },
    });
    revalidatePath("/notifications");
    return { success: true };
  } catch (error: any) {
    console.error("Error updating notification settings:", error);
    return { success: false, error: error.message };
  }
}

// ---------------------------------------------------------------------------
// Manual Trigger / Event Testing
// ---------------------------------------------------------------------------

/**
 * Trigger an event manually (e.g. for testing from the UI)
 */
export async function triggerTestNotificationAction(
  eventName: string,
  recipients: { email?: string; phone?: string },
  variables: any = {}
) {
  try {
    const service = new NotificationService(prisma);
    const result = await service.triggerEvent({
      tenantId: PLATFORM_TENANT_ID,
      eventName,
      recipients,
      variables,
      category: 'SYSTEM',
    });

    return { success: true, result };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to trigger test notification" };
  }
}
