import React from "react"
import { cn } from "@commercex/utils"

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string
  text?: string
  children?: React.ReactNode
  actions?: React.ReactNode
}

export function PageHeader({
  heading,
  text,
  children,
  actions,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between px-2", className)} {...props}>
      <div className="grid gap-1">
        <h1 className="text-2xl font-bold tracking-wide text-slate-900 dark:text-slate-100">
          {heading}
        </h1>
        {text && <p className="text-muted-foreground">{text}</p>}
      </div>
      {(children || actions) && (
        <div className="flex items-center space-x-2">
          {children}
          {actions}
        </div>
      )}
    </div>
  )
}
