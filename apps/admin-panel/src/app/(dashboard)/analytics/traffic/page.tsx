"use client";

import React from "react";
import { 
  PageHeader, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  DataTable,
  Button
} from "@commercex/ui";
import { GlobeIcon, UsersIcon, MousePointerClickIcon, CalendarIcon, TimerIcon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

type TrafficSource = {
  source: string;
  visitors: number;
  bounceRate: string;
  avgDuration: string;
};

const data: TrafficSource[] = [
  { source: "Google (Organic)", visitors: 14500, bounceRate: "42.1%", avgDuration: "2m 15s" },
  { source: "Direct", visitors: 8200, bounceRate: "38.5%", avgDuration: "3m 05s" },
  { source: "Instagram (Social)", visitors: 5400, bounceRate: "58.2%", avgDuration: "1m 10s" },
  { source: "Email Newsletter", visitors: 2100, bounceRate: "28.4%", avgDuration: "4m 30s" },
];

const columns: ColumnDef<TrafficSource>[] = [
  { accessorKey: "source", header: "Traffic Source" },
  { accessorKey: "visitors", header: "Visitors" },
  { accessorKey: "bounceRate", header: "Bounce Rate" },
  { accessorKey: "avgDuration", header: "Avg. Session Duration" },
];

export default function TrafficAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          heading="Traffic Analytics" 
          text="Monitor page views, unique visitors, and traffic acquisition sources."
        />
        <Button variant="outline">
          <CalendarIcon className="mr-2 h-4 w-4" />
          Last 30 Days
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
            <GlobeIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42,590</div>
            <p className="text-xs text-muted-foreground mt-1">+8.1% from previous period</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">30,200</div>
            <p className="text-xs text-muted-foreground mt-1">+5.2% from previous period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg. Bounce Rate</CardTitle>
            <MousePointerClickIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">41.8%</div>
            <p className="text-xs text-muted-foreground mt-1">-1.2% (Improvement)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg. Session Duration</CardTitle>
            <TimerIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2m 45s</div>
            <p className="text-xs text-muted-foreground mt-1">+15s from previous period</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Traffic Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} searchKey="source" />
        </CardContent>
      </Card>
    </div>
  );
}
