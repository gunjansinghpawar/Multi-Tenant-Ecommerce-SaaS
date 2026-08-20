import { BaseRepository } from './base.repository';
import { Prisma } from '@prisma/client';

export class InventoryRepository extends BaseRepository {
  // Inventory doesn't have tenantId directly, it belongs to ProductVariant -> Product -> Tenant
  constructor(tenantId?: string) {
    super(tenantId);
  }

  async findByVariantId(productVariantId: string) {
    return this.db.inventoryLevel.findUnique({ where: { productVariantId } });
  }

  async update(productVariantId: string, data: Prisma.InventoryLevelUpdateInput) {
    return this.db.inventoryLevel.update({
      where: { productVariantId },
      data,
    });
  }

  // Atomic reservation update
  async reserveInventory(productVariantId: string, quantity: number) {
    return this.db.inventoryLevel.update({
      where: { productVariantId },
      data: {
        reserved: {
          increment: quantity
        }
      }
    });
  }

  // Atomic reservation release
  async releaseReservation(productVariantId: string, quantity: number) {
    return this.db.inventoryLevel.update({
      where: { productVariantId },
      data: {
        reserved: {
          decrement: quantity
        }
      }
    });
  }

  // Atomic stock fulfillment
  async fulfillInventory(productVariantId: string, quantity: number) {
    return this.db.inventoryLevel.update({
      where: { productVariantId },
      data: {
        available: {
          decrement: quantity
        },
        reserved: {
          decrement: quantity
        }
      }
    });
  }
}
