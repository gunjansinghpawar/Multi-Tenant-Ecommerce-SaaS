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
  LayersIcon,
  BellDotIcon
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
  { id: "notification", name: "Notification Center", href: "/notifications", icon: BellDotIcon },
];

const marketplaceNav = [
  { id: "themes", name: "Theme Marketplace", href: "/themes", icon: LayoutIcon },
  { id: "plugins", name: "Plugin Marketplace", href: "/plugins", icon: PuzzleIcon },
  { id: "feature-flags", name: "Feature Flags", href: "/feature-flags", icon: FlagIcon },
  { id: "api-keys", name: "API Keys", href: "/api-keys", icon: KeyIcon },
];

const mastersNavGroups = [
  {
    title: "Geography", icon: DatabaseIcon, items: [
      { id: "masters-continents", name: "Continents", href: "/masters/continents" },
      { id: "masters-countries", name: "Countries", href: "/masters/countries" },
      { id: "masters-states", name: "States", href: "/masters/states" },
      { id: "masters-cities", name: "Cities", href: "/masters/cities" },
      { id: "masters-regions", name: "Regions", href: "/masters/regions" },
      { id: "masters-phone-country-codes", name: "Phone Country Codes", href: "/masters/phone-country-codes" },
    ]
  },
  {
    title: "Localization", icon: DatabaseIcon, items: [
      { id: "masters-currencies", name: "Currencies", href: "/masters/currencies" },
      { id: "masters-languages", name: "Languages", href: "/masters/languages" },
      { id: "masters-timezones", name: "Timezones", href: "/masters/timezones" },
      { id: "masters-date-formats", name: "Date Formats", href: "/masters/date-formats" },
      { id: "masters-time-formats", name: "Time Formats", href: "/masters/time-formats" },
    ]
  },
  {
    title: "Taxation", icon: DatabaseIcon, items: [
      { id: "masters-tax-categories", name: "Tax Categories", href: "/masters/tax-categories" },
      { id: "masters-tax-rates", name: "Tax Rates", href: "/masters/tax-rates" },
    ]
  },
  {
    title: "Products", icon: DatabaseIcon, items: [
      { id: "masters-product-types", name: "Product Types", href: "/masters/product-types" },
      { id: "masters-product-statuses", name: "Product Statuses", href: "/masters/product-statuses" },
      { id: "masters-attribute-types", name: "Attribute Types", href: "/masters/attribute-types" },
      { id: "masters-units", name: "Units", href: "/masters/units" },
      { id: "masters-weight-units", name: "Weight Units", href: "/masters/weight-units" },
      { id: "masters-dimension-units", name: "Dimension Units", href: "/masters/dimension-units" },
    ]
  },
  {
    title: "Customers & Address", icon: DatabaseIcon, items: [
      { id: "masters-customer-statuses", name: "Customer Statuses", href: "/masters/customer-statuses" },
      { id: "masters-address-types", name: "Address Types", href: "/masters/address-types" },
      { id: "masters-business-types", name: "Business Types", href: "/masters/business-types" },
      { id: "masters-industries", name: "Industries", href: "/masters/industries" },
    ]
  },
  {
    title: "Orders", icon: DatabaseIcon, items: [
      { id: "masters-order-statuses", name: "Order Statuses", href: "/masters/order-statuses" },
      { id: "masters-payment-statuses", name: "Payment Statuses", href: "/masters/payment-statuses" },
      { id: "masters-fulfillment-statuses", name: "Fulfillment Statuses", href: "/masters/fulfillment-statuses" },
      { id: "masters-cancellation-reasons", name: "Cancellation Reasons", href: "/masters/cancellation-reasons" },
      { id: "masters-return-reasons", name: "Return Reasons", href: "/masters/return-reasons" },
    ]
  },
  {
    title: "Shipping & Payment", icon: DatabaseIcon, items: [
      { id: "masters-shipping-methods", name: "Shipping Methods", href: "/masters/shipping-methods" },
      { id: "masters-shipping-providers", name: "Shipping Providers", href: "/masters/shipping-providers" },
      { id: "masters-payment-methods", name: "Payment Methods", href: "/masters/payment-methods" },
      { id: "masters-payment-providers", name: "Payment Providers", href: "/masters/payment-providers" },
    ]
  },
  {
    title: "Integrations", icon: DatabaseIcon, items: [
      { id: "masters-integration-types", name: "Integration Types", href: "/masters/integration-types" },
      { id: "masters-integration-categories", name: "Integration Categories", href: "/masters/integration-categories" },
    ]
  },
  {
    title: "SaaS & Tenants", icon: DatabaseIcon, items: [
      { id: "masters-tenant-statuses", name: "Tenant Statuses", href: "/masters/tenant-statuses" },
      { id: "masters-subscription-statuses", name: "Subscription Statuses", href: "/masters/subscription-statuses" },
      { id: "masters-plan-types", name: "Plan Types", href: "/masters/plan-types" },
      { id: "masters-plan-tiers", name: "Plan Tiers", href: "/masters/plan-tiers" },
      { id: "masters-billing-cycles", name: "Billing Cycles", href: "/masters/billing-cycles" },
    ]
  }
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
    ...mastersNavGroups.flatMap(group => group.items),
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

          <SidebarGroup title="Master Data Management">
            {mastersNavGroups.map(group => (
              <SidebarCollapsible key={group.title} title={group.title} icon={group.icon}>
                {group.items.map(item => <SidebarItem key={item.id} {...item} isNested />)}
              </SidebarCollapsible>
            ))}
          </SidebarGroup>

          <SidebarGroup title="System & Ops">
            <SidebarCollapsible title="Operations & Security" icon={ShieldCheckIcon}>
              {operationsNav.map(item => <SidebarItem key={item.id} {...item} isNested />)}
            </SidebarCollapsible>

            <SidebarCollapsible title="Infrastructure & Health" icon={ServerIcon}>
              {monitoringNav.map(item => <SidebarItem key={item.id} {...item} isNested />)}
            </SidebarCollapsible>
          </SidebarGroup>

          <SidebarGroup title="Platform & Settings">
            {platformNav.map(item => <SidebarItem key={item.id} {...item} />)}
          </SidebarGroup>
        </>
      )}
    </AppSidebar>
  );
}
