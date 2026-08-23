"use server"; // Cache cleared

import { prisma } from '@commercex/database';
import { revalidatePath } from 'next/cache';

export async function getTenantsAction() {
  try {
    const tenants = await prisma.tenant.findMany({
      where: {
        status: { not: 'DELETED' }
      },
      include: {
        memberships: {
          include: {
            user: true
          }
        },
        settings: true,
        plan: true
      },
      orderBy: { createdAt: 'desc' }
    });

    const formatted = tenants.map(t => {
      // Find the first user as owner or use ownerId if we had a direct relation
      // Since ownerId is just a string, we can try to find the user in memberships
      const ownerMembership = t.memberships.find(m => m.user.id === t.ownerId);
      const ownerEmail = ownerMembership?.user.email || t.memberships[0]?.user.email || "unknown@owner.com";
      
      const planName = t.plan?.name || "No Plan";
      const storageGB = t.plan?.maxStorageGB?.toString() || "0";
      const displayStorage = storageGB === "-1" ? "Unlimited" : `${storageGB} GB`;

      let displayStatus = "Pending";
      if (t.status === "ACTIVE") displayStatus = "Active";
      if (t.status === "SUSPENDED") displayStatus = "Suspended";

      return {
        id: t.id,
        name: t.name,
        slug: t.slug,
        owner: ownerEmail,
        plan: planName,
        status: displayStatus,
        created: new Date(t.createdAt).toLocaleDateString(),
        storage: displayStorage
      };
    });

    return { success: true, data: formatted };
  } catch (error: any) {
    console.error("Error fetching tenants:", error);
    return { success: false, error: "Failed to fetch tenants.", data: [] };
  }
}

export async function getAvailablePlansAction() {
  try {
    const plans = await prisma.planTier.findMany({
      where: { status: 'ACTIVE' },
      orderBy: { sortOrder: 'asc' }
    });
    return { success: true, data: JSON.parse(JSON.stringify(plans)) };
  } catch (error: any) {
    console.error("Error fetching available plans:", error);
    return { success: false, error: "Failed to fetch available plans.", data: [] };
  }
}

export async function createTenantAction(data: { name: string; ownerEmail: string; planId: string }) {
  try {
    const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4);
    
    // Check if user exists
    let user = await prisma.user.findUnique({ where: { email: data.ownerEmail } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: data.ownerEmail,
          name: data.ownerEmail.split('@')[0],
        }
      });
    }

    const tenant = await prisma.tenant.create({
      data: {
        name: data.name,
        slug,
        status: 'ACTIVE',
        ownerId: user.id,
        planId: data.planId,
        settings: {
          create: {
            storeName: data.name,
            supportEmail: data.ownerEmail
          }
        },
        memberships: {
          create: {
            userId: user.id
          }
        }
      }
    });

    revalidatePath("/stores");
    return { success: true, tenant };
  } catch (error: any) {
    console.error("Error creating tenant:", error);
    return { success: false, error: error.message || "Failed to create tenant." };
  }
}

export async function updateTenantStatusAction(id: string, status: "ACTIVE" | "SUSPENDED") {
  try {
    await prisma.tenant.update({
      where: { id },
      data: { status }
    });
    revalidatePath("/stores");
    return { success: true };
  } catch (error: any) {
    console.error("Error updating tenant:", error);
    return { success: false, error: "Failed to update tenant status." };
  }
}

export async function deleteTenantAction(id: string) {
  try {
    await prisma.tenant.update({
      where: { id },
      data: { 
        status: 'DELETED',
        deletedAt: new Date()
      }
    });
    revalidatePath("/stores");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting tenant:", error);
    return { success: false, error: "Failed to delete tenant." };
  }
}
