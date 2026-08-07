"use client";

import React, { useState } from "react";
import { 
  PageHeader, 
  Button,
  DataTable
} from "@commercex/ui";
import { PlusIcon, MoreHorizontal, Edit, PlayIcon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@commercex/ui";

type Flow = {
  id: string;
  name: string;
  status: "DRAFT" | "PUBLISHED";
  screens: number;
};

const data: Flow[] = [
  { id: "1", name: "Customer Feedback Form", status: "PUBLISHED", screens: 3 },
  { id: "2", name: "Book Appointment", status: "DRAFT", screens: 5 },
];

const columns: ColumnDef<Flow>[] = [
  { accessorKey: "name", header: "Flow Name" },
  { accessorKey: "screens", header: "Screens" },
  { 
    accessorKey: "status", 
    header: "Status",
    cell: ({ row }) => (
      <div className={`px-2 py-1 rounded-full text-xs font-medium w-fit ${
        row.original.status === 'PUBLISHED' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
        'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
      }`}>
        {row.original.status}
      </div>
    )
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
              <PlayIcon className="mr-2 h-4 w-4" /> Preview
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" /> Build Flow
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];

export default function FlowsPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="WhatsApp Flows" 
        text="Build rich, interactive forms that open directly inside WhatsApp."
      >
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Create Flow
        </Button>
      </PageHeader>

      <DataTable columns={columns} data={data} searchKey="name" />
    </div>
  );
}
