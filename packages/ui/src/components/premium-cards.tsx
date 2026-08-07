import * as React from "react"
import { cn } from "@commercex/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "./card"
import { ArrowUpRight, ArrowDownRight, ChevronRight, Activity as ActivityIcon } from "lucide-react"

export interface PremiumStatCardProps {
  title: string
  value: string | number
  description?: string
  icon?: React.ReactNode
  trend?: {
    value: string
    isPositive: boolean
  }
  className?: string
}

export function PremiumStatCard({ title, value, description, icon, trend, className }: PremiumStatCardProps) {
  return (
    <Card className={cn("overflow-hidden group hover:border-primary/50 transition-colors", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-x-4">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {icon && (
            <div className="rounded-lg bg-primary/10 p-2 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              {icon}
            </div>
          )}
        </div>
        <div className="mt-4 flex flex-col gap-1">
          <h4 className="text-3xl font-bold tracking-tight">{value}</h4>
          <div className="flex items-center gap-2">
            {trend && (
              <span
                className={cn(
                  "flex items-center text-xs font-semibold px-2 py-0.5 rounded-full",
                  trend.isPositive ? "bg-emerald-500/15 text-emerald-600" : "bg-rose-500/15 text-rose-600"
                )}
              >
                {trend.isPositive ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                {trend.value}
              </span>
            )}
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export interface ProgressCardProps {
  title: string
  description?: string
  progress: number // 0 to 100
  label?: string
  className?: string
}

export function ProgressCard({ title, description, progress, label, className }: ProgressCardProps) {
  const safeProgress = Math.min(Math.max(progress, 0), 100)
  
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">{safeProgress}%</span>
          {label && <span className="text-sm text-muted-foreground">{label}</span>}
        </div>
        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-in-out rounded-full" 
            style={{ width: `${safeProgress}%` }}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export interface ActivityItem {
  id: string | number
  title: string
  timestamp: string
  icon?: React.ReactNode
}

export interface ActivityCardProps {
  title: string
  description?: string
  items: ActivityItem[]
  onViewAll?: () => void
  className?: string
}

export function ActivityCard({ title, description, items, onViewAll, className }: ActivityCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-base">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        <ActivityIcon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={item.id} className="flex items-start gap-4">
              <div className="relative flex flex-col items-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary border-2 border-background z-10">
                  {item.icon || <div className="h-2 w-2 rounded-full bg-primary" />}
                </div>
                {index !== items.length - 1 && (
                  <div className="absolute top-8 bottom-[-16px] w-px bg-border" />
                )}
              </div>
              <div className="flex flex-col pt-1">
                <p className="text-sm font-medium leading-none">{item.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      {onViewAll && (
        <CardFooter>
          <button 
            onClick={onViewAll}
            className="w-full flex items-center justify-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            View All Activity <ChevronRight className="ml-1 h-4 w-4" />
          </button>
        </CardFooter>
      )}
    </Card>
  )
}

export interface QuickActionCardProps {
  title: string
  description: string
  icon: React.ReactNode
  onClick: () => void
  className?: string
}

export function QuickActionCard({ title, description, icon, onClick, className }: QuickActionCardProps) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "group text-left flex flex-col items-start p-6 bg-card border rounded-xl hover:border-primary/50 hover:shadow-md transition-all duration-200 w-full",
        className
      )}
    >
      <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
        {icon}
      </div>
      <h3 className="text-base font-semibold tracking-tight">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{description}</p>
    </button>
  )
}

export interface SummaryCardProps {
  title: string
  data: { label: string; value: string | number }[]
  className?: string
}

export function SummaryCard({ title, data, className }: SummaryCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="space-y-3">
          {data.map((item, i) => (
            <div key={i} className="flex items-center justify-between pb-3 border-b last:border-0 last:pb-0">
              <dt className="text-sm text-muted-foreground">{item.label}</dt>
              <dd className="text-sm font-medium">{item.value}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  )
}
