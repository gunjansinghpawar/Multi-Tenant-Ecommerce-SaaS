import { PrismaClient } from '@prisma/client';

export * from './tenant-context';

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: PrismaClient | undefined;
}

export const prisma = globalThis.prismaGlobal ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma;
}

/**
 * Type alias for a Prisma transaction client.
 * This ensures services and repositories can pass the transaction safely.
 */
export type PrismaTransactionClient = Omit<
  PrismaClient,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;

/**
 * Wraps complex multi-step operations in an interactive transaction.
 * @param work The closure to execute inside the transaction.
 * @param isolationLevel Optional stricter isolation level (e.g., Serializable).
 */
export async function runInTransaction<T>(
  work: (tx: PrismaTransactionClient) => Promise<T>,
  isolationLevel?: import('@prisma/client').Prisma.TransactionIsolationLevel
): Promise<T> {
  return prisma.$transaction(
    async (tx) => {
      return work(tx);
    },
    {
      isolationLevel,
      maxWait: 5000,
      timeout: 10000,
    }
  );
}

export * from '@prisma/client';
