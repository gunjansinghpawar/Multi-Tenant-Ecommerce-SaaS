"use client";

import React from "react";
import { 
  PageHeader, 
  Button,
  DataTable,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@commercex/ui";
import { DownloadIcon, TrashIcon, CheckCircleIcon, AlertTriangleIcon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

type GDPRRequest = {
  id: string;
  customer: string;
  type: "Data Export" | "Account Deletion";
  dateRequested: string;
  status: "Pending" | "Completed" | "In Progress";
  deadline: string;
};

const data: GDPRRequest[] = [
  { id: "REQ-01", customer: "Alice Smith", type: "Data Export", dateRequested: "Oct 20, 2026", status: "Pending", deadline: "Nov 19, 2026" },
  { id: "REQ-02", customer: "Bob Jones", type: "Account Deletion", dateRequested: "Oct 22, 2026", status: "In Progress", deadline: "Nov 21, 2026" },
  { id: "REQ-03", customer: "Charlie Brown", type: "Data Export", dateRequested: "Sep 10, 2026", status: "Completed", deadline: "Oct 10, 2026" },
];

const columns: ColumnDef<GDPRRequest>[] = [
  { accessorKey: "customer", header: "Customer" },
  { 
    accessorKey: "type", 
    header: "Request Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      return (
        <span className={`font-medium ${type === 'Account Deletion' ? 'text-destructive' : 'text-primary'}`}>
          {type}
        </span>
      );
    }
  },
  { accessorKey: "dateRequested", header: "Requested On" },
  { accessorKey: "deadline", header: "Legal Deadline (30 days)" },
  { 
    accessorKey: "status", 
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const variant = status === "Completed" ? "success" : status === "In Progress" ? "warning" : "secondary";
      return <Badge variant={variant as any}>{status}</Badge>;
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const type = row.original.type;
      const status = row.original.status;
      
      if (status === "Completed") {
        return <CheckCircleIcon className="h-4 w-4 text-success ml-4" />;
      }
      
      return (
        <div className="flex gap-2">
          {type === "Data Export" ? (
            <Button size="sm" variant="outline"><DownloadIcon className="h-4 w-4 mr-2"/> Generate Archive</Button>
          ) : (
            <Button size="sm" variant="destructive"><TrashIcon className="h-4 w-4 mr-2"/> Delete Data</Button>
          )}
        </div>
      );
    }
  }
];

export default function GDPRPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Compliance (GDPR)" 
        text="Manage Right to Access and Right to be Forgotten requests."
      />

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card className="bg-destructive/10 border-destructive/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-destructive flex items-center">
              <AlertTriangleIcon className="mr-2 h-4 w-4" />
              Pending Deletions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">1</div>
            <p className="text-xs text-muted-foreground mt-1">Requires action within 30 days</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Exports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground mt-1">Data archives to generate</p>
          </CardContent>
        </Card>
      </div>

      <DataTable columns={columns} data={data} searchKey="customer" />
    </div>
  );
}
