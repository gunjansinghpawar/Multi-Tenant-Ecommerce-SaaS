import { TenantRepository } from './tenant.repository';
import { createTenantSchema, updateTenantSchema, CreateTenantInput, UpdateTenantInput } from '@commercex/validation';

export class TenantService {
  private repository: TenantRepository;

  constructor(repository?: TenantRepository) {
    this.repository = repository || new TenantRepository();
  }

  async createTenant(data: CreateTenantInput) {
    // 1. Validate data
    const validatedData = createTenantSchema.parse(data);

    // 2. Check if slug exists
    const existing = await this.repository.findBySlug(validatedData.slug);
    if (existing) {
      throw new Error(`Tenant with slug "${validatedData.slug}" already exists`);
    }

    // 3. Create tenant via repository
    return this.repository.create({
      name: validatedData.name,
      slug: validatedData.slug,
      customDomain: validatedData.customDomain,
      ownerId: 'placeholder-owner-id', // TODO: Must pass actual ownerId when creating via API
      status: 'ACTIVE'
    });
  }

  async getTenant(id: string) {
    return this.repository.findById(id);
  }

  async updateTenant(id: string, data: UpdateTenantInput) {
    const validatedData = updateTenantSchema.parse(data);
    return this.repository.update(id, validatedData);
  }
}
