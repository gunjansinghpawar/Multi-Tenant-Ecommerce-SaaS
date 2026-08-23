import React from "react";
import { DataTableSkeleton } from "@commercex/ui";

export default function Loading() {
  return (
    <div className="flex flex-col gap-6 w-full p-6">
      <div className="space-y-4">
        <DataTableSkeleton columnCount={5} rowCount={10} showToolbar={true} />
      </div>
    </div>
  );
}
