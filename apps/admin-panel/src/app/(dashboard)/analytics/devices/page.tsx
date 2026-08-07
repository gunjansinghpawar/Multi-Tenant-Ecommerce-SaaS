"use client";

import React from "react";
import { 
  PageHeader, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  DataTable
} from "@commercex/ui";
import { SmartphoneIcon, MonitorIcon, TabletIcon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

type DeviceData = {
  device: string;
  sessions: number;
  percentage: string;
  revenue: string;
};

const data: DeviceData[] = [
  { device: "Mobile (iOS)", sessions: 22400, percentage: "52.5%", revenue: "$24,500" },
  { device: "Mobile (Android)", sessions: 9800, percentage: "23.0%", revenue: "$8,200" },
  { device: "Desktop (Windows)", sessions: 6500, percentage: "15.2%", revenue: "$9,100" },
  { device: "Desktop (Mac)", sessions: 3100, percentage: "7.2%", revenue: "$5,400" },
  { device: "Tablet (iPad)", sessions: 790, percentage: "2.1%", revenue: "$1,200" },
];

const columns: ColumnDef<DeviceData>[] = [
  { accessorKey: "device", header: "Device / OS" },
  { accessorKey: "sessions", header: "Total Sessions" },
  { accessorKey: "percentage", header: "% of Traffic" },
  { accessorKey: "revenue", header: "Revenue" },
];

export default function DevicesAnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Devices & Operating Systems" 
        text="Understand what devices your customers use to browse and buy."
      />
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Mobile Traffic</CardTitle>
            <SmartphoneIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">75.5%</div>
            <p className="text-xs text-muted-foreground mt-1">Primary source of traffic</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Desktop Traffic</CardTitle>
            <MonitorIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">22.4%</div>
            <p className="text-xs text-muted-foreground mt-1">Highest AOV platform</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tablet Traffic</CardTitle>
            <TabletIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.1%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="min-h-[400px]">
          <CardHeader>
            <CardTitle>Device Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center text-muted-foreground">
            {/* Placeholder for Pie/Donut Chart */}
            <div className="w-full h-[300px] border-2 border-dashed rounded-lg flex items-center justify-center bg-muted/10">
              <span className="italic">Device Pie Chart</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Detailed Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={data} searchKey="device" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
