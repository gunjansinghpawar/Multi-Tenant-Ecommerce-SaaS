# CommerceX — Enterprise Multi-Tenant Ecommerce SaaS Platform

## Architecture Overview

CommerceX is built as an enterprise-grade multi-tenant SaaS workspace adhering strictly to modular monorepo boundaries:

### Workspaces & Layout

```text
apps/
  super-admin/     # Platform Super Admin portal
  admin/           # Multi-tenant Merchant Admin portal
  storefront/      # Default Tenant Storefront app

packages/
  ui/              # Shared UI components & design system design tokens
  auth/            # Better-Auth / Authentication middleware & guards
  database/        # Prisma Client & tenant isolation wrappers
  config/          # Shared configuration and environment schemas
  services/        # Domain service layer
  permissions/     # RBAC matrix and authorization guards
  validation/      # Shared Zod schemas
  logger/          # Structured logger abstraction
  notifications/   # Multi-channel notification handlers
  utils/           # Core utility functions
  types/           # TypeScript interfaces & domain types

infrastructure/     # Infrastructure definitions
docs/               # Architectural records & operational guides
```
