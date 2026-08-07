"use client";

import React from "react";
import { 
  PageHeader, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  Button
} from "@commercex/ui";
import { ShoppingCartIcon, CalendarIcon, PackageCheckIcon, Undo2Icon } from "lucide-react";

export default function OrdersAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          heading="Order Analytics" 
          text="Insights into order volume, fulfillment status, and return rates."
        />
        <Button variant="outline">
          <CalendarIcon className="mr-2 h-4 w-4" />
          Last 30 Days
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCartIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245</div>
            <p className="text-xs text-muted-foreground mt-1">+12% from previous period</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Fulfilled Orders</CardTitle>
            <PackageCheckIcon className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,180</div>
            <p className="text-xs text-muted-foreground mt-1">94.7% fulfillment rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Returned Orders</CardTitle>
            <Undo2Icon className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground mt-1">2.5% return rate</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="min-h-[400px]">
          <CardHeader>
            <CardTitle>Orders Over Time</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center text-muted-foreground">
            {/* Placeholder for Bar Chart */}
            <div className="w-full h-[300px] border-2 border-dashed rounded-lg flex items-center justify-center bg-muted/10">
              <span className="italic">Daily Order Volume Chart</span>
            </div>
          </CardContent>
        </Card>

        <Card className="min-h-[400px]">
          <CardHeader>
            <CardTitle>Order Status Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center text-muted-foreground">
            {/* Placeholder for Donut Chart */}
            <div className="w-full h-[300px] border-2 border-dashed rounded-lg flex items-center justify-center bg-muted/10">
              <span className="italic">Status Distribution (Processing, Shipped, Delivered)</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
