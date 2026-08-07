# 10. Reports

## 1. Purpose & Overview
Generate, schedule, and export custom platform reports.

## 2. User Flow & Navigation
- **Entry Point**: Sidebar > Reports
- **Primary Actions**: Managing data, monitoring health, or executing administrative overrides.
- **Exit Points**: Global Search, Settings, or returning to Dashboard.

## 3. Layout Architecture
- **Page Header**: Distinct Title, Breadcrumb (Super Admin > Reports).
- **Layout Type**: Custom SaaS Layout optimized for high-density data.
- **Widgets / Sections**: Focuses on Report Builder Wizard.

## 4. Key UI Components
- **Core Elements**: Report Builder Wizard, Scheduled Reports List
- **Interactive Elements**: Context menus for quick actions, Cmd+K shortcuts.

## 5. API & Data Requirements
- **Required Endpoints**: REST endpoints for CRUD operations.
- **Caching**: SWR/React Query caching strategy applied for responsive UI.

## 6. Permissions & RBAC
- **Required Roles**: Super Admin, Support Staff (Read-Only).
- **Granular Permissions**: `super_admin:reports:read`, `super_admin:reports:write`

## 7. Edge Cases & States
- **Empty State**: Minimalist "No Data" illustration.
- **Loading State**: Staggered skeleton loaders matching the table/grid layout.

---
*Designed for CommerceX Super Admin - Premium SaaS UI/UX Architecture.*
