/**
 * CommerceX — Master Seed Script
 * 
 * Seeds:
 *   1. Permissions (PostgreSQL)
 *   2. Roles (PostgreSQL) - Platform & Tenant Scopes
 *   3. Role ↔ Permission links (PostgreSQL)
 *   4. Super Admin user (Supabase Auth + PostgreSQL)
 *   5. Global Platform Role for Super Admin
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
  // Masters
  { key: 'masters.read', name: 'Read Masters', description: 'View master reference data', category: 'Masters' },
  { key: 'masters.create', name: 'Create Masters', description: 'Create master data', category: 'Masters' },
  { key: 'masters.update', name: 'Update Masters', description: 'Update master data', category: 'Masters' },
  { key: 'masters.delete', name: 'Delete Masters', description: 'Delete master data', category: 'Masters' },
  { key: 'masters.import', name: 'Import Masters', description: 'Import master data', category: 'Masters' },
  { key: 'masters.export', name: 'Export Masters', description: 'Export master data', category: 'Masters' },
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

// ── Super Admin User ────────────────────────────────────────────
const SUPER_ADMIN = { 
  email: 'superadmin@commercex.com', 
  password: 'password123', 
  name: 'Super Admin', 
  role: 'SUPER_ADMIN' 
};

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
  console.log('🛡️  Step 2: Seeding system roles...');
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

  // 4. Test User (Super Admin)
  console.log('\n👥 Step 4: Provisioning Super Admin...');
  let authId = null;
  if (supabase) {
    // Upsert in Supabase
    const { data: users, error: searchError } = await supabase.auth.admin.listUsers();
    let authUser = users?.users?.find(u => u.email === SUPER_ADMIN.email);
    
    if (!authUser) {
      const { data: newAuthUser, error } = await supabase.auth.admin.createUser({
        email: SUPER_ADMIN.email,
        password: SUPER_ADMIN.password,
        email_confirm: true,
        user_metadata: { name: SUPER_ADMIN.name, role: SUPER_ADMIN.role }
      });
      if (error) {
        console.error('❌ Error creating Supabase user:', error.message);
      }
      if (newAuthUser) authUser = newAuthUser.user;
    }
    if (authUser) authId = authUser.id;
  }

  const userId = authId || `mock-${SUPER_ADMIN.email.split('@')[0]}`;

  let dbUser = await prisma.user.upsert({
    where: { email: SUPER_ADMIN.email },
    update: { name: SUPER_ADMIN.name },
    create: {
      id: userId,
      email: SUPER_ADMIN.email,
      name: SUPER_ADMIN.name,
      emailVerified: true,
    }
  });

  // Handle Role mapping based on Scope
  const superAdminRoleMeta = roleMap[SUPER_ADMIN.role];
  if (superAdminRoleMeta) {
    // Link globally via UserPlatformRole
    await prisma.userPlatformRole.upsert({
      where: { userId_roleId: { userId: dbUser.id, roleId: superAdminRoleMeta.id } },
      update: {},
      create: { userId: dbUser.id, roleId: superAdminRoleMeta.id }
    });
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
