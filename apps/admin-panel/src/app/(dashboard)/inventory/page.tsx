"use client";

import React from "react";
import { 
  PageHeader, 
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge
} from "@commercex/ui";
import { 
  DownloadIcon, 
  PackageIcon, 
  TrendingUpIcon, 
  AlertTriangleIcon, 
  TruckIcon 
} from "lucide-react";

export default function InventoryDashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Inventory Dashboard" 
        text="Overview of your store's inventory, stock levels, and recent activity."
      >
        <Button variant="outline">
          <DownloadIcon className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <PackageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,450</div>
            <p className="text-xs text-muted-foreground">+2% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
            <AlertTriangleIcon className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">24</div>
            <p className="text-xs text-muted-foreground">Items need restocking</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active POs</CardTitle>
            <TruckIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Est. arrival within 7 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Value</CardTitle>
            <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1.2M</div>
            <p className="text-xs text-muted-foreground">Across all warehouses</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Inventory Valuation Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border border-dashed rounded-md bg-muted/20">
              <span className="text-muted-foreground">Chart Placeholder</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {[
                { action: "Stock Adjustment", desc: "+50 Wireless Earbuds", time: "2h ago", badge: "success" },
                { action: "Purchase Order", desc: "PO-2002 Received", time: "5h ago", badge: "default" },
                { action: "Low Stock Alert", desc: "USB-C Cables below threshold", time: "1d ago", badge: "warning" },
                { action: "Stock Transfer", desc: "TRF-1001 In Transit", time: "2d ago", badge: "secondary" },
              ].map((item, i) => (
                <div className="flex items-center" key={i}>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{item.action}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <div className="ml-auto font-medium text-xs text-muted-foreground">
                    <Badge variant={item.badge as any}>{item.time}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
