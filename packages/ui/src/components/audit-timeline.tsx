import * as React from 'react';
import type { AuditLog } from '@commercex/types';
import { formatDate, formatRelativeTime } from '@commercex/utils';
import { Badge } from './badge';

export interface AuditTimelineProps {
  logs: AuditLog[];
  className?: string;
}

export function AuditTimeline({ logs, className }: AuditTimelineProps) {
  if (!logs || logs.length === 0) {
    return <p className="text-sm text-muted-foreground italic">No audit history recorded.</p>;
  }

  return (
    <div className={`space-y-6 ${className || ''}`}>
      {logs.map((log, idx) => (
        <div key={log.id || idx} className="relative flex items-start gap-4 pb-6 last:pb-0">
          {/* Timeline Connector */}
          {idx < logs.length - 1 && (
            <span className="absolute left-3 top-7 -bottom-6 w-0.5 bg-border" aria-hidden="true" />
          )}
          
          {/* Node Icon */}
          <div className="relative flex h-6 w-6 flex-none items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs">
            •
          </div>

          {/* Details */}
          <div className="flex-auto rounded-lg border bg-card p-4 shadow-sm">
            <div className="flex items-center justify-between gap-x-4">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-foreground">{log.action}</span>
                <Badge variant="outline">{log.resourceType}</Badge>
              </div>
              <time className="flex-none text-xs text-muted-foreground" title={formatDate(log.createdAt)}>
                {formatRelativeTime(log.createdAt)}
              </time>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              By <span className="font-medium text-foreground">{log.actorEmail}</span>
            </p>
            {log.details && (
              <pre className="mt-3 rounded bg-muted p-2 text-[11px] font-mono overflow-x-auto text-muted-foreground">
                {JSON.stringify(log.details, null, 2)}
              </pre>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
