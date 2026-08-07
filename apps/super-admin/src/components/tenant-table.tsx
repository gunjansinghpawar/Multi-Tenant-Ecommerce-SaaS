"use client";

import React from "react";
import { Badge, Button, DataTable } from "@commercex/ui";
import { ArrowUpRightIcon, MoreHorizontal, ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

type Tenant = {
  id: string;
  name: string;
  domain: string;
  plan: string;
  status: string;
};

interface TenantTableProps {
  tenants: Tenant[];
}

export function TenantTable({ tenants }: TenantTableProps) {
  const columns: ColumnDef<Tenant>[] = [
    {
      accessorKey: "name",
      header: "Tenant",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
            {row.getValue<string>("name").charAt(0)}
          </div>
          <span className="font-medium">{row.getValue("name")}</span>
        </div>
      ),
    },
    {
      accessorKey: "domain",
      header: "Domain",
      cell: ({ row }) => <span className="text-muted-foreground">{row.getValue("domain")}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue<string>("status");
        return (
          <Badge variant={status === "Active" ? "default" : "secondary"}>
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "plan",
      header: "Plan",
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowUpRightIcon className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      ),
    },
  ];

  return <DataTable columns={columns} data={tenants} searchKey="name" />;
}
