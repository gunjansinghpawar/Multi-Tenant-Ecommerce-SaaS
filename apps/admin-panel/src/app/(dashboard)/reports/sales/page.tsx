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

type SalesReportRow = {
  date: string;
  source: string;
  grossSales: string;
  discounts: string;
  returns: string;
  netSales: string;
  tax: string;
  total: string;
};

const data: SalesReportRow[] = [
  { date: "2026-07-30", source: "Online Store", grossSales: "$4,250.00", discounts: "$150.00", returns: "$0.00", netSales: "$4,100.00", tax: "$328.00", total: "$4,428.00" },
  { date: "2026-07-30", source: "POS - Main Store", grossSales: "$1,800.00", discounts: "$0.00", returns: "$45.00", netSales: "$1,755.00", tax: "$140.40", total: "$1,895.40" },
  { date: "2026-07-29", source: "Online Store", grossSales: "$3,900.00", discounts: "$200.00", returns: "$120.00", netSales: "$3,580.00", tax: "$286.40", total: "$3,866.40" },
  { date: "2026-07-28", source: "Instagram", grossSales: "$850.00", discounts: "$50.00", returns: "$0.00", netSales: "$800.00", tax: "$64.00", total: "$864.00" },
];

const columns: ColumnDef<SalesReportRow>[] = [
  { accessorKey: "date", header: "Date" },
  { accessorKey: "source", header: "Sales Channel" },
  { accessorKey: "grossSales", header: "Gross Sales" },
  { accessorKey: "discounts", header: "Discounts" },
  { accessorKey: "returns", header: "Returns" },
  { accessorKey: "netSales", header: "Net Sales" },
  { accessorKey: "tax", header: "Tax" },
  { accessorKey: "total", header: "Total Sales" },
];

export default function SalesReportPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          heading="Sales Report" 
          text="Detailed ledger of gross sales, discounts, returns, and net totals."
        />
        <div className="flex space-x-2">
          <Button variant="outline">
            <FilterIcon className="mr-2 h-4 w-4" /> Filter
          </Button>
          <Button variant="outline">
            <CalendarIcon className="mr-2 h-4 w-4" /> This Week
          </Button>
          <Button>
            <DownloadIcon className="mr-2 h-4 w-4" /> Export CSV
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Gross Sales</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">$10,800.00</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Discounts</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-red-500">-$400.00</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Returns</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-red-500">-$165.00</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Net Sales</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">$10,235.00</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <DataTable columns={columns} data={data} searchKey="source" />
        </CardContent>
      </Card>
    </div>
  );
}
