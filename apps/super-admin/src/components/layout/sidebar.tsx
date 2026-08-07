"use client";

import React, { useState } from "react";
import { 
  LayoutDashboardIcon, 
  UsersIcon, 
  SettingsIcon, 
  ShieldIcon, 
  ActivityIcon, 
  CreditCardIcon, 
  BookIcon, 
  LifeBuoyIcon,
  FingerprintIcon,
  StoreIcon,
  TrendingUpIcon,
  FileTextIcon,
  LayoutIcon,
  PuzzleIcon,
  FlagIcon,
  KeyIcon,
  BellIcon,
  ServerIcon,
  HardDriveIcon,
  DatabaseIcon,
  ZapIcon,
  RefreshCwIcon,
  ShieldCheckIcon,
  UserCheckIcon,
  SearchIcon,
  LayersIcon
} from "lucide-react";
import { 
  AppSidebar, 
  SidebarGroup, 
  SidebarItem, 
  SidebarSearch, 
  SidebarCollapsible,
  useSidebar
} from "@commercex/ui";

const mainNav = [
  { id: "dashboard", name: "Dashboard", href: "/", icon: LayoutDashboardIcon },
  { id: "stores", name: "Tenants / Stores", href: "/stores", icon: StoreIcon, badge: "1,248" },
  { id: "users", name: "User Management", href: "/users", icon: UsersIcon, badge: "48k" },
  { id: "roles", name: "Roles", href: "/roles", icon: ShieldIcon },
  { id: "permissions", name: "Permissions Matrix", href: "/permissions", icon: FingerprintIcon },
];

const commerceNav = [
  { id: "subscriptions", name: "Subscription Plans", href: "/subscriptions", icon: CreditCardIcon },
  { id: "billing", name: "Billing & Invoices", href: "/billing", icon: CreditCardIcon },
  { id: "analytics", name: "Global Analytics", href: "/analytics", icon: TrendingUpIcon },
  { id: "reports", name: "Reports & Exports", href: "/reports", icon: FileTextIcon },
];

const marketplaceNav = [
  { id: "themes", name: "Theme Marketplace", href: "/themes", icon: LayoutIcon },
  { id: "plugins", name: "Plugin Marketplace", href: "/plugins", icon: PuzzleIcon },
  { id: "feature-flags", name: "Feature Flags", href: "/feature-flags", icon: FlagIcon },
  { id: "api-keys", name: "API Keys", href: "/api-keys", icon: KeyIcon },
];

const operationsNav = [
  { id: "audit", name: "Audit Logs", href: "/audit", icon: ActivityIcon },
  { id: "notifications", name: "Notifications", href: "/notifications", icon: BellIcon },
  { id: "activity", name: "Activity Center", href: "/activity", icon: ActivityIcon },
  { id: "security", name: "Security Center", href: "/security", icon: ShieldCheckIcon },
  { id: "support", name: "Support Center", href: "/support", icon: LifeBuoyIcon },
  { id: "remote-login", name: "Remote Login", href: "/remote-login", icon: UserCheckIcon },
];

const monitoringNav = [
  { id: "health", name: "System Health", href: "/health", icon: ServerIcon },
  { id: "queue-mon", name: "Queue Monitor", href: "/monitoring/queue", icon: LayersIcon },
  { id: "storage-mon", name: "Storage Monitor", href: "/monitoring/storage", icon: HardDriveIcon },
  { id: "server-mon", name: "Server Monitor", href: "/monitoring/server", icon: ServerIcon },
  { id: "db-mon", name: "Database Monitor", href: "/monitoring/database", icon: DatabaseIcon },
  { id: "cache-mon", name: "Cache Monitor", href: "/monitoring/cache", icon: ZapIcon },
  { id: "backups", name: "Backup Manager", href: "/backups", icon: RefreshCwIcon },
];

const platformNav = [
  { id: "search", name: "Global Search", href: "/search", icon: SearchIcon },
  { id: "docs", name: "Documentation", href: "/docs", icon: BookIcon },
  { id: "settings", name: "Settings", href: "/settings", icon: SettingsIcon },
];

export function Sidebar() {
  const [search, setSearch] = useState("");
  const { pinnedItems, favoriteItems } = useSidebar();

  const allNav = [
    ...mainNav, 
    ...commerceNav, 
    ...marketplaceNav, 
    ...operationsNav, 
    ...monitoringNav, 
    ...platformNav
  ];
  
  // Filter for Search
  const filteredNav = allNav.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
  
  // Resolve Pins & Favorites
  const pins = allNav.filter(item => pinnedItems.includes(item.id));
  const favorites = allNav.filter(item => favoriteItems.includes(item.id));

  return (
    <AppSidebar 
      logo={
        <>
          <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-primary text-primary-foreground">
            <ShieldIcon className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-sidebar-foreground">Super Admin</span>
        </>
      }
    >
      <SidebarSearch value={search} onChange={setSearch} />

      {search ? (
        <SidebarGroup title="Search Results">
          {filteredNav.length > 0 ? (
            filteredNav.map(item => <SidebarItem key={item.id} {...item} />)
          ) : (
            <p className="text-sm text-muted-foreground px-3">No results found.</p>
          )}
        </SidebarGroup>
      ) : (
        <>
          {favorites.length > 0 && (
            <SidebarGroup title="Favorites">
              {favorites.map(item => <SidebarItem key={item.id} {...item} />)}
            </SidebarGroup>
          )}

          {pins.length > 0 && (
            <SidebarGroup title="Pinned Items">
              {pins.map(item => <SidebarItem key={item.id} {...item} />)}
            </SidebarGroup>
          )}

          <SidebarGroup title="Core Management">
            {mainNav.map(item => <SidebarItem key={item.id} {...item} />)}
          </SidebarGroup>

          <SidebarGroup title="Commerce & Billing">
            {commerceNav.map(item => <SidebarItem key={item.id} {...item} />)}
          </SidebarGroup>

          <SidebarGroup title="Marketplace & Flags">
            {marketplaceNav.map(item => <SidebarItem key={item.id} {...item} />)}
          </SidebarGroup>

          <SidebarCollapsible title="Operations & Security" icon={ShieldCheckIcon}>
            {operationsNav.map(item => <SidebarItem key={item.id} {...item} isNested />)}
          </SidebarCollapsible>

          <SidebarCollapsible title="Infrastructure & Health" icon={ServerIcon}>
            {monitoringNav.map(item => <SidebarItem key={item.id} {...item} isNested />)}
          </SidebarCollapsible>

          <SidebarGroup title="Platform & Settings">
            {platformNav.map(item => <SidebarItem key={item.id} {...item} />)}
          </SidebarGroup>
        </>
      )}
    </AppSidebar>
  );
}
