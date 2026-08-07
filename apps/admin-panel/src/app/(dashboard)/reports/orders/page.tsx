"use client";

import React from "react";
import { 
  PageHeader, 
  Card, 
  CardContent, 
  DataTable,
  Button
} from "@commercex/ui";
import { DownloadIcon, FilterIcon, CalendarIcon, MoreHorizontalIcon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

type OrderRow = {
  orderId: string;
  date: string;
  customer: string;
  items: number;
  total: string;
  status: string;
  fulfillment: string;
};

const data: OrderRow[] = [
  { orderId: "#ORD-9912", date: "2026-07-31 10:45 AM", customer: "John Doe", items: 3, total: "$124.50", status: "Paid", fulfillment: "Unfulfilled" },
  { orderId: "#ORD-9911", date: "2026-07-31 09:12 AM", customer: "Sarah Smith", items: 1, total: "$45.00", status: "Paid", fulfillment: "Fulfilled" },
  { orderId: "#ORD-9910", date: "2026-07-30 08:30 PM", customer: "Mike Johnson", items: 5, total: "$340.20", status: "Pending", fulfillment: "Unfulfilled" },
  { orderId: "#ORD-9909", date: "2026-07-30 02:15 PM", customer: "Emily Davis", items: 2, total: "$89.99", status: "Refunded", fulfillment: "Returned" },
];

const columns: ColumnDef<OrderRow>[] = [
  { accessorKey: "orderId", header: "Order ID" },
  { accessorKey: "date", header: "Date" },
  { accessorKey: "customer", header: "Customer" },
  { accessorKey: "items", header: "Items" },
  { accessorKey: "total", header: "Total" },
  { 
    accessorKey: "status", 
    header: "Payment Status",
    cell: ({ row }) => {
      const status = row.original.status;
      let color = "bg-gray-100 text-gray-800";
      if (status === "Paid") color = "bg-green-100 text-green-800";
      if (status === "Refunded") color = "bg-red-100 text-red-800";
      if (status === "Pending") color = "bg-yellow-100 text-yellow-800";
      return <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>{status}</span>;
    }
  },
  { 
    accessorKey: "fulfillment", 
    header: "Fulfillment",
    cell: ({ row }) => {
      const status = row.original.fulfillment;
      let color = "bg-gray-100 text-gray-800";
      if (status === "Fulfilled") color = "bg-blue-100 text-blue-800";
      if (status === "Returned") color = "bg-red-100 text-red-800";
      if (status === "Unfulfilled") color = "bg-yellow-100 text-yellow-800";
      return <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>{status}</span>;
    }
  },
  {
    id: "actions",
    cell: () => <Button variant="ghost" size="icon"><MoreHorizontalIcon className="h-4 w-4" /></Button>
  }
];

export default function OrdersReportPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          heading="Orders Report" 
          text="Comprehensive list of all orders and their current statuses."
        />
        <div className="flex space-x-2">
          <Button variant="outline"><FilterIcon className="mr-2 h-4 w-4" /> Filter</Button>
          <Button variant="outline"><CalendarIcon className="mr-2 h-4 w-4" /> This Month</Button>
          <Button><DownloadIcon className="mr-2 h-4 w-4" /> Export Excel</Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <DataTable columns={columns} data={data} searchKey="orderId" />
        </CardContent>
      </Card>
    </div>
  );
}
