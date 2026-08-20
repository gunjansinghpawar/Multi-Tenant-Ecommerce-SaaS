import { BaseService } from './base.service';
import { TenantRepository } from '@commercex/repositories';
import { Prisma } from '@prisma/client';

export class TenantService extends BaseService {
  private tenantRepository: TenantRepository;

  constructor(tenantId?: string) {
    super(tenantId);
    this.tenantRepository = new TenantRepository(tenantId);
  }

  async getTenants(args?: Prisma.TenantFindManyArgs) {
    return this.tenantRepository.findMany({
      orderBy: { createdAt: 'desc' },
      ...args,
    });
  }

  async getTenantCount() {
    return this.tenantRepository.count();
  }

  async getTenantById(id: string) {
    return this.tenantRepository.findById(id);
  }

  async createTenant(data: Prisma.TenantCreateInput) {
    return this.tenantRepository.create(data);
  }

  async updateTenant(id: string, data: Prisma.TenantUpdateInput) {
    return this.tenantRepository.update(id, data);
  }

  async deleteTenant(id: string) {
    // Implementing soft-delete or status change as per architectural rules
    return this.tenantRepository.update(id, { 
      status: 'DELETED', 
      deletedAt: new Date() 
    });
  }
}
