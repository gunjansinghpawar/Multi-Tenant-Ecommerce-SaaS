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
import { DownloadIcon, FilterIcon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

type InventoryRow = {
  sku: string;
  product: string;
  inStock: number;
  unitCost: string;
  retailPrice: string;
  totalValue: string;
};

const data: InventoryRow[] = [
  { sku: "WH-1000XM5", product: "Wireless Headphones", inStock: 120, unitCost: "$150.00", retailPrice: "$350.00", totalValue: "$18,000.00" },
  { sku: "KB-MECH-01", product: "Mechanical Keyboard", inStock: 45, unitCost: "$45.00", retailPrice: "$150.00", totalValue: "$2,025.00" },
  { sku: "CH-ERGO-B", product: "Ergonomic Chair", inStock: 12, unitCost: "$120.00", retailPrice: "$299.00", totalValue: "$1,440.00" },
  { sku: "STND-AL-01", product: "Laptop Stand", inStock: 0, unitCost: "$15.00", retailPrice: "$45.00", totalValue: "$0.00" },
];

const columns: ColumnDef<InventoryRow>[] = [
  { accessorKey: "sku", header: "SKU" },
  { accessorKey: "product", header: "Product Title" },
  { 
    accessorKey: "inStock", 
    header: "Qty In Stock",
    cell: ({ row }) => {
      const qty = row.original.inStock;
      if (qty === 0) return <span className="text-red-500 font-bold">Out of Stock</span>;
      if (qty < 20) return <span className="text-yellow-600 font-bold">{qty} (Low)</span>;
      return <span>{qty}</span>;
    }
  },
  { accessorKey: "unitCost", header: "Unit Cost (COGS)" },
  { accessorKey: "retailPrice", header: "Retail Price" },
  { accessorKey: "totalValue", header: "Total Inventory Value" },
];

export default function InventoryReportPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          heading="Inventory Valuation Report" 
          text="Track stock levels, COGS, and total asset value of your inventory."
        />
        <div className="flex space-x-2">
          <Button variant="outline"><FilterIcon className="mr-2 h-4 w-4" /> Filter</Button>
          <Button><DownloadIcon className="mr-2 h-4 w-4" /> Export PDF</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Units in Stock</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">1,452</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Inventory Value (COGS)</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">$42,500.00</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Potential Retail Value</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">$115,200.00</div></CardContent>
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
