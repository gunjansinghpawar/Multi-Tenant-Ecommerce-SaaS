"use client";

import React, { useState, useEffect, useCallback } from "react";
import { 
  DataTable, 
  Button, 
  Badge, 
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
  DeleteDialog,
  ImportWizardDialog,
  ExportWizardDialog,
  Skeleton,
  useToast
} from "@commercex/ui";
import { UserPlusIcon, DownloadIcon, UploadIcon, MoreHorizontalIcon, Loader2Icon, EditIcon } from "lucide-react";
import { getUsersAction, createUserAction, deleteUserAction, updateUserAction } from "../../../actions/user.actions";
import { getRolesAction } from "../../../actions/role.actions";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [roleId, setRoleId] = useState("");
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editRoleId, setEditRoleId] = useState("");

  const loadData = useCallback(async () => {
    setLoading(true);
    const [usersRes, rolesRes] = await Promise.all([
      getUsersAction(),
      getRolesAction('PLATFORM' as any)
    ]);
    if (usersRes.success && usersRes.data) {
      setUsers(usersRes.data);
    }
    if (rolesRes.success && rolesRes.data) {
      setRoles(rolesRes.data);
      if (rolesRes.data.length > 0 && !roleId) {
        setRoleId(rolesRes.data[0].id);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const handleCreate = async () => {
    if (!name.trim() || !email.trim()) return;
    setCreating(true);
    const res = await createUserAction({ name, email, roleId: roleId || undefined });
    if (res.success) {
      const createdUser = res.data;
      const assignedRole = roleId ? roles.find(r => r.id === roleId) : null;
      const newUser = {
        ...createdUser,
        platformRoles: assignedRole ? [{ roleId: assignedRole.id, role: assignedRole }] : []
      };
      setUsers(prev => [newUser, ...prev]);
      setName("");
      setEmail("");
      setIsCreateOpen(false);
      toast({ title: "User created", description: "System user added successfully." });
    } else {
      toast({ title: "Error", description: res.error, variant: "destructive" });
    }
    setCreating(false);
  };

  const handleDelete = async () => {
    if (!selectedUser) return;
    setDeleting(true);
    const res = await deleteUserAction(selectedUser.id);
    if (res.success) {
      setUsers(prev => prev.filter(u => u.id !== selectedUser.id));
      setIsDeleteOpen(false);
      setSelectedUser(null);
      toast({ title: "User deleted", description: "System user removed." });
    } else {
      toast({ title: "Error", description: res.error, variant: "destructive" });
    }
    setDeleting(false);
  };

  const handleEdit = async () => {
    if (!selectedUser || !editName.trim() || !editEmail.trim()) return;
    setEditing(true);
    const res = await updateUserAction(selectedUser.id, { 
      name: editName, 
      email: editEmail, 
      roleId: editRoleId || undefined 
    });
    if (res.success) {
      const assignedRole = editRoleId ? roles.find(r => r.id === editRoleId) : null;
      setUsers(prev => prev.map(u => {
        if (u.id === selectedUser.id) {
          return {
            ...u,
            name: editName,
            email: editEmail,
            platformRoles: assignedRole ? [{ roleId: assignedRole.id, role: assignedRole }] : []
          };
        }
        return u;
      }));
      setIsEditOpen(false);
      setSelectedUser(null);
      toast({ title: "User updated", description: "User details saved." });
    } else {
      toast({ title: "Error", description: res.error, variant: "destructive" });
    }
    setEditing(false);
  };

  const openEdit = (user: any) => {
    setSelectedUser(user);
    setEditName(user.name);
    setEditEmail(user.email);
    const platformRoles = user.platformRoles;
    setEditRoleId(platformRoles && platformRoles.length > 0 ? platformRoles[0].roleId : "");
    setIsEditOpen(true);
  };

  const columns = [
    { accessorKey: "name", header: "User Name", cell: ({ row }: any) => <div className="font-medium">{row.getValue("name")}</div> },
    { accessorKey: "email", header: "Email" },
    { 
      accessorKey: "role", 
      header: "Role", 
      cell: ({ row }: any) => {
        const platformRoles = row.original.platformRoles;
        const roleName = platformRoles && platformRoles.length > 0 ? platformRoles[0].role.name : "No Role";
        return <Badge variant="secondary">{roleName}</Badge>;
      } 
    },
    { accessorKey: "status", header: "Status", cell: ({ row }: any) => <Badge variant={row.getValue("status") === "ACTIVE" ? "default" : "outline"}>{row.getValue("status")}</Badge> },
    { accessorKey: "createdAt", header: "Created At", cell: ({ row }: any) => <span>{new Date(row.getValue("createdAt")).toLocaleDateString()}</span> },
    {
      id: "actions",
      cell: ({ row }: any) => {
        const platformRoles = row.original.platformRoles;
        const roleName = platformRoles && platformRoles.length > 0 ? platformRoles[0].role.name : "";
        if (roleName === "SUPER_ADMIN") return <div className="w-9" />;
        
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontalIcon className="h-4 w-4" /></Button></DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => openEdit(row.original)}><EditIcon className="mr-2 h-4 w-4" /> Edit User</DropdownMenuItem>
              <DropdownMenuItem onClick={() => { setSelectedUser(row.original); setIsDeleteOpen(true); }} className="text-destructive">Delete User</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }
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

      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-[400px] w-full" />
        </div>
      ) : (
        <DataTable columns={columns} data={users} searchKey="name" />
      )}

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader><DialogTitle>Add System User</DialogTitle><DialogDescription>Create a new administrative user.</DialogDescription></DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2"><label className="text-sm font-medium">Full Name</label><Input value={name} onChange={e => setName(e.target.value)} placeholder="Jane Doe" /></div>
            <div className="space-y-2"><label className="text-sm font-medium">Email Address</label><Input value={email} onChange={e => setEmail(e.target.value)} placeholder="jane@platform.com" /></div>
            <div className="space-y-2"><label className="text-sm font-medium">Role</label>
              <select className="w-full h-10 px-3 border rounded-md bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" value={roleId} onChange={e => setRoleId(e.target.value)}>
                <option value="">No Role</option>
                {roles.filter(r => r.name !== 'SUPER_ADMIN').map(r => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate} disabled={creating || !name || !email}>
              {creating ? <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> : null}
              Add User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader><DialogTitle>Edit System User</DialogTitle><DialogDescription>Update administrative user details.</DialogDescription></DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2"><label className="text-sm font-medium">Full Name</label><Input value={editName} onChange={e => setEditName(e.target.value)} placeholder="Jane Doe" /></div>
            <div className="space-y-2"><label className="text-sm font-medium">Email Address</label><Input value={editEmail} onChange={e => setEditEmail(e.target.value)} placeholder="jane@platform.com" /></div>
            <div className="space-y-2"><label className="text-sm font-medium">Role</label>
              <select className="w-full h-10 px-3 border rounded-md bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" value={editRoleId} onChange={e => setEditRoleId(e.target.value)}>
                <option value="">No Role</option>
                {roles.filter(r => r.name !== 'SUPER_ADMIN').map(r => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
            <Button onClick={handleEdit} disabled={editing || !editName || !editEmail}>
              {editing ? <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> : null}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ImportWizardDialog open={isImportOpen} onOpenChange={setIsImportOpen} title="Import System Users" />
      <ExportWizardDialog open={isExportOpen} onOpenChange={setIsExportOpen} title="Export User Data" />
      <DeleteDialog 
        open={isDeleteOpen} 
        onOpenChange={setIsDeleteOpen} 
        title="Delete User" 
        description={`Permanently delete ${selectedUser?.name}?`} 
        onConfirm={handleDelete} 
      />
    </div>
  );
}