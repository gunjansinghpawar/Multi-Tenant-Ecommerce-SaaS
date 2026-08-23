import { getTenantsAction, getAvailablePlansAction } from "../../../actions/tenant.actions";
import { StoresClient } from "./stores-client";

export const metadata = {
  title: "Stores | CommerceX",
  description: "Manage tenant stores",
};

export default async function StoresPage() {
  const result = await getTenantsAction();
  const initialData = result.success ? result.data : [];
  
  const plansResult = await getAvailablePlansAction();
  const availablePlans = plansResult.success ? plansResult.data : [];

  return <StoresClient initialData={initialData as any} availablePlans={availablePlans as any} />;
}
