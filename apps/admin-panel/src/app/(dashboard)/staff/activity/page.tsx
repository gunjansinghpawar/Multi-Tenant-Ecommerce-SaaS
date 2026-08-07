"use client";

import React from "react";
import { 
  PageHeader, 
  Card, 
  CardContent, 
  DataTable,
  Button
} from "@commercex/ui";
import { DownloadIcon, FilterIcon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

type ActivityRow = {
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  ipAddress: string;
};

const data: ActivityRow[] = [
  { timestamp: "2026-07-31 10:45 AM", user: "Sarah Smith", action: "Updated Status (Fulfilled)", resource: "Order #ORD-9911", ipAddress: "192.168.1.104" },
  { timestamp: "2026-07-31 10:30 AM", user: "John Doe", action: "Deleted Product", resource: "Product #PRD-122", ipAddress: "10.0.0.52" },
  { timestamp: "2026-07-31 09:15 AM", user: "Emily Davis", action: "Created Discount Code", resource: "Discount 'SUMMER26'", ipAddress: "172.16.254.1" },
  { timestamp: "2026-07-30 04:20 PM", user: "Mike Johnson", action: "Refunded Order", resource: "Order #ORD-9840", ipAddress: "192.168.1.105" },
  { timestamp: "2026-07-30 02:10 PM", user: "John Doe", action: "Changed Settings", resource: "Store Global Settings", ipAddress: "10.0.0.52" },
];

const columns: ColumnDef<ActivityRow>[] = [
  { accessorKey: "timestamp", header: "Date & Time" },
  { accessorKey: "user", header: "Staff Member" },
  { accessorKey: "action", header: "Action Taken" },
  { accessorKey: "resource", header: "Target Resource" },
  { accessorKey: "ipAddress", header: "IP Address" },
];

export default function ActivityLogsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          heading="Activity Logs" 
          text="Comprehensive audit trail of all staff actions within the admin panel."
        />
        <div className="flex space-x-2">
          <Button variant="outline"><FilterIcon className="mr-2 h-4 w-4" /> Filter</Button>
          <Button><DownloadIcon className="mr-2 h-4 w-4" /> Export CSV</Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <DataTable columns={columns} data={data} searchKey="user" />
        </CardContent>
      </Card>
    </div>
  );
}
