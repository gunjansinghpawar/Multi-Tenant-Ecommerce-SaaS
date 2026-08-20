import { PrismaClient } from '@prisma/client';
import { prisma, createTenantScopedClient, PrismaTransactionClient } from '@commercex/database';

/**
 * Base Repository pattern with built-in tenant scoping and transaction support.
 */
export abstract class BaseRepository {
  protected db: ReturnType<typeof createTenantScopedClient> | PrismaClient | PrismaTransactionClient;
  protected tenantId?: string;

  /**
   * If a transaction client (tx) is provided, the repository will execute all operations within it.
   */
  constructor(tenantId?: string, tx?: PrismaTransactionClient) {
    this.tenantId = tenantId;
    
    if (tx) {
      // If we are in a transaction, use the transaction context directly.
      // (Note: To strictly scope transactions by tenant, raw SQL isolation might be required, 
      // but for Prisma interactive transactions, we use the tx client).
      this.db = tx;
    } else {
      this.db = tenantId ? createTenantScopedClient(prisma, tenantId) : prisma;
    }
  }

  protected get isTenantScoped(): boolean {
    return !!this.tenantId;
  }
}
