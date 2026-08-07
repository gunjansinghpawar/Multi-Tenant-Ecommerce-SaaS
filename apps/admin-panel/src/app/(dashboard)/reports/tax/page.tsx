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

type TaxRow = {
  region: string;
  taxName: string;
  rate: string;
  taxableSales: string;
  taxCollected: string;
};

const data: TaxRow[] = [
  { region: "California (US)", taxName: "CA State Sales Tax", rate: "7.25%", taxableSales: "$12,400.00", taxCollected: "$899.00" },
  { region: "New York (US)", taxName: "NY State Sales Tax", rate: "4.00%", taxableSales: "$8,200.00", taxCollected: "$328.00" },
  { region: "Texas (US)", taxName: "TX State Sales Tax", rate: "6.25%", taxableSales: "$5,100.00", taxCollected: "$318.75" },
  { region: "United Kingdom", taxName: "UK VAT", rate: "20.00%", taxableSales: "$3,400.00", taxCollected: "$680.00" },
];

const columns: ColumnDef<TaxRow>[] = [
  { accessorKey: "region", header: "Jurisdiction / Region" },
  { accessorKey: "taxName", header: "Tax Name" },
  { accessorKey: "rate", header: "Tax Rate" },
  { accessorKey: "taxableSales", header: "Taxable Sales" },
  { accessorKey: "taxCollected", header: "Tax Collected" },
];

export default function TaxReportPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          heading="Tax Collection Report" 
          text="Breakdown of taxes collected by region and jurisdiction."
        />
        <div className="flex space-x-2">
          <Button variant="outline"><FilterIcon className="mr-2 h-4 w-4" /> Filter</Button>
          <Button variant="outline"><CalendarIcon className="mr-2 h-4 w-4" /> Q3 2026</Button>
          <Button><DownloadIcon className="mr-2 h-4 w-4" /> Export CSV</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Taxable Sales</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">$29,100.00</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Tax Collected (Liability)</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-red-600">$2,225.75</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <DataTable columns={columns} data={data} searchKey="region" />
        </CardContent>
      </Card>
    </div>
  );
}
