import { BaseRepository } from './base.repository';
import { Prisma } from '@prisma/client';

export class TenantRepository extends BaseRepository {
  constructor(tenantId?: string) {
    super(tenantId);
  }

  async findById(id: string) {
    return this.db.tenant.findUnique({ where: { id } });
  }

  async findBySlug(slug: string) {
    return this.db.tenant.findUnique({ where: { slug } });
  }

  async findMany(args?: Prisma.TenantFindManyArgs) {
    return this.db.tenant.findMany(args);
  }

  async count(args?: Prisma.TenantCountArgs) {
    return this.db.tenant.count(args);
  }

  async create(data: Prisma.TenantCreateInput) {
    return this.db.tenant.create({ data });
  }

  async update(id: string, data: Prisma.TenantUpdateInput) {
    return this.db.tenant.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.db.tenant.delete({ where: { id } });
  }
}
