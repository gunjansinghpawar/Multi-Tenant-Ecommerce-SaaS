# CommerceX — Enterprise Multi-Tenant Ecommerce SaaS Platform

## Architecture Overview

CommerceX is built as an enterprise-grade multi-tenant SaaS workspace adhering strictly to modular monorepo boundaries:

### Multi-Database Architecture

To ensure high performance, scalability, and strict separation of concerns, the platform enforces a multi-database architecture. Each database serves a distinct and non-overlapping purpose:

#### 1. Primary Database (PostgreSQL)
- **Role:** The authoritative source of truth for all transactional ecommerce data.
- **Stack:** Supabase PostgreSQL + Prisma ORM.
- **Use Cases:** Tenants, Users, Products, Orders, Payments, Memberships, Shipping, Coupons.

#### 2. Document Database (MongoDB)
- **Role:** Document-oriented storage where flexible schemas provide genuine advantages.
- **Stack:** Mongoose + MongoDB.
- **Use Cases:** CMS documents, Theme configurations, Page builder blocks, Dynamic content, Versioned page revisions, AI-generated content, Complex non-relational configurations.
- **Rule:** Do NOT duplicate authoritative transactional data here.

#### 3. In-Memory Store (Redis)
- **Role:** High-speed volatile data and background coordination.
- **Stack:** ioredis + Redis.
- **Use Cases:** Caching, Rate limiting, Temporary OTP state, Sessions, Distributed locks, Job queues, Idempotency support, Frequently accessed configuration.

#### 4. Object Storage
- **Role:** Secure, scalable file hosting.
- **Stack:** Supabase Storage, Cloudflare R2, Cloudinary (Configurable per tenant).
- **Use Cases:** Product images, Videos, Documents, Logos, Theme assets, Invoices, Exports.

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
