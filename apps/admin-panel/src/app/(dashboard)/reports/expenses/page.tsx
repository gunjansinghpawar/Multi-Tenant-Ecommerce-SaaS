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
import { DownloadIcon, FilterIcon, CalendarIcon, PlusIcon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

type ExpenseRow = {
  date: string;
  category: string;
  description: string;
  vendor: string;
  amount: string;
};

const data: ExpenseRow[] = [
  { date: "2026-07-28", category: "Software Subscriptions", description: "Monthly CRM License", vendor: "Salesforce", amount: "$150.00" },
  { date: "2026-07-25", category: "Platform Fees", description: "Payment Gateway Fees", vendor: "Stripe", amount: "$342.50" },
  { date: "2026-07-20", category: "Marketing", description: "Facebook Ads Spend (July)", vendor: "Meta Platforms", amount: "$1,200.00" },
  { date: "2026-07-15", category: "Office Supplies", description: "Packaging Materials", vendor: "Uline", amount: "$450.00" },
];

const columns: ColumnDef<ExpenseRow>[] = [
  { accessorKey: "date", header: "Date" },
  { accessorKey: "category", header: "Category" },
  { accessorKey: "description", header: "Description" },
  { accessorKey: "vendor", header: "Vendor" },
  { accessorKey: "amount", header: "Amount" },
];

export default function ExpensesReportPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          heading="Expenses Report" 
          text="Track operational expenses, software subscriptions, and platform fees."
        />
        <div className="flex space-x-2">
          <Button variant="outline"><PlusIcon className="mr-2 h-4 w-4" /> Log Expense</Button>
          <Button><DownloadIcon className="mr-2 h-4 w-4" /> Export CSV</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Expenses (Selected Period)</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-red-500">$2,142.50</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Top Expense Category</CardTitle></CardHeader>
          <CardContent><div className="text-xl font-bold mt-1">Marketing ($1,200)</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <DataTable columns={columns} data={data} searchKey="category" />
        </CardContent>
      </Card>
    </div>
  );
}
