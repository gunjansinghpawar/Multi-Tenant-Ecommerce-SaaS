"use client";

import React from "react";
import { 
  PageHeader, 
  Button,
  DataTable,
  Badge,
} from "@commercex/ui";
import { DownloadIcon, FilterIcon, MoreHorizontalIcon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

type Transaction = {
  id: string;
  orderId: string;
  amount: string;
  method: string;
  status: "Succeeded" | "Processing" | "Failed" | "Refunded";
  date: string;
  gateway: string;
};

const data: Transaction[] = [
  { id: "txn_1092a", orderId: "#ORD-1092", amount: "$120.00", method: "Visa •••• 4242", status: "Succeeded", date: "Oct 24, 10:15 AM", gateway: "Stripe" },
  { id: "pay_xyz789", orderId: "#ORD-1091", amount: "$45.00", method: "UPI", status: "Succeeded", date: "Oct 24, 09:30 AM", gateway: "Razorpay" },
  { id: "txn_1090c", orderId: "#ORD-1090", amount: "$24.99", method: "PayPal Account", status: "Refunded", date: "Oct 23, 04:12 PM", gateway: "PayPal" },
  { id: "txn_1089d", orderId: "#ORD-1089", amount: "$85.00", method: "Mastercard •••• 1234", status: "Failed", date: "Oct 23, 02:00 PM", gateway: "Stripe" },
  { id: "txn_1088e", orderId: "#ORD-1088", amount: "$15.00", method: "Store Wallet", status: "Succeeded", date: "Oct 23, 11:45 AM", gateway: "Internal" },
  { id: "pay_abc123", orderId: "#ORD-1087", amount: "$150.00", method: "Cash on Delivery", status: "Processing", date: "Oct 22, 01:20 PM", gateway: "Manual" },
];

const columns: ColumnDef<Transaction>[] = [
  { 
    accessorKey: "id", 
    header: "Transaction ID",
    cell: ({ row }) => <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">{row.getValue("id")}</span>
  },
  { 
    accessorKey: "orderId", 
    header: "Order",
    cell: ({ row }) => <span className="font-medium text-primary hover:underline cursor-pointer">{row.getValue("orderId")}</span>
  },
  { 
    accessorKey: "amount", 
    header: "Amount",
    cell: ({ row }) => <span className="font-medium">{row.getValue("amount")}</span>
  },
  { 
    accessorKey: "gateway", 
    header: "Gateway",
    cell: ({ row }) => <Badge variant="outline">{row.getValue("gateway")}</Badge>
  },
  { 
    accessorKey: "method", 
    header: "Method",
    cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.getValue("method")}</span>
  },
  { 
    accessorKey: "status", 
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const variant = status === "Succeeded" ? "success" : status === "Failed" ? "destructive" : status === "Refunded" ? "secondary" : "warning";
      return <Badge variant={variant as any}>{status}</Badge>;
    }
  },
  { accessorKey: "date", header: "Date" },
  {
    id: "actions",
    cell: () => (
      <Button variant="ghost" size="icon">
        <MoreHorizontalIcon className="h-4 w-4" />
      </Button>
    )
  }
];

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Transactions & Logs" 
        text="A master ledger of all individual payments, captures, and authorization attempts."
      >
        <div className="flex gap-2">
          <Button variant="outline">
            <FilterIcon className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline">
            <DownloadIcon className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </PageHeader>

      <DataTable columns={columns} data={data} searchKey="id" />
    </div>
  );
}
