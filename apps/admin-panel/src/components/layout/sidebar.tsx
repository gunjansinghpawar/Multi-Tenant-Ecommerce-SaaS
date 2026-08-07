"use client";

import React, { useState } from "react";
import {
  LayoutDashboardIcon,
  ShoppingCartIcon,
  PackageIcon,
  UsersIcon,
  SettingsIcon,
  StoreIcon,
  TagsIcon,
  CreditCardIcon,
  LifeBuoyIcon,
  GlobeIcon,
  PaletteIcon,
  FileTextIcon,
  SearchIcon,
  LineChartIcon,
  BanknoteIcon,
  TruckIcon,
  MessageCircleIcon,
  MailIcon,
  SmartphoneIcon,
  SparklesIcon,
  BarChart2Icon,
  FileSpreadsheetIcon,
  ShieldIcon,
  PuzzleIcon,
  ZapIcon,
  ImageIcon,
  CodeIcon
} from "lucide-react";
import {
  AppSidebar,
  SidebarGroup,
  SidebarItem,
  SidebarSearch,
  SidebarCollapsible,
  useSidebar
} from "@commercex/ui";

const navigation = [
  { id: "dashboard", name: "Dashboard", href: "/", icon: LayoutDashboardIcon },
];

const storefrontNav = [
  { id: "themes", name: "Themes", href: "/themes", icon: PaletteIcon },
];

const settingsNav = [
  { id: "billing", name: "Billing", href: "/billing", icon: CreditCardIcon },
  { id: "domains", name: "Domains", href: "/domains", icon: GlobeIcon },
];

export function Sidebar() {
  const [search, setSearch] = useState("");
  const { pinnedItems, favoriteItems } = useSidebar();

  const allNav = [...navigation, ...storefrontNav, ...settingsNav];

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
            <StoreIcon className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-sidebar-foreground">Merchant</span>
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

          <SidebarGroup title="Main">
            {navigation.map(item => <SidebarItem key={item.id} {...item} />)}
          </SidebarGroup>

          <SidebarGroup title="Catalog">
            <SidebarCollapsible title="Products" icon={PackageIcon}>
              <SidebarItem id="products-dashboard" name="Dashboard" href="/products/dashboard" isNested />
              <SidebarItem id="products-list" name="All Products" href="/products" isNested />
              <SidebarItem id="products-categories" name="Categories" href="/products/categories" isNested />
              <SidebarItem id="products-collections" name="Collections" href="/products/collections" isNested />
              <SidebarItem id="products-brands" name="Brands" href="/products/brands" isNested />
              <SidebarItem id="products-tags" name="Tags" href="/products/tags" isNested />
              <SidebarItem id="products-reviews" name="Reviews & Q&A" href="/products/reviews" isNested />
            </SidebarCollapsible>

            <SidebarCollapsible title="Inventory" icon={PackageIcon}>
              <SidebarItem id="inv-dashboard" name="Inventory Dashboard" href="/inventory" isNested />
              <SidebarItem id="inv-warehouses" name="Warehouses" href="/inventory/warehouses" isNested />
              <SidebarItem id="inv-suppliers" name="Suppliers" href="/inventory/suppliers" isNested />
              <SidebarItem id="inv-transfers" name="Stock Transfer" href="/inventory/transfers" isNested />
              <SidebarItem id="inv-adjustments" name="Stock Adjustment" href="/inventory/adjustments" isNested />
              <SidebarItem id="inv-po" name="Purchase Orders" href="/inventory/purchase-orders" isNested />
              <SidebarItem id="inv-returns" name="Returns" href="/inventory/returns" isNested />
              <SidebarItem id="inv-damaged" name="Damaged Stock" href="/inventory/damaged" isNested />
              <SidebarItem id="inv-expiry" name="Expiry" href="/inventory/expiry" isNested />
              <SidebarItem id="inv-barcode" name="Barcode Scanner" href="/inventory/barcode" isNested />
              <SidebarItem id="inv-qr" name="QR Scanner" href="/inventory/qr" isNested />
              <SidebarItem id="inv-batches" name="Batch Tracking" href="/inventory/batches" isNested />
              <SidebarItem id="inv-alerts" name="Low Stock Alerts" href="/inventory/alerts" isNested />
              <SidebarItem id="inv-forecast" name="Forecast" href="/inventory/forecast" isNested />
              <SidebarItem id="inv-reports" name="Reports" href="/inventory/reports" isNested />
            </SidebarCollapsible>
          </SidebarGroup>

          <SidebarGroup title="Sales & Fufillment">
            <SidebarCollapsible title="Orders" icon={ShoppingCartIcon} badge="3">
              <SidebarItem id="orders-dashboard" name="Dashboard" href="/orders/dashboard" isNested />
              <SidebarItem id="orders-list" name="All Orders" href="/orders" isNested />
              <SidebarItem id="orders-drafts" name="Draft Orders" href="/orders/drafts" isNested />
              <SidebarItem id="orders-manual" name="Manual Orders" href="/orders/manual" isNested />
            </SidebarCollapsible>

            <SidebarCollapsible title="Customers" icon={UsersIcon}>
              <SidebarItem id="customers-dashboard" name="Dashboard" href="/customers/dashboard" isNested />
              <SidebarItem id="customers-list" name="All Customers" href="/customers" isNested />
              <SidebarItem id="customers-segments" name="Segments & Groups" href="/customers/segments" isNested />
              <SidebarItem id="customers-subscriptions" name="Subscriptions" href="/customers/subscriptions" isNested />
              <SidebarItem id="customers-gdpr" name="Compliance (GDPR)" href="/customers/gdpr" isNested />
            </SidebarCollapsible>

            <SidebarCollapsible title="Shipping" icon={TruckIcon}>
              <SidebarItem id="shipping-shiprocket" name="Shiprocket" href="/shipping/shiprocket" isNested />
              <SidebarItem id="shipping-delhivery" name="Delhivery" href="/shipping/delhivery" isNested />
              <SidebarItem id="shipping-bluedart" name="Blue Dart" href="/shipping/bluedart" isNested />
              <SidebarItem id="shipping-dtdc" name="DTDC" href="/shipping/dtdc" isNested />
              <SidebarItem id="shipping-indiapost" name="India Post" href="/shipping/indiapost" isNested />
              <SidebarItem id="shipping-xpressbees" name="Xpressbees" href="/shipping/xpressbees" isNested />
              <SidebarItem id="shipping-pickup" name="Pickup" href="/shipping/pickup" isNested />
              <SidebarItem id="shipping-tracking" name="Tracking" href="/shipping/tracking" isNested />
              <SidebarItem id="shipping-rules" name="Shipping Rules" href="/shipping/rules" isNested />
              <SidebarItem id="shipping-zones" name="Zones" href="/shipping/zones" isNested />
              <SidebarItem id="shipping-rates" name="Rates" href="/shipping/rates" isNested />
              <SidebarItem id="shipping-packaging" name="Packaging" href="/shipping/packaging" isNested />
              <SidebarItem id="shipping-returns" name="Returns" href="/shipping/returns" isNested />
              <SidebarItem id="shipping-analytics" name="Shipping Analytics" href="/shipping/analytics" isNested />
            </SidebarCollapsible>
          </SidebarGroup>

          <SidebarGroup title="Finance & Accounting">
            <SidebarCollapsible title="Finance" icon={BanknoteIcon}>
              <SidebarItem id="finance-dashboard" name="Analytics & Overview" href="/finance/dashboard" isNested />
              <SidebarItem id="finance-transactions" name="Transactions & Logs" href="/finance/transactions" isNested />
              <SidebarItem id="finance-payouts" name="Bank Payouts" href="/finance/payouts" isNested />
              <SidebarItem id="finance-invoices" name="Invoices & Refunds" href="/finance/invoices" isNested />
              <SidebarItem id="finance-methods" name="Payment Methods" href="/finance/methods" isNested />
              <SidebarItem id="finance-taxes" name="Taxes" href="/finance/taxes" isNested />
            </SidebarCollapsible>
          </SidebarGroup>

          <SidebarGroup title="Marketing & Growth">
            <SidebarCollapsible title="Marketing" icon={TagsIcon}>
              <SidebarItem id="marketing-dashboard" name="Dashboard & Analytics" href="/marketing/dashboard" isNested />
              <SidebarItem id="marketing-promotions" name="Promotions & Discounts" href="/marketing/promotions" isNested />
              <SidebarItem id="marketing-giftcards" name="Gift Cards" href="/marketing/gift-cards" isNested />
              <SidebarItem id="marketing-campaigns" name="Campaigns (Email/SMS)" href="/marketing/campaigns" isNested />
              <SidebarItem id="marketing-automation" name="Automation Workflows" href="/marketing/automation" isNested />
              <SidebarItem id="marketing-programs" name="Referrals & Loyalty" href="/marketing/programs" isNested />
              <SidebarItem id="marketing-calendar" name="Marketing Calendar" href="/marketing/calendar" isNested />
            </SidebarCollapsible>

            <SidebarCollapsible title="WhatsApp Business" icon={MessageCircleIcon}>
              <SidebarItem id="wa-connect" name="Connect API" href="/whatsapp/connect" isNested />
              <SidebarItem id="wa-profile" name="Business Profile" href="/whatsapp/profile" isNested />
              <SidebarItem id="wa-templates" name="Templates" href="/whatsapp/templates" isNested />
              <SidebarItem id="wa-otp" name="OTP" href="/whatsapp/otp" isNested />
              <SidebarItem id="wa-order-notifications" name="Order Notifications" href="/whatsapp/order-notifications" isNested />
              <SidebarItem id="wa-invoice" name="Invoice" href="/whatsapp/invoice" isNested />
              <SidebarItem id="wa-shipping" name="Shipping Updates" href="/whatsapp/shipping" isNested />
              <SidebarItem id="wa-broadcast" name="Broadcast" href="/whatsapp/broadcast" isNested />
              <SidebarItem id="wa-campaigns" name="Campaigns" href="/whatsapp/campaigns" isNested />
              <SidebarItem id="wa-flows" name="Flows" href="/whatsapp/flows" isNested />
              <SidebarItem id="wa-buttons" name="Buttons" href="/whatsapp/buttons" isNested />
              <SidebarItem id="wa-media" name="Media" href="/whatsapp/media" isNested />
              <SidebarItem id="wa-catalog" name="Catalog Sync" href="/whatsapp/catalog" isNested />
              <SidebarItem id="wa-automation" name="Automation Rules" href="/whatsapp/automation" isNested />
              <SidebarItem id="wa-analytics" name="Analytics" href="/whatsapp/analytics" isNested />
              <SidebarItem id="wa-logs" name="Logs" href="/whatsapp/logs" isNested />
            </SidebarCollapsible>

            <SidebarCollapsible title="Email Center" icon={MailIcon}>
              <SidebarItem id="email-smtp" name="SMTP" href="/email/smtp" isNested />
              <SidebarItem id="email-resend" name="Resend" href="/email/resend" isNested />
              <SidebarItem id="email-sendgrid" name="SendGrid" href="/email/sendgrid" isNested />
              <SidebarItem id="email-mailgun" name="Mailgun" href="/email/mailgun" isNested />
              <SidebarItem id="email-aws-ses" name="AWS SES" href="/email/aws-ses" isNested />
              <SidebarItem id="email-templates" name="Templates" href="/email/templates" isNested />
              <SidebarItem id="email-automation" name="Automation" href="/email/automation" isNested />
              <SidebarItem id="email-campaigns" name="Campaigns" href="/email/campaigns" isNested />
              <SidebarItem id="email-transactional" name="Transactional Emails" href="/email/transactional" isNested />
              <SidebarItem id="email-newsletter" name="Newsletter" href="/email/newsletter" isNested />
              <SidebarItem id="email-logs" name="Logs" href="/email/logs" isNested />
              <SidebarItem id="email-analytics" name="Analytics" href="/email/analytics" isNested />
            </SidebarCollapsible>

            <SidebarCollapsible title="SMS Center" icon={SmartphoneIcon}>
              <SidebarItem id="sms-providers" name="Providers" href="/sms/providers" isNested />
              <SidebarItem id="sms-templates" name="Templates" href="/sms/templates" isNested />
              <SidebarItem id="sms-otp" name="OTP Settings" href="/sms/otp" isNested />
              <SidebarItem id="sms-marketing" name="Marketing" href="/sms/marketing" isNested />
              <SidebarItem id="sms-campaigns" name="Campaigns" href="/sms/campaigns" isNested />
              <SidebarItem id="sms-logs" name="Logs" href="/sms/logs" isNested />
              <SidebarItem id="sms-analytics" name="Analytics" href="/sms/analytics" isNested />
            </SidebarCollapsible>
          </SidebarGroup>

          <SidebarGroup title="Content & CMS">
            <SidebarCollapsible title="Content" icon={FileTextIcon}>
              <SidebarItem id="cms-dashboard" name="Dashboard" href="/cms/dashboard" isNested />
              <SidebarItem id="cms-pages" name="Pages" href="/cms/pages" isNested />
              <SidebarItem id="cms-blog" name="Blog & Authors" href="/cms/blog" isNested />
              <SidebarItem id="cms-navigation" name="Navigation" href="/cms/navigation" isNested />
              <SidebarItem id="cms-components" name="Reusable Blocks" href="/cms/components" isNested />
            </SidebarCollapsible>
            
            <SidebarCollapsible title="Media Library" icon={ImageIcon} badge="26">
              <SidebarItem id="media-images" name="Images" href="/media/images" isNested />
              <SidebarItem id="media-videos" name="Videos" href="/media/videos" isNested />
              <SidebarItem id="media-documents" name="Documents" href="/media/documents" isNested />
              <SidebarItem id="media-icons" name="Icons" href="/media/icons" isNested />
              <SidebarItem id="media-logos" name="Logos" href="/media/logos" isNested />
              <SidebarItem id="media-banners" name="Banners" href="/media/banners" isNested />
              <SidebarItem id="media-folders" name="Folders" href="/media/folders" isNested />
              <SidebarItem id="media-search" name="Search" href="/media/search" isNested />
              <SidebarItem id="media-tags" name="Tags" href="/media/tags" isNested />
              <SidebarItem id="media-upload" name="Bulk Upload" href="/media/bulk-upload" isNested />
              <SidebarItem id="media-opt" name="Optimization" href="/media/optimization" isNested />
              <SidebarItem id="media-cdn" name="CDN" href="/media/cdn" isNested />
              <SidebarItem id="media-versions" name="Version History" href="/media/versions" isNested />
            </SidebarCollapsible>
          </SidebarGroup>

          <SidebarGroup title="SEO & Analytics">
            <SidebarCollapsible title="Search & SEO" icon={SearchIcon}>
              <SidebarItem id="seo-dashboard" name="SEO Dashboard" href="/seo/dashboard" isNested />
              <SidebarItem id="seo-settings" name="Global Settings" href="/seo/settings" isNested />
              <SidebarItem id="seo-content" name="Content SEO" href="/seo/content" isNested />
              <SidebarItem id="seo-social" name="Social Meta" href="/seo/social" isNested />
              <SidebarItem id="seo-urls" name="URL Management" href="/seo/urls" isNested />
              <SidebarItem id="seo-tracking" name="Tracking Pixels" href="/seo/tracking" isNested />
            </SidebarCollapsible>

            <SidebarCollapsible title="Store Analytics" icon={BarChart2Icon}>
              <SidebarItem id="analytics-revenue" name="Revenue" href="/analytics/revenue" isNested />
              <SidebarItem id="analytics-sales" name="Sales" href="/analytics/sales" isNested />
              <SidebarItem id="analytics-orders" name="Orders" href="/analytics/orders" isNested />
              <SidebarItem id="analytics-customers" name="Customers" href="/analytics/customers" isNested />
              <SidebarItem id="analytics-traffic" name="Traffic" href="/analytics/traffic" isNested />
              <SidebarItem id="analytics-funnels" name="Funnels" href="/analytics/funnels" isNested />
              <SidebarItem id="analytics-campaigns" name="Campaigns" href="/analytics/campaigns" isNested />
              <SidebarItem id="analytics-heatmaps" name="Heatmaps" href="/analytics/heatmaps" isNested />
              <SidebarItem id="analytics-devices" name="Devices" href="/analytics/devices" isNested />
              <SidebarItem id="analytics-locations" name="Locations" href="/analytics/locations" isNested />
              <SidebarItem id="analytics-top-products" name="Top Products" href="/analytics/top-products" isNested />
              <SidebarItem id="analytics-conversion" name="Conversion" href="/analytics/conversion" isNested />
              <SidebarItem id="analytics-real-time" name="Real Time" href="/analytics/real-time" isNested />
              <SidebarItem id="analytics-reports" name="Reports" href="/analytics/reports" isNested />
              <SidebarItem id="analytics-custom" name="Custom Dashboards" href="/analytics/custom" isNested />
            </SidebarCollapsible>
          </SidebarGroup>

          <SidebarGroup title="AI Studio">
            <SidebarCollapsible title="AI Assistants" icon={SparklesIcon}>
              <SidebarItem id="ai-product-writer" name="AI Product Writer" href="/ai/product-writer" isNested />
              <SidebarItem id="ai-seo" name="AI SEO" href="/ai/seo" isNested />
              <SidebarItem id="ai-blog" name="AI Blog" href="/ai/blog" isNested />
              <SidebarItem id="ai-banner" name="AI Banner" href="/ai/banner" isNested />
              <SidebarItem id="ai-email" name="AI Email" href="/ai/email" isNested />
              <SidebarItem id="ai-whatsapp" name="AI WhatsApp" href="/ai/whatsapp" isNested />
              <SidebarItem id="ai-translation" name="AI Translation" href="/ai/translation" isNested />
              <SidebarItem id="ai-faq" name="AI FAQ" href="/ai/faq" isNested />
              <SidebarItem id="ai-review-response" name="AI Review Response" href="/ai/review-response" isNested />
              <SidebarItem id="ai-image-generator" name="AI Image Generator" href="/ai/image-generator" isNested />
              <SidebarItem id="ai-theme-assistant" name="AI Theme Assistant" href="/ai/theme-assistant" isNested />
              <SidebarItem id="ai-store-optimizer" name="AI Store Optimizer" href="/ai/store-optimizer" isNested />
            </SidebarCollapsible>
          </SidebarGroup>

          <SidebarGroup title="Data & Reports">
            <SidebarCollapsible title="Reporting Hub" icon={FileSpreadsheetIcon}>
              <SidebarItem id="reports-sales" name="Sales Report" href="/reports/sales" isNested />
              <SidebarItem id="reports-orders" name="Orders Report" href="/reports/orders" isNested />
              <SidebarItem id="reports-inventory" name="Inventory Report" href="/reports/inventory" isNested />
              <SidebarItem id="reports-tax" name="Tax Report" href="/reports/tax" isNested />
              <SidebarItem id="reports-gst" name="GST Report" href="/reports/gst" isNested />
              <SidebarItem id="reports-profit" name="Profit Report" href="/reports/profit" isNested />
              <SidebarItem id="reports-expenses" name="Expenses Report" href="/reports/expenses" isNested />
              <SidebarItem id="reports-marketing" name="Marketing Report" href="/reports/marketing" isNested />
              <SidebarItem id="reports-shipping" name="Shipping Report" href="/reports/shipping" isNested />
              <SidebarItem id="reports-customer" name="Customer Report" href="/reports/customer" isNested />
              <SidebarItem id="reports-export-csv" name="Export to CSV" href="/reports/export-csv" isNested />
              <SidebarItem id="reports-export-excel" name="Export to Excel" href="/reports/export-excel" isNested />
              <SidebarItem id="reports-export-pdf" name="Export to PDF" href="/reports/export-pdf" isNested />
              <SidebarItem id="reports-scheduled" name="Scheduled Reports" href="/reports/scheduled" isNested />
            </SidebarCollapsible>
          </SidebarGroup>

          <SidebarGroup title="Team & Workspace">
            <SidebarCollapsible title="Users & Staff" icon={UsersIcon}>
              <SidebarItem id="staff-list" name="Staff List" href="/staff/list" isNested />
              <SidebarItem id="staff-invite" name="Invite Staff" href="/staff/invite" isNested />
              <SidebarItem id="staff-departments" name="Departments" href="/staff/departments" isNested />
              <SidebarItem id="staff-teams" name="Teams" href="/staff/teams" isNested />
              <SidebarItem id="staff-roles" name="Roles" href="/staff/roles" isNested />
              <SidebarItem id="staff-permissions" name="Permissions" href="/staff/permissions" isNested />
              <SidebarItem id="staff-activity" name="Activity Logs" href="/staff/activity" isNested />
              <SidebarItem id="staff-sessions" name="Active Sessions" href="/staff/sessions" isNested />
              <SidebarItem id="staff-devices" name="Devices" href="/staff/devices" isNested />
              <SidebarItem id="staff-attendance" name="Attendance" href="/staff/attendance" isNested />
            </SidebarCollapsible>
          </SidebarGroup>

          <SidebarGroup title="Security">
            <SidebarCollapsible title="Security" icon={ShieldIcon} badge="23">
              <SidebarItem id="security-password" name="Password" href="/security/password" isNested />
              <SidebarItem id="security-2fa" name="2FA" href="/security/2fa" isNested />
              <SidebarItem id="security-devices" name="Devices" href="/security/devices" isNested />
              <SidebarItem id="security-sessions" name="Sessions" href="/security/sessions" isNested />
              <SidebarItem id="security-login-history" name="Login History" href="/security/login-history" isNested />
              <SidebarItem id="security-api-keys" name="API Keys" href="/security/api-keys" isNested />
              <SidebarItem id="security-webhooks" name="Webhooks" href="/security/webhooks" isNested />
              <SidebarItem id="security-oauth" name="OAuth Apps" href="/security/oauth" isNested />
              <SidebarItem id="security-audit" name="Audit Logs" href="/security/audit" isNested />
              <SidebarItem id="security-ip" name="IP Restrictions" href="/security/ip" isNested />
              <SidebarItem id="security-trusted" name="Trusted Devices" href="/security/trusted" isNested />
            </SidebarCollapsible>
          </SidebarGroup>

          <SidebarGroup title="Automations & Workflows">
            <SidebarCollapsible title="Automation" icon={ZapIcon} badge="25">
              <SidebarItem id="auto-builder" name="Workflow Builder" href="/automation/builder" isNested />
              <SidebarItem id="auto-triggers" name="Triggers" href="/automation/triggers" isNested />
              <SidebarItem id="auto-conditions" name="Conditions" href="/automation/conditions" isNested />
              <SidebarItem id="auto-actions" name="Actions" href="/automation/actions" isNested />
              <SidebarItem id="auto-email" name="Email" href="/automation/email" isNested />
              <SidebarItem id="auto-whatsapp" name="WhatsApp" href="/automation/whatsapp" isNested />
              <SidebarItem id="auto-sms" name="SMS" href="/automation/sms" isNested />
              <SidebarItem id="auto-inventory" name="Inventory" href="/automation/inventory" isNested />
              <SidebarItem id="auto-orders" name="Orders" href="/automation/orders" isNested />
              <SidebarItem id="auto-customers" name="Customers" href="/automation/customers" isNested />
              <SidebarItem id="auto-marketing" name="Marketing" href="/automation/marketing" isNested />
              <SidebarItem id="auto-ai" name="AI Actions" href="/automation/ai" isNested />
              <SidebarItem id="auto-scheduler" name="Scheduler" href="/automation/scheduler" isNested />
              <SidebarItem id="auto-logs" name="Execution Logs" href="/automation/logs" isNested />
            </SidebarCollapsible>
          </SidebarGroup>

          <SidebarGroup title="Apps & Integrations">
            <SidebarCollapsible title="Integrations" icon={PuzzleIcon} badge="24">
              <SidebarItem id="int-google" name="Google" href="/integrations/google" isNested />
              <SidebarItem id="int-facebook" name="Facebook" href="/integrations/facebook" isNested />
              <SidebarItem id="int-instagram" name="Instagram" href="/integrations/instagram" isNested />
              <SidebarItem id="int-meta" name="Meta Commerce" href="/integrations/meta" isNested />
              <SidebarItem id="int-tiktok" name="TikTok" href="/integrations/tiktok" isNested />
              <SidebarItem id="int-youtube" name="YouTube" href="/integrations/youtube" isNested />
              <SidebarItem id="int-slack" name="Slack" href="/integrations/slack" isNested />
              <SidebarItem id="int-discord" name="Discord" href="/integrations/discord" isNested />
              <SidebarItem id="int-telegram" name="Telegram" href="/integrations/telegram" isNested />
              <SidebarItem id="int-github" name="GitHub" href="/integrations/github" isNested />
              <SidebarItem id="int-zapier" name="Zapier" href="/integrations/zapier" isNested />
              <SidebarItem id="int-webhooks" name="Webhooks" href="/integrations/webhooks" isNested />
              <SidebarItem id="int-custom-apis" name="Custom APIs" href="/integrations/custom-apis" isNested />
            </SidebarCollapsible>
          </SidebarGroup>

          <SidebarGroup title="Sales Channels">
            {storefrontNav.map(item => <SidebarItem key={item.id} {...item} />)}
          </SidebarGroup>

          <SidebarGroup title="Configuration">
            <SidebarCollapsible title="Settings" icon={SettingsIcon} badge="27">
              <SidebarItem id="set-general" name="General" href="/settings/general" isNested />
              <SidebarItem id="set-business-profile" name="Business Profile" href="/settings/business-profile" isNested />
              <SidebarItem id="set-branding" name="Branding" href="/settings/branding" isNested />
              <SidebarItem id="set-logo" name="Logo" href="/settings/logo" isNested />
              <SidebarItem id="set-favicon" name="Favicon" href="/settings/favicon" isNested />
              <SidebarItem id="set-fonts" name="Fonts" href="/settings/fonts" isNested />
              <SidebarItem id="set-colors" name="Colors" href="/settings/colors" isNested />
              <SidebarItem id="set-language" name="Language" href="/settings/language" isNested />
              <SidebarItem id="set-currency" name="Currency" href="/settings/currency" isNested />
              <SidebarItem id="set-timezone" name="Timezone" href="/settings/timezone" isNested />
              <SidebarItem id="set-tax" name="Tax" href="/settings/tax" isNested />
              <SidebarItem id="set-invoice" name="Invoice" href="/settings/invoice" isNested />
              <SidebarItem id="set-checkout" name="Checkout" href="/settings/checkout" isNested />
              <SidebarItem id="set-notifications" name="Notifications" href="/settings/notifications" isNested />
              <SidebarItem id="set-privacy" name="Privacy" href="/settings/privacy" isNested />
              <SidebarItem id="set-legal" name="Legal" href="/settings/legal" isNested />
              <SidebarItem id="set-maintenance" name="Maintenance Mode" href="/settings/maintenance" isNested />
              <SidebarItem id="set-backup" name="Backup" href="/settings/backup" isNested />
              <SidebarItem id="set-restore" name="Restore" href="/settings/restore" isNested />
              <SidebarItem id="set-import" name="Import" href="/settings/import" isNested />
              <SidebarItem id="set-export" name="Export" href="/settings/export" isNested />
            </SidebarCollapsible>
            {settingsNav.map(item => <SidebarItem key={item.id} {...item} />)}
          </SidebarGroup>

          <SidebarGroup title="Developer">
            <SidebarCollapsible title="Developer Center" icon={CodeIcon} badge="29">
              <SidebarItem id="dev-api-keys" name="API Keys" href="/developer/api-keys" isNested />
              <SidebarItem id="dev-webhooks" name="Webhooks" href="/developer/webhooks" isNested />
              <SidebarItem id="dev-sdk" name="SDK" href="/developer/sdk" isNested />
              <SidebarItem id="dev-oauth" name="OAuth Apps" href="/developer/oauth" isNested />
              <SidebarItem id="dev-scripts" name="Custom Scripts" href="/developer/scripts" isNested />
              <SidebarItem id="dev-env-vars" name="Environment Variables" href="/developer/env-vars" isNested />
              <SidebarItem id="dev-logs" name="Logs" href="/developer/logs" isNested />
              <SidebarItem id="dev-docs" name="Developer Documentation" href="/developer/documentation" isNested />
            </SidebarCollapsible>
          </SidebarGroup>

          <SidebarGroup title="Support & Community">
            <SidebarCollapsible title="Support Center" icon={LifeBuoyIcon} badge="28">
              <SidebarItem id="sup-tickets" name="Tickets" href="/support/tickets" isNested />
              <SidebarItem id="sup-live-chat" name="Live Chat" href="/support/live-chat" isNested />
              <SidebarItem id="sup-knowledge-base" name="Knowledge Base" href="/support/knowledge-base" isNested />
              <SidebarItem id="sup-documentation" name="Documentation" href="/support/documentation" isNested />
              <SidebarItem id="sup-contact" name="Contact Support" href="/support/contact" isNested />
              <SidebarItem id="sup-features" name="Feature Requests" href="/support/features" isNested />
              <SidebarItem id="sup-bugs" name="Bug Reports" href="/support/bugs" isNested />
              <SidebarItem id="sup-community" name="Community" href="/support/community" isNested />
            </SidebarCollapsible>
          </SidebarGroup>
        </>
      )}
    </AppSidebar>
  );
}
