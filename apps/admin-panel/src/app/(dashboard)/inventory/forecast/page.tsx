"use client";

import React from "react";
import { 
  PageHeader, 
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@commercex/ui";
import { RefreshCcwIcon, TrendingUpIcon, TrendingDownIcon, MinusIcon } from "lucide-react";

export default function ForecastPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Demand Forecast" 
        text="AI-powered predictions for future stock requirements based on historical sales data."
      >
        <Button>
          <RefreshCcwIcon className="mr-2 h-4 w-4" />
          Run Analysis
        </Button>
      </PageHeader>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Sales vs Predicted Demand (Next 30 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] flex items-center justify-center border border-dashed rounded-md bg-muted/20 relative">
              <span className="text-muted-foreground">Interactive Chart Placeholder</span>
              {/* Fake chart lines just for visual mockup */}
              <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none" viewBox="0 0 100 100">
                <path d="M0,80 Q25,70 50,40 T100,20" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M0,85 Q25,80 50,60 T100,30" fill="none" stroke="var(--primary)" strokeWidth="2" strokeDasharray="4" />
              </svg>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Top Items to Reorder</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Winter Jackets", trend: "up", percent: "+45%" },
                  { name: "Thermal Socks", trend: "up", percent: "+30%" },
                  { name: "Snow Boots", trend: "up", percent: "+25%" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.name}</span>
                    <div className="flex items-center text-xs text-success">
                      <TrendingUpIcon className="mr-1 h-3 w-3" />
                      {item.percent}
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" size="sm">Create Purchase Orders</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Expected Surplus</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Summer T-Shirts", trend: "down", percent: "-60%" },
                  { name: "Beach Towels", trend: "down", percent: "-85%" },
                  { name: "Sunglasses", trend: "flat", percent: "-10%" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.name}</span>
                    <div className={`flex items-center text-xs ${item.trend === 'down' ? 'text-destructive' : 'text-muted-foreground'}`}>
                      {item.trend === 'down' ? <TrendingDownIcon className="mr-1 h-3 w-3" /> : <MinusIcon className="mr-1 h-3 w-3" />}
                      {item.percent}
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" size="sm">Create Promotions</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
