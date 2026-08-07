"use client";

import React from "react";
import { 
  PageHeader, 
  Button,
  DataTable,
  Badge,
} from "@commercex/ui";
import { DownloadIcon, ArrowRightIcon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

type Payout = {
  id: string;
  gateway: string;
  amount: string;
  status: "Paid" | "In Transit" | "Failed";
  date: string;
  bank: string;
};

const data: Payout[] = [
  { id: "po_1Pq...", gateway: "Stripe", amount: "$4,250.00", status: "Paid", date: "Oct 24, 2026", bank: "Chase ****4455" },
  { id: "pout_x...", gateway: "Razorpay", amount: "$1,120.00", status: "In Transit", date: "Oct 24, 2026", bank: "HDFC ****9900" },
  { id: "po_1Pp...", gateway: "Stripe", amount: "$3,800.00", status: "Paid", date: "Oct 21, 2026", bank: "Chase ****4455" },
  { id: "pout_w...", gateway: "Razorpay", amount: "$950.00", status: "Paid", date: "Oct 20, 2026", bank: "HDFC ****9900" },
  { id: "po_1Po...", gateway: "Stripe", amount: "$4,100.00", status: "Paid", date: "Oct 18, 2026", bank: "Chase ****4455" },
];

const columns: ColumnDef<Payout>[] = [
  { 
    accessorKey: "id", 
    header: "Payout ID",
    cell: ({ row }) => <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-primary cursor-pointer hover:underline">{row.getValue("id")}</span>
  },
  { 
    accessorKey: "gateway", 
    header: "Gateway",
    cell: ({ row }) => <Badge variant="outline">{row.getValue("gateway")}</Badge>
  },
  { 
    accessorKey: "amount", 
    header: "Amount",
    cell: ({ row }) => <span className="font-bold text-success">{row.getValue("amount")}</span>
  },
  { 
    accessorKey: "bank", 
    header: "Destination Bank",
    cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.getValue("bank")}</span>
  },
  { 
    accessorKey: "status", 
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const variant = status === "Paid" ? "success" : status === "In Transit" ? "warning" : "destructive";
      return <Badge variant={variant as any}>{status}</Badge>;
    }
  },
  { accessorKey: "date", header: "Date" },
  {
    id: "actions",
    cell: () => (
      <Button variant="ghost" size="sm">
        View Details <ArrowRightIcon className="ml-2 h-4 w-4" />
      </Button>
    )
  }
];

export default function PayoutsPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Bank Payouts" 
        text="Track batches of funds deposited from payment gateways into your bank account."
      >
        <Button variant="outline">
          <DownloadIcon className="mr-2 h-4 w-4" />
          Export Statement
        </Button>
      </PageHeader>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 border rounded-md bg-muted/10">
          <p className="text-sm text-muted-foreground mb-1">Total Paid (This Month)</p>
          <p className="text-2xl font-bold">$14,220.00</p>
        </div>
        <div className="p-4 border rounded-md bg-warning/10 border-warning/30">
          <p className="text-sm text-warning-foreground mb-1">In Transit</p>
          <p className="text-2xl font-bold text-warning-foreground">$1,120.00</p>
        </div>
        <div className="p-4 border rounded-md bg-muted/10">
          <p className="text-sm text-muted-foreground mb-1">Next Expected Payout</p>
          <p className="text-lg font-bold">Oct 26, 2026</p>
          <p className="text-xs text-muted-foreground">Est. $1,400.00</p>
        </div>
      </div>

      <DataTable columns={columns} data={data} searchKey="id" />
    </div>
  );
}
