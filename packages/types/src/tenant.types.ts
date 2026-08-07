export type TenantStatus = "active" | "suspended" | "pending_verification";

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  status: TenantStatus;
  planId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTenantDTO {
  name: string;
  slug: string;
  planId: string;
}

export interface UpdateTenantDTO {
  name?: string;
  status?: TenantStatus;
  planId?: string;
}
