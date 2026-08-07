"use client";

import React from "react";
import { 
  PageHeader, 
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@commercex/ui";
import { SendIcon, MailOpenIcon, MousePointerClickIcon, ShieldAlertIcon } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Email Analytics" 
        text="Monitor delivery, open rates, and bounces across all emails."
      />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Emails Sent (30d)</CardTitle>
            <SendIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142,500</div>
            <p className="text-xs text-muted-foreground">+5.4% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg. Open Rate</CardTitle>
            <MailOpenIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">42.8%</div>
            <p className="text-xs text-muted-foreground">+1.2% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg. Click Rate</CardTitle>
            <MousePointerClickIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">8.4%</div>
            <p className="text-xs text-muted-foreground">-0.3% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
            <ShieldAlertIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">1.2%</div>
            <p className="text-xs text-muted-foreground">Well below 5% threshold</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 min-h-[400px]">
          <CardHeader>
            <CardTitle>Delivery & Open Trends</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center text-muted-foreground">
            {/* Placeholder for line chart */}
            <p>Line Chart Placeholder</p>
          </CardContent>
        </Card>

        <Card className="col-span-3 min-h-[400px]">
          <CardHeader>
            <CardTitle>Top Performing Campaigns</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center text-muted-foreground">
            {/* Placeholder for bar chart */}
            <p>Bar Chart Placeholder</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
