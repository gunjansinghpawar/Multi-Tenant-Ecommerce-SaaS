import { BaseService } from './base.service';
import { InventoryRepository } from '@commercex/repositories';

export class InventoryService extends BaseService {
  private inventoryRepository: InventoryRepository;

  constructor(tenantId?: string) {
    super(tenantId);
    this.inventoryRepository = new InventoryRepository(tenantId);
  }

  async getInventoryLevel(productVariantId: string) {
    return this.inventoryRepository.findByVariantId(productVariantId);
  }

  async checkAvailability(productVariantId: string, quantity: number) {
    const level = await this.getInventoryLevel(productVariantId);
    if (!level) return false;
    
    // Available to purchase = total available - already reserved
    const purchasable = level.available - level.reserved;
    return purchasable >= quantity;
  }

  async reserveInventory(productVariantId: string, quantity: number) {
    const isAvailable = await this.checkAvailability(productVariantId, quantity);
    
    if (!isAvailable) {
      throw new Error(`Insufficient inventory for variant: ${productVariantId}`);
    }

    return this.inventoryRepository.reserveInventory(productVariantId, quantity);
  }

  async fulfillInventory(productVariantId: string, quantity: number) {
    return this.inventoryRepository.fulfillInventory(productVariantId, quantity);
  }

  async releaseReservation(productVariantId: string, quantity: number) {
    return this.inventoryRepository.releaseReservation(productVariantId, quantity);
  }
}
