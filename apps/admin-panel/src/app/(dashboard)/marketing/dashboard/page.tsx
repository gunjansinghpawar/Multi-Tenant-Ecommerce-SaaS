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
  MegaphoneIcon, 
  TrendingUpIcon, 
  UsersIcon, 
  DollarSignIcon 
} from "lucide-react";

export default function MarketingDashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Marketing Dashboard & Analytics" 
        text="Track the performance of your campaigns, promotions, and overall marketing ROI."
      >
        <Button variant="outline">
          <DownloadIcon className="mr-2 h-4 w-4" />
          Export Analytics
        </Button>
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Marketing Revenue</CardTitle>
            <DollarSignIcon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$42,500.00</div>
            <p className="text-xs text-muted-foreground">Generated from campaigns this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Conversion Rate</CardTitle>
            <TrendingUpIcon className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2%</div>
            <p className="text-xs text-muted-foreground">+0.5% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
            <MegaphoneIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Across Email, SMS, and Push</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Referral Signups</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">840</div>
            <p className="text-xs text-muted-foreground">New customers via referrals</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Revenue by Channel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border border-dashed rounded-md bg-muted/20">
              <span className="text-muted-foreground">Channel Attribution Chart Placeholder</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Top Performing Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { name: "Black Friday Early Access", type: "Email", revenue: "$18,500", clicks: "45k" },
                { name: "Abandoned Cart Flow", type: "Automation", revenue: "$12,450", clicks: "12k" },
                { name: "VIP Welcome Series", type: "Email", revenue: "$5,275", clicks: "8k" },
                { name: "Flash Sale Alert", type: "SMS", revenue: "$3,150", clicks: "15k" },
              ].map((item, i) => (
                <div className="flex items-center justify-between" key={i}>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.type} • {item.clicks} clicks</p>
                  </div>
                  <div className="font-medium text-sm text-success">
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
