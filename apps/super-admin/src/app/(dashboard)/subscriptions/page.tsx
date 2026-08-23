import { getPlansAction } from "../../../actions/plan.actions";
import { SubscriptionsClient } from "./subscriptions-client";

export const metadata = {
  title: "Subscription Plans | CommerceX",
  description: "Manage platform subscription tiers",
};

export default async function SubscriptionsPage() {
  const result = await getPlansAction();
  const initialPlans = result.success ? result.data : [];

  return <SubscriptionsClient initialPlans={initialPlans as any} />;
}