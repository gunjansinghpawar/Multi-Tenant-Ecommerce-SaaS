import { EventEmitter } from 'events';
import { NotificationService } from './service';
import { PrismaClient } from '@prisma/client';

export type NotificationEventName = 
  | 'LOGIN_SUCCESS' 
  | 'LOGIN_FAILED' 
  | 'OTP_CREATED' 
  | 'USER_REGISTER' 
  | 'PASSWORD_RESET' 
  | 'SUBSCRIPTION_PURCHASED' 
  | 'SUBSCRIPTION_FAILED' 
  | 'SUBSCRIPTION_RENEWED' 
  | 'SUBSCRIPTION_CANCELLED' 
  | 'PAYMENT_REMINDER' 
  | 'PAYMENT_REMAINING' 
  | 'ORDER_PLACED' 
  | 'ORDER_SHIPPED' 
  | 'ORDER_DELIVERED' 
  | 'PAYMENT_FAILED' 
  | 'REFUND_PROCESSED';

export interface BaseEventPayload {
  tenantId: string;
  recipients: { email?: string; phone?: string };
  variables: Record<string, any>;
  userId?: string;
  customerId?: string;
}

class AppEventBus extends EventEmitter {
  private service: NotificationService | null = null;
  
  public init(prisma: PrismaClient) {
    this.service = new NotificationService(prisma);
    this.setupListeners();
  }

  private setupListeners() {
    if (!this.service) return;

    // A catch-all listener for strictly typed events
    this.on('notification_event', async (eventName: NotificationEventName, payload: BaseEventPayload) => {
      try {
        console.log(`[AppEventBus] Intercepted event: ${eventName} for tenant ${payload.tenantId}`);
        await this.service?.triggerEvent({
          tenantId: payload.tenantId,
          eventName: eventName,
          recipients: payload.recipients,
          variables: payload.variables,
          userId: payload.userId,
          customerId: payload.customerId,
          category: 'SYSTEM',
        });
      } catch (error) {
        console.error(`[AppEventBus] Failed to process event ${eventName}:`, error);
      }
    });
  }

  /**
   * Automatically triggers a notification for the specified event if templates exist and channels are enabled.
   */
  public async fire(eventName: NotificationEventName, payload: BaseEventPayload) {
    this.emit('notification_event', eventName, payload);
  }
}

export const EventBus = new AppEventBus();
