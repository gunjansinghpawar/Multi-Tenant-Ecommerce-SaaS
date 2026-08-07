"use client";

import React from "react";
import { 
  PageHeader, 
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge
} from "@commercex/ui";
import { 
  SearchIcon, 
  ActivityIcon,
  AlertTriangleIcon,
  CheckCircle2Icon,
  TrendingUpIcon
} from "lucide-react";

export default function SEODashboardPage() {
  return (
    <div className="space-y-6 max-w-7xl">
      <PageHeader 
        heading="SEO Dashboard" 
        text="Monitor your store's search visibility, Core Web Vitals, and technical health."
      >
        <Button variant="outline">
          <ActivityIcon className="mr-2 h-4 w-4" />
          Run Full Audit
        </Button>
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-success/5 border-success/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-success">SEO Health Score</CardTitle>
            <CheckCircle2Icon className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success">92 / 100</div>
            <p className="text-xs text-success mt-1">Excellent condition</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Organic Traffic (30d)</CardTitle>
            <TrendingUpIcon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24,592</div>
            <p className="text-xs text-muted-foreground">+8.4% vs last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Indexed Pages</CardTitle>
            <SearchIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,402</div>
            <p className="text-xs text-muted-foreground">Via Google Search Console</p>
          </CardContent>
        </Card>

        <Card className="bg-warning/5 border-warning/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-warning-foreground">Issues Found</CardTitle>
            <AlertTriangleIcon className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning-foreground">14</div>
            <p className="text-xs text-muted-foreground mt-1">8 broken links, 6 missing metas</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Google Search Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border border-dashed rounded-md bg-muted/20">
              <span className="text-muted-foreground">Search Console Clicks/Impressions Chart Placeholder</span>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t text-center">
              <div>
                <p className="text-sm text-muted-foreground">Total Clicks</p>
                <p className="text-xl font-bold">18.2K</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Impressions</p>
                <p className="text-xl font-bold">452K</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg. CTR</p>
                <p className="text-xl font-bold">4.02%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="col-span-3 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Core Web Vitals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Largest Contentful Paint (LCP)</span>
                  <span className="text-sm font-bold text-success">1.2s</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-success h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Good (&lt; 2.5s)</p>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">First Input Delay (FID)</span>
                  <span className="text-sm font-bold text-success">14ms</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-success h-2 rounded-full" style={{ width: '15%' }}></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Good (&lt; 100ms)</p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Cumulative Layout Shift (CLS)</span>
                  <span className="text-sm font-bold text-warning">0.12</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-warning h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Needs Improvement (0.1 - 0.25)</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
