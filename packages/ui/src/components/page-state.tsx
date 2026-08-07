import * as React from "react"
import { PageLoading } from "./loading-states"
import { EmptyState, type EmptyStateProps } from "./empty-state"
import { 
  Error401, 
  Error403, 
  Error404, 
  Error429, 
  Error500, 
  MaintenancePage, 
  OfflinePage,
  type ErrorPageProps
} from "./error-pages"

export type PageStateValue = 
  | "initial" 
  | "loading" 
  | "empty" 
  | "success" 
  | "error" 
  | "unauthorized" 
  | "forbidden" 
  | "offline" 
  | "maintenance"
  | "not-found"

export interface PageStateProps {
  /** The current UI state of the page */
  state: PageStateValue
  /** Rendered when state is 'success' or 'initial' */
  children: React.ReactNode
  
  // Custom Overrides (Optional)
  loadingComponent?: React.ReactNode
  emptyComponent?: React.ReactNode
  errorComponent?: React.ReactNode
  unauthorizedComponent?: React.ReactNode
  forbiddenComponent?: React.ReactNode
  offlineComponent?: React.ReactNode
  maintenanceComponent?: React.ReactNode
  notFoundComponent?: React.ReactNode

  // Actions
  onRetry?: () => void
  onLogin?: () => void
  onGoHome?: () => void

  // Empty State config
  emptyProps?: Partial<EmptyStateProps>
  
  // Error state generic config
  errorProps?: Partial<ErrorPageProps>
}

export function PageState({
  state,
  children,
  loadingComponent,
  emptyComponent,
  errorComponent,
  unauthorizedComponent,
  forbiddenComponent,
  offlineComponent,
  maintenanceComponent,
  notFoundComponent,
  onRetry,
  onLogin,
  onGoHome,
  emptyProps,
  errorProps
}: PageStateProps) {
  
  switch (state) {
    case "initial":
    case "success":
      return <>{children}</>
      
    case "loading":
      if (loadingComponent) return <>{loadingComponent}</>
      return <PageLoading label="Loading content..." blur={false} />
      
    case "empty":
      if (emptyComponent) return <>{emptyComponent}</>
      return (
        <div className="flex h-full min-h-[400px] w-full items-center justify-center">
          <EmptyState 
            title="No Data Found" 
            description="There's nothing to display here yet."
            {...emptyProps} 
          />
        </div>
      )
      
    case "error":
      if (errorComponent) return <>{errorComponent}</>
      return <Error500 onAction={onRetry} actionLabel="Try Again" {...errorProps} />
      
    case "unauthorized":
      if (unauthorizedComponent) return <>{unauthorizedComponent}</>
      return <Error401 onAction={onLogin} actionLabel="Log In" {...errorProps} />
      
    case "forbidden":
      if (forbiddenComponent) return <>{forbiddenComponent}</>
      return <Error403 onAction={onGoHome} actionLabel="Go to Dashboard" {...errorProps} />
      
    case "offline":
      if (offlineComponent) return <>{offlineComponent}</>
      return <OfflinePage onAction={onRetry} actionLabel="Retry Connection" {...errorProps} />
      
    case "maintenance":
      if (maintenanceComponent) return <>{maintenanceComponent}</>
      return <MaintenancePage {...errorProps} />

    case "not-found":
      if (notFoundComponent) return <>{notFoundComponent}</>
      return <Error404 onAction={onGoHome} actionLabel="Go to Dashboard" {...errorProps} />
      
    default:
      // Fallback just in case
      return <>{children}</>
  }
}
