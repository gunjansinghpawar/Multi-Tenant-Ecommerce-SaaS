"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

interface SidebarContextType {
  isCollapsed: boolean
  toggleSidebar: () => void
  pinnedItems: string[]
  togglePin: (id: string) => void
  favoriteItems: string[]
  toggleFavorite: (id: string) => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [pinnedItems, setPinnedItems] = useState<string[]>([])
  const [favoriteItems, setFavoriteItems] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)

  // Load from localStorage and handle screen size on mount
  useEffect(() => {
    try {
      const savedCollapsed = localStorage.getItem("sidebar:collapsed")
      const savedPins = localStorage.getItem("sidebar:pins")
      const savedFavs = localStorage.getItem("sidebar:favorites")

      if (savedCollapsed) {
        setIsCollapsed(JSON.parse(savedCollapsed))
      } else {
        // Default to closed on mobile, open on desktop
        setIsCollapsed(window.innerWidth < 768)
      }

      if (savedPins) setPinnedItems(JSON.parse(savedPins))
      if (savedFavs) setFavoriteItems(JSON.parse(savedFavs))
    } catch (e) {
      console.warn("Failed to load sidebar state from localStorage", e)
    }
    setMounted(true)
    
    // Auto-close on resize to mobile
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleSidebar = () => {
    const newState = !isCollapsed
    setIsCollapsed(newState)
    localStorage.setItem("sidebar:collapsed", JSON.stringify(newState))
  }

  const togglePin = (id: string) => {
    const newPins = pinnedItems.includes(id)
      ? pinnedItems.filter((p) => p !== id)
      : [...pinnedItems, id]
    setPinnedItems(newPins)
    localStorage.setItem("sidebar:pins", JSON.stringify(newPins))
  }

  const toggleFavorite = (id: string) => {
    const newFavs = favoriteItems.includes(id)
      ? favoriteItems.filter((p) => p !== id)
      : [...favoriteItems, id]
    setFavoriteItems(newFavs)
    localStorage.setItem("sidebar:favorites", JSON.stringify(newFavs))
  }

  const contextValue = {
    isCollapsed,
    toggleSidebar,
    pinnedItems,
    togglePin,
    favoriteItems,
    toggleFavorite,
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <SidebarContext.Provider value={contextValue}>
        <div style={{ visibility: "hidden" }}>
          {children}
        </div>
      </SidebarContext.Provider>
    )
  }

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}
