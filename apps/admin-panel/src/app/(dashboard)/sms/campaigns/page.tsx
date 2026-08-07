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

type SMSCampaign = {
  id: string;
  name: string;
  audience: string;
  sent: number;
  delivered: string;
  cost: string;
  status: "COMPLETED" | "SCHEDULED" | "SENDING";
};

const data: SMSCampaign[] = [
  { id: "1", name: "Flash Sale Alert", audience: "All Opt-In", sent: 1250, delivered: "98%", cost: "$12.50", status: "COMPLETED" },
  { id: "2", name: "VIP Early Access", audience: "VIPs", sent: 120, delivered: "100%", cost: "$1.20", status: "COMPLETED" },
  { id: "3", name: "Local Event Promo", audience: "Local Region", sent: 0, delivered: "-", cost: "-", status: "SCHEDULED" },
];

const columns: ColumnDef<SMSCampaign>[] = [
  { accessorKey: "name", header: "Campaign Name" },
  { accessorKey: "audience", header: "Audience" },
  { accessorKey: "sent", header: "Sent Count" },
  { accessorKey: "delivered", header: "Delivered %" },
  { accessorKey: "cost", header: "Est. Cost" },
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

export default function SMSCampaignsPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="SMS Campaigns" 
        text="Track the performance of your SMS marketing broadcasts."
      >
        <Button asChild>
          <a href="/sms/marketing">
            <PlusIcon className="mr-2 h-4 w-4" />
            New Campaign
          </a>
        </Button>
      </PageHeader>

      <DataTable columns={columns} data={data} searchKey="name" />
    </div>
  );
}
