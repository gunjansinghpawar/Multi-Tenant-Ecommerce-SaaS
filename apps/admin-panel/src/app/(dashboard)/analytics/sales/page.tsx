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
import { ShoppingBagIcon, CalendarIcon, DownloadIcon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

type SalesChannelData = {
  channel: string;
  sales: number;
  revenue: string;
  conversion: string;
};

const data: SalesChannelData[] = [
  { channel: "Online Store", sales: 1240, revenue: "$85,400", conversion: "3.2%" },
  { channel: "Point of Sale (POS)", sales: 450, revenue: "$32,100", conversion: "N/A" },
  { channel: "Instagram Shop", sales: 210, revenue: "$14,500", conversion: "1.8%" },
  { channel: "Google Shopping", sales: 185, revenue: "$12,200", conversion: "2.4%" },
];

const columns: ColumnDef<SalesChannelData>[] = [
  { accessorKey: "channel", header: "Sales Channel" },
  { accessorKey: "sales", header: "Total Sales" },
  { accessorKey: "revenue", header: "Gross Revenue" },
  { accessorKey: "conversion", header: "Conversion Rate" },
];

export default function SalesAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          heading="Sales Channels & Performance" 
          text="Breakdown of sales across your different storefronts and channels."
        />
        <div className="flex space-x-2">
          <Button variant="outline">
            <CalendarIcon className="mr-2 h-4 w-4" />
            Last 30 Days
          </Button>
          <Button variant="outline">
            <DownloadIcon className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Items Sold</CardTitle>
            <ShoppingBagIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4,821</div>
            <p className="text-xs text-muted-foreground mt-1">Across all channels</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Top Performing Channel</CardTitle>
            <ShoppingBagIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Online Store</div>
            <p className="text-xs text-muted-foreground mt-1">64% of total sales</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Discounts Applied</CardTitle>
            <ShoppingBagIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,231.00</div>
            <p className="text-xs text-muted-foreground mt-1">12% of orders used a code</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sales by Channel</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} searchKey="channel" />
        </CardContent>
      </Card>
    </div>
  );
}
