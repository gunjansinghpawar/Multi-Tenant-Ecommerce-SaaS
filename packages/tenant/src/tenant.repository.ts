import { PrismaClient, Prisma } from '@prisma/client';
import { prisma } from '@commercex/database';

// Tenant repository typically operates globally (Super Admin context) 
// or queries the current tenant. 
export class TenantRepository {
  private db: PrismaClient;

  constructor() {
    // Tenant management usually requires global access.
    this.db = prisma;
  }

  async findById(id: string) {
    return this.db.tenant.findUnique({ where: { id } });
  }

  async findBySlug(slug: string) {
    return this.db.tenant.findUnique({ where: { slug } });
  }

  async create(data: Prisma.TenantCreateInput) {
    return this.db.tenant.create({ data });
  }

  async update(id: string, data: Prisma.TenantUpdateInput) {
    return this.db.tenant.update({ where: { id }, data });
  }
}
