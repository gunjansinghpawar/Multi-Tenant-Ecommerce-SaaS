import { BaseRepository } from './base.repository';
import { Prisma } from '@prisma/client';

export class ProductRepository extends BaseRepository {
  constructor(tenantId?: string) {
    super(tenantId);
  }

  async findById(id: string) {
    return this.db.product.findUnique({ where: { id } });
  }

  async findBySlug(slug: string, tenantId: string) {
    return this.db.product.findUnique({ 
      where: { tenantId_slug: { tenantId, slug } } 
    });
  }

  async findMany(args?: Prisma.ProductFindManyArgs) {
    return this.db.product.findMany(args);
  }

  async count(args?: Prisma.ProductCountArgs) {
    return this.db.product.count(args);
  }

  async create(data: Prisma.ProductCreateInput) {
    return this.db.product.create({ data });
  }

  async update(id: string, data: Prisma.ProductUpdateInput) {
    return this.db.product.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.db.product.delete({ where: { id } });
  }
}
