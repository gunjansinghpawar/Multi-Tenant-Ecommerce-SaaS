# 25. Security Center

## 1. Purpose & Overview
WAF rules, blocked IPs, and brute-force attempt logs.

## 2. User Flow & Navigation
- **Entry Point**: Sidebar > Security Center
- **Primary Actions**: Managing data, monitoring health, or executing administrative overrides.
- **Exit Points**: Global Search, Settings, or returning to Dashboard.

## 3. Layout Architecture
- **Page Header**: Distinct Title, Breadcrumb (Super Admin > Security Center).
- **Layout Type**: Custom SaaS Layout optimized for high-density data.
- **Widgets / Sections**: Focuses on Threat Map Widget.

## 4. Key UI Components
- **Core Elements**: Threat Map Widget, Blocklist Data Table
- **Interactive Elements**: Context menus for quick actions, Cmd+K shortcuts.

## 5. API & Data Requirements
- **Required Endpoints**: REST endpoints for CRUD operations.
- **Caching**: SWR/React Query caching strategy applied for responsive UI.

## 6. Permissions & RBAC
- **Required Roles**: Super Admin, Support Staff (Read-Only).
- **Granular Permissions**: `super_admin:security_center:read`, `super_admin:security_center:write`

## 7. Edge Cases & States
- **Empty State**: Minimalist "No Data" illustration.
- **Loading State**: Staggered skeleton loaders matching the table/grid layout.

---
*Designed for CommerceX Super Admin - Premium SaaS UI/UX Architecture.*
