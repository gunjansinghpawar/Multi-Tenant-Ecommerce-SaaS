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
import { UsersIcon, UserPlusIcon, HeartIcon, CalendarIcon } from "lucide-react";

export default function CustomersAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          heading="Customer Analytics" 
          text="Track new acquisitions, returning customers, and lifetime value."
        />
        <Button variant="outline">
          <CalendarIcon className="mr-2 h-4 w-4" />
          Last 30 Days
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14,892</div>
            <p className="text-xs text-muted-foreground mt-1">Registered accounts</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">New Customers</CardTitle>
            <UserPlusIcon className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">842</div>
            <p className="text-xs text-muted-foreground mt-1">In selected period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Returning Customer Rate</CardTitle>
            <HeartIcon className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34.2%</div>
            <p className="text-xs text-muted-foreground mt-1">Made >1 purchase</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Customer Lifetime Value (CLV)</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$425.50</div>
            <p className="text-xs text-green-500 mt-1">+5.4% year over year</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-4 min-h-[400px]">
          <CardHeader>
            <CardTitle>New vs Returning Customers</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center text-muted-foreground">
            <div className="w-full h-[300px] border-2 border-dashed rounded-lg flex items-center justify-center bg-muted/10">
              <span className="italic">Stacked Bar Chart</span>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 min-h-[400px]">
          <CardHeader>
            <CardTitle>Retention Cohorts</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center text-muted-foreground">
            <div className="w-full h-[300px] border-2 border-dashed rounded-lg flex items-center justify-center bg-muted/10">
              <span className="italic">Cohort Analysis Heatmap</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
