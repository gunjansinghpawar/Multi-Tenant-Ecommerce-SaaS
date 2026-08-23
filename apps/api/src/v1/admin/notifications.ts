import { Hono, Context } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { prisma } from '@commercex/database';
import { encryptCredentials } from '@commercex/utils';
import { QueueService } from '@commercex/queue';

const getTenantId = (c: Context) => c.get('tenantId' as never) as string;

const notificationsApi = new Hono();

// Fetch Providers
notificationsApi.get('/providers', async (c) => {
  const tenantId = getTenantId(c);
  
  const providers = await prisma.notificationProvider.findMany({
    where: { tenantId }
  });

  // Mask credentials
  const safeProviders = providers.map(p => ({
    ...p,
    credentials: '********' // Never expose encrypted/decrypted secrets
  }));

  return c.json({ data: safeProviders });
});

// Create Provider
notificationsApi.post('/providers', zValidator('json', z.object({
  channel: z.enum(['EMAIL', 'SMS', 'WHATSAPP']),
  code: z.string(),
  name: z.string(),
  credentials: z.record(z.any()),
  isPrimary: z.boolean().optional().default(false)
})), async (c) => {
  const tenantId = getTenantId(c);
  const data = c.req.valid('json');

  const encrypted = encryptCredentials(JSON.stringify(data.credentials));

  const provider = await prisma.notificationProvider.create({
    data: {
      tenantId,
      channel: data.channel,
      code: data.code,
      name: data.name,
      credentials: encrypted,
      isPrimary: data.isPrimary
    }
  });

  return c.json({ data: { ...provider, credentials: '***' } }, 201);
});

// Update Provider Settings (Settings model)
notificationsApi.put('/settings', zValidator('json', z.object({
  emailEnabled: z.boolean(),
  smsEnabled: z.boolean(),
  whatsappEnabled: z.boolean(),
  primaryEmailProviderId: z.string().nullable(),
  fallbackEmailProviderId: z.string().nullable(),
  primarySmsProviderId: z.string().nullable(),
  fallbackSmsProviderId: z.string().nullable(),
  primaryWaProviderId: z.string().nullable(),
  fallbackWaProviderId: z.string().nullable(),
  defaultFromEmail: z.string().nullable(),
  defaultFromName: z.string().nullable(),
})), async (c) => {
  const tenantId = getTenantId(c);
  const data = c.req.valid('json');

  const settings = await prisma.notificationSettings.upsert({
    where: { tenantId },
    create: { tenantId, ...data },
    update: data,
  });

  return c.json({ data: settings });
});

// Get Settings
notificationsApi.get('/settings', async (c) => {
  const tenantId = getTenantId(c);
  let settings = await prisma.notificationSettings.findUnique({ where: { tenantId } });
  
  if (!settings) {
    settings = await prisma.notificationSettings.create({ data: { tenantId } });
  }

  return c.json({ data: settings });
});

// Get Logs
notificationsApi.get('/logs', async (c) => {
  const tenantId = getTenantId(c);
  
  const logs = await prisma.notificationLog.findMany({
    where: { tenantId },
    orderBy: { createdAt: 'desc' },
    take: 100
  });

  return c.json({ data: logs });
});

// Send Test Notification
notificationsApi.post('/test', zValidator('json', z.object({
  channel: z.enum(['EMAIL', 'SMS', 'WHATSAPP']),
  to: z.string(),
  subject: z.string().optional(),
  message: z.string().optional(),
})), async (c) => {
  const tenantId = getTenantId(c);
  const data = c.req.valid('json');

  // Enqueue test notification
  await QueueService.enqueue('notifications', 'test-notification', {
    tenantId,
    channel: data.channel,
    eventType: 'TEST',
    payload: {
      to: data.to,
      subject: data.subject || 'Test Notification',
      html: data.message || 'This is a test message from CommerceX.',
      message: data.message || 'This is a test message from CommerceX.',
      templateName: 'test_template', // For WA
      language: 'en_US'
    }
  });

  return c.json({ success: true, message: 'Test notification queued' });
});

export { notificationsApi };
