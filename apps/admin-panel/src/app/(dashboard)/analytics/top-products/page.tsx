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
import { PackageIcon, TrendingUpIcon, CalendarIcon, ArrowDownIcon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

type ProductData = {
  product: string;
  sku: string;
  sold: number;
  revenue: string;
  inventory: number;
};

const data: ProductData[] = [
  { product: "Wireless Noise-Cancelling Headphones", sku: "WH-1000XM5", sold: 452, revenue: "$158,200", inventory: 120 },
  { product: "Mechanical Keyboard (Cherry MX)", sku: "KB-MECH-01", sold: 310, revenue: "$46,500", inventory: 45 },
  { product: "Ergonomic Office Chair", sku: "CH-ERGO-B", sold: 185, revenue: "$55,315", inventory: 12 },
  { product: "USB-C Fast Charging Cable (2m)", sku: "CBL-USBC-2M", sold: 890, revenue: "$13,350", inventory: 850 },
  { product: "Minimalist Aluminum Laptop Stand", sku: "STND-AL-01", sold: 240, revenue: "$10,800", inventory: 0 },
];

const columns: ColumnDef<ProductData>[] = [
  { accessorKey: "product", header: "Product Name" },
  { accessorKey: "sku", header: "SKU" },
  { accessorKey: "sold", header: "Units Sold" },
  { accessorKey: "revenue", header: "Revenue" },
  { 
    accessorKey: "inventory", 
    header: "Stock Status",
    cell: ({ row }) => {
      const stock = row.original.inventory;
      if (stock === 0) return <span className="text-red-500 font-semibold flex items-center"><ArrowDownIcon className="h-3 w-3 mr-1" />Out of Stock</span>;
      if (stock < 20) return <span className="text-yellow-500 font-semibold">Low Stock ({stock})</span>;
      return <span className="text-green-500 font-semibold">In Stock ({stock})</span>;
    }
  },
];

export default function TopProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          heading="Top Products" 
          text="Leaderboard of best-selling and most viewed items."
        />
        <Button variant="outline">
          <CalendarIcon className="mr-2 h-4 w-4" />
          Last 30 Days
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Best Seller (Revenue)</CardTitle>
            <TrendingUpIcon className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold truncate">Wireless Noise-Cancelling Headphones</div>
            <p className="text-sm text-muted-foreground mt-1">$158,200 generated</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Highest Volume</CardTitle>
            <PackageIcon className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold truncate">USB-C Fast Charging Cable (2m)</div>
            <p className="text-sm text-muted-foreground mt-1">890 units sold</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} searchKey="product" />
        </CardContent>
      </Card>
    </div>
  );
}
