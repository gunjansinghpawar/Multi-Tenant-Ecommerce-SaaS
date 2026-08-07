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
  TrendingUpIcon, 
  BanknoteIcon,
  RefreshCcwIcon,
  CreditCardIcon,
  WalletIcon
} from "lucide-react";

export default function FinanceDashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Financial Analytics" 
        text="Track your gross volume, net volume, refunds, and overall payment health."
      >
        <Button variant="outline">
          <DownloadIcon className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gross Volume</CardTitle>
            <BanknoteIcon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$124,500.00</div>
            <p className="text-xs text-muted-foreground">+14.2% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Volume</CardTitle>
            <TrendingUpIcon className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">$118,240.50</div>
            <p className="text-xs text-muted-foreground">After fees & refunds</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Refunds</CardTitle>
            <RefreshCcwIcon className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">-$4,210.00</div>
            <p className="text-xs text-muted-foreground">3.4% Refund Rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
            <WalletIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$8,450.00</div>
            <p className="text-xs text-muted-foreground">Expected in 2 days</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Cash Flow Trend (30 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border border-dashed rounded-md bg-muted/20">
              <span className="text-muted-foreground">Financial Line Chart Placeholder</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Volume by Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { name: "Stripe (Cards)", amount: "$82,450", percent: "66%", icon: CreditCardIcon, color: "text-blue-500" },
                { name: "Razorpay (UPI/Cards)", amount: "$24,100", percent: "19%", icon: BanknoteIcon, color: "text-indigo-500" },
                { name: "PayPal", amount: "$14,500", percent: "12%", icon: WalletIcon, color: "text-[#003087]" },
                { name: "Cash on Delivery", amount: "$3,450", percent: "3%", icon: BanknoteIcon, color: "text-success" },
              ].map((item, i) => (
                <div className="flex items-center justify-between" key={i}>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                      <item.icon className={`h-5 w-5 ${item.color}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">{item.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{item.percent} of volume</p>
                    </div>
                  </div>
                  <div className="font-bold text-sm">
                    {item.amount}
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
