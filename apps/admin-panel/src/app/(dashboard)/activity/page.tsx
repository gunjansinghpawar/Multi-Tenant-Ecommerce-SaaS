"use client";

import React from "react";
import { PageHeader, DataTable } from "@commercex/ui";
import { ColumnDef } from "@tanstack/react-table";

type StoreActivity = {
  id: string;
  action: string;
  user: string;
  date: string;
};

const mockActivity: StoreActivity[] = [
  { id: "1", action: "Updated Store Branding", user: "alice@store.com", date: "2026-07-26 15:45:00" },
  { id: "2", action: "Invited bob@store.com", user: "alice@store.com", date: "2026-07-26 14:20:11" },
  { id: "3", action: "Deleted Product 'Widget A'", user: "bob@store.com", date: "2026-07-25 10:15:33" },
  { id: "4", action: "Processed Refund #9921", user: "carol@store.com", date: "2026-07-24 09:30:00" },
];

const columns: ColumnDef<StoreActivity>[] = [
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => <div className="font-medium">{row.original.action}</div>,
  },
  {
    accessorKey: "user",
    header: "Performed By",
  },
  {
    accessorKey: "date",
    header: "Date & Time",
    cell: ({ row }) => <div className="text-muted-foreground text-sm">{row.original.date}</div>,
  },
];

export default function ActivityLogPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Activity Log" 
        text="Track changes and actions taken within your store."
      />

      <DataTable 
        columns={columns} 
        data={mockActivity} 
        searchKey="action" 
      />
    </div>
  );
}
