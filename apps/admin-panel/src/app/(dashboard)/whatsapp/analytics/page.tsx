"use client";

import React from "react";
import { 
  PageHeader, 
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@commercex/ui";
import { SendIcon, CheckCircle2Icon, EyeIcon, BanknoteIcon } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="WhatsApp Analytics" 
        text="Monitor messaging volume, delivery rates, and API costs."
      />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Messages Sent (30d)</CardTitle>
            <SendIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,450</div>
            <p className="text-xs text-muted-foreground">+18.1% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Delivery Rate</CardTitle>
            <CheckCircle2Icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">98.4%</div>
            <p className="text-xs text-muted-foreground">0.2% increase</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Read Rate</CardTitle>
            <EyeIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">76.2%</div>
            <p className="text-xs text-muted-foreground">+5.4% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Estimated Cost</CardTitle>
            <BanknoteIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$142.50</div>
            <p className="text-xs text-muted-foreground">Based on Meta pricing</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 min-h-[400px]">
          <CardHeader>
            <CardTitle>Messaging Volume</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center text-muted-foreground">
            {/* Placeholder for chart component */}
            <p>Volume Chart Placeholder</p>
          </CardContent>
        </Card>

        <Card className="col-span-3 min-h-[400px]">
          <CardHeader>
            <CardTitle>Conversation Categories</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center text-muted-foreground">
            {/* Placeholder for pie chart (Utility vs Marketing vs Service) */}
            <p>Categories Pie Chart Placeholder</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
