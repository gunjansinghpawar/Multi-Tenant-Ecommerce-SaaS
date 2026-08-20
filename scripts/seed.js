/**
 * CommerceX — Master Seed Script
 * 
 * Seeds:
 *   1. Permissions (PostgreSQL)
 *   2. Roles (PostgreSQL) - Platform & Tenant Scopes
 *   3. Role ↔ Permission links (PostgreSQL)
 *   4. Test users (Supabase Auth)
 *   5. User records (PostgreSQL)
 *   6. User ↔ Role links (Platform & Tenant)
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
const supabaseServiceKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('⚠️ Missing SUPABASE_URL or SUPABASE_SECRET_KEY. Skipping auth sync.');
}

const supabase = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey, { auth: { autoRefreshToken: false, persistSession: false } })
  : null;

// ── Permission Definitions ────────────────────────────────
const PERMISSION_DEFINITIONS = [
  // Products
  { key: 'products.read', name: 'Read Products', description: 'View products', category: 'Products' },
  { key: 'products.create', name: 'Create Products', description: 'Create products', category: 'Products' },
  { key: 'products.update', name: 'Update Products', description: 'Update products', category: 'Products' },
  { key: 'products.delete', name: 'Delete Products', description: 'Delete products', category: 'Products' },
  // Orders
  { key: 'orders.read', name: 'Read Orders', description: 'View orders', category: 'Orders' },
  { key: 'orders.update', name: 'Update Orders', description: 'Update orders', category: 'Orders' },
  { key: 'orders.refund', name: 'Refund Orders', description: 'Refund orders', category: 'Orders' },
  { key: 'orders.delete', name: 'Delete Orders', description: 'Delete orders', category: 'Orders' },
  // Customers
  { key: 'customers.read', name: 'Read Customers', description: 'View customers', category: 'Customers' },
  { key: 'customers.update', name: 'Update Customers', description: 'Update customers', category: 'Customers' },
  { key: 'customers.delete', name: 'Delete Customers', description: 'Delete customers', category: 'Customers' },
  // Theme
  { key: 'theme.read', name: 'Read Theme', description: 'View theme', category: 'Theme' },
  { key: 'theme.update', name: 'Update Theme', description: 'Update theme', category: 'Theme' },
  { key: 'theme.publish', name: 'Publish Theme', description: 'Publish theme', category: 'Theme' },
  // Settings
  { key: 'settings.read', name: 'Read Settings', description: 'View store settings', category: 'Settings' },
  { key: 'settings.update', name: 'Update Settings', description: 'Update store settings', category: 'Settings' },
  // Billing
  { key: 'billing.read', name: 'Read Billing', description: 'View billing info', category: 'Billing' },
  { key: 'billing.manage', name: 'Manage Billing', description: 'Manage billing and subscriptions', category: 'Billing' },
  // Integrations
  { key: 'integrations.read', name: 'Read Integrations', description: 'View integrations', category: 'Integrations' },
  { key: 'integrations.manage', name: 'Manage Integrations', description: 'Manage integrations', category: 'Integrations' },
  // Platform
  { key: 'platform.manage', name: 'Manage Platform', description: 'Super admin platform management', category: 'Platform' }
];

// ── Role Definitions ──────────────────────────────────────
const ROLE_DEFINITIONS = [
  // Platform Roles
  { name: 'SUPER_ADMIN', scope: 'PLATFORM', description: 'Platform-wide superuser.', isSystem: true },
  { name: 'PLATFORM_SUPPORT', scope: 'PLATFORM', description: 'Platform support staff.', isSystem: true },
  { name: 'PLATFORM_OPERATOR', scope: 'PLATFORM', description: 'Platform operations.', isSystem: true },
  { name: 'PLATFORM_DEVELOPER', scope: 'PLATFORM', description: 'Platform developers.', isSystem: true },

  // Tenant Roles
  { name: 'OWNER', scope: 'TENANT', description: 'Store owner with full control.', isSystem: true },
  { name: 'ADMIN', scope: 'TENANT', description: 'Store admin.', isSystem: true },
  { name: 'MANAGER', scope: 'TENANT', description: 'Store manager.', isSystem: true },
  { name: 'EDITOR', scope: 'TENANT', description: 'Store content editor.', isSystem: true },
  { name: 'MARKETING', scope: 'TENANT', description: 'Marketing role.', isSystem: true },
  { name: 'SUPPORT', scope: 'TENANT', description: 'Customer support.', isSystem: true },
  { name: 'WAREHOUSE', scope: 'TENANT', description: 'Warehouse and fulfillment.', isSystem: true },
  { name: 'ACCOUNTANT', scope: 'TENANT', description: 'Accounting and billing.', isSystem: true },
  { name: 'CUSTOM', scope: 'TENANT', description: 'Custom role template.', isSystem: false },
];

// ── Role → Permission mapping ───────────────────────
const ROLE_PERMISSION_KEYS = {
  SUPER_ADMIN: PERMISSION_DEFINITIONS.map(p => p.key),
  PLATFORM_SUPPORT: ['platform.manage'], // Simplified for seed
  PLATFORM_OPERATOR: ['platform.manage'],
  PLATFORM_DEVELOPER: ['platform.manage'],
  
  OWNER: PERMISSION_DEFINITIONS.filter(p => p.category !== 'Platform').map(p => p.key),
  ADMIN: PERMISSION_DEFINITIONS.filter(p => p.category !== 'Platform' && p.key !== 'billing.manage').map(p => p.key),
  MANAGER: ['products.read', 'products.update', 'orders.read', 'orders.update', 'customers.read', 'settings.read'],
  EDITOR: ['products.read', 'products.create', 'products.update', 'theme.read', 'theme.update'],
  MARKETING: ['products.read', 'customers.read', 'theme.read', 'theme.publish'],
  SUPPORT: ['orders.read', 'orders.refund', 'customers.read', 'customers.update'],
  WAREHOUSE: ['products.read', 'products.update', 'orders.read', 'orders.update'],
  ACCOUNTANT: ['orders.read', 'billing.read', 'billing.manage'],
  CUSTOM: [],
};

// ── Test Users ────────────────────────────────────────────
const TEST_USERS = [
  { email: 'superadmin@commercex.com', password: 'password123', name: 'Super Admin', role: 'SUPER_ADMIN', tenantId: null },
  { email: 'owner@commercex.com', password: 'password123', name: 'Store Owner', role: 'OWNER', tenantId: '__DEMO_TENANT__' },
  { email: 'manager@commercex.com', password: 'password123', name: 'Store Manager', role: 'MANAGER', tenantId: '__DEMO_TENANT__' },
  { email: 'support@commercex.com', password: 'password123', name: 'Support Rep', role: 'SUPPORT', tenantId: '__DEMO_TENANT__' },
];

// ── Main Seed Function ────────────────────────────────────
async function seed() {
  console.log('🌱 CommerceX Seed Script Starting...\n');

  // 1. Permissions
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
  
  // 2. Roles
  console.log('🛡️  Step 2: Seeding roles...');
  const roleMap = {};
  for (const rDef of ROLE_DEFINITIONS) {
    const role = await prisma.role.upsert({
      where: { name: rDef.name },
      update: { description: rDef.description, isSystem: rDef.isSystem, scope: rDef.scope },
      create: { name: rDef.name, description: rDef.description, isSystem: rDef.isSystem, scope: rDef.scope },
    });
    roleMap[rDef.name] = { id: role.id, scope: role.scope };
  }

  // 3. Link Role ↔ Permissions
  console.log('🔗 Step 3: Linking roles to permissions...');
  for (const [roleName, permKeys] of Object.entries(ROLE_PERMISSION_KEYS)) {
    const roleMeta = roleMap[roleName];
    if (!roleMeta) continue;
    
    await prisma.rolePermission.deleteMany({ where: { roleId: roleMeta.id } });
    
    for (const key of permKeys) {
      const permId = permissionMap[key];
      if (permId) {
        await prisma.rolePermission.create({
          data: { roleId: roleMeta.id, permissionId: permId }
        });
      }
    }
  }

  // 4. Create Demo Tenant
  console.log('\n🏪 Step 4: Creating demo tenant...');
  let demoTenant = await prisma.tenant.findFirst({ where: { slug: 'demo-store' } });
  if (!demoTenant) {
    demoTenant = await prisma.tenant.create({
      data: {
        name: 'Demo Store',
        slug: 'demo-store',
        status: 'ACTIVE',
        ownerId: 'pending', 
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
  }
  
  // 5. Test Users
  console.log('\n👥 Step 5: Provisioning test users...');
  for (const uDef of TEST_USERS) {
    let authId = null;
    if (supabase) {
      // Upsert in Supabase
      const { data: users, error: searchError } = await supabase.auth.admin.listUsers();
      let authUser = users?.users?.find(u => u.email === uDef.email);
      
      if (!authUser) {
        const { data: newAuthUser, error } = await supabase.auth.admin.createUser({
          email: uDef.email,
          password: uDef.password,
          email_confirm: true,
          user_metadata: { name: uDef.name }
        });
        if (newAuthUser) authUser = newAuthUser.user;
      }
      if (authUser) authId = authUser.id;
    }

    const userId = authId || `mock-${uDef.email.split('@')[0]}`;

    let dbUser = await prisma.user.upsert({
      where: { email: uDef.email },
      update: { name: uDef.name },
      create: {
        id: userId,
        email: uDef.email,
        name: uDef.name,
        emailVerified: true,
      }
    });

    // Handle Role mapping based on Scope
    const roleMeta = roleMap[uDef.role];
    if (roleMeta) {
      if (roleMeta.scope === 'PLATFORM') {
        // Link globally via UserPlatformRole
        await prisma.userPlatformRole.upsert({
          where: { userId_roleId: { userId: dbUser.id, roleId: roleMeta.id } },
          update: {},
          create: { userId: dbUser.id, roleId: roleMeta.id }
        });
      } else if (roleMeta.scope === 'TENANT' && uDef.tenantId) {
        const tId = uDef.tenantId === '__DEMO_TENANT__' ? demoTenant.id : uDef.tenantId;
        
        // Ensure Membership exists
        let membership = await prisma.membership.findUnique({
          where: { userId_tenantId: { userId: dbUser.id, tenantId: tId } }
        });
        
        if (!membership) {
          membership = await prisma.membership.create({
            data: { userId: dbUser.id, tenantId: tId }
          });
        }
        
        // Link via MembershipRole
        await prisma.membershipRole.upsert({
          where: { membershipId_roleId: { membershipId: membership.id, roleId: roleMeta.id } },
          update: {},
          create: { membershipId: membership.id, roleId: roleMeta.id }
        });

        // Set owner if this is OWNER
        if (uDef.role === 'OWNER' && tId === demoTenant.id) {
          await prisma.tenant.update({ where: { id: demoTenant.id }, data: { ownerId: dbUser.id } });
        }
      }
    }
  }

  console.log('\n🎉 Seed completed successfully!');
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
