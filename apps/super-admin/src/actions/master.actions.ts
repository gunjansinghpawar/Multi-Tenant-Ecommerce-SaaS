"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@commercex/database";
import { IMasterEntity } from "@commercex/types/src/masters.types";
import { MASTER_CONFIGS } from "@commercex/types/src/master.config";

export async function getMasterDataAction(typeSlug: string, tenantId: string | null = null) {
  const config = MASTER_CONFIGS[typeSlug];
  if (!config) throw new Error("Invalid master type");

  const include: Record<string, any> = {};
  config.fields.forEach(field => {
    if (field.type === 'reference' && !field.virtual && field.referenceModel) {
      const relationName = field.name.replace(/Id$/, '');
      if (relationName === 'state') {
        include[relationName] = {
          include: { country: true }
        };
      } else {
        include[relationName] = true;
      }
    }
  });

  const queryOptions: any = {
    orderBy: { sortOrder: "asc" }
  };
  
  if (Object.keys(include).length > 0) {
    queryOptions.include = include;
  }

  if (!(prisma as any)[config.entityName]) {
    console.warn(`Entity ${config.entityName} is not defined in Prisma schema.`);
    return [];
  }

  let data;
  try {
    // @ts-ignore
    data = await prisma[config.entityName].findMany(queryOptions);
  } catch (error: any) {
    if (error.name === 'PrismaClientValidationError' && error.message.includes('sortOrder')) {
      delete queryOptions.orderBy;
      // @ts-ignore
      data = await prisma[config.entityName].findMany(queryOptions);
    } else {
      throw error;
    }
  }

  return data;
}

export async function createMasterAction(typeSlug: string, data: Partial<IMasterEntity>, tenantId: string | null = null) {
  const config = MASTER_CONFIGS[typeSlug];
  if (!config) throw new Error("Invalid master type");

  if (!(prisma as any)[config.entityName]) {
    throw new Error(`Entity ${config.entityName} is not defined in Prisma schema.`);
  }

  // @ts-ignore
  const record = await (prisma as any)[config.entityName].create({
    data
  });

  revalidatePath(config.baseRoute);
  return record;
}

export async function updateMasterAction(typeSlug: string, id: string, data: Partial<IMasterEntity>) {
  const config = MASTER_CONFIGS[typeSlug];
  if (!config) throw new Error("Invalid master type");

  if (!(prisma as any)[config.entityName]) {
    throw new Error(`Entity ${config.entityName} is not defined in Prisma schema.`);
  }

  // @ts-ignore
  const record = await (prisma as any)[config.entityName].update({
    where: { id },
    data
  });

  revalidatePath(config.baseRoute);
  return record;
}

export async function deleteMasterAction(typeSlug: string, id: string, forceDeactivate = false) {
  const config = MASTER_CONFIGS[typeSlug];
  if (!config) throw new Error("Invalid master type");

  if (!(prisma as any)[config.entityName]) {
    throw new Error(`Entity ${config.entityName} is not defined in Prisma schema.`);
  }

  if (forceDeactivate) {
    // @ts-ignore
    await (prisma as any)[config.entityName].update({
      where: { id },
      data: { status: "INACTIVE" }
    });
  } else {
    // Check dependencies first
    const deps = await checkDependenciesAction(typeSlug, id);
    if (deps.hasDependencies) {
      throw new Error(deps.message);
    }
    // @ts-ignore
    await (prisma as any)[config.entityName].delete({
      where: { id }
    });
  }

  revalidatePath(config.baseRoute);
  return true;
}

export async function checkDependenciesAction(typeSlug: string, id: string) {
  const config = MASTER_CONFIGS[typeSlug];
  if (!config) throw new Error("Invalid master type");

  if (!(prisma as any)[config.entityName]) {
    return { hasDependencies: false, message: "" };
  }

  if (!config.dependencies || config.dependencies.length === 0) {
    return { hasDependencies: false, message: "" };
  }

  for (const dep of config.dependencies) {
    if (!(prisma as any)[dep.modelName]) continue;
    // @ts-ignore
    const count = await (prisma as any)[dep.modelName].count({
      where: { [dep.relationField]: id }
    });
    
    if (count > 0) {
      return { 
        hasDependencies: true, 
        message: `Cannot delete: Found ${count} associated ${dep.modelName}(s).` 
      };
    }
  }

  return { hasDependencies: false, message: "" };
}

export async function getReferenceOptionsAction(referenceModel: string, filters?: Record<string, string>) {
  try {
    const where: Record<string, any> = {};
    if (filters) {
      for (const [key, value] of Object.entries(filters)) {
        if (value) {
          where[key] = value;
        }
      }
    }

    if (!(prisma as any)[referenceModel]) {
      console.warn(`Entity ${referenceModel} is not defined in Prisma schema.`);
      return [];
    }

    // @ts-ignore
    const data = await (prisma as any)[referenceModel].findMany({
      where,
      select: {
        id: true,
        name: true
      },
      orderBy: { name: 'asc' }
    });

    return data.map((item: any) => ({
      value: item.id,
      label: item.name
    }));
  } catch (error) {
    console.error(`Failed to fetch reference options for ${referenceModel}:`, error);
    return [];
  }
}
