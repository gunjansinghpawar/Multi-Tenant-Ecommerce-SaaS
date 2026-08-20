'use client';

import { trackEvent, AnalyticsEventName, AnalyticsPayload } from '../lib/analytics';
import { useCallback } from 'react';

export function useAnalytics() {
  const track = useCallback((eventName: AnalyticsEventName, payload?: AnalyticsPayload) => {
    trackEvent(eventName, payload);
  }, []);

  return { track };
}
