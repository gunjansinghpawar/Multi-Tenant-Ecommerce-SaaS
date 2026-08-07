"use client";

import React from "react";
import { 
  PageHeader, 
  Card, 
  CardContent, 
  DataTable,
  Button
} from "@commercex/ui";
import { DownloadIcon, FilterIcon, UserPlusIcon, MoreHorizontalIcon, ShieldIcon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

type StaffRow = {
  name: string;
  email: string;
  role: string;
  department: string;
  status: "Active" | "Inactive" | "Invited";
  lastActive: string;
};

const data: StaffRow[] = [
  { name: "John Doe", email: "john@example.com", role: "Super Admin", department: "Management", status: "Active", lastActive: "2 mins ago" },
  { name: "Sarah Smith", email: "sarah@example.com", role: "Store Manager", department: "Operations", status: "Active", lastActive: "1 hour ago" },
  { name: "Mike Johnson", email: "mike@example.com", role: "Support Agent", department: "Customer Success", status: "Inactive", lastActive: "2 days ago" },
  { name: "Emily Davis", email: "emily@example.com", role: "Marketing Lead", department: "Marketing", status: "Invited", lastActive: "Never" },
];

const columns: ColumnDef<StaffRow>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { 
    accessorKey: "role", 
    header: "Role",
    cell: ({ row }) => {
      const role = row.original.role;
      return (
        <span className="flex items-center space-x-1">
          {role === 'Super Admin' && <ShieldIcon className="h-3 w-3 text-blue-500" />}
          <span>{role}</span>
        </span>
      );
    }
  },
  { accessorKey: "department", header: "Department" },
  { 
    accessorKey: "status", 
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      let color = "bg-gray-100 text-gray-800";
      if (status === "Active") color = "bg-green-100 text-green-800";
      if (status === "Inactive") color = "bg-red-100 text-red-800";
      if (status === "Invited") color = "bg-yellow-100 text-yellow-800";
      return <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>{status}</span>;
    }
  },
  { accessorKey: "lastActive", header: "Last Active" },
  {
    id: "actions",
    cell: () => <Button variant="ghost" size="icon"><MoreHorizontalIcon className="h-4 w-4" /></Button>
  }
];

export default function StaffListPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          heading="Staff Directory" 
          text="Manage your team members and their account statuses."
        />
        <div className="flex space-x-2">
          <Button variant="outline"><FilterIcon className="mr-2 h-4 w-4" /> Filter</Button>
          <Button variant="outline"><DownloadIcon className="mr-2 h-4 w-4" /> Export</Button>
          <Button asChild>
            <Link href="/staff/invite">
              <UserPlusIcon className="mr-2 h-4 w-4" /> Invite Staff
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <DataTable columns={columns} data={data} searchKey="name" />
        </CardContent>
      </Card>
    </div>
  );
}
