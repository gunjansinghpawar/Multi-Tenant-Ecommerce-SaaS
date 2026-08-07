"use client"

import React from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { cn } from "@commercex/utils"

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbProps) {
  if (!items || items.length === 0) return null

  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center text-sm", className)}>
      <ol className="flex items-center gap-1.5 break-words text-muted-foreground sm:gap-2.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={index} className="flex items-center gap-1.5 sm:gap-2.5">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={cn("font-medium", isLast ? "text-foreground" : "")}>
                  {item.label}
                </span>
              )}
              {!isLast && <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/50" />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
