"use client";

import React from "react";
import { 
  PageHeader, 
  Card, 
  CardContent, 
  DataTable,
  Button
} from "@commercex/ui";
import { MonitorIcon, SmartphoneIcon, ShieldOffIcon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

type SessionRow = {
  user: string;
  device: string;
  location: string;
  ipAddress: string;
  startedAt: string;
  isCurrent: boolean;
};

const data: SessionRow[] = [
  { user: "John Doe (You)", device: "MacBook Pro / Chrome", location: "New York, USA", ipAddress: "10.0.0.52", startedAt: "Today 08:00 AM", isCurrent: true },
  { user: "Sarah Smith", device: "Windows PC / Edge", location: "London, UK", ipAddress: "192.168.1.104", startedAt: "Today 09:30 AM", isCurrent: false },
  { user: "Mike Johnson", device: "iPhone 13 / Safari", location: "Austin, TX, USA", ipAddress: "192.168.1.105", startedAt: "Yesterday 04:20 PM", isCurrent: false },
];

const columns: ColumnDef<SessionRow>[] = [
  { accessorKey: "user", header: "User" },
  { 
    accessorKey: "device", 
    header: "Device / Browser",
    cell: ({ row }) => {
      const isMobile = row.original.device.includes("iPhone") || row.original.device.includes("Android");
      return (
        <span className="flex items-center space-x-2">
          {isMobile ? <SmartphoneIcon className="h-4 w-4 text-muted-foreground" /> : <MonitorIcon className="h-4 w-4 text-muted-foreground" />}
          <span>{row.original.device}</span>
        </span>
      );
    }
  },
  { accessorKey: "location", header: "Location" },
  { accessorKey: "ipAddress", header: "IP Address" },
  { accessorKey: "startedAt", header: "Session Started" },
  {
    id: "actions",
    cell: ({ row }) => {
      const isCurrent = row.original.isCurrent;
      if (isCurrent) return <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">Current Session</span>;
      return (
        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
          <ShieldOffIcon className="h-4 w-4 mr-2" /> Revoke
        </Button>
      );
    }
  }
];

export default function SessionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          heading="Active Sessions" 
          text="View and manage currently logged-in devices across your team."
        />
        <Button variant="destructive">
          Revoke All Other Sessions
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <DataTable columns={columns} data={data} searchKey="user" />
        </CardContent>
      </Card>
    </div>
  );
}
