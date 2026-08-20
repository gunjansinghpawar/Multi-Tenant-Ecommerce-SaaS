'use client';

import { useEffect } from 'react';
import { TenantAnalytics } from '@commercex/analytics';

const analytics = new TenantAnalytics();

export function AnalyticsProvider() {
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Traverse up to find the closest data-track attribute (in case they clicked an icon inside a button)
      const trackingElement = target.closest('[data-track]');
      
      if (trackingElement) {
        const eventName = trackingElement.getAttribute('data-track');
        if (eventName) {
          // Fire event to our placeholder analytics package
          analytics.trackActivity('marketing-site-visitor', eventName);
        }
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  return null;
}
