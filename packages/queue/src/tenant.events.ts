export const TenantEvents = {
  TENANT_CREATED: 'tenant.created',
  TENANT_UPDATED: 'tenant.updated',
  TENANT_SUSPENDED: 'tenant.suspended',
} as const;

export class TenantEventPublisher {
  publish(event: string, payload: any) {
    // Send to Kafka / SQS / RabbitMQ
    console.log('Publishing event ' + event, payload);
  }
}
