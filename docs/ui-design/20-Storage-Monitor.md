# 20. Storage Monitor

## 1. Purpose & Overview
Track S3 bucket usage and media limits.

## 2. User Flow & Navigation
- **Entry Point**: Sidebar > Storage Monitor
- **Primary Actions**: Managing data, monitoring health, or executing administrative overrides.
- **Exit Points**: Global Search, Settings, or returning to Dashboard.

## 3. Layout Architecture
- **Page Header**: Distinct Title, Breadcrumb (Super Admin > Storage Monitor).
- **Layout Type**: Custom SaaS Layout optimized for high-density data.
- **Widgets / Sections**: Focuses on Storage TreeMap.

## 4. Key UI Components
- **Core Elements**: Storage TreeMap, Bucket Usage Bars
- **Interactive Elements**: Context menus for quick actions, Cmd+K shortcuts.

## 5. API & Data Requirements
- **Required Endpoints**: REST endpoints for CRUD operations.
- **Caching**: SWR/React Query caching strategy applied for responsive UI.

## 6. Permissions & RBAC
- **Required Roles**: Super Admin, Support Staff (Read-Only).
- **Granular Permissions**: `super_admin:storage_monitor:read`, `super_admin:storage_monitor:write`

## 7. Edge Cases & States
- **Empty State**: Minimalist "No Data" illustration.
- **Loading State**: Staggered skeleton loaders matching the table/grid layout.

---
*Designed for CommerceX Super Admin - Premium SaaS UI/UX Architecture.*
