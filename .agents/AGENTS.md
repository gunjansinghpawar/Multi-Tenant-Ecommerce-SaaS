# Trust Requirements

- Never fabricate Customer logos, Testimonials, Reviews, Revenue numbers, User counts, Security certifications, Performance statistics, Awards, Partnerships, or Case studies.
- Use placeholders clearly marked as demo content until real information exists.

# Design Differentiation

- The website must NOT look like: Generic AI SaaS, Bootstrap template, Tailwind template, Framer template, Webflow template, Shopify clone, Vercel clone, Stripe clone, or an AI-generated landing page.
- Create an original visual language using: Strong editorial composition, Real product UI, Asymmetric layouts where appropriate, Purposeful typography, High-quality spacing, Controlled color, Premium motion, Interactive product storytelling, Technical diagrams, and Product-led design.

# Security Architecture

- **Defense in Depth**: Follow OWASP ASVS, OWASP Top 10, and OWASP API Security guidance. Ensure secure authentication, session management, and supply-chain practices. Build measurable security controls rather than claiming the system is "unhackable".
- **Authorization & IDOR**: Every protected endpoint must verify Authenticated User, Membership, Tenant, Role, Permission, and Resource Ownership. Never rely on hidden buttons, frontend routes, or client-side conditions for security. Always scope DB queries strictly (e.g., to tenant) to prevent IDOR.
- **Mass Assignment & Input Validation**: Never blindly accept request bodies. Use explicit DTOs/schemas (Zod) and strip unknown/sensitive fields (e.g., `tenant_id`, `role`, `is_super_admin`). Validate everything server-side including Strings, Numbers, Enums, Dates, URLs, Emails, File metadata, Arrays, Nested objects, Pagination, Sorting, Filters, and Webhook payloads.
- **XSS Protection**: Sanitize all user-generated HTML (CMS, Blogs, Product descriptions, Reviews, Comments, Custom HTML, Builder blocks) server-side. Never blindly render untrusted HTML.
- **SQL Injection**: Exclusively use Prisma parameterized queries (the default). Never concatenate SQL from user input. If raw SQL is absolutely necessary, parameterize it strictly using Prisma's tagged templates.
- **CSRF & CORS**: Protect state-changing browser requests using secure cookie strategies and CSRF protection. Never use `Access-Control-Allow-Origin: *` for authenticated APIs. Use explicit allowed origins and tightly differentiate between Marketing, Admin, Storefront, and API domains.
- **Rate Limiting**: Implement distributed rate limiting to protect critical paths including: Login, Register, Password reset, OTP, Search, Checkout, Payment, API keys, Webhooks, Contact forms, Newsletter, AI, WhatsApp, SMS, Exports, Imports, and Admin APIs.
- **Brute Force Protection**: Track failed attempts and progressively throttle suspicious behavior. Never reveal whether a specific email account exists in password reset flows.
- **File Upload Security**: Never trust file extensions. Validate MIME type, file signature, size, dimensions, filename, and storage path. Use generated storage keys and never expose arbitrary filesystem paths or allow executable uploads. Images should be transformed through a safe image pipeline.
- **Secrets Management**: Never store provider credentials (e.g., WhatsApp tokens, payment secrets, SMTP passwords, API keys) in plaintext. Encrypt sensitive credentials at rest. Encryption keys must be managed outside application source code (via deployment secret-management). Never return secrets in API responses.
- **Security Headers**: Configure appropriate CSP, HSTS, X-Content-Type-Options, Referrer-Policy, Frame protection, Permissions Policy, and Secure cookie flags. Do not blindly copy a header configuration without testing compatibility with the storefront, builder, and integrations.
- **SSRF Protection**: Do not allow arbitrary internal network requests (Webhooks, URLs, Image imports). Block private/internal address ranges and strictly validate all outbound URLs.
- **Webhook Security**: Strictly verify Signature, Timestamp, Nonce/Replay protection, Provider identity, Idempotency, and Payload schema on every webhook.
- **AI Security**: AI features must not have unrestricted access to internal systems. Never allow AI prompts to directly execute SQL, Shell commands, Admin APIs, Payment actions, or Database mutations unless explicitly mediated by safe tools with authorization. Use tool allowlists, permission checks, input/output validation, rate limits, and audit logs.
- **Admin Security**: The Super Admin application requires maximum protection. Enforce strong authentication (MFA), shorter session lifetimes, reauthentication for destructive actions, comprehensive audit logs, strict permission checks, IP/device controls, and sensitive-action confirmation (optional approval workflows).
- **Security Events**: Track suspicious events via audit logs: Failed login bursts, Impossible session patterns, Permission failures, Cross-tenant access attempts, Token misuse, Webhook signature failures, Rate-limit violations, Suspicious API activity, Credential changes, MFA changes, API key creation/revocation, Domain changes, and Payment configuration changes.
- **Audit Logging**: Maintain comprehensive audit trails for Create, Update, Delete, Publish, Unpublish, Permission changes, Role changes, Integration changes, Payment configuration, Domain configuration, Theme publishing, User invitations, Security changes, API key changes, Billing changes, and Super Admin actions.

# Architecture Guidelines

- **Provider Abstractions**: Create interfaces for external providers (PaymentProvider, ShippingProvider, EmailProvider, SmsProvider, WhatsAppProvider, StorageProvider, SearchProvider, AIProvider) to allow replacement without rewriting business logic.
- **Queue Architecture**: Use background jobs for expensive operations (Email/SMS sending, Invoice/PDF/Image processing, Imports/Exports, Analytics, Search indexing, Theme publishing, Webhook retries, AI generation, Abandoned cart, Scheduled campaigns).
- **Job Requirements**: Every job must support Retry, Backoff, Timeout, Idempotency, Failure handling, Dead-letter queue, Logging, Monitoring, and Cancellation where appropriate.
- **Caching**: Cache only appropriate data (Tenant settings, Theme config, Storefront config, Categories, Navigation, Permissions, Feature flags, Product data). Never cache sensitive mutable information without an invalidation strategy. Every cache must explicitly define: TTL, Key, Invalidation strategy, Version, and Fallback mechanism.
- **Transactions**: Use database transactions for multi-step operations (e.g. Create order, Reserve inventory, Apply coupon, Create payment intent, Create fulfillment, Refund, Stock transfer, Role changes, Tenant provisioning).
- **Concurrency**: Protect against race conditions (e.g. two customers buying the last item, two admins editing the same product, duplicate payment webhooks). Use Transactions, Unique constraints, Optimistic locking (where useful), Pessimistic locking (where justified), Idempotency, and Atomic updates.

# API Routing Guidelines

- **Storefront API (`/api/v1/storefront/*`)**: Public APIs for the storefront. Must never expose admin-only fields.
- **Admin API (`/api/v1/admin/*`)**: Tenant admin panel APIs. Requires strict authorization.
- **Super Admin API (`/api/v1/platform/*`)**: Separate privileged namespace for global platform management. Apply additional security controls.
- **Marketing API (`/api/v1/public/*`)**: Read-only endpoints for marketing pages. Do not expose internal platform data.
