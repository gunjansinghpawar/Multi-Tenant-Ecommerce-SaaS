import { prisma } from "@commercex/database";

export type TenantSettingsDTO = {
  id?: string;
  tenantId: string;
  storeName?: string | null;
  companyName?: string | null;
  supportEmail?: string | null;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  zipCode?: string | null;
  country?: string | null;
  currency: string;
  timezone: string;
  locale: string;
  brandingLogoUrl?: string | null;
  brandingFaviconUrl?: string | null;
  primaryColor?: string | null;
  accentColor?: string | null;
};

export const SettingsService = {
  async getSettings(tenantId: string): Promise<TenantSettingsDTO | null> {
    try {
      const settings = await prisma.tenantSettings.findUnique({
        where: { tenantId }
      });
      return settings;
    } catch (error) {
      console.error("Error fetching settings:", error);
      return null;
    }
  },

  async upsertSettings(tenantId: string, data: Partial<TenantSettingsDTO>): Promise<TenantSettingsDTO | null> {
    try {
      const settings = await prisma.tenantSettings.upsert({
        where: { tenantId },
        update: {
          ...data,
          tenantId: undefined, // ensure tenantId isn't overwritten
        },
        create: {
          tenantId,
          ...data,
        } as any,
      });
      return settings;
    } catch (error) {
      console.error("Error updating settings:", error);
      return null;
    }
  }
};
