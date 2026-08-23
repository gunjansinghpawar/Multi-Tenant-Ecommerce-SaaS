"use client";

import React, { useEffect, useState } from "react";
import { PageHeader, DataTable, Button, Badge, Skeleton } from "@commercex/ui";
import { ColumnDef } from "@tanstack/react-table";
import { ShieldPlus, MoreHorizontal, ShieldCheck, Loader2Icon } from "lucide-react";
import { getRolesAction } from "../../../actions/role.actions";

type RoleRow = {
  id: string;
  name: string;
  description: string | null;
  isSystem: boolean;
  _count: { platformUsers: number };
  permissions: { permission: { key: string; name: string; category: string } }[];
};

const columns: ColumnDef<RoleRow>[] = [
  {
    accessorKey: "name",
    header: "Role Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-4 w-4 text-primary" />
        <span className="font-semibold">{row.original.name}</span>
        {row.original.isSystem && (
          <Badge variant="outline" className="text-xs ml-1">System</Badge>
        )}
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="text-muted-foreground max-w-md truncate">
        {row.original.description || "—"}
      </div>
    ),
  },
  {
    id: "permissions",
    header: "Permissions",
    cell: ({ row }) => (
      <Badge variant="secondary">
        {row.original.permissions.length} permissions
      </Badge>
    ),
  },
  {
    id: "users",
    header: "Assigned Users",
    cell: ({ row }) => (
      <Badge variant="secondary">
        {row.original._count.platformUsers} users
      </Badge>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <Button variant="ghost" size="icon" disabled={row.original.isSystem}>
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    ),
  },
];

export default function RolesManagementPage() {
  const [roles, setRoles] = useState<RoleRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const result = await getRolesAction();
      if (result.success && result.data) {
        setRoles(result.data as RoleRow[]);
      }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-80" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-16 w-full" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          heading="Role Management" 
          text="Define custom roles and permissions for your team."
        />
        <Button>
          <ShieldPlus className="mr-2 h-4 w-4" /> Create Role
        </Button>
      </div>

      <DataTable 
        columns={columns} 
        data={roles} 
        searchKey="name" 
      />
    </div>
  );
}
