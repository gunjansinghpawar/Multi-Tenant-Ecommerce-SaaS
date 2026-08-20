import { BaseRepository } from './base.repository';
import { Prisma } from '@prisma/client';
import { PrismaTransactionClient } from '@commercex/database';

export class OrderRepository extends BaseRepository {
  constructor(tenantId?: string, tx?: PrismaTransactionClient) {
    super(tenantId, tx);
  }

  async findById(id: string) {
    return this.db.order.findUnique({ where: { id }, include: { items: true, customer: true } });
  }

  async findMany(args?: Prisma.OrderFindManyArgs) {
    return this.db.order.findMany(args);
  }

  async count(args?: Prisma.OrderCountArgs) {
    return this.db.order.count(args);
  }

  async create(data: Prisma.OrderCreateInput) {
    return this.db.order.create({ data, include: { items: true } });
  }

  async update(id: string, data: Prisma.OrderUpdateInput) {
    return this.db.order.update({ where: { id }, data, include: { items: true } });
  }
}
