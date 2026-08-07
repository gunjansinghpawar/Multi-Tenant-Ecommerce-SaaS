"use server";

import { SettingsService, TenantSettingsDTO } from "@commercex/services";
import { revalidatePath } from "next/cache";

// Normally you would extract tenantId from session/headers
// For now we'll mock it or pass it explicitly.
const getCurrentTenantId = () => "t_1"; // Mock tenant ID for Phase 1

export async function getTenantSettingsAction() {
  const tenantId = getCurrentTenantId();
  const settings = await SettingsService.getSettings(tenantId);
  return settings;
}

export async function updateTenantSettingsAction(data: Partial<TenantSettingsDTO>) {
  const tenantId = getCurrentTenantId();
  
  const updated = await SettingsService.upsertSettings(tenantId, data);
  
  revalidatePath("/settings");
  revalidatePath("/settings/branding");
  
  return updated;
}
