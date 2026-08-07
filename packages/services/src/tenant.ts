import { prisma } from "@commercex/database";

export type TenantDTO = {
  id: string;
  name: string;
  domain: string;
  plan: string;
  status: string;
};

/**
 * Service to manage system tenants (Stores)
 */
export const TenantAdminService = {
  /**
   * Fetch a list of tenants (for Super Admin)
   */
  async getTenants(): Promise<TenantDTO[]> {
    try {
      const tenants = await prisma.tenant.findMany({
        orderBy: { createdAt: "desc" },
      });
      
      // If DB is not seeded, return mock data for Phase 1 demo
      if (tenants.length === 0) {
        return getMockTenants();
      }
      
      return tenants.map(t => ({
        id: t.id,
        name: t.name,
        domain: t.customDomain || `${t.slug}.commercex.com`,
        plan: "Pro", // Placeholder since plan isn't in DB yet
        status: t.status,
      }));
    } catch (error) {
      console.error("Error fetching tenants:", error);
      // Fallback to mock on connection error
      return getMockTenants();
    }
  },

  /**
   * Get total tenant count
   */
  async getTenantCount(): Promise<number> {
    try {
      const count = await prisma.tenant.count();
      return count > 0 ? count : 1248; // mock fallback
    } catch {
      return 1248;
    }
  }
};

function getMockTenants(): TenantDTO[] {
  return [
    { id: "t_1", name: "Acme Corp", domain: "acme.commercex.com", plan: "Enterprise", status: "Active" },
    { id: "t_2", name: "Globex UI", domain: "globex.commercex.com", plan: "Pro", status: "Active" },
    { id: "t_3", name: "Soylent Corp", domain: "soylent.commercex.com", plan: "Startup", status: "Trial" },
    { id: "t_4", name: "Initech", domain: "initech.commercex.com", plan: "Pro", status: "Active" },
    { id: "t_5", name: "Umbrella", domain: "umbrella.commercex.com", plan: "Enterprise", status: "Active" },
  ];
}
