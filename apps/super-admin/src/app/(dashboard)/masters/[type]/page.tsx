import React from "react";
import { notFound } from "next/navigation";
import { MASTER_CONFIGS } from "@commercex/types/src/master.config";
import { getMasterDataAction } from "@/actions/master.actions";
import { MasterClient } from "./MasterClient";

export default async function DynamicMasterPage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  
  if (!MASTER_CONFIGS[type]) {
    notFound();
  }

  // Super Admin view so tenantId is null (Global context)
  const data = await getMasterDataAction(type, null);
  const initialData = JSON.parse(JSON.stringify(data));
  return (
    <div className="flex flex-col gap-6 w-full p-6">
      <MasterClient typeSlug={type} initialData={initialData} />
    </div>
  );
}
