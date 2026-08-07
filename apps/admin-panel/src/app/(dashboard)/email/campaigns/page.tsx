"use client";

import React from "react";
import { 
  PageHeader, 
  Button,
  DataTable
} from "@commercex/ui";
import { PlusIcon, MoreHorizontal, Eye, BarChart2 } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@commercex/ui";

type Campaign = {
  id: string;
  name: string;
  audience: string;
  sent: number;
  openRate: string;
  clickRate: string;
  status: "COMPLETED" | "SCHEDULED" | "DRAFT";
};

const data: Campaign[] = [
  { id: "1", name: "Black Friday Pre-Sale", audience: "All Subscribers", sent: 15420, openRate: "42%", clickRate: "12%", status: "COMPLETED" },
  { id: "2", name: "VIP Exclusive Launch", audience: "VIP Segment", sent: 850, openRate: "68%", clickRate: "24%", status: "COMPLETED" },
  { id: "3", name: "Holiday Gift Guide", audience: "Active Last 30d", sent: 0, openRate: "-", clickRate: "-", status: "SCHEDULED" },
];

const columns: ColumnDef<Campaign>[] = [
  { accessorKey: "name", header: "Campaign Name" },
  { accessorKey: "audience", header: "Audience" },
  { accessorKey: "sent", header: "Total Sent" },
  { accessorKey: "openRate", header: "Open Rate" },
  { accessorKey: "clickRate", header: "Click Rate" },
  { 
    accessorKey: "status", 
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      let colorClass = "";
      if (status === 'COMPLETED') colorClass = 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      else if (status === 'SCHEDULED') colorClass = 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      else colorClass = 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';

      return (
        <div className={`px-2 py-1 rounded-full text-xs font-medium w-fit ${colorClass}`}>
          {status}
        </div>
      );
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" /> View Campaign
            </DropdownMenuItem>
            <DropdownMenuItem>
              <BarChart2 className="mr-2 h-4 w-4" /> View Analytics
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];

export default function CampaignsPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Email Campaigns" 
        text="Manage your outbound marketing email campaigns."
      >
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Create Campaign
        </Button>
      </PageHeader>

      <DataTable columns={columns} data={data} searchKey="name" />
    </div>
  );
}
