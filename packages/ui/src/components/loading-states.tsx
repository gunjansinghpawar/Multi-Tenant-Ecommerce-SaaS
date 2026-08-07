import * as React from "react"
import { cn } from "@commercex/utils"
import { Loader2 } from "lucide-react"

// Spinner
export interface SpinnerProps extends React.SVGAttributes<SVGSVGElement> {
  size?: "sm" | "md" | "lg" | "xl"
}

const spinnerSizes = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
  xl: "h-12 w-12"
}

export function Spinner({ className, size = "md", ...props }: SpinnerProps) {
  return (
    <Loader2 
      className={cn("animate-spin text-primary", spinnerSizes[size], className)} 
      {...props} 
    />
  )
}

// Progress Bar
export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number // 0-100
  indicatorClassName?: string
  showLabel?: boolean
}

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ className, value, indicatorClassName, showLabel = false, ...props }, ref) => {
    const safeValue = Math.min(Math.max(value, 0), 100)
    
    return (
      <div className={cn("w-full", className)} {...props}>
        {showLabel && (
          <div className="mb-1 flex justify-end text-xs font-medium text-muted-foreground">
            {Math.round(safeValue)}%
          </div>
        )}
        <div 
          ref={ref}
          className="relative h-2 w-full overflow-hidden rounded-full bg-secondary"
        >
          <div
            className={cn("h-full w-full flex-1 bg-primary transition-all duration-500 ease-in-out", indicatorClassName)}
            style={{ transform: `translateX(-${100 - safeValue}%)` }}
          />
        </div>
      </div>
    )
  }
)
ProgressBar.displayName = "ProgressBar"

// Page Loading Overlay
export interface PageLoadingProps {
  label?: string
  blur?: boolean
}

export function PageLoading({ label = "Loading...", blur = true }: PageLoadingProps) {
  return (
    <div className={cn(
      "fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 transition-all duration-300",
      blur && "backdrop-blur-sm"
    )}>
      <Spinner size="lg" className="mb-4 text-primary" />
      <p className="text-lg font-medium text-foreground animate-pulse">{label}</p>
    </div>
  )
}

// Inline Loading
export function InlineLoading({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex items-center justify-center p-4">
      <Spinner size="sm" className="mr-2" />
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  )
}
