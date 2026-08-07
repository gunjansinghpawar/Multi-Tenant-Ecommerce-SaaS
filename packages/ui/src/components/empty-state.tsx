import * as React from 'react';
import { FolderOpen, ExternalLink, Store, Plus } from 'lucide-react';
import { cn } from '@commercex/utils';
import { Button } from './button';
import Link from 'next/link';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  docLink?: string;
  className?: string;
}

export function EmptyState({
  title = 'No records found',
  description = 'There are no items to display at this time.',
  icon,
  action,
  docLink,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center p-12 text-center border border-dashed rounded-xl bg-card/50 transition-all hover:bg-card/80 hover:shadow-sm', className)}>
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-b from-muted/50 to-muted border shadow-sm text-muted-foreground">
          {icon || <FolderOpen className="h-10 w-10 text-primary" />}
        </div>
      </div>
      <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">{description}</p>
      
      {action && <div className="mt-8">{action}</div>}

      {docLink && (
        <div className="mt-6 pt-6 border-t w-full max-w-xs flex justify-center">
          <Link 
            href={docLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Learn more in documentation
            <ExternalLink className="ml-1 h-3 w-3" />
          </Link>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------------------------------
// Presets
// ----------------------------------------------------------------------------

export interface NoStoresEmptyStateProps {
  onCreateStore?: () => void;
  className?: string;
}

export function NoStoresEmptyState({ onCreateStore, className }: NoStoresEmptyStateProps) {
  return (
    <EmptyState
      className={className}
      icon={<Store className="h-10 w-10 text-primary" />}
      title="Create Your First Store"
      description="You don't have any stores connected yet. Create a store to start managing your products, orders, and customers in one unified dashboard."
      action={
        <Button onClick={onCreateStore} size="lg" className="shadow-md">
          <Plus className="mr-2 h-4 w-4" />
          Create Store
        </Button>
      }
      docLink="https://docs.commercex.com/getting-started/stores"
    />
  );
}
