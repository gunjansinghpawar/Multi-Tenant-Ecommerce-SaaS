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
import { DollarSignIcon, TrendingUpIcon, ActivityIcon, CreditCardIcon, CalendarIcon, DownloadIcon } from "lucide-react";

export default function RevenueAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          heading="Revenue Analytics" 
          text="High-level overview of your store's financial performance."
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
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              <TrendingUpIcon className="mr-1 h-3 w-3" /> +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
            <ActivityIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,094.00</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              <TrendingUpIcon className="mr-1 h-3 w-3" /> +15.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg Order Value (AOV)</CardTitle>
            <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$112.50</div>
            <p className="text-xs text-red-500 flex items-center mt-1">
              <TrendingUpIcon className="mr-1 h-3 w-3 rotate-180" /> -2.4% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Refunds</CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-$1,245.00</div>
            <p className="text-xs text-muted-foreground mt-1">
              2.7% refund rate
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7 lg:grid-cols-7">
        <Card className="col-span-4 min-h-[400px]">
          <CardHeader>
            <CardTitle>Revenue Over Time</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center text-muted-foreground">
            {/* Placeholder for Area Chart */}
            <div className="w-full h-[300px] border-2 border-dashed rounded-lg flex items-center justify-center bg-muted/10">
              <span className="italic">Revenue Chart Visualization</span>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 min-h-[400px]">
          <CardHeader>
            <CardTitle>Revenue by Category</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center text-muted-foreground">
            {/* Placeholder for Pie/Donut Chart */}
            <div className="w-full h-[300px] border-2 border-dashed rounded-lg flex items-center justify-center bg-muted/10">
              <span className="italic">Category Pie Chart</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
