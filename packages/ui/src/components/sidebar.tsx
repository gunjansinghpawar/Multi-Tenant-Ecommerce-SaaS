"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, Search, Pin, Star, Menu } from "lucide-react"

import { cn } from "@commercex/utils"
import { useSidebar } from "./sidebar-provider"
import { Input } from "./input"
import { Button } from "./button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion"

// ----------------------------------------------------------------------
// Sidebar Root Container
// ----------------------------------------------------------------------
interface AppSidebarProps {
  children: React.ReactNode
  className?: string
  logo?: React.ReactNode
}

export function AppSidebar({ children, className, logo }: AppSidebarProps) {
  const { isCollapsed, toggleSidebar } = useSidebar()

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className={cn(
        "relative flex h-screen flex-col border-r border-border bg-sidebar shrink-0 overflow-hidden",
        className
      )}
    >
      {/* Header / Logo */}
      <div className="flex h-16 shrink-0 items-center justify-between px-4">
        <AnimatePresence mode="popLayout">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2 overflow-hidden whitespace-nowrap"
            >
              {logo}
            </motion.div>
          )}
        </AnimatePresence>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className={cn(
            "shrink-0 text-sidebar-foreground hover:bg-sidebar-accent",
            isCollapsed && "mx-auto"
          )}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </div>

      {/* Main Content (Scrollable) */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 no-scrollbar">
        {children}
      </div>
    </motion.aside>
  )
}

// ----------------------------------------------------------------------
// Sidebar Search
// ----------------------------------------------------------------------
interface SidebarSearchProps {
  value: string
  onChange: (val: string) => void
}

export function SidebarSearch({ value, onChange }: SidebarSearchProps) {
  const { isCollapsed } = useSidebar()

  if (isCollapsed) {
    return (
      <div className="px-4 mb-4 flex justify-center">
        <Button variant="ghost" size="icon" className="h-9 w-9 text-sidebar-foreground hover:bg-sidebar-accent cursor-default">
          <Search className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="px-4 mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search..."
          className="pl-9 h-9 bg-sidebar-accent/50 border-sidebar-border focus-visible:ring-sidebar-ring text-sm"
        />
      </div>
    </div>
  )
}

// ----------------------------------------------------------------------
// Sidebar Group
// ----------------------------------------------------------------------
interface SidebarGroupProps {
  title: string
  children: React.ReactNode
}

export function SidebarGroup({ title, children }: SidebarGroupProps) {
  const { isCollapsed } = useSidebar()

  if (isCollapsed) {
    return <div className="mb-6 flex flex-col items-center gap-2">{children}</div>
  }

  return (
    <div className="mb-6 px-3">
      <h4 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/50">
        {title}
      </h4>
      <div className="space-y-1">{children}</div>
    </div>
  )
}

// ----------------------------------------------------------------------
// Sidebar Item
// ----------------------------------------------------------------------
interface SidebarItemProps {
  id: string
  name: string
  href: string
  icon?: React.ElementType
  badge?: string | number
  isNested?: boolean
}

export function SidebarItem({ id, name, href, icon: Icon, badge, isNested }: SidebarItemProps) {
  const pathname = usePathname()
  const isActive = pathname === href
  const { isCollapsed, pinnedItems, togglePin, favoriteItems, toggleFavorite } = useSidebar()

  const isPinned = pinnedItems.includes(id)
  const isFavorite = favoriteItems.includes(id)

  const ItemContent = (
    <Link
      href={href}
      className={cn(
        "group relative flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
        isActive
          ? "bg-sidebar-primary/10 text-sidebar-primary"
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        isCollapsed ? "justify-center px-0" : "",
        isNested && !isCollapsed ? "pl-9" : ""
      )}
    >
      {/* Active state is handled purely by the background and text colors to avoid overflowing borders on the rounded box */}

      {Icon && (
        <Icon
          className={cn(
            "h-5 w-5 shrink-0 transition-colors",
            isActive ? "text-sidebar-primary" : "text-sidebar-foreground/60 group-hover:text-sidebar-accent-foreground"
          )}
        />
      )}

      <AnimatePresence>
        {!isCollapsed && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            className="flex-1 truncate overflow-hidden whitespace-nowrap"
          >
            {name}
          </motion.span>
        )}
      </AnimatePresence>

      {!isCollapsed && badge && (
        <span className={cn(
          "ml-auto shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold transition-opacity duration-200 group-hover:opacity-0",
          isActive ? "bg-sidebar-primary text-sidebar-primary-foreground" : "bg-sidebar-accent text-sidebar-accent-foreground"
        )}>
          {badge}
        </span>
      )}

      {/* Hover Actions (Pin / Favorite) */}
      {!isCollapsed && (
        <div className="absolute right-2 hidden items-center gap-1 group-hover:flex">
          <button
            onClick={(e) => {
              e.preventDefault()
              toggleFavorite(id)
            }}
            className={cn("p-1 rounded hover:bg-sidebar-background transition-colors", isFavorite ? "text-warning" : "text-muted-foreground")}
          >
            <Star className="h-3 w-3" fill={isFavorite ? "currentColor" : "none"} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault()
              togglePin(id)
            }}
            className={cn("p-1 rounded hover:bg-sidebar-background transition-colors", isPinned ? "text-sidebar-primary" : "text-muted-foreground")}
          >
            <Pin className="h-3 w-3" fill={isPinned ? "currentColor" : "none"} />
          </button>
        </div>
      )}
    </Link>
  )

  if (isCollapsed) {
    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>{ItemContent}</TooltipTrigger>
          <TooltipContent side="right" className="flex items-center gap-4">
            {name}
            {badge && <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs text-primary">{badge}</span>}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return ItemContent
}

// ----------------------------------------------------------------------
// Sidebar Collapsible
// ----------------------------------------------------------------------
interface SidebarCollapsibleProps {
  title: string
  icon: React.ElementType
  children: React.ReactNode
  badge?: string
}

export function SidebarCollapsible({ title, icon: Icon, children, badge }: SidebarCollapsibleProps) {
  const { isCollapsed } = useSidebar()
  
  if (isCollapsed) {
    // In collapsed mode, we don't render collapsibles deeply, just the children.
    // A real implementation might use a Flyout/Hover card here. For now, flat render.
    return <>{children}</>
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={title} className="border-none">
        <AccordionTrigger className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:no-underline data-[state=open]:bg-sidebar-accent/50 transition-all duration-200">
          <div className="flex items-center gap-3">
            <Icon className="h-5 w-5 text-sidebar-foreground/60" />
            <span className="flex items-center gap-2">
              {title}
              {badge && (
                <span className="inline-flex h-5 items-center justify-center rounded-full bg-primary px-2 text-[10px] font-medium text-primary-foreground">
                  {badge}
                </span>
              )}
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pt-1 pb-0">
          <div className="space-y-1">{children}</div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
