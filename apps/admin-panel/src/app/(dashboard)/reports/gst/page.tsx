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
import { DownloadIcon, FilterIcon, CalendarIcon, FileSpreadsheetIcon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

type GstRow = {
  invoiceDate: string;
  invoiceNo: string;
  customerGstin: string;
  taxableValue: string;
  cgst: string;
  sgst: string;
  igst: string;
  totalGst: string;
};

const data: GstRow[] = [
  { invoiceDate: "2026-07-30", invoiceNo: "INV-2607-001", customerGstin: "Unregistered", taxableValue: "₹12,400.00", cgst: "₹1,116.00", sgst: "₹1,116.00", igst: "₹0.00", totalGst: "₹2,232.00" },
  { invoiceDate: "2026-07-29", invoiceNo: "INV-2607-002", customerGstin: "27AADCB2230M1Z2", taxableValue: "₹45,000.00", cgst: "₹0.00", sgst: "₹0.00", igst: "₹8,100.00", totalGst: "₹8,100.00" },
  { invoiceDate: "2026-07-28", invoiceNo: "INV-2607-003", customerGstin: "Unregistered", taxableValue: "₹3,200.00", cgst: "₹288.00", sgst: "₹288.00", igst: "₹0.00", totalGst: "₹576.00" },
];

const columns: ColumnDef<GstRow>[] = [
  { accessorKey: "invoiceDate", header: "Invoice Date" },
  { accessorKey: "invoiceNo", header: "Invoice No." },
  { accessorKey: "customerGstin", header: "Customer GSTIN" },
  { accessorKey: "taxableValue", header: "Taxable Value" },
  { accessorKey: "cgst", header: "CGST" },
  { accessorKey: "sgst", header: "SGST" },
  { accessorKey: "igst", header: "IGST" },
  { accessorKey: "totalGst", header: "Total GST" },
];

export default function GstReportPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          heading="GST Report (GSTR-1 Format)" 
          text="Outward supplies of goods or services for GST filing."
        />
        <div className="flex space-x-2">
          <Button variant="outline"><CalendarIcon className="mr-2 h-4 w-4" /> July 2026</Button>
          <Button><FileSpreadsheetIcon className="mr-2 h-4 w-4" /> Export for Tally/ClearTax</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Taxable Value</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">₹60,600.00</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total CGST</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">₹1,404.00</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total SGST</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">₹1,404.00</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total IGST</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">₹8,100.00</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <DataTable columns={columns} data={data} searchKey="invoiceNo" />
        </CardContent>
      </Card>
    </div>
  );
}
