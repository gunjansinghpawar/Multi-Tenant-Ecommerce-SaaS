import React from 'react';

export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed' | 'pending_customer';

interface TicketStatusBadgeProps {
  status: TicketStatus;
}

export function TicketStatusBadge({ status }: TicketStatusBadgeProps) {
  const statusConfig: Record<TicketStatus, { label: string; classes: string }> = {
    open: { label: 'Open', classes: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800' },
    in_progress: { label: 'In Progress', classes: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800' },
    resolved: { label: 'Resolved', classes: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800' },
    closed: { label: 'Closed', classes: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700' },
    pending_customer: { label: 'Waiting on You', classes: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800' },
  };

  const config = statusConfig[status];

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${config.classes}`}>
      {config.label}
    </span>
  );
}
