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
  delivered: string;
  read: string;
  status: "COMPLETED" | "SCHEDULED" | "SENDING";
};

const data: Campaign[] = [
  { id: "1", name: "Summer Sale Blast", audience: "All Customers", sent: 2450, delivered: "98%", read: "65%", status: "COMPLETED" },
  { id: "2", name: "VIP Early Access", audience: "VIPs", sent: 320, delivered: "99%", read: "82%", status: "COMPLETED" },
  { id: "3", name: "Win-back Campaign", audience: "Inactive Users", sent: 0, delivered: "-", read: "-", status: "SCHEDULED" },
];

const columns: ColumnDef<Campaign>[] = [
  { accessorKey: "name", header: "Campaign Name" },
  { accessorKey: "audience", header: "Audience" },
  { accessorKey: "sent", header: "Sent" },
  { accessorKey: "delivered", header: "Delivered %" },
  { accessorKey: "read", header: "Read %" },
  { 
    accessorKey: "status", 
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      let colorClass = "";
      if (status === 'COMPLETED') colorClass = 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      else if (status === 'SCHEDULED') colorClass = 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      else colorClass = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';

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
              <Eye className="mr-2 h-4 w-4" /> View Details
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
        heading="WhatsApp Campaigns" 
        text="Track the performance of your broadcast campaigns."
      >
        <Button asChild>
          <a href="/whatsapp/broadcast">
            <PlusIcon className="mr-2 h-4 w-4" />
            New Campaign
          </a>
        </Button>
      </PageHeader>

      <DataTable columns={columns} data={data} searchKey="name" />
    </div>
  );
}
