import { prisma } from "@commercex/database";

export type OrderStatus = "Processing" | "Fulfilled" | "Cancelled";

export type Order = {
  id: string;
  customer: string;
  amount: number;
  status: OrderStatus;
  createdAt: Date;
};

export type StoreMetrics = {
  revenue: number;
  orders: number;
  customers: number;
  products: number;
  visitors: number;
  conversion: number;
  inventoryValue: number;
  marketingROI: number;
  seoScore: number;
  securityScore: number;
  performanceScore: number;
  storageUsedGB: number;
  storageLimitGB: number;
  liveVisitors: number;
};

/**
 * Service to manage store-specific operations for a tenant
 */
export const StoreService = {
  /**
   * Get store dashboard metrics
   */
  async getMetrics(tenantId?: string): Promise<StoreMetrics> {
    // In a real app, this would use prisma to aggregate data scoped to tenantId.
    // For Phase 1 demo without full seed, we return mock metrics.
    return {
      revenue: 45231.89,
      orders: 2350,
      customers: 12234,
      products: 432,
      visitors: 85400,
      conversion: 2.8,
      inventoryValue: 124500,
      marketingROI: 320,
      seoScore: 92,
      securityScore: 98,
      performanceScore: 85,
      storageUsedGB: 4.2,
      storageLimitGB: 10,
      liveVisitors: 42,
    };
  },

  /**
   * Get recent orders for the store
   */
  async getRecentOrders(tenantId?: string, limit = 5): Promise<Order[]> {
    // In a real app, query Orders scoped to tenantId
    return [
      { id: "ORD-9381", customer: "Olivia Martin", amount: 1999.00, status: "Fulfilled", createdAt: new Date() },
      { id: "ORD-9380", customer: "Jackson Lee", amount: 39.00, status: "Processing", createdAt: new Date() },
      { id: "ORD-9379", customer: "Isabella Nguyen", amount: 299.00, status: "Fulfilled", createdAt: new Date() },
      { id: "ORD-9378", customer: "William Kim", amount: 99.00, status: "Processing", createdAt: new Date() },
      { id: "ORD-9377", customer: "Sofia Davis", amount: 39.00, status: "Cancelled", createdAt: new Date() },
    ];
  }
};
