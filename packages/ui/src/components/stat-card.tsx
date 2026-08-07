import * as React from 'react';
import { cn } from '@commercex/utils';
import { Card, CardContent } from './card';

export interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  className?: string;
}

export function StatCard({ title, value, description, icon, trend, className }: StatCardProps) {
  return (
    <Card className={cn('overflow-hidden group', className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-x-4">
          <p className="text-sm font-medium text-muted-foreground tracking-tight">{title}</p>
          {icon && (
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20 transition-transform duration-300 group-hover:scale-110">
              {icon}
            </div>
          )}
        </div>
        <div className="mt-4 flex items-baseline justify-between">
          <h4 className="text-2xl font-bold tracking-tight">{value}</h4>
          {trend && (
            <span
              className={cn(
                'inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full',
                trend.isPositive ? 'bg-emerald-500/15 text-emerald-600' : 'bg-rose-500/15 text-rose-600'
              )}
            >
              {trend.isPositive ? '+' : ''}
              {trend.value}
            </span>
          )}
        </div>
        {description && <p className="mt-1 text-xs text-muted-foreground">{description}</p>}
      </CardContent>
    </Card>
  );
}
