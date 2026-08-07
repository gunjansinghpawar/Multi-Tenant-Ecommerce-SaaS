"use client";

import React from "react";
import { 
  PageHeader, 
  Card, 
  CardContent, 
  DataTable,
  Button
} from "@commercex/ui";
import { ShieldAlertIcon, PlusIcon, MoreHorizontalIcon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

type RoleRow = {
  name: string;
  description: string;
  usersAssigned: number;
  type: "System" | "Custom";
};

const data: RoleRow[] = [
  { name: "Super Admin", description: "Full access to all modules and settings.", usersAssigned: 2, type: "System" },
  { name: "Store Manager", description: "Access to orders, products, and customers. Cannot change settings.", usersAssigned: 4, type: "System" },
  { name: "Support Agent", description: "Access to view orders and manage customers.", usersAssigned: 12, type: "System" },
  { name: "Marketing Lead", description: "Access to marketing reports, campaigns, and discounts.", usersAssigned: 3, type: "Custom" },
  { name: "Fulfillment Staff", description: "Access to orders (read/update status) and shipping.", usersAssigned: 8, type: "Custom" },
];

const columns: ColumnDef<RoleRow>[] = [
  { accessorKey: "name", header: "Role Name" },
  { accessorKey: "description", header: "Description" },
  { accessorKey: "usersAssigned", header: "Users Assigned" },
  { 
    accessorKey: "type", 
    header: "Type",
    cell: ({ row }) => {
      const type = row.original.type;
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${type === 'System' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
          {type}
        </span>
      );
    }
  },
  {
    id: "actions",
    cell: () => <Button variant="ghost" size="icon"><MoreHorizontalIcon className="h-4 w-4" /></Button>
  }
];

export default function RolesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          heading="Roles" 
          text="Define job roles which can be assigned to staff members."
        />
        <Button>
          <ShieldAlertIcon className="mr-2 h-4 w-4" /> Create Custom Role
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <DataTable columns={columns} data={data} searchKey="name" />
        </CardContent>
      </Card>
    </div>
  );
}
