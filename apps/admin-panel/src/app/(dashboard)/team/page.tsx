"use client";

import React from "react";
import { PageHeader, DataTable, Button } from "@commercex/ui";
import { ColumnDef } from "@tanstack/react-table";
import { UserPlus, MoreHorizontal } from "lucide-react";

type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Invited";
};

const mockTeam: TeamMember[] = [
  { id: "1", name: "Alice Smith", email: "alice@store.com", role: "Owner", status: "Active" },
  { id: "2", name: "Bob Johnson", email: "bob@store.com", role: "Manager", status: "Active" },
  { id: "3", name: "Carol White", email: "carol@store.com", role: "Support", status: "Invited" },
];

const columns: ColumnDef<TeamMember>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
        {row.original.role}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.original.status === "Active";
      return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
          isActive ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
        }`}>
          {row.original.status}
        </span>
      );
    }
  },
  {
    id: "actions",
    cell: () => (
      <Button variant="ghost" size="icon">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    ),
  },
];

export default function TeamMembersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          heading="Team Members" 
          text="Manage staff access and invitations to your store."
        />
        <Button>
          <UserPlus className="mr-2 h-4 w-4" /> Invite Member
        </Button>
      </div>

      <DataTable 
        columns={columns} 
        data={mockTeam} 
        searchKey="email" 
      />
    </div>
  );
}
