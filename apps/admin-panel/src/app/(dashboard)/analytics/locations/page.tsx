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
import { MapPinIcon, Globe2Icon, MapIcon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

type LocationData = {
  country: string;
  visitors: number;
  orders: number;
  revenue: string;
};

const data: LocationData[] = [
  { country: "United States", visitors: 14500, orders: 820, revenue: "$45,200" },
  { country: "United Kingdom", visitors: 4200, orders: 180, revenue: "$8,500" },
  { country: "Canada", visitors: 3100, orders: 125, revenue: "$6,100" },
  { country: "Australia", visitors: 2800, orders: 95, revenue: "$4,200" },
  { country: "India", visitors: 8900, orders: 85, revenue: "$3,100" },
];

const columns: ColumnDef<LocationData>[] = [
  { accessorKey: "country", header: "Country" },
  { accessorKey: "visitors", header: "Visitors" },
  { accessorKey: "orders", header: "Orders" },
  { accessorKey: "revenue", header: "Revenue" },
];

export default function LocationsAnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Geographic Analytics" 
        text="View where your traffic and sales are coming from globally."
      />
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Top Country (Traffic)</CardTitle>
            <Globe2Icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">United States</div>
            <p className="text-xs text-muted-foreground mt-1">42% of total visitors</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Top Country (Sales)</CardTitle>
            <MapPinIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">United States</div>
            <p className="text-xs text-muted-foreground mt-1">58% of total revenue</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Regions</CardTitle>
            <MapIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground mt-1">Countries with at least 1 order</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <Card className="col-span-4 min-h-[500px]">
          <CardHeader>
            <CardTitle>Global Heatmap</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center text-muted-foreground">
            {/* Placeholder for Map Chart */}
            <div className="w-full h-[400px] border-2 border-dashed rounded-lg flex items-center justify-center bg-muted/10">
              <span className="italic">Interactive World Map Visualization</span>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Sales by Country</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={data} searchKey="country" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
