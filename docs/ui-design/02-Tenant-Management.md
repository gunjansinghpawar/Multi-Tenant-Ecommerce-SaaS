# 02. Tenant Management

## 1. Purpose & Overview
Manage platform tenants (stores), view global tenant metrics, and handle life cycles.

## 2. User Flow & Navigation
- **Entry Point**: Sidebar > Tenant Management
- **Primary Actions**: Managing data, monitoring health, or executing administrative overrides.
- **Exit Points**: Global Search, Settings, or returning to Dashboard.

## 3. Layout Architecture
- **Page Header**: Distinct Title, Breadcrumb (Super Admin > Tenant Management).
- **Layout Type**: Custom SaaS Layout optimized for high-density data.
- **Widgets / Sections**: Focuses on Tenant Data Grid.

## 4. Key UI Components
- **Core Elements**: Tenant Data Grid, Suspend Tenant Dialog, Impersonate Button
- **Interactive Elements**: Context menus for quick actions, Cmd+K shortcuts.

## 5. API & Data Requirements
- **Required Endpoints**: REST endpoints for CRUD operations.
- **Caching**: SWR/React Query caching strategy applied for responsive UI.

## 6. Permissions & RBAC
- **Required Roles**: Super Admin, Support Staff (Read-Only).
- **Granular Permissions**: `super_admin:tenant_management:read`, `super_admin:tenant_management:write`

## 7. Edge Cases & States
- **Empty State**: Minimalist "No Data" illustration.
- **Loading State**: Staggered skeleton loaders matching the table/grid layout.

---
*Designed for CommerceX Super Admin - Premium SaaS UI/UX Architecture.*
