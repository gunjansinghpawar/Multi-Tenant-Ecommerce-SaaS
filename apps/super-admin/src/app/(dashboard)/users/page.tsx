"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  DataTable, 
  Button, 
  Badge, 
  Avatar, 
  Input,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator,
  DeleteDialog,
  WarningDialog,
  ImportWizardDialog,
  ExportWizardDialog
} from "@commercex/ui";
import { PlusIcon, UserPlusIcon, DownloadIcon, UploadIcon, MoreHorizontalIcon } from "lucide-react";

const initialUsers = [
  { id: "usr_1", name: "Alex Johnson", email: "alex@platform.com", role: "Super Admin", status: "Active", created: "Jan 10, 2026" },
  { id: "usr_2", name: "Sarah Miller", email: "sarah@platform.com", role: "Support Lead", status: "Active", created: "Feb 02, 2026" },
  { id: "usr_3", name: "David Chen", email: "david@platform.com", role: "Finance Manager", status: "Inactive", created: "Feb 14, 2026" },
];

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Super Admin");

  const handleCreate = () => {
    if (!name.trim()) return;
    setUsers([{ id: `usr_${Date.now()}`, name, email, role, status: "Active", created: "Just now" }, ...users]);
    setName(""); setEmail(""); setIsCreateOpen(false);
  };

  const handleDelete = () => {
    if (!selectedUser) return;
    setUsers(users.filter(u => u.id !== selectedUser.id));
    setIsDeleteOpen(false);
  };

  const columns = [
    { accessorKey: "name", header: "User Name", cell: ({ row }: any) => <div className="font-medium">{row.getValue("name")}</div> },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "role", header: "Role", cell: ({ row }: any) => <Badge variant="secondary">{row.getValue("role")}</Badge> },
    { accessorKey: "status", header: "Status", cell: ({ row }: any) => <Badge variant={row.getValue("status") === "Active" ? "default" : "outline"}>{row.getValue("status")}</Badge> },
    { accessorKey: "created", header: "Created At" },
    {
      id: "actions",
      cell: ({ row }: any) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontalIcon className="h-4 w-4" /></Button></DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => { setSelectedUser(row.original); setIsDeleteOpen(true); }} className="text-destructive">Delete User</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground mt-1">Manage global system administrators and team accounts.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setIsImportOpen(true)}><UploadIcon className="mr-2 h-4 w-4" /> Import</Button>
          <Button variant="outline" onClick={() => setIsExportOpen(true)}><DownloadIcon className="mr-2 h-4 w-4" /> Export</Button>
          <Button onClick={() => setIsCreateOpen(true)}><UserPlusIcon className="mr-2 h-4 w-4" /> Add User</Button>
        </div>
      </div>

      <DataTable columns={columns} data={users} searchKey="name" />

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader><DialogTitle>Add System User</DialogTitle><DialogDescription>Create a new administrative user.</DialogDescription></DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2"><label className="text-sm font-medium">Full Name</label><Input value={name} onChange={e => setName(e.target.value)} placeholder="Jane Doe" /></div>
            <div className="space-y-2"><label className="text-sm font-medium">Email Address</label><Input value={email} onChange={e => setEmail(e.target.value)} placeholder="jane@platform.com" /></div>
            <div className="space-y-2"><label className="text-sm font-medium">Role</label>
              <select className="w-full h-10 px-3 border rounded-md bg-background text-sm" value={role} onChange={e => setRole(e.target.value)}>
                <option value="Super Admin">Super Admin</option>
                <option value="Support Lead">Support Lead</option>
                <option value="Finance Manager">Finance Manager</option>
              </select>
            </div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button><Button onClick={handleCreate}>Add User</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <ImportWizardDialog open={isImportOpen} onOpenChange={setIsImportOpen} title="Import System Users" />
      <ExportWizardDialog open={isExportOpen} onOpenChange={setIsExportOpen} title="Export User Data" />
      <DeleteDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen} title="Delete User" description={`Permanently delete ${selectedUser?.name}?`} onConfirm={handleDelete} />
    </div>
  );
}