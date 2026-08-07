"use client";

import React from "react";
import { 
  PageHeader, 
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@commercex/ui";
import { 
  DownloadIcon, 
  ShoppingCartIcon, 
  DollarSignIcon, 
  ClockIcon, 
  TruckIcon 
} from "lucide-react";

export default function OrderDashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Orders Dashboard" 
        text="A high-level overview of your sales and fulfillment metrics."
      >
        <Button variant="outline">
          <DownloadIcon className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders (Today)</CardTitle>
            <ShoppingCartIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">145</div>
            <p className="text-xs text-muted-foreground">+12% from yesterday</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue (Today)</CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,450.00</div>
            <p className="text-xs text-muted-foreground">+8% from yesterday</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Fulfillment</CardTitle>
            <ClockIcon className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">34</div>
            <p className="text-xs text-muted-foreground">Orders awaiting processing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shipped (Today)</CardTitle>
            <TruckIcon className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">89</div>
            <p className="text-xs text-muted-foreground">Packages handed to carriers</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Sales Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border border-dashed rounded-md bg-muted/20">
              <span className="text-muted-foreground">Sales Chart Placeholder</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Top Selling Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { name: "Wireless Earbuds Pro", sales: 124, revenue: "$18,500" },
                { name: "Cotton T-Shirt (M)", sales: 98, revenue: "$2,450" },
                { name: "Ceramic Mug", sales: 85, revenue: "$1,275" },
                { name: "Leather Wallet", sales: 42, revenue: "$3,150" },
              ].map((item, i) => (
                <div className="flex items-center justify-between" key={i}>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.sales} units sold</p>
                  </div>
                  <div className="font-medium text-sm">
                    {item.revenue}
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
