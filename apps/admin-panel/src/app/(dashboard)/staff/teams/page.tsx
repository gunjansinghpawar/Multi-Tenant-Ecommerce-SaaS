"use client";

import React from "react";
import { 
  PageHeader, 
  Card, 
  CardContent, 
  DataTable,
  Button
} from "@commercex/ui";
import { PlusIcon, UsersIcon, MoreHorizontalIcon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

type TeamRow = {
  name: string;
  department: string;
  lead: string;
  memberCount: number;
};

const data: TeamRow[] = [
  { name: "Frontend Engineering", department: "Engineering", lead: "Alice Brown", memberCount: 4 },
  { name: "Backend API", department: "Engineering", lead: "Bob Green", memberCount: 6 },
  { name: "Social Media", department: "Marketing", lead: "Charlie White", memberCount: 3 },
  { name: "Performance Marketing", department: "Marketing", lead: "Diana Prince", memberCount: 5 },
  { name: "Tier 1 Support", department: "Customer Success", lead: "Eve Black", memberCount: 10 },
  { name: "Fulfillment & Logistics", department: "Operations", lead: "Frank Castle", memberCount: 12 },
];

const columns: ColumnDef<TeamRow>[] = [
  { accessorKey: "name", header: "Team Name" },
  { accessorKey: "department", header: "Department" },
  { accessorKey: "lead", header: "Team Lead" },
  { accessorKey: "memberCount", header: "Members" },
  {
    id: "actions",
    cell: () => <Button variant="ghost" size="icon"><MoreHorizontalIcon className="h-4 w-4" /></Button>
  }
];

export default function TeamsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          heading="Teams" 
          text="Manage specific sub-teams and working groups within departments."
        />
        <Button>
          <UsersIcon className="mr-2 h-4 w-4" /> Create Team
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
