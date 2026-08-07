"use client";

import React from "react";
import { PageHeader, DataTable } from "@commercex/ui";
import { ColumnDef } from "@tanstack/react-table";
import { ShieldAlert, LogIn, FileEdit, Trash2, Settings } from "lucide-react";

type AuditLog = {
  id: string;
  action: string;
  user: string;
  target: string;
  date: string;
  ip: string;
  status: "Success" | "Failed";
};

const mockAuditLogs: AuditLog[] = [
  { id: "1", action: "User Login", user: "admin@commercex.com", target: "System", date: "2026-07-26 14:30:00", ip: "192.168.1.1", status: "Success" },
  { id: "2", action: "Delete Store", user: "super@commercex.com", target: "Store ID: 9812", date: "2026-07-26 13:15:22", ip: "10.0.0.45", status: "Success" },
  { id: "3", action: "Update Settings", user: "system@commercex.com", target: "Platform Settings", date: "2026-07-26 11:05:10", ip: "127.0.0.1", status: "Success" },
  { id: "4", action: "Failed Login", user: "unknown@example.com", target: "System", date: "2026-07-26 09:45:00", ip: "203.0.113.5", status: "Failed" },
  { id: "5", action: "Create Role", user: "super@commercex.com", target: "Role: Support", date: "2026-07-25 16:20:00", ip: "10.0.0.45", status: "Success" },
];

const getActionIcon = (action: string) => {
  if (action.includes("Login")) return <LogIn className="h-4 w-4 mr-2 text-muted-foreground" />;
  if (action.includes("Delete")) return <Trash2 className="h-4 w-4 mr-2 text-rose-500" />;
  if (action.includes("Update") || action.includes("Edit")) return <FileEdit className="h-4 w-4 mr-2 text-blue-500" />;
  if (action.includes("Settings")) return <Settings className="h-4 w-4 mr-2 text-muted-foreground" />;
  return <ShieldAlert className="h-4 w-4 mr-2 text-emerald-500" />;
};

const columns: ColumnDef<AuditLog>[] = [
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => (
      <div className="flex items-center font-medium">
        {getActionIcon(row.original.action)}
        {row.original.action}
      </div>
    ),
  },
  {
    accessorKey: "user",
    header: "User",
  },
  {
    accessorKey: "target",
    header: "Target",
  },
  {
    accessorKey: "ip",
    header: "IP Address",
    cell: ({ row }) => (
      <div className="font-mono text-xs">{row.original.ip}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const isSuccess = row.original.status === "Success";
      return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
          isSuccess ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
        }`}>
          {row.original.status}
        </span>
      );
    }
  },
  {
    accessorKey: "date",
    header: "Timestamp",
    cell: ({ row }) => (
      <div className="text-muted-foreground text-sm">{row.original.date}</div>
    ),
  },
];

export default function AuditLogsPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Audit Logs" 
        text="View platform-wide security and activity logs."
      />

      <DataTable 
        columns={columns} 
        data={mockAuditLogs} 
        searchKey="action" 
      />
    </div>
  );
}
