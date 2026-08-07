"use client";

import React from "react";
import { 
  PageHeader, 
  Card, 
  CardContent, 
  DataTable,
  Button
} from "@commercex/ui";
import { PlusIcon, Building2Icon, MoreHorizontalIcon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

type DepartmentRow = {
  name: string;
  head: string;
  memberCount: number;
  teams: number;
};

const data: DepartmentRow[] = [
  { name: "Management", head: "John Doe", memberCount: 3, teams: 1 },
  { name: "Operations", head: "Sarah Smith", memberCount: 12, teams: 4 },
  { name: "Marketing", head: "Emily Davis", memberCount: 8, teams: 2 },
  { name: "Customer Success", head: "Mike Johnson", memberCount: 15, teams: 3 },
  { name: "Engineering", head: "Alex Turner", memberCount: 10, teams: 2 },
];

const columns: ColumnDef<DepartmentRow>[] = [
  { accessorKey: "name", header: "Department Name" },
  { accessorKey: "head", header: "Department Head" },
  { accessorKey: "memberCount", header: "Total Members" },
  { accessorKey: "teams", header: "Teams Count" },
  {
    id: "actions",
    cell: () => <Button variant="ghost" size="icon"><MoreHorizontalIcon className="h-4 w-4" /></Button>
  }
];

export default function DepartmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          heading="Departments" 
          text="Manage top-level organizational groups within your company."
        />
        <Button>
          <Building2Icon className="mr-2 h-4 w-4" /> Create Department
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
