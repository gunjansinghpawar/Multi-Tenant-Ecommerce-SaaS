/**
 * CommerceX — Master Seed Script
 * 
 * Seeds:
 *   1. Permissions (PostgreSQL)
 *   2. Roles (PostgreSQL)
 *   3. Role ↔ Permission links (PostgreSQL)
 *   4. Test users (Supabase Auth)
 *   5. User records (PostgreSQL)
 *   6. User ↔ Role links (PostgreSQL)
 *   7. Demo Tenant + TenantSettings (PostgreSQL)
 * 
 * Usage: node scripts/seed.js
 */

const { PrismaClient } = require('@prisma/client');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const dotenv = require('dotenv');

// ── Load environment ──────────────────────────────────────
dotenv.config({ path: path.join(__dirname, '../.env') });

const prisma = new PrismaClient();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

// ── Permission Definitions ────────────────────────────────
const PERMISSION_DEFINITIONS = [
  // Platform
  { key: 'platform:metrics:read', name: 'View Platform Metrics', description: 'View system-wide analytics and health metrics.', category: 'Platform' },
  { key: 'platform:settings:manage', name: 'Manage Platform Settings', description: 'Modify global platform configuration.', category: 'Platform' },
  // Tenant
  { key: 'tenant:create', name: 'Create Tenant', description: 'Create new tenant stores on the platform.', category: 'Tenant' },
  { key: 'tenant:read', name: 'View Tenants', description: 'View tenant details and listings.', category: 'Tenant' },
  { key: 'tenant:update', name: 'Update Tenant', description: 'Edit tenant information and settings.', category: 'Tenant' },
  { key: 'tenant:delete', name: 'Delete Tenant', description: 'Permanently delete a tenant.', category: 'Tenant' },
  { key: 'tenant:suspend', name: 'Suspend Tenant', description: 'Suspend or reactivate a tenant.', category: 'Tenant' },
  // Users
  { key: 'user:create', name: 'Create User', description: 'Create new user accounts.', category: 'Users' },
  { key: 'user:read', name: 'View Users', description: 'View user profiles and listings.', category: 'Users' },
  { key: 'user:update', name: 'Update User', description: 'Edit user details and status.', category: 'Users' },
  { key: 'user:delete', name: 'Delete User', description: 'Permanently delete a user account.', category: 'Users' },
  { key: 'user:invite', name: 'Invite User', description: 'Send invitations to new users.', category: 'Users' },
  // Roles
  { key: 'role:create', name: 'Create Role', description: 'Define new roles.', category: 'Roles' },
  { key: 'role:read', name: 'View Roles', description: 'View role definitions and permissions.', category: 'Roles' },
  { key: 'role:update', name: 'Update Role', description: 'Modify role permissions.', category: 'Roles' },
  { key: 'role:delete', name: 'Delete Role', description: 'Remove a role from the system.', category: 'Roles' },
  { key: 'role:assign', name: 'Assign Role', description: 'Assign or remove roles from users.', category: 'Roles' },
  // Store
  { key: 'store:settings:read', name: 'View Store Settings', description: 'View store configuration and settings.', category: 'Store' },
  { key: 'store:settings:update', name: 'Update Store Settings', description: 'Modify store settings.', category: 'Store' },
  { key: 'store:branding:update', name: 'Update Store Branding', description: 'Modify store logo, colors, and theme.', category: 'Store' },
  // Staff
  { key: 'staff:manage', name: 'Manage Staff', description: 'Manage team members and their access.', category: 'Staff' },
  // Audit
  { key: 'audit:read', name: 'View Audit Logs', description: 'View system activity and change history.', category: 'Audit' },
  // Products
  { key: 'product:create', name: 'Create Product', description: 'Add new products to the store.', category: 'Products' },
  { key: 'product:read', name: 'View Products', description: 'View product catalog and details.', category: 'Products' },
  { key: 'product:update', name: 'Update Product', description: 'Edit product information and pricing.', category: 'Products' },
  { key: 'product:delete', name: 'Delete Product', description: 'Remove products from the store.', category: 'Products' },
  // Orders
  { key: 'order:read', name: 'View Orders', description: 'View order details and history.', category: 'Orders' },
  { key: 'order:update', name: 'Update Order', description: 'Update order status and details.', category: 'Orders' },
  { key: 'order:cancel', name: 'Cancel Order', description: 'Cancel pending or active orders.', category: 'Orders' },
  { key: 'order:refund', name: 'Refund Order', description: 'Process order refunds.', category: 'Orders' },
  // Customers
  { key: 'customer:read', name: 'View Customers', description: 'View customer profiles and data.', category: 'Customers' },
  { key: 'customer:update', name: 'Update Customer', description: 'Edit customer information.', category: 'Customers' },
  { key: 'customer:delete', name: 'Delete Customer', description: 'Remove customer records.', category: 'Customers' },
  // Analytics
  { key: 'analytics:read', name: 'View Analytics', description: 'View store analytics and reports.', category: 'Analytics' },
  // Discounts
  { key: 'discount:create', name: 'Create Discount', description: 'Create promotional discounts.', category: 'Discounts' },
  { key: 'discount:read', name: 'View Discounts', description: 'View active and past discounts.', category: 'Discounts' },
  { key: 'discount:update', name: 'Update Discount', description: 'Edit discount rules.', category: 'Discounts' },
  { key: 'discount:delete', name: 'Delete Discount', description: 'Remove discounts.', category: 'Discounts' },
];

// ── Role Definitions ──────────────────────────────────────
const ROLE_DEFINITIONS = [
  { name: 'SUPER_ADMIN', description: 'Platform-wide superuser with unrestricted access to all features, tenants, and system settings.', isSystem: true },
  { name: 'TENANT_ADMIN', description: 'Store owner with full control over their own tenant, including products, orders, team, and settings.', isSystem: true },
  { name: 'STAFF', description: 'Store team member with limited permissions defined by the tenant admin.', isSystem: true },
  { name: 'CUSTOMER', description: 'End-user who browses and purchases from the storefront.', isSystem: true },
];

// ── Role → Permission keys mapping ───────────────────────
const ROLE_PERMISSION_KEYS = {
  SUPER_ADMIN: PERMISSION_DEFINITIONS.map(p => p.key), // all permissions
  TENANT_ADMIN: [
    'store:settings:read', 'store:settings:update', 'store:branding:update',
    'user:create', 'user:read', 'user:update', 'user:delete', 'user:invite',
    'role:create', 'role:read', 'role:update', 'role:delete', 'role:assign',
    'staff:manage', 'audit:read',
    'product:create', 'product:read', 'product:update', 'product:delete',
    'order:read', 'order:update', 'order:cancel', 'order:refund',
    'customer:read', 'customer:update', 'customer:delete',
    'analytics:read',
    'discount:create', 'discount:read', 'discount:update', 'discount:delete',
  ],
  STAFF: [
    'store:settings:read', 'user:read', 'role:read',
    'product:read', 'product:update',
    'order:read', 'order:update',
    'customer:read', 'analytics:read', 'discount:read',
  ],
  CUSTOMER: [],
};

// ── Test Users ────────────────────────────────────────────
const TEST_USERS = [
  { email: 'superadmin@commercex.com', password: 'password123', name: 'Super Admin', role: 'SUPER_ADMIN', tenantId: null },
  { email: 'admin@commercex.com', password: 'password123', name: 'Store Admin', role: 'TENANT_ADMIN', tenantId: '__DEMO_TENANT__' },
  { email: 'staff@commercex.com', password: 'password123', name: 'Staff Member', role: 'STAFF', tenantId: '__DEMO_TENANT__' },
  { email: 'customer@commercex.com', password: 'password123', name: 'Test Customer', role: 'CUSTOMER', tenantId: '__DEMO_TENANT__' },
];

// ── Main Seed Function ────────────────────────────────────
async function seed() {
  console.log('🌱 CommerceX Seed Script Starting...\n');

  // ─ Step 1: Seed Permissions ─────────────────────────────
  console.log('📦 Step 1: Seeding permissions...');
  const permissionMap = {};
  for (const pDef of PERMISSION_DEFINITIONS) {
    const perm = await prisma.permission.upsert({
      where: { key: pDef.key },
      update: { name: pDef.name, description: pDef.description, category: pDef.category },
      create: { key: pDef.key, name: pDef.name, description: pDef.description, category: pDef.category },
    });
    permissionMap[pDef.key] = perm.id;
  }
  console.log(`   ✅ ${Object.keys(permissionMap).length} permissions seeded.\n`);

  // ─ Step 2: Seed Roles ───────────────────────────────────
  console.log('🛡️  Step 2: Seeding roles...');
  const roleMap = {};
  for (const rDef of ROLE_DEFINITIONS) {
    const role = await prisma.role.upsert({
      where: { name: rDef.name },
      update: { description: rDef.description, isSystem: rDef.isSystem },
      create: { name: rDef.name, description: rDef.description, isSystem: rDef.isSystem },
    });
    roleMap[rDef.name] = role.id;
  }
  console.log(`   ✅ ${Object.keys(roleMap).length} roles seeded.\n`);

  // ─ Step 3: Link Role ↔ Permissions ──────────────────────
  console.log('🔗 Step 3: Linking roles to permissions...');
  for (const [roleName, permKeys] of Object.entries(ROLE_PERMISSION_KEYS)) {
    const roleId = roleMap[roleName];
    // Clear existing links
    await prisma.rolePermission.deleteMany({ where: { roleId } });
    // Create new links
    for (const key of permKeys) {
      const permId = permissionMap[key];
      if (permId) {
        await prisma.rolePermission.create({
          data: { roleId, permissionId: permId }
        });
      }
    }
    console.log(`   ✅ ${roleName}: ${permKeys.length} permissions linked.`);
  }
  console.log('');

  // ─ Step 4: Create Demo Tenant ───────────────────────────
  console.log('🏪 Step 4: Creating demo tenant...');
  let demoTenant = await prisma.tenant.findFirst({ where: { slug: 'demo-store' } });
  if (!demoTenant) {
    demoTenant = await prisma.tenant.create({
      data: {
        name: 'Demo Store',
        slug: 'demo-store',
        status: 'ACTIVE',
        ownerId: 'pending', // will update after user creation
        settings: {
          create: {
            currency: 'USD',
            timezone: 'America/New_York',
            locale: 'en-US',
            primaryColor: '#6366f1',
            accentColor: '#8b5cf6',
            supportEmail: 'support@demo-store.com',
          }
        }
      }
    });
    console.log(`   ✅ Demo tenant created: ${demoTenant.id}\n`);
  } else {
    console.log(`   ⏩ Demo tenant already exists: ${demoTenant.id}\n`);
  }

  // ─ Step 5: Create Users in Supabase Auth + PostgreSQL ───
  console.log('👤 Step 5: Seeding users...');
  for (const userDef of TEST_USERS) {
    const resolvedTenantId = userDef.tenantId === '__DEMO_TENANT__' ? demoTenant.id : userDef.tenantId;

    // Create in Supabase Auth (or skip if exists)
    let supabaseUserId;
    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    const existingUser = existingUsers?.users?.find(u => u.email === userDef.email);
    
    if (existingUser) {
      supabaseUserId = existingUser.id;
      console.log(`   ⏩ Supabase user exists: ${userDef.email}`);
    } else {
      const { data, error } = await supabase.auth.admin.createUser({
        email: userDef.email,
        password: userDef.password,
        email_confirm: true,
        user_metadata: { role: userDef.role, name: userDef.name }
      });
      if (error) {
        console.log(`   ❌ Failed to create Supabase user ${userDef.email}: ${error.message}`);
        continue;
      }
      supabaseUserId = data.user.id;
      console.log(`   ✅ Supabase user created: ${userDef.email}`);
    }

    // Create in PostgreSQL (or update)
    const dbUser = await prisma.user.upsert({
      where: { email: userDef.email },
      update: { name: userDef.name, tenantId: resolvedTenantId, status: 'ACTIVE' },
      create: {
        id: supabaseUserId, // match Supabase Auth UUID
        email: userDef.email,
        name: userDef.name,
        emailVerified: true,
        status: 'ACTIVE',
        tenantId: resolvedTenantId,
      }
    });

    // Assign role
    const roleId = roleMap[userDef.role];
    if (roleId) {
      await prisma.userRole.upsert({
        where: { userId_roleId: { userId: dbUser.id, roleId } },
        update: {},
        create: { userId: dbUser.id, roleId },
      });
      console.log(`   ✅ Role ${userDef.role} assigned to ${userDef.email}`);
    }
  }

  // Update demo tenant owner
  const adminUser = await prisma.user.findUnique({ where: { email: 'admin@commercex.com' } });
  if (adminUser) {
    await prisma.tenant.update({
      where: { id: demoTenant.id },
      data: { ownerId: adminUser.id }
    });
    console.log(`\n   ✅ Demo tenant owner set to admin@commercex.com`);
  }

  console.log('\n🎉 Seed complete!\n');
  console.log('═══════════════════════════════════════════');
  console.log('  Test Accounts:');
  console.log('  ─────────────────────────────────────────');
  console.log('  Super Admin:  superadmin@commercex.com / password123');
  console.log('  Admin:        admin@commercex.com / password123');
  console.log('  Staff:        staff@commercex.com / password123');
  console.log('  Customer:     customer@commercex.com / password123');
  console.log('═══════════════════════════════════════════\n');
}

seed()
  .catch(e => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
