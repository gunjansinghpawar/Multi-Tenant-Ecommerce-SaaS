"use client";

import React from "react";
import { 
  PageHeader, 
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@commercex/ui";
import { SmartphoneIcon, CheckCircle2Icon, BanknoteIcon, ShieldAlertIcon } from "lucide-react";

export default function SMSAnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="SMS Analytics" 
        text="Monitor messaging volume, delivery rates, and API costs."
      />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">SMS Sent (30d)</CardTitle>
            <SmartphoneIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4,520</div>
            <p className="text-xs text-muted-foreground">+12.1% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Delivery Rate</CardTitle>
            <CheckCircle2Icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">97.4%</div>
            <p className="text-xs text-muted-foreground">0.5% increase</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Est. Provider Cost</CardTitle>
            <BanknoteIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45.20</div>
            <p className="text-xs text-muted-foreground">Based on Twilio pricing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">DND / Failed Rate</CardTitle>
            <ShieldAlertIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">2.6%</div>
            <p className="text-xs text-muted-foreground">Number invalid or DND active</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 min-h-[400px]">
          <CardHeader>
            <CardTitle>SMS Volume</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center text-muted-foreground">
            {/* Placeholder for bar chart */}
            <p>Volume Chart Placeholder</p>
          </CardContent>
        </Card>

        <Card className="col-span-3 min-h-[400px]">
          <CardHeader>
            <CardTitle>Usage Categories</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center text-muted-foreground">
            {/* Placeholder for pie chart (OTP vs Transactional vs Marketing) */}
            <p>Categories Pie Chart Placeholder</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
