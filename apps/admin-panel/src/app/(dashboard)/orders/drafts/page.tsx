"use client";

import React from "react";
import { 
  PageHeader, 
  Button,
  DataTable,
  Badge
} from "@commercex/ui";
import { PlusIcon, TrashIcon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

type DraftOrder = {
  id: string;
  customer: string | "No customer";
  itemsCount: number;
  total: string;
  dateCreated: string;
};

const data: DraftOrder[] = [
  { id: "DRAFT-091", customer: "Alice Smith", itemsCount: 3, total: "$120.00", dateCreated: "2023-10-05" },
  { id: "DRAFT-092", customer: "No customer", itemsCount: 1, total: "$45.50", dateCreated: "2023-10-05" },
  { id: "DRAFT-093", customer: "Charlie Brown", itemsCount: 12, total: "$890.99", dateCreated: "2023-10-04" },
];

const columns: ColumnDef<DraftOrder>[] = [
  { 
    accessorKey: "id", 
    header: "Draft ID",
    cell: ({ row }) => (
      <Link href={`/orders/manual?id=${row.getValue("id")}`} className="font-medium text-primary hover:underline">
        {row.getValue("id")}
      </Link>
    )
  },
  { 
    accessorKey: "customer", 
    header: "Customer",
    cell: ({ row }) => {
      const customer = row.getValue("customer") as string;
      return <span className={customer === "No customer" ? "text-muted-foreground italic" : ""}>{customer}</span>;
    }
  },
  { accessorKey: "itemsCount", header: "Items" },
  { accessorKey: "total", header: "Total" },
  { accessorKey: "dateCreated", header: "Created On" },
  {
    id: "actions",
    cell: ({ row }) => (
      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10">
        <TrashIcon className="h-4 w-4" />
      </Button>
    )
  }
];

export default function DraftOrdersPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Draft Orders" 
        text="Unfinished orders or saved quotes that haven't been finalized."
      >
        <Link href="/orders/manual">
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />
            Create Draft
          </Button>
        </Link>
      </PageHeader>

      <DataTable columns={columns} data={data} searchKey="customer" />
    </div>
  );
}
