"use client";

import React from "react";
import { 
  PageHeader, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  DataTable,
  Button
} from "@commercex/ui";
import { DownloadIcon, FilterIcon, CalendarIcon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

type CustomerRow = {
  customerName: string;
  email: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: string;
  aov: string;
};

const data: CustomerRow[] = [
  { customerName: "Sarah Smith", email: "sarah@example.com", joinDate: "2025-01-15", totalOrders: 12, totalSpent: "$1,450.00", aov: "$120.83" },
  { customerName: "Mike Johnson", email: "mike.j@example.com", joinDate: "2026-03-22", totalOrders: 3, totalSpent: "$450.00", aov: "$150.00" },
  { customerName: "Emily Davis", email: "emilyd@example.com", joinDate: "2024-11-10", totalOrders: 25, totalSpent: "$3,200.00", aov: "$128.00" },
];

const columns: ColumnDef<CustomerRow>[] = [
  { accessorKey: "customerName", header: "Customer Name" },
  { accessorKey: "email", header: "Email Address" },
  { accessorKey: "joinDate", header: "Join Date" },
  { accessorKey: "totalOrders", header: "Total Orders" },
  { accessorKey: "totalSpent", header: "Lifetime Value (LTV)" },
  { accessorKey: "aov", header: "Avg Order Value" },
];

export default function CustomerReportPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          heading="Customer Data Report" 
          text="Detailed directory of customer order history and lifetime value."
        />
        <div className="flex space-x-2">
          <Button variant="outline"><FilterIcon className="mr-2 h-4 w-4" /> Filter</Button>
          <Button><DownloadIcon className="mr-2 h-4 w-4" /> Export CSV</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Customers</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">14,892</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Average LTV</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">$425.50</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <DataTable columns={columns} data={data} searchKey="customerName" />
        </CardContent>
      </Card>
    </div>
  );
}
