import { PrismaClient, Prisma } from '@prisma/client';
import { prisma, createTenantScopedClient } from '@commercex/database';

export class UserRepository {
  private db: ReturnType<typeof createTenantScopedClient> | PrismaClient;
  private tenantId?: string;

  constructor(tenantId?: string) {
    this.tenantId = tenantId;
    // If tenantId is provided, use the tenant-scoped client. Otherwise, use global client.
    this.db = tenantId ? createTenantScopedClient(prisma, tenantId) : prisma;
  }

  async findById(id: string) {
    return this.db.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.db.user.findUnique({ where: { email } });
  }

  async create(data: Prisma.UserCreateInput) {
    return this.db.user.create({ data });
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    return this.db.user.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.db.user.delete({ where: { id } });
  }
}
