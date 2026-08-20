import { BaseService } from './base.service';
import { OrderRepository, ProductRepository } from '@commercex/repositories';
import { Prisma } from '@prisma/client';

export class OrderService extends BaseService {
  private orderRepository: OrderRepository;
  private productRepository: ProductRepository;

  constructor(tenantId?: string) {
    super(tenantId);
    this.orderRepository = new OrderRepository(tenantId);
    this.productRepository = new ProductRepository(tenantId);
  }

  async getOrders(args?: Prisma.OrderFindManyArgs) {
    return this.orderRepository.findMany({
      orderBy: { createdAt: 'desc' },
      ...args,
    });
  }

  async getOrderById(id: string) {
    return this.orderRepository.findById(id);
  }

  async createOrder(data: { customerId?: string, items: Array<{ productId: string, quantity: number }> }) {
    if (!this.tenantId) throw new Error("Tenant ID required to create an order");

    // In a real implementation, this would involve a transaction to verify inventory, calculate total price, etc.
    // For now, it's a simplified version.
    
    let totalAmount = 0;
    const orderItems = [];

    for (const item of data.items) {
      const product = await this.productRepository.findById(item.productId);
      if (!product) throw new Error(`Product not found: ${item.productId}`);
      
      const price = Number(product.price);
      totalAmount += price * item.quantity;
      
      orderItems.push({
        productId: product.id,
        quantity: item.quantity,
        price: price,
      });
    }

    return this.orderRepository.create({
      tenant: { connect: { id: this.tenantId } },
      customer: data.customerId ? { connect: { id: data.customerId } } : undefined,
      totalAmount,
      items: {
        create: orderItems
      }
    });
  }

  async updateOrderStatus(id: string, status: string) {
    return this.orderRepository.update(id, { status });
  }
}
