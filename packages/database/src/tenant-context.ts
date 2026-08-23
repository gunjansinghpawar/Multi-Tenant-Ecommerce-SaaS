import { PrismaClient, Prisma } from '@prisma/client';

export interface TenantScopedClientOptions {
  tenantId: string;
}

/**
 * Helper function to inject tenantId filter into Prisma query arguments safely
 */
export function applyTenantScope<T extends { where?: Record<string, unknown> }>(args: T, tenantId: string): T {
  return {
    ...args,
    where: {
      ...args?.where,
      tenantId,
    },
  };
}

const TENANT_MODELS = [
  'TenantSettings',
  'ThemeAssignment',
  'Membership',
  'Session',
  'Invitation',
  'AuditLog',
  'Page',
  'GlobalBlock',
  'Category',
  'Product',
  'Customer',
  'Order',
  'Payment',
  'Shipment',
  'Coupon',
  'Subscription',
  'BillingProfile',
  'Domain',
  'Integration',
  'SecurityEvent',
  'Store',
  'ProductAttribute',
  'ProductCollection',
  'ProductTag',
  'ProductBrand',
  'ThemeInstallation',
  'CmsPost',
  'CmsCategory',
  'BuilderDocument',
  'CustomerTag',
  'Cart',
  'Wishlist',
  'Warehouse',
  'PaymentTransaction',
  'ShippingRate',
  'Campaign',
  'MarketingSegment',
  'EmailMessage',
  'SmsMessage',
  'WhatsappMessage',
  'AutomationWorkflow',
  'AnalyticsEvent',
  'ApiKey',
  'WebhookEndpoint',
  'TenantBranding',
  'TenantLocalization',
  'TenantPreference',
  'TenantFeature',
  'TenantUsage',
  'TenantLimit',
  'TenantStatusHistory',
  'Supplier',
  'PurchaseOrder',
  'StockAdjustment',
  'StockTransfer',
  'InventoryBatch',
  'CustomerSegment',
  'CompareList',
  'PaymentProviderConfig',
  'PaymentMethodConfig',
  'Payout',
  'ShippingProviderConfig',
  'ShippingZone',
  'ShippingMethodConfig',
  'PickupLocation',
  'DiscountRule',
  'Promotion',
  'GiftCard',
  'MarketingTemplate',
  'SeoSetting',
  'SeoRedirect',
  'SeoAudit',
  'SeoKeyword',
  'SeoIndexingEvent',
  'Notification',
  'NotificationTemplate',
  'NotificationProvider',
  'NotificationSettings',
  'NotificationLog',
  'NotificationPreference',
  'WhatsappPhoneNumber',
  'WhatsappTemplate',
  'WhatsappConversation',
  'WhatsappCampaign',
  'WhatsappWebhook',
  'EmailTemplate',
  'EmailCampaign',
  'EmailSuppression',
  'SmsTemplate',
  'AnalyticsSession',
  'AnalyticsPageView',
  'AnalyticsProductView',
  'AnalyticsCart',
  'AnalyticsConversion',
  'AnalyticsCampaignEvent',
  'BillingCustomer',
  'BillingInvoice',
  'BillingTransaction',
  'ApiRequest',
  'OauthApp'
];

/**
 * Creates a Prisma Client extension enforcing explicit tenant context on multi-tenant entity queries.
 */
export function createTenantScopedClient(prisma: PrismaClient, tenantId: string) {
  if (!tenantId) {
    throw new Error('Tenant ID context is required to construct a tenant-scoped database client.');
  }

  return prisma.$extends({
    query: {
      $allModels: {
        async $allOperations({ model, operation, args, query }) {
          if (model && TENANT_MODELS.includes(model as string)) {
            const anyArgs = args as any;
            
            // 1. Read operations (findMany, count, aggregate, groupBy, findFirst)
            if (['findMany', 'count', 'aggregate', 'groupBy', 'findFirst', 'findFirstOrThrow'].includes(operation)) {
              return query(applyTenantScope(anyArgs || {}, tenantId));
            }

            // 2. findUnique operations (Prisma requires where to be purely unique, so we can't just inject tenantId)
            if (operation === 'findUnique' || operation === 'findUniqueOrThrow') {
              const adjustedOperation = operation === 'findUnique' ? 'findFirst' : 'findFirstOrThrow';
              const scopedArgs = applyTenantScope(anyArgs || {}, tenantId);
              const prismaModel = model.charAt(0).toLowerCase() + model.slice(1);
              // @ts-ignore
              return (prisma as any)[prismaModel][adjustedOperation](scopedArgs);
            }

            // 3. Write operations (create, createMany)
            if (operation === 'create') {
              anyArgs.data = { ...anyArgs.data, tenantId };
              return query(anyArgs);
            }
            if (operation === 'createMany') {
              if (Array.isArray(anyArgs.data)) {
                anyArgs.data = anyArgs.data.map((d: any) => ({ ...d, tenantId }));
              } else {
                anyArgs.data = { ...anyArgs.data, tenantId };
              }
              return query(anyArgs);
            }

            // 4. Update / Delete operations (update, delete)
            // We must first verify the record belongs to the tenant before mutating
            if (operation === 'update' || operation === 'delete') {
              // Extract the unique identifier being targeted
              const uniqueWhere = anyArgs.where;
              
              // Verify ownership
              const prismaModel = model.charAt(0).toLowerCase() + model.slice(1);
              // @ts-ignore
              const record = await (prisma as any)[prismaModel].findFirst({
                where: { ...uniqueWhere, tenantId }
              });

              if (!record) {
                throw new Error(`TENANT ISOLATION VIOLATION: Attempted to ${operation} ${model} that does not belong to tenant ${tenantId} or does not exist.`);
              }

              return query(anyArgs);
            }

            // 5. Bulk update/delete (updateMany, deleteMany)
            if (operation === 'updateMany' || operation === 'deleteMany') {
              return query(applyTenantScope(anyArgs || {}, tenantId));
            }
            
            // 6. Upsert
            if (operation === 'upsert') {
              anyArgs.create = { ...anyArgs.create, tenantId };
              
              // To safely upsert, we verify ownership if we are updating
              const uniqueWhere = anyArgs.where;
              const prismaModel = model.charAt(0).toLowerCase() + model.slice(1);
              // @ts-ignore
              const record = await (prisma as any)[prismaModel].findFirst({
                where: { ...uniqueWhere }
              });
              
              if (record && record.tenantId !== tenantId) {
                throw new Error(`TENANT ISOLATION VIOLATION: Attempted to upsert ${model} that belongs to a different tenant.`);
              }
              
              return query(anyArgs);
            }
          }
          
          return query(args);
        }
      }
    }
  });
}
