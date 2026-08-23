require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const PLAN_TYPES = [
  {
    code: 'B2C',
    name: 'B2C Standard',
    billingModel: 'SUBSCRIPTION',
    description: 'Standard business to consumer storefront plans.',
    sortOrder: 10,
  },
  {
    code: 'B2B',
    name: 'B2B Wholesale',
    billingModel: 'SUBSCRIPTION_AND_USAGE',
    description: 'Advanced plans for wholesale and B2B operations.',
    sortOrder: 20,
  },
  {
    code: 'CUSTOM',
    name: 'Custom Enterprise',
    billingModel: 'CUSTOM',
    description: 'Custom tailored enterprise solutions.',
    sortOrder: 30,
  }
];

const PLAN_TIERS = [
  { 
    code: 'STARTER', 
    name: 'Starter Plan',
    planTypeCode: 'B2C',
    description: 'Perfect for new businesses getting started online.', 
    monthlyPrice: 29.00, 
    yearlyPrice: 290.00, // 2 months free
    maxStores: 1, 
    maxUsers: 2, 
    isPopular: false,
    sortOrder: 10,
    features: ['Basic Storefront', 'Up to 500 Products', 'Email Support', 'Standard Analytics']
  },
  { 
    code: 'GROWTH', 
    name: 'Growth Plan', 
    planTypeCode: 'B2C',
    description: 'Advanced features for scaling businesses.', 
    monthlyPrice: 79.00, 
    yearlyPrice: 790.00,
    maxStores: 3, 
    maxUsers: 5, 
    isPopular: true,
    sortOrder: 20,
    features: ['Custom Domains', 'Up to 5,000 Products', 'Priority Support', 'Advanced Analytics', 'Abandoned Cart Recovery']
  },
  { 
    code: 'ENTERPRISE', 
    name: 'Enterprise Plan', 
    planTypeCode: 'B2B',
    description: 'Full power of CommerceX for large organizations.', 
    monthlyPrice: 299.00, 
    yearlyPrice: 2990.00,
    maxStores: 10, 
    maxUsers: 25, 
    isPopular: false,
    sortOrder: 30,
    features: ['Unlimited Stores', 'Unlimited Products', '24/7 Phone Support', 'Custom Reporting', 'B2B Features', 'API Access']
  }
];

const BILLING_CYCLES = [
  { code: 'MONTHLY', name: 'Monthly', description: 'Billed every month', interval: 'month', intervalCount: 1, sortOrder: 10 },
  { code: 'QUARTERLY', name: 'Quarterly', description: 'Billed every 3 months', interval: 'month', intervalCount: 3, sortOrder: 20 },
  { code: 'ANNUALLY', name: 'Annually', description: 'Billed once a year', interval: 'year', intervalCount: 1, sortOrder: 30 },
];

async function seedRecords(modelName, data, matchFields = ['code']) {
  let createdCount = 0;
  for (const item of data) {
    const whereClause = {};
    matchFields.forEach(field => {
      whereClause[field] = item[field];
    });

    const existing = await prisma[modelName].findFirst({
      where: whereClause
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
  console.log('Starting seeder for Plan Types, Plan Tiers and Billing Cycles...');
  
  try {
    const typesCount = await seedRecords('planType', PLAN_TYPES, ['code']);
    console.log(`Seeded Plan Types. Created: ${typesCount}, Updated existing.`);

    // Fetch PlanTypes to map to PlanTiers
    const allPlanTypes = await prisma.planType.findMany();
    const planTypeMap = allPlanTypes.reduce((acc, pt) => {
      acc[pt.code] = pt.id;
      return acc;
    }, {});

    const mappedPlanTiers = PLAN_TIERS.map(tier => {
      const { planTypeCode, ...rest } = tier;
      return {
        ...rest,
        planTypeId: planTypeMap[planTypeCode] || null
      };
    });

    // We must pass ['code'] because PlanTier has a tenantId field usually but we want to match by global code
    const plansCount = await seedRecords('planTier', mappedPlanTiers, ['code']);
    console.log(`Seeded Plan Tiers. Created: ${plansCount}, Updated existing.`);
    
    const cyclesCount = await seedRecords('billingCycle', BILLING_CYCLES, ['code']);
    console.log(`Seeded Billing Cycles. Created: ${cyclesCount}, Updated existing.`);
    
    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
