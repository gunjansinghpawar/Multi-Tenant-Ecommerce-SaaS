import React from 'react';
import { EmptyState } from './EmptyState';
import { StatusState } from './StatusState';
import { 
  WifiOff, 
  Wrench, 
  PackageX, 
  ShoppingBag, 
  HeartCrack, 
  SearchX, 
  Lock 
} from 'lucide-react';

// Specific Configurations

export function OfflineState({ onRetry }: { onRetry?: () => void }) {
  return (
    <StatusState
      icon={WifiOff}
      title="You are offline"
      description="It seems you have lost your internet connection. Please check your network and try again."
      type="error"
      actionText={onRetry ? "Retry Connection" : undefined}
      onAction={onRetry}
    />
  );
}

export function MaintenanceState() {
  return (
    <StatusState
      icon={Wrench}
      title="Under Maintenance"
      description="We are currently performing scheduled maintenance to improve your experience. We'll be back shortly."
      type="warning"
    />
  );
}

export function NoProductsState({ actionText, onAction }: { actionText?: string; onAction?: () => void }) {
  return (
    <EmptyState
      icon={PackageX}
      title="No Products Found"
      description="We couldn't find any products matching your criteria. Try adjusting your filters."
      actionText={actionText || "Clear Filters"}
      onAction={onAction}
    />
  );
}

export function NoOrdersState({ actionText, actionHref }: { actionText?: string; actionHref?: string }) {
  return (
    <EmptyState
      icon={ShoppingBag}
      title="No Orders Yet"
      description="You haven't placed any orders yet. Start exploring our collections to find something you love."
      actionText={actionText || "Start Shopping"}
      actionHref={actionHref || "/products"}
    />
  );
}

export function NoWishlistState({ actionText, actionHref }: { actionText?: string; actionHref?: string }) {
  return (
    <EmptyState
      icon={HeartCrack}
      title="Your Wishlist is Empty"
      description="You haven't added any items to your wishlist yet. Save items here to buy them later."
      actionText={actionText || "Discover Products"}
      actionHref={actionHref || "/products"}
    />
  );
}

export function NoSearchResultsState({ query, onClear }: { query?: string; onClear?: () => void }) {
  return (
    <EmptyState
      icon={SearchX}
      title="No Results Found"
      description={query ? `We couldn't find anything for "${query}". Try checking your spelling or using different keywords.` : "We couldn't find any results for your search."}
      actionText={onClear ? "Clear Search" : undefined}
      onAction={onClear}
    />
  );
}

export function PermissionRequiredState({ actionText, onAction }: { actionText?: string; onAction?: () => void }) {
  return (
    <StatusState
      icon={Lock}
      title="Access Denied"
      description="You do not have the required permissions to view this page. Please log in with an authorized account."
      type="error"
      actionText={actionText || "Return to Home"}
      onAction={onAction}
    />
  );
}
