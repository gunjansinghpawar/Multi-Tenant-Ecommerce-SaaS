"use client"

import * as React from "react"

export interface TenantConfig {
  primaryColor?: string // HSL format: "216 100% 50%"
  radius?: number // in rem, e.g. 0.5
}

export function TenantThemeProvider({
  tenant,
  children,
}: {
  tenant?: TenantConfig
  children: React.ReactNode
}) {
  React.useEffect(() => {
    if (!tenant) return

    const root = document.documentElement

    if (tenant.primaryColor) {
      root.style.setProperty("--primary", tenant.primaryColor)
      // We can also compute primary-foreground based on lightness if needed
    }
    
    if (tenant.radius !== undefined) {
      root.style.setProperty("--radius", `${tenant.radius}rem`)
    }

    return () => {
      // Cleanup when unmounted or tenant changes
      root.style.removeProperty("--primary")
      root.style.removeProperty("--radius")
    }
  }, [tenant])

  return <>{children}</>
}
