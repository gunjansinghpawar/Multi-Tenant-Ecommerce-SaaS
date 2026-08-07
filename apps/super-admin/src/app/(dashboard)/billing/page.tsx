"use client";

import React from "react";
import { Card, StatCard, Button, Badge, DataTable } from "@commercex/ui";
import { CreditCardIcon, DollarSignIcon, DownloadIcon, ArrowUpRightIcon } from "lucide-react";

const invoiceData = [
  { id: "INV-2026-001", store: "Fashion Boutique", amount: "$99.00", status: "Paid", date: "Feb 01, 2026" },
  { id: "INV-2026-002", store: "Tech Gadgets", amount: "$499.00", status: "Paid", date: "Feb 01, 2026" },
  { id: "INV-2026-003", store: "Beauty Supply", amount: "$99.00", status: "Pending", date: "Feb 05, 2026" },
  { id: "INV-2026-004", store: "Sporting Goods", amount: "$99.00", status: "Failed", date: "Feb 06, 2026" },
];

const columns = [
  { accessorKey: "id", header: "Invoice ID" },
  { accessorKey: "store", header: "Tenant Store" },
  { accessorKey: "amount", header: "Amount" },
  { 
    accessorKey: "status", 
    header: "Status",
    cell: ({ row }: any) => {
      const status = row.getValue("status") as string;
      const variant = status === "Paid" ? "default" : status === "Pending" ? "secondary" : "destructive";
      return <Badge variant={variant}>{status}</Badge>;
    }
  },
  { accessorKey: "date", header: "Date" },
];

export default function BillingPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Billing & Invoices</h1>
          <p className="text-muted-foreground mt-1">Platform financial reporting and tenant subscriptions.</p>
        </div>
        <Button variant="outline">
          <DownloadIcon className="mr-2 h-4 w-4" /> Export Statement
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Monthly Recurring Revenue" value="$124,500" description="+12% from last month" icon={<DollarSignIcon className="h-4 w-4" />} />
        <StatCard title="Total Invoices Issued" value="1,842" description="98.2% collection rate" icon={<CreditCardIcon className="h-4 w-4" />} />
        <StatCard title="Pending Payouts" value="$14,200" description="Next payout on Mon" icon={<ArrowUpRightIcon className="h-4 w-4" />} />
      </div>

      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4">Recent Invoices</h3>
        <DataTable columns={columns} data={invoiceData} searchKey="store" />
      </Card>
    </div>
  );
}