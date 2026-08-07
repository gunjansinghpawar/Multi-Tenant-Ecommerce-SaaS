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
  UsersIcon, 
  TrendingUpIcon, 
  HeartIcon, 
  StarIcon 
} from "lucide-react";

export default function CustomerDashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Customers Dashboard" 
        text="A high-level overview of your customer base, retention, and loyalty."
      >
        <Button variant="outline">
          <DownloadIcon className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,231</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">1,204</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Lifetime Value (LTV)</CardTitle>
            <HeartIcon className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$345.50</div>
            <p className="text-xs text-muted-foreground">Up $15 from last quarter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Review Rating</CardTitle>
            <StarIcon className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8 / 5.0</div>
            <p className="text-xs text-muted-foreground">Based on 12k reviews</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Customer Acquisition Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border border-dashed rounded-md bg-muted/20">
              <span className="text-muted-foreground">Acquisition Chart Placeholder</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Top Customer Segments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { name: "VIPs (Spent > $1k)", count: "1,205", percent: "15%" },
                { name: "Recent Purchasers (30 days)", count: "4,500", percent: "35%" },
                { name: "Subscribers", count: "1,204", percent: "12%" },
                { name: "Inactive (No purchase in 6mo)", count: "12,000", percent: "38%" },
              ].map((item, i) => (
                <div className="flex items-center justify-between" key={i}>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.count} customers</p>
                  </div>
                  <div className="font-medium text-sm text-primary">
                    {item.percent}
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
