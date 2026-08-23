"use client";

import React from "react";
import { DataTable } from "@commercex/ui";
import { ColumnDef } from "@tanstack/react-table";
import { ShieldAlert, LogIn, FileEdit, Trash2, Settings } from "lucide-react";

export type AuditLogUI = {
  id: string;
  action: string;
  user: string;
  target: string;
  date: string;
  ip: string;
  status: "Success" | "Failed";
};

const getActionIcon = (action: string) => {
  if (action.includes("Login") || action.includes("LOGIN")) return <LogIn className="h-4 w-4 mr-2 text-muted-foreground" />;
  if (action.includes("Delete") || action.includes("DELETE")) return <Trash2 className="h-4 w-4 mr-2 text-rose-500" />;
  if (action.includes("Update") || action.includes("Edit") || action.includes("UPDATE")) return <FileEdit className="h-4 w-4 mr-2 text-blue-500" />;
  if (action.includes("Settings")) return <Settings className="h-4 w-4 mr-2 text-muted-foreground" />;
  return <ShieldAlert className="h-4 w-4 mr-2 text-emerald-500" />;
};

const columns: ColumnDef<AuditLogUI>[] = [
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

export function AuditLogsClient({ data }: { data: AuditLogUI[] }) {
  return (
    <DataTable 
      columns={columns} 
      data={data} 
      searchKey="action" 
    />
  );
}
