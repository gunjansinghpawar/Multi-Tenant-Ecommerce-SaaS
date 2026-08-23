"use server"; // Cache cleared

import { prisma } from '@commercex/database';
import { revalidatePath } from 'next/cache';

export async function getPlansAction() {
  try {
    const plans = await prisma.plan.findMany({
      orderBy: {
        priceMonth: 'asc',
      },
    });

    const formatted = plans.map(p => ({
      id: p.id,
      name: p.name,
      description: p.description || "",
      priceMonth: p.priceMonth.toNumber(),
      priceYear: p.priceYear.toNumber(),
      features: p.features as any,
      limits: p.limits as any,
      isActive: p.status === 'ACTIVE',
    }));

    return { success: true, data: formatted };
  } catch (error: any) {
    console.error("Error fetching plans:", error);
    return { success: false, error: "Failed to fetch plans.", data: [] };
  }
}

export async function createPlanAction(data: { name: string; description: string; priceMonth: number; priceYear: number; storageLimit: string }) {
  try {
    // Generate simple features and limits based on inputs for MVP
    const limits = {
      storage: data.storageLimit || "10 GB",
      products: data.priceMonth > 0 ? 10000 : 100,
      staff: data.priceMonth > 0 ? 10 : 2,
    };
    
    const features = [
      "Core Commerce Features",
      "Standard Support",
      `${data.storageLimit || "10 GB"} Storage`
    ];

    const plan = await prisma.plan.create({
      data: {
        name: data.name,
        description: data.description,
        priceMonth: data.priceMonth,
        priceYear: data.priceYear,
        features: features,
        limits: limits,
        status: 'ACTIVE',
      }
    });

    revalidatePath("/subscriptions");
    return { success: true, plan: { ...plan, priceMonth: plan.priceMonth.toNumber(), priceYear: plan.priceYear.toNumber() } };
  } catch (error: any) {
    console.error("Error creating plan:", error);
    return { success: false, error: "Failed to create plan." };
  }
}

export async function updatePlanAction(id: string, data: { name: string; description: string; priceMonth: number; priceYear: number; storageLimit: string }) {
  try {
    const existing = await prisma.plan.findUnique({ where: { id } });
    if (!existing) throw new Error("Plan not found");

    const limits: any = existing.limits || {};
    limits.storage = data.storageLimit || "10 GB";

    const plan = await prisma.plan.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        priceMonth: data.priceMonth,
        priceYear: data.priceYear,
        limits: limits,
      }
    });

    revalidatePath("/subscriptions");
    return { success: true, plan: { ...plan, priceMonth: plan.priceMonth.toNumber(), priceYear: plan.priceYear.toNumber() } };
  } catch (error: any) {
    console.error("Error updating plan:", error);
    return { success: false, error: "Failed to update plan." };
  }
}

export async function togglePlanStatusAction(id: string, isActive: boolean) {
  try {
    const status = isActive ? 'ACTIVE' : 'INACTIVE';
    await prisma.plan.update({
      where: { id },
      data: { status },
    });
    revalidatePath("/subscriptions");
    return { success: true };
  } catch (error: any) {
    console.error("Error toggling plan status:", error);
    return { success: false, error: "Failed to update plan status." };
  }
}

export async function deletePlanAction(id: string) {
  try {
    // We check if any subscriptions exist for this plan before deleting
    const activeSubscriptions = await prisma.subscription.count({
      where: { planId: id }
    });

    if (activeSubscriptions > 0) {
      return { success: false, error: "Cannot delete plan because there are active subscriptions using it. Deactivate it instead." };
    }

    await prisma.plan.delete({
      where: { id },
    });
    revalidatePath("/subscriptions");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting plan:", error);
    return { success: false, error: "Failed to delete plan." };
  }
}
