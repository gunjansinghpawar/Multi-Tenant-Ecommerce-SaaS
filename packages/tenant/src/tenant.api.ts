import { TenantService } from './tenant.service';
import { CreateTenantInput, createTenantSchema } from '@commercex/validation';
import { z } from 'zod';

export class TenantController {
  private service: TenantService;

  constructor(service?: TenantService) {
    this.service = service || new TenantService();
  }

  async create(inputData: CreateTenantInput) {
    try {
      const data = createTenantSchema.parse(inputData);
      const tenant = await this.service.createTenant(data);
      return { success: true, data: tenant };
    } catch (e: any) {
      if (e instanceof z.ZodError) {
        return { success: false, error: { message: 'Validation failed', details: e.errors } };
      }
      return { success: false, error: { message: e.message || 'Failed to create tenant' } };
    }
  }

  async get(id: string) {
    try {
      if (!id) throw new Error('Tenant ID is required');
      const tenant = await this.service.getTenant(id);
      if (!tenant) return { success: false, error: { message: 'Not found', code: 404 } };
      return { success: true, data: tenant };
    } catch (e: any) {
      return { success: false, error: { message: e.message || 'Failed to get tenant' } };
    }
  }
}
