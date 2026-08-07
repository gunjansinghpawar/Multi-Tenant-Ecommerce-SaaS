"use client";

import React from "react";
import { 
  PageHeader, 
  Button,
  DataTable,
  Badge
} from "@commercex/ui";
import { DownloadIcon, PauseIcon, PlayIcon, XCircleIcon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

type Subscription = {
  id: string;
  customer: string;
  plan: string;
  status: "Active" | "Paused" | "Cancelled";
  nextBilling: string;
  amount: string;
};

const data: Subscription[] = [
  { id: "SUB-9001", customer: "Alice Smith", plan: "Monthly Coffee Beans", status: "Active", nextBilling: "Nov 01, 2026", amount: "$24.99" },
  { id: "SUB-9002", customer: "Bob Jones", plan: "Quarterly Vitamins", status: "Paused", nextBilling: "Paused", amount: "$45.00" },
  { id: "SUB-9003", customer: "Charlie Brown", plan: "Premium Membership", status: "Active", nextBilling: "Dec 15, 2026", amount: "$99.00/yr" },
  { id: "SUB-9004", customer: "Diana Prince", plan: "Monthly Coffee Beans", status: "Cancelled", nextBilling: "-", amount: "$24.99" },
];

const columns: ColumnDef<Subscription>[] = [
  { 
    accessorKey: "id", 
    header: "Sub ID",
    cell: ({ row }) => (
      <Link href={`/customers/CUS-001`} className="font-medium text-primary hover:underline">
        {row.getValue("id")}
      </Link>
    )
  },
  { accessorKey: "customer", header: "Customer" },
  { accessorKey: "plan", header: "Plan / Product" },
  { 
    accessorKey: "status", 
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const variant = status === "Active" ? "success" : status === "Cancelled" ? "destructive" : "warning";
      return <Badge variant={variant as any}>{status}</Badge>;
    }
  },
  { accessorKey: "nextBilling", header: "Next Billing" },
  { accessorKey: "amount", header: "Amount" },
  {
    id: "actions",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <div className="flex items-center gap-1">
          {status === "Active" && (
            <Button variant="ghost" size="icon" title="Pause">
              <PauseIcon className="h-4 w-4" />
            </Button>
          )}
          {status === "Paused" && (
            <Button variant="ghost" size="icon" title="Resume">
              <PlayIcon className="h-4 w-4" />
            </Button>
          )}
          {status !== "Cancelled" && (
            <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" title="Cancel">
              <XCircleIcon className="h-4 w-4" />
            </Button>
          )}
        </div>
      );
    }
  }
];

export default function SubscriptionsPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Subscriptions" 
        text="Manage recurring orders, memberships, and subscription billing."
      >
        <Button variant="outline">
          <DownloadIcon className="mr-2 h-4 w-4" />
          Export List
        </Button>
      </PageHeader>

      <DataTable columns={columns} data={data} searchKey="customer" />
    </div>
  );
}
