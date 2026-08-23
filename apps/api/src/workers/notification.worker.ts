import { Job } from 'bullmq';
import { QueueService } from '@commercex/queue';
import { NotificationService } from '@commercex/notifications';
import { prisma } from '@commercex/database';
import { NotificationChannel } from '@commercex/notifications';

const notificationService = new NotificationService(prisma);

export interface NotificationJobPayload {
  tenantId: string;
  channel: NotificationChannel;
  eventType: string;
  payload: any;
  userId?: string;
  customerId?: string;
  category?: string;
}

export function startNotificationWorker() {
  QueueService.registerWorker('notifications', async (job: Job) => {
    console.log(`[NotificationWorker] Processing job ${job.id}`);
    
    const data = job.data as NotificationJobPayload;
    
    const result = await notificationService.send({
      tenantId: data.tenantId,
      channel: data.channel,
      eventType: data.eventType,
      payload: data.payload,
      userId: data.userId,
      customerId: data.customerId,
      category: data.category,
    });

    if (!result.success && result.error?.startsWith('RETRYABLE_ERROR')) {
      // BullMQ will catch this throw and apply exponential backoff
      throw new Error(result.error);
    }

    // If it failed permanently, we just log and return (so BullMQ marks job as completed, but we have failure in our DB log)
    if (!result.success) {
      console.warn(`[NotificationWorker] Job ${job.id} failed permanently: ${result.error}`);
    } else {
      console.log(`[NotificationWorker] Job ${job.id} delivered successfully`);
    }

    return result;
  }, 5); // Process up to 5 notifications concurrently
}
