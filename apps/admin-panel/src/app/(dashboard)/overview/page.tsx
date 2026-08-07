"use client";

import React from "react";
import { PageHeader, PremiumStatCard, Card, CardHeader, CardTitle, CardContent } from "@commercex/ui";
import { DollarSign, Users, ShoppingCart, TrendingUp } from "lucide-react";

export default function StoreOverviewPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Store Overview" 
        text="High-level metrics and performance for your store."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <PremiumStatCard
          title="Total Revenue"
          value="$45,231.89"
          icon={<DollarSign className="h-5 w-5" />}
          trend={{ value: "+20.1% from last month", isPositive: true }}
        />
        <PremiumStatCard
          title="Active Customers"
          value="+2350"
          icon={<Users className="h-5 w-5" />}
          trend={{ value: "+180.1% from last month", isPositive: true }}
        />
        <PremiumStatCard
          title="Sales"
          value="+12,234"
          icon={<ShoppingCart className="h-5 w-5" />}
          trend={{ value: "+19% from last month", isPositive: true }}
        />
        <PremiumStatCard
          title="Conversion Rate"
          value="3.2%"
          icon={<TrendingUp className="h-5 w-5" />}
          trend={{ value: "-0.5% from last month", isPositive: false }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Revenue Over Time</CardTitle>
          </CardHeader>
          <CardContent className="pl-2 h-[300px] flex items-center justify-center border-t border-dashed mt-4">
            <span className="text-muted-foreground text-sm">Chart Placeholder</span>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Customer {i}</p>
                    <p className="text-sm text-muted-foreground">customer{i}@example.com</p>
                  </div>
                  <div className="ml-auto font-medium">+$1,999.00</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
