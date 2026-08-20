'use client';

import React, { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useAnalytics } from '../../hooks/use-analytics';

function AnalyticsPageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { track } = useAnalytics();

  const previousSearchParams = React.useRef(searchParams?.toString() || '');

  useEffect(() => {
    if (pathname) {
      const currentQuery = searchParams?.toString() || '';
      const url = pathname + (currentQuery ? `?${currentQuery}` : '');
      
      track('page_view', { url, pathname });

      // Track filter and sort events if query changed
      if (previousSearchParams.current !== currentQuery) {
        if (searchParams?.has('sort')) {
          track('sort', { sort: searchParams.get('sort'), url });
        }
        
        // Track generic filter event if any other params changed (ignoring page/sort)
        const filters: Record<string, string> = {};
        searchParams?.forEach((value, key) => {
          if (key !== 'sort' && key !== 'page') {
            filters[key] = value;
          }
        });
        
        if (Object.keys(filters).length > 0) {
          track('filter', { filters, url });
        }
        
        previousSearchParams.current = currentQuery;
      }
    }
  }, [pathname, searchParams, track]);

  return null;
}

export function AnalyticsProvider() {
  return (
    <Suspense fallback={null}>
      <AnalyticsPageViewTracker />
    </Suspense>
  );
}
