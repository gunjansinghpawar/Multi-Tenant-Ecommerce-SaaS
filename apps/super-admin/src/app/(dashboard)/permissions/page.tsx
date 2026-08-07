"use client";

import React, { useState } from "react";
import { 
  Card, 
  Button, 
  Badge, 
  Checkbox, 
  Input, 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@commercex/ui";
import { ShieldIcon, SearchIcon, SaveIcon } from "lucide-react";

const permissionsData = [
  { module: "Tenant Management", read: true, create: true, edit: true, delete: false },
  { module: "User Management", read: true, create: true, edit: true, delete: true },
  { module: "Billing & Subscriptions", read: true, create: false, edit: true, delete: false },
  { module: "Security & Audit", read: true, create: false, edit: false, delete: false },
  { module: "System Health & Monitoring", read: true, create: false, edit: true, delete: false },
  { module: "Feature Flags", read: true, create: true, edit: true, delete: true },
];

export default function PermissionsPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Permissions Matrix</h1>
          <p className="text-muted-foreground mt-1">Configure role-based access control (RBAC) rules.</p>
        </div>
        <Button>
          <SaveIcon className="mr-2 h-4 w-4" /> Save Permission Changes
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search permission modules..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Module / Feature</TableHead>
              <TableHead className="text-center">Read Access</TableHead>
              <TableHead className="text-center">Create Access</TableHead>
              <TableHead className="text-center">Edit Access</TableHead>
              <TableHead className="text-center">Delete Access</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {permissionsData.map((perm, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium flex items-center gap-2">
                  <ShieldIcon className="h-4 w-4 text-primary" />
                  {perm.module}
                </TableCell>
                <TableCell className="text-center"><Checkbox defaultChecked={perm.read} /></TableCell>
                <TableCell className="text-center"><Checkbox defaultChecked={perm.create} /></TableCell>
                <TableCell className="text-center"><Checkbox defaultChecked={perm.edit} /></TableCell>
                <TableCell className="text-center"><Checkbox defaultChecked={perm.delete} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}