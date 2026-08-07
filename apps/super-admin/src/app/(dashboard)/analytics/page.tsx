"use client";

import React from "react";
import { Card, StatCard, Tabs, TabsList, TabsTrigger, TabsContent } from "@commercex/ui";
import { TrendingUpIcon, UsersIcon, GlobeIcon, ActivityIcon } from "lucide-react";

export default function GlobalAnalyticsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Global Analytics</h1>
        <p className="text-muted-foreground mt-1">Cross-tenant platform traffic and business performance metrics.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="Total Platform GMV" value="$4.8M" description="+24% YoY" icon={<TrendingUpIcon className="h-4 w-4" />} />
        <StatCard title="Active Buyers" value="342,000" description="+15% this month" icon={<UsersIcon className="h-4 w-4" />} />
        <StatCard title="Global Requests" value="48.2M" description="Avg latency 42ms" icon={<GlobeIcon className="h-4 w-4" />} />
        <StatCard title="Avg Conversion Rate" value="3.42%" description="+0.4% baseline" icon={<ActivityIcon className="h-4 w-4" />} />
      </div>

      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4">Performance Overview</h3>
        <div className="h-72 bg-muted/20 border border-dashed rounded-lg flex items-center justify-center text-muted-foreground">
          [ Interactive Telemetry & GMV Chart ]
        </div>
      </Card>
    </div>
  );
}