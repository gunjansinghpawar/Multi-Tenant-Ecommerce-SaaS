import { BaseService } from './base.service';
import { ProductRepository } from '@commercex/repositories';
import { Prisma } from '@prisma/client';

export class ProductService extends BaseService {
  private productRepository: ProductRepository;

  constructor(tenantId?: string) {
    super(tenantId);
    this.productRepository = new ProductRepository(tenantId);
  }

  async getProducts(args?: Prisma.ProductFindManyArgs) {
    return this.productRepository.findMany({
      orderBy: { createdAt: 'desc' },
      ...args,
    });
  }

  async getProductCount() {
    return this.productRepository.count();
  }

  async getProductById(id: string) {
    return this.productRepository.findById(id);
  }

  async getProductBySlug(slug: string) {
    if (!this.tenantId) throw new Error("Tenant context required to fetch product by slug");
    return this.productRepository.findBySlug(slug, this.tenantId);
  }

  async createProduct(data: Prisma.ProductCreateInput) {
    return this.productRepository.create(data);
  }

  async updateProduct(id: string, data: Prisma.ProductUpdateInput) {
    return this.productRepository.update(id, data);
  }

  async deleteProduct(id: string) {
    // Soft delete
    return this.productRepository.update(id, { 
      status: 'ARCHIVED', 
      deletedAt: new Date() 
    });
  }
}
