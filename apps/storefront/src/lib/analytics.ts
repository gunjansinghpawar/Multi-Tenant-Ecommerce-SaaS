export type AnalyticsEventName = 
  | 'page_view'
  | 'product_view'
  | 'search'
  | 'filter'
  | 'sort'
  | 'wishlist_add'
  | 'wishlist_remove'
  | 'compare_add'
  | 'compare_remove'
  | 'add_to_cart'
  | 'remove_from_cart'
  | 'checkout_started'
  | 'payment_success'
  | 'payment_failed'
  | 'order_completed'
  | 'review_submitted'
  | 'newsletter_signup'
  | 'banner_click'
  | 'promotion_click'
  | 'blog_read'
  | 'support_request';

export interface AnalyticsPayload {
  [key: string]: any;
}

/**
 * Core analytics tracking function.
 * In a real app, this would push to GTM, Mixpanel, Segment, etc.
 */
export function trackEvent(eventName: AnalyticsEventName, payload?: AnalyticsPayload) {
  if (typeof window === 'undefined') return;

  // Development logging
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[Analytics] 📊 Event: ${eventName}`, payload || '');
  }

  // Example GTM Integration:
  // window.dataLayer = window.dataLayer || [];
  // window.dataLayer.push({ event: eventName, ...payload });
}
