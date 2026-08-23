require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const TENANT_STATUSES = [
  { code: 'ACTIVE', name: 'Active', description: 'Tenant is active and operational', color: '#10B981', sortOrder: 10, isDefault: true },
  { code: 'SUSPENDED', name: 'Suspended', description: 'Tenant is temporarily suspended', color: '#F59E0B', sortOrder: 20, isDefault: false },
  { code: 'PENDING', name: 'Pending', description: 'Tenant is pending approval or setup', color: '#3B82F6', sortOrder: 30, isDefault: false },
  { code: 'DELETED', name: 'Deleted', description: 'Tenant has been soft-deleted', color: '#EF4444', sortOrder: 40, isDefault: false }
];

const SUBSCRIPTION_STATUSES = [
  { code: 'ACTIVE', name: 'Active', description: 'Subscription is active and paid', color: '#10B981', sortOrder: 10, isDefault: true },
  { code: 'CANCELED', name: 'Canceled', description: 'Subscription has been canceled', color: '#EF4444', sortOrder: 20, isDefault: false },
  { code: 'PAST_DUE', name: 'Past Due', description: 'Payment is past due', color: '#F59E0B', sortOrder: 30, isDefault: false },
  { code: 'TRIALING', name: 'Trialing', description: 'Currently on a free trial', color: '#3B82F6', sortOrder: 40, isDefault: false },
  { code: 'INCOMPLETE', name: 'Incomplete', description: 'Initial payment attempt failed', color: '#F59E0B', sortOrder: 50, isDefault: false },
  { code: 'UNPAID', name: 'Unpaid', description: 'Subscription is unpaid and features restricted', color: '#EF4444', sortOrder: 60, isDefault: false },
  { code: 'PAUSED', name: 'Paused', description: 'Subscription is temporarily paused', color: '#6B7280', sortOrder: 70, isDefault: false }
];

async function seedRecords(modelName, data) {
  let createdCount = 0;
  for (const item of data) {
    // Find if it exists with tenantId: null
    const existing = await prisma[modelName].findFirst({
      where: {
        code: item.code,
        tenantId: null
      }
    });

    if (existing) {
      await prisma[modelName].update({
        where: { id: existing.id },
        data: item
      });
    } else {
      await prisma[modelName].create({
        data: item
      });
      createdCount++;
    }
  }
  return createdCount;
}

async function seed() {
  console.log('Starting seeder for Subscription and Tenant Statuses...');
  
  try {
    const tenantCount = await seedRecords('tenantStatusMaster', TENANT_STATUSES);
    console.log(`Seeded Tenant Statuses. Created: ${tenantCount}, Updated existing.`);
    
    const subCount = await seedRecords('subscriptionStatusMaster', SUBSCRIPTION_STATUSES);
    console.log(`Seeded Subscription Statuses. Created: ${subCount}, Updated existing.`);
    
    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding statuses:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
