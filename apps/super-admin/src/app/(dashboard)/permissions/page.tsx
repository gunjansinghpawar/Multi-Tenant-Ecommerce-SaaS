"use client";

import React, { useState, useEffect, useCallback } from "react";
import { 
  Card, 
  Button, 
  Badge, 
  Input, 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Skeleton,
  useToast
} from "@commercex/ui";
import { ShieldIcon, SearchIcon, PlusIcon, Loader2Icon } from "lucide-react";
import { getPermissionsByCategoryAction, createPermissionAction } from "../../../actions/role.actions";

export default function PermissionsPage() {
  const { toast } = useToast();
  const [permissions, setPermissions] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newKey, setNewKey] = useState("");
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const loadData = useCallback(async () => {
    setLoading(true);
    const res = await getPermissionsByCategoryAction();
    if (res.success && res.data) {
      setPermissions(res.data);
    }
    setLoading(false);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const handleCreate = async () => {
    if (!newKey.trim() || !newName.trim() || !newCategory.trim()) return;
    setCreating(true);
    const res = await createPermissionAction({
      key: newKey,
      name: newName,
      category: newCategory,
      description: newDesc
    });
    if (res.success) {
      setIsCreateOpen(false);
      setNewKey("");
      setNewName("");
      setNewCategory("");
      setNewDesc("");
      await loadData();
      toast({ title: "Permission created", description: "New system permission added." });
    } else {
      toast({ title: "Error", description: res.error, variant: "destructive" });
    }
    setCreating(false);
  };

  // Filter permissions based on search
  const filteredCategories = Object.entries(permissions).reduce((acc, [category, perms]) => {
    const filteredPerms = perms.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase()) || 
      p.key.toLowerCase().includes(search.toLowerCase()) ||
      category.toLowerCase().includes(search.toLowerCase())
    );
    if (filteredPerms.length > 0) {
      acc[category] = filteredPerms;
    }
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Global Permissions</h1>
          <p className="text-muted-foreground mt-1">Manage all available system permissions that can be assigned to roles.</p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add Permission
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search permissions or categories..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-[300px] w-full" />
          </div>
        ) : Object.keys(filteredCategories).length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <ShieldIcon className="h-12 w-12 mx-auto opacity-30 mb-4" />
            <p>No permissions found.</p>
          </div>
        ) : (
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="w-[200px]">Category</TableHead>
                  <TableHead>Permission Name</TableHead>
                  <TableHead>System Key</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(filteredCategories).map(([category, perms]) => (
                  <React.Fragment key={category}>
                    {perms.map((perm, i) => (
                      <TableRow key={perm.id}>
                        {i === 0 && (
                          <TableCell rowSpan={perms.length} className="font-semibold align-top bg-muted/20 border-r">
                            {category}
                          </TableCell>
                        )}
                        <TableCell className="font-medium flex items-center gap-2 border-l-0">
                          <ShieldIcon className="h-4 w-4 text-primary" />
                          {perm.name}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-mono text-xs">{perm.key}</Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {perm.description || "-"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add System Permission</DialogTitle>
            <DialogDescription>Define a new permission that can be assigned to roles.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Input 
                placeholder="e.g. User Management" 
                value={newCategory} 
                onChange={e => setNewCategory(e.target.value)} 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Permission Name</label>
              <Input 
                placeholder="e.g. Create Users" 
                value={newName} 
                onChange={e => setNewName(e.target.value)} 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">System Key</label>
              <Input 
                placeholder="e.g. user:create" 
                value={newKey} 
                onChange={e => setNewKey(e.target.value)} 
                className="font-mono text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Input 
                placeholder="Allows the user to create new system users..." 
                value={newDesc} 
                onChange={e => setNewDesc(e.target.value)} 
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate} disabled={creating || !newKey || !newName || !newCategory}>
              {creating ? <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> : null}
              Create Permission
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}