import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ProductService, OrderService } from '@commercex/services';
import { createTenantScopedClient } from '@commercex/database/src/tenant-context';

describe('Layer 4 & 6: Tenant Isolation Security boundaries', () => {
  const TENANT_A_ID = 'tenant_a_123';
  const TENANT_B_ID = 'tenant_b_456';

  let mockPrisma: any;
  let scopedPrismaA: any;
  
  beforeEach(() => {
    // Mock the base Prisma client methods
    mockPrisma = {
      $extends: vi.fn((ext) => {
        // Return a proxy that mimics the extended client behavior
        // Since we are unit testing the logic of createTenantScopedClient itself,
        // we can just run the real createTenantScopedClient but pass our mock Prisma.
        // Actually, $extends is tricky to mock fully. 
        // A better approach for unit testing the extension is to instantiate it 
        // with a mock object that supports $extends natively if possible, or 
        // manually trigger the $allOperations callback.
      })
    };
    
    vi.clearAllMocks();
  });

  // To properly test the actual `tenant-context.ts` logic, we can construct the extension:
  it('Prisma Extension should inject tenantId into findFirst queries', async () => {
    // Create a dummy operation handler
    let interceptedQuery: any;
    
    const dummyPrisma = {
      $extends: (extension: any) => {
        const operationHandler = extension.query.$allModels.$allOperations;
        
        // Return an object that routes calls through the operationHandler
        return {
          product: {
            findFirst: async (args: any) => {
              return operationHandler({
                model: 'Product',
                operation: 'findFirst',
                args,
                query: async (finalArgs: any) => {
                  interceptedQuery = finalArgs;
                  return { id: 'prod_123', tenantId: TENANT_A_ID };
                }
              });
            },
            update: async (args: any) => {
              return operationHandler({
                model: 'Product',
                operation: 'update',
                args,
                query: async (finalArgs: any) => {
                  interceptedQuery = finalArgs;
                  return { id: 'prod_123', tenantId: TENANT_A_ID };
                }
              });
            }
          },
          // We need to provide the original client methods for the extension to call (like findFirst during update)
          findFirst: vi.fn().mockResolvedValue({ id: 'prod_123', tenantId: TENANT_A_ID })
        };
      }
    } as any;

    const scopedClient = createTenantScopedClient(dummyPrisma, TENANT_A_ID);
    
    await scopedClient.product.findFirst({ where: { category: 'electronics' } });
    
    expect(interceptedQuery.where).toHaveProperty('tenantId', TENANT_A_ID);
    expect(interceptedQuery.where).toHaveProperty('category', 'electronics');
  });

  it('Prisma Extension MUST reject update attempts if the record does not belong to the tenant', async () => {
    let operationExecuted = false;

    const dummyPrisma = {
      $extends: (extension: any) => {
        const operationHandler = extension.query.$allModels.$allOperations;
        
        // The mock base client that the extension wraps
        const baseClient = {
          product: {
            // Simulate that the record exists but belongs to TENANT_B_ID
            findFirst: vi.fn().mockResolvedValue({ id: 'prod_999', tenantId: TENANT_B_ID })
          }
        };

        return {
          product: {
            update: async (args: any) => {
              // We pass baseClient as the 'this' context for the extension to use
              // Wait, the extension uses `prisma[model].findFirst`. So `dummyPrisma` needs it.
              return operationHandler({
                model: 'Product',
                operation: 'update',
                args,
                query: async (finalArgs: any) => {
                  operationExecuted = true;
                  return { id: 'prod_999' };
                }
              });
            }
          }
        };
      },
      product: {
         findFirst: vi.fn().mockImplementation(async (args) => {
           // Simulate a database returning null if the where clause includes the wrong tenantId
           if (args.where.tenantId === TENANT_A_ID) return null;
           return { id: 'prod_999', tenantId: TENANT_B_ID };
         })
      }
    } as any;

    const scopedClient = createTenantScopedClient(dummyPrisma, TENANT_A_ID);
    
    // Tenant A attempts to update a product belonging to Tenant B
    await expect(
      scopedClient.product.update({ where: { id: 'prod_999' }, data: { name: 'Hacked' } })
    ).rejects.toThrowError(/TENANT ISOLATION VIOLATION/);
    
    expect(operationExecuted).toBe(false);
  });
});
