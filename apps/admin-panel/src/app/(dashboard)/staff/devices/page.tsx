"use client";

import React from "react";
import { 
  PageHeader, 
  Card, 
  CardContent, 
  DataTable
} from "@commercex/ui";
import { ColumnDef } from "@tanstack/react-table";

type DeviceRow = {
  deviceName: string;
  os: string;
  lastUsedBy: string;
  lastIp: string;
  lastSeen: string;
};

const data: DeviceRow[] = [
  { deviceName: "John's MacBook Pro 16", os: "macOS Sonoma", lastUsedBy: "John Doe", lastIp: "10.0.0.52", lastSeen: "Today" },
  { deviceName: "Office Desktop 01", os: "Windows 11", lastUsedBy: "Sarah Smith", lastIp: "192.168.1.104", lastSeen: "Today" },
  { deviceName: "Mike's Personal iPhone", os: "iOS 17", lastUsedBy: "Mike Johnson", lastIp: "192.168.1.105", lastSeen: "Yesterday" },
];

const columns: ColumnDef<DeviceRow>[] = [
  { accessorKey: "deviceName", header: "Recognized Device" },
  { accessorKey: "os", header: "Operating System" },
  { accessorKey: "lastUsedBy", header: "Last Used By" },
  { accessorKey: "lastIp", header: "Last Known IP" },
  { accessorKey: "lastSeen", header: "Last Seen" },
];

export default function DevicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          heading="Recognized Devices" 
          text="A registry of known hardware devices used by your staff to access the panel."
        />
      </div>

      <Card>
        <CardContent className="p-0">
          <DataTable columns={columns} data={data} searchKey="deviceName" />
        </CardContent>
      </Card>
    </div>
  );
}
