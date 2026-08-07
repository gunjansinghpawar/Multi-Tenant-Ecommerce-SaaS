export class TenantAnalytics {
  trackCreation(tenantId: string, planId: string) {
    console.log('Tracking tenant creation for ' + tenantId + ' on plan ' + planId);
  }

  trackActivity(tenantId: string, action: string) {
    // Posthog / Mixpanel / Segment
    console.log('Tracking action ' + action + ' for ' + tenantId);
  }
}
