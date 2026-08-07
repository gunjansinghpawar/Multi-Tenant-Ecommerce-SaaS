import * as React from "react"
import { cn } from "@commercex/utils"
import { Button } from "./button"
import { 
  AlertOctagon, 
  ShieldAlert, 
  FileQuestion, 
  Hourglass, 
  ServerCrash, 
  Wrench, 
  WifiOff, 
  ArrowLeft,
  RefreshCcw
} from "lucide-react"

export interface ErrorPageProps {
  icon: React.ReactNode
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  secondaryActionLabel?: string
  onSecondaryAction?: () => void
  className?: string
}

export function ErrorStateContainer({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  className
}: ErrorPageProps) {
  return (
    <div className={cn("flex min-h-[400px] w-full flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in-95 duration-300", className)}>
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-destructive/20 blur-2xl rounded-full" />
        <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-b from-background to-muted border shadow-sm text-destructive">
          {icon}
        </div>
      </div>
      <h1 className="mb-2 text-3xl font-bold tracking-tight">{title}</h1>
      <p className="mb-8 max-w-[500px] text-muted-foreground">{description}</p>
      
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {onSecondaryAction && secondaryActionLabel && (
          <Button variant="outline" size="lg" onClick={onSecondaryAction} className="w-full sm:w-auto">
            {secondaryActionLabel}
          </Button>
        )}
        {onAction && actionLabel && (
          <Button size="lg" onClick={onAction} className="w-full sm:w-auto shadow-md">
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  )
}

// 401 Unauthorized
export const Error401 = (props: Partial<ErrorPageProps>) => (
  <ErrorStateContainer
    icon={<AlertOctagon className="h-12 w-12" />}
    title="401 - Unauthorized"
    description="You need to be authenticated to access this page. Please log in with your credentials to continue."
    actionLabel="Go to Login"
    {...props}
  />
)

// 403 Forbidden
export const Error403 = (props: Partial<ErrorPageProps>) => (
  <ErrorStateContainer
    icon={<ShieldAlert className="h-12 w-12" />}
    title="403 - Access Denied"
    description="You don't have the necessary permissions to view this resource. If you believe this is an error, please contact your administrator."
    actionLabel="Return Home"
    secondaryActionLabel="Go Back"
    {...props}
  />
)

// 404 Not Found
export const Error404 = (props: Partial<ErrorPageProps>) => (
  <ErrorStateContainer
    icon={<FileQuestion className="h-12 w-12" />}
    title="404 - Page Not Found"
    description="Oops! We couldn't find the page you're looking for. It might have been moved, deleted, or perhaps the URL is incorrect."
    actionLabel="Return Home"
    secondaryActionLabel="Go Back"
    {...props}
  />
)

// 429 Too Many Requests
export const Error429 = (props: Partial<ErrorPageProps>) => (
  <ErrorStateContainer
    icon={<Hourglass className="h-12 w-12" />}
    title="429 - Rate Limit Exceeded"
    description="You've been making too many requests too quickly. Please take a break and try again in a few minutes."
    actionLabel="Try Again"
    {...props}
  />
)

// 500 Internal Server Error
export const Error500 = (props: Partial<ErrorPageProps>) => (
  <ErrorStateContainer
    icon={<ServerCrash className="h-12 w-12" />}
    title="500 - Server Error"
    description="Something went wrong on our end. Our engineering team has been notified and is working to fix the issue."
    actionLabel="Refresh Page"
    secondaryActionLabel="Return Home"
    {...props}
  />
)

// Maintenance Mode
export const MaintenancePage = (props: Partial<ErrorPageProps>) => (
  <ErrorStateContainer
    icon={<Wrench className="h-12 w-12 text-blue-500" />}
    title="Under Maintenance"
    description="We're currently performing scheduled maintenance to improve our systems. We'll be back online shortly. Thank you for your patience."
    actionLabel="Check Status"
    {...props}
  />
)

// Offline
export const OfflinePage = (props: Partial<ErrorPageProps>) => (
  <ErrorStateContainer
    icon={<WifiOff className="h-12 w-12 text-slate-500" />}
    title="You are Offline"
    description="It seems you've lost your internet connection. Please check your network settings and try again."
    actionLabel="Try Reconnecting"
    {...props}
  />
)
