"use client";

import React from "react";
import { 
  PageHeader, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  Button
} from "@commercex/ui";
import { TargetIcon, MousePointerClickIcon, RefreshCcwIcon } from "lucide-react";

export default function ConversionAnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Conversion Rate Optimization" 
        text="Deep dive into CRO metrics, A/B testing results, and cart abandonment."
      />
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Store Conversion Rate</CardTitle>
            <TargetIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">3.8%</div>
            <p className="text-xs text-muted-foreground mt-1">Industry avg: ~2.5%</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Cart Abandonment</CardTitle>
            <RefreshCcwIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">68.2%</div>
            <p className="text-xs text-muted-foreground mt-1">Checkout initiated but not completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Add to Cart Rate</CardTitle>
            <MousePointerClickIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.4%</div>
            <p className="text-xs text-muted-foreground mt-1">Of total unique visitors</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="min-h-[400px]">
          <CardHeader>
            <CardTitle>Conversion Rate Trend</CardTitle>
            <CardDescription>Daily conversion rate over the last 30 days.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center text-muted-foreground">
            {/* Placeholder for Line Chart */}
            <div className="w-full h-[300px] border-2 border-dashed rounded-lg flex items-center justify-center bg-muted/10">
              <span className="italic">Line Chart Visualization</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active A/B Tests</CardTitle>
            <CardDescription>Live experiments on your storefront.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-lg bg-card shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-sm">Product Page CTA Color (Red vs Green)</h4>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">Winner Found</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">Testing primary button color on all product pages.</p>
              <div className="text-sm">
                <div className="flex justify-between py-1 border-b">
                  <span>Variant A (Red)</span>
                  <span className="font-medium">3.1% CVR</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Variant B (Green)</span>
                  <span className="font-medium text-green-600">4.2% CVR (+35%)</span>
                </div>
              </div>
              <Button size="sm" className="w-full mt-4">Deploy Winner</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
