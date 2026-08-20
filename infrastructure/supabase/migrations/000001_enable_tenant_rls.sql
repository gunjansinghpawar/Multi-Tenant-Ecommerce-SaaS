-- Migration: Enable Row Level Security (RLS) for Tenant Isolation
-- Layer 5 of Defense in Depth

-- 1. Create a helper function to get the current tenant ID from the session context
CREATE OR REPLACE FUNCTION current_tenant_id() RETURNS UUID AS $$
BEGIN
  -- We read 'app.current_tenant_id' from the current Postgres session/transaction
  -- Using NULLIF to return NULL if it's not set, rather than throwing an error for superusers
  RETURN NULLIF(current_setting('app.current_tenant_id', true), '')::UUID;
EXCEPTION WHEN OTHERS THEN
  RETURN NULL;
END;
$$ LANGUAGE plpgsql STABLE;

-- 2. Define the tables that belong to a tenant
-- 'Tenant' itself is global (managed by SuperAdmin or Owner), but its children are isolated.

-- Apply RLS to Product
ALTER TABLE "Product" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "product_tenant_isolation" ON "Product"
  AS RESTRICTIVE FOR ALL
  TO authenticated
  USING (tenantId = current_tenant_id());

-- Apply RLS to Category
ALTER TABLE "Category" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "category_tenant_isolation" ON "Category"
  AS RESTRICTIVE FOR ALL
  TO authenticated
  USING (tenantId = current_tenant_id());

-- Apply RLS to Customer
ALTER TABLE "Customer" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "customer_tenant_isolation" ON "Customer"
  AS RESTRICTIVE FOR ALL
  TO authenticated
  USING (tenantId = current_tenant_id());

-- Apply RLS to Order
ALTER TABLE "Order" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "order_tenant_isolation" ON "Order"
  AS RESTRICTIVE FOR ALL
  TO authenticated
  USING (tenantId = current_tenant_id());

-- Apply RLS to Payment
ALTER TABLE "Payment" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "payment_tenant_isolation" ON "Payment"
  AS RESTRICTIVE FOR ALL
  TO authenticated
  USING (tenantId = current_tenant_id());

-- Apply RLS to Shipment
ALTER TABLE "Shipment" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "shipment_tenant_isolation" ON "Shipment"
  AS RESTRICTIVE FOR ALL
  TO authenticated
  USING (tenantId = current_tenant_id());

-- Apply RLS to Coupon
ALTER TABLE "Coupon" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "coupon_tenant_isolation" ON "Coupon"
  AS RESTRICTIVE FOR ALL
  TO authenticated
  USING (tenantId = current_tenant_id());

-- Apply RLS to Subscription
ALTER TABLE "Subscription" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "subscription_tenant_isolation" ON "Subscription"
  AS RESTRICTIVE FOR ALL
  TO authenticated
  USING (tenantId = current_tenant_id());

-- Apply RLS to BillingProfile
ALTER TABLE "BillingProfile" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "billingprofile_tenant_isolation" ON "BillingProfile"
  AS RESTRICTIVE FOR ALL
  TO authenticated
  USING (tenantId = current_tenant_id());

-- Apply RLS to Domain
ALTER TABLE "Domain" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "domain_tenant_isolation" ON "Domain"
  AS RESTRICTIVE FOR ALL
  TO authenticated
  USING (tenantId = current_tenant_id());

-- Apply RLS to Integration
ALTER TABLE "Integration" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "integration_tenant_isolation" ON "Integration"
  AS RESTRICTIVE FOR ALL
  TO authenticated
  USING (tenantId = current_tenant_id());

-- Apply RLS to ThemeAssignment
ALTER TABLE "ThemeAssignment" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "themeassignment_tenant_isolation" ON "ThemeAssignment"
  AS RESTRICTIVE FOR ALL
  TO authenticated
  USING (tenantId = current_tenant_id());

-- Apply RLS to TenantSettings
ALTER TABLE "TenantSettings" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "tenantsettings_tenant_isolation" ON "TenantSettings"
  AS RESTRICTIVE FOR ALL
  TO authenticated
  USING (tenantId = current_tenant_id());

-- Note: In a production Supabase setup, 'authenticated' role is used when connecting via PostgREST.
-- Since Prisma connects directly to the DB, Prisma typically connects as a superuser ('postgres') 
-- which bypasses RLS by default. To make this work with Prisma, the connection string used by 
-- the app MUST be a non-superuser role (e.g., 'authenticated' or a custom 'app_user' role)
-- and the Prisma Client extension must explicitly set 'app.current_tenant_id'.
