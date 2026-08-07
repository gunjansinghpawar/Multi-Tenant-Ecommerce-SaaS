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

type ProfitRow = {
  sku: string;
  product: string;
  qtySold: number;
  netSales: string;
  cogs: string;
  grossProfit: string;
  margin: string;
};

const data: ProfitRow[] = [
  { sku: "WH-1000XM5", product: "Wireless Headphones", qtySold: 45, netSales: "$15,750.00", cogs: "$6,750.00", grossProfit: "$9,000.00", margin: "57.1%" },
  { sku: "KB-MECH-01", product: "Mechanical Keyboard", qtySold: 32, netSales: "$4,800.00", cogs: "$1,440.00", grossProfit: "$3,360.00", margin: "70.0%" },
  { sku: "CH-ERGO-B", product: "Ergonomic Chair", qtySold: 8, netSales: "$2,392.00", cogs: "$960.00", grossProfit: "$1,432.00", margin: "59.8%" },
];

const columns: ColumnDef<ProfitRow>[] = [
  { accessorKey: "sku", header: "SKU" },
  { accessorKey: "product", header: "Product" },
  { accessorKey: "qtySold", header: "Qty Sold" },
  { accessorKey: "netSales", header: "Net Sales" },
  { accessorKey: "cogs", header: "COGS" },
  { accessorKey: "grossProfit", header: "Gross Profit" },
  { 
    accessorKey: "margin", 
    header: "Margin %",
    cell: ({ row }) => {
      const margin = parseFloat(row.original.margin);
      let colorClass = "text-muted-foreground";
      if (margin > 60) colorClass = "text-green-600 font-semibold";
      else if (margin < 30) colorClass = "text-red-600 font-semibold";
      return <span className={colorClass}>{row.original.margin}</span>;
    }
  },
];

export default function ProfitReportPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          heading="Profit Margin Report" 
          text="Gross profit and margin percentages broken down by product."
        />
        <div className="flex space-x-2">
          <Button variant="outline"><FilterIcon className="mr-2 h-4 w-4" /> Filter</Button>
          <Button variant="outline"><CalendarIcon className="mr-2 h-4 w-4" /> Last 30 Days</Button>
          <Button><DownloadIcon className="mr-2 h-4 w-4" /> Export CSV</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Net Sales</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">$22,942.00</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total COGS</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">$9,150.00</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Average Gross Margin</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">60.1%</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <DataTable columns={columns} data={data} searchKey="product" />
        </CardContent>
      </Card>
    </div>
  );
}
