"use client";

import React, { useState, useEffect, useCallback } from "react";
import { 
  Card,
  Button,
  Badge,
  Switch,
  Input,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Skeleton
} from "@commercex/ui";
import { 
  ShieldIcon, 
  SearchIcon,
  PlusIcon,
  CopyIcon,
  Trash2Icon,
  CheckIcon,
  Loader2Icon,
  SaveIcon
} from "lucide-react";
import { 
  getRolesAction, 
  getPermissionsByCategoryAction, 
  createRoleAction,
  updateRolePermissionsAction,
  deleteRoleAction
} from "../../../actions/role.actions";

type PermissionRow = { id: string; key: string; name: string; description: string | null; category: string };
type RoleRow = {
  id: string;
  name: string;
  description: string | null;
  isSystem: boolean;
  _count: { users: number };
  permissions: { permission: PermissionRow }[];
};

export default function RolesPage() {
  const [roles, setRoles] = useState<RoleRow[]>([]);
  const [permissionsByCategory, setPermissionsByCategory] = useState<Record<string, PermissionRow[]>>({});
  const [activeRoleId, setActiveRoleId] = useState<string | null>(null);
  const [checkedPerms, setCheckedPerms] = useState<Record<string, boolean>>({});
  const [search, setSearch] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newRoleName, setNewRoleName] = useState("");
  const [newRoleDesc, setNewRoleDesc] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [creating, setCreating] = useState(false);

  // ── Load data ─────────────────────────────────────────────
  const loadData = useCallback(async () => {
    const [rolesResult, permsResult] = await Promise.all([
      getRolesAction(),
      getPermissionsByCategoryAction()
    ]);
    
    if (rolesResult.success && rolesResult.data) {
      setRoles(rolesResult.data as RoleRow[]);
      if (!activeRoleId && (rolesResult.data as RoleRow[]).length > 0) {
        const firstRole = (rolesResult.data as RoleRow[])[0];
        setActiveRoleId(firstRole.id);
        setCheckedPermsFromRole(firstRole);
      }
    }
    if (permsResult.success && permsResult.data) {
      setPermissionsByCategory(permsResult.data as Record<string, PermissionRow[]>);
    }
    setLoading(false);
  }, [activeRoleId]);

  useEffect(() => { loadData(); }, []);

  // ── Helpers ───────────────────────────────────────────────
  function setCheckedPermsFromRole(role: RoleRow) {
    const map: Record<string, boolean> = {};
    for (const rp of role.permissions) {
      map[rp.permission.id] = true;
    }
    setCheckedPerms(map);
  }

  const activeRole = roles.find(r => r.id === activeRoleId);

  const handleSelectRole = (role: RoleRow) => {
    setActiveRoleId(role.id);
    setCheckedPermsFromRole(role);
  };

  const togglePerm = (id: string) => {
    setCheckedPerms(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleCategory = (categoryName: string, state: boolean) => {
    const perms = permissionsByCategory[categoryName] || [];
    const newPerms = { ...checkedPerms };
    perms.forEach(p => { newPerms[p.id] = state; });
    setCheckedPerms(newPerms);
  };

  // ── Save Permissions ──────────────────────────────────────
  const handleSave = async () => {
    if (!activeRoleId) return;
    setSaving(true);
    const selectedIds = Object.entries(checkedPerms)
      .filter(([_, v]) => v)
      .map(([k]) => k);
    
    const result = await updateRolePermissionsAction(activeRoleId, selectedIds);
    if (result.success) {
      await loadData();
    }
    setSaving(false);
  };

  // ── Create Role ───────────────────────────────────────────
  const handleCreate = async () => {
    if (!newRoleName.trim()) return;
    setCreating(true);
    const result = await createRoleAction({ name: newRoleName, description: newRoleDesc });
    if (result.success && result.data) {
      setIsCreateOpen(false);
      setNewRoleName("");
      setNewRoleDesc("");
      await loadData();
      setActiveRoleId((result.data as RoleRow).id);
      setCheckedPermsFromRole(result.data as RoleRow);
    }
    setCreating(false);
  };

  // ── Delete Role ───────────────────────────────────────────
  const handleDelete = async () => {
    if (!activeRoleId || activeRole?.isSystem) return;
    const result = await deleteRoleAction(activeRoleId);
    if (result.success) {
      setActiveRoleId(null);
      await loadData();
    }
  };

  // ── Filter roles by search ────────────────────────────────
  const filteredRoles = roles.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    (r.description || '').toLowerCase().includes(search.toLowerCase())
  );

  // ── Loading State ─────────────────────────────────────────
  if (loading) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-9 w-56" />
            <Skeleton className="h-4 w-80" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-4 lg:col-span-3 space-y-4">
            <Skeleton className="h-10 w-full" />
            {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-24 w-full" />)}
          </div>
          <div className="md:col-span-8 lg:col-span-9">
            <Skeleton className="h-[500px] w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Role Management</h1>
          <p className="text-muted-foreground mt-1">Configure access control and permissions matrix.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setIsCreateOpen(true)}>
            <PlusIcon className="mr-2 h-4 w-4" /> Create Role
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        
        {/* LEFT COLUMN: ROLES LIST */}
        <div className="md:col-span-4 lg:col-span-3 space-y-4">
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search roles..."
              className="pl-8 bg-card"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            {filteredRoles.map(role => (
              <Card 
                key={role.id} 
                className={`p-4 cursor-pointer transition-all ${activeRoleId === role.id ? 'border-primary shadow-sm bg-primary/5' : 'hover:border-primary/50'}`}
                onClick={() => handleSelectRole(role)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <ShieldIcon className={`h-4 w-4 ${activeRoleId === role.id ? 'text-primary' : 'text-muted-foreground'}`} />
                    <h3 className="font-semibold">{role.name}</h3>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {role.isSystem && <Badge variant="outline" className="text-[10px]">System</Badge>}
                    <Badge variant="secondary">{role._count.users} Users</Badge>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{role.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{role.permissions.length} permissions</p>
              </Card>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: PERMISSIONS MATRIX */}
        <div className="md:col-span-8 lg:col-span-9">
          <Card className="h-full flex flex-col">
            
            {activeRole ? (
              <>
                <div className="p-6 border-b border-border flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">{activeRole.name} Permissions</h2>
                    <p className="text-sm text-muted-foreground mt-1">Select the actions this role can perform.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {!activeRole.isSystem && (
                      <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10 border-destructive/20" onClick={handleDelete}>
                        <Trash2Icon className="mr-2 h-4 w-4" /> Delete
                      </Button>
                    )}
                    <Button size="sm" onClick={handleSave} disabled={saving}>
                      {saving ? <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> : <SaveIcon className="mr-2 h-4 w-4" />}
                      Save Changes
                    </Button>
                  </div>
                </div>

                <div className="p-6 flex-1 overflow-auto space-y-8">
                  {Object.entries(permissionsByCategory).map(([categoryName, perms]) => {
                    const isAllSelected = perms.every(p => checkedPerms[p.id]);
                    
                    return (
                      <div key={categoryName} className="space-y-4">
                        <div className="flex items-center justify-between border-b border-border pb-2">
                          <h3 className="text-lg font-semibold">{categoryName}</h3>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Select All</span>
                            <Switch 
                              checked={isAllSelected}
                              onCheckedChange={(val) => toggleCategory(categoryName, val)}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {perms.map(perm => (
                            <label 
                              key={perm.id} 
                              className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${checkedPerms[perm.id] ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted'}`}
                              onClick={() => togglePerm(perm.id)}
                            >
                              <div className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border ${checkedPerms[perm.id] ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}`}>
                                {checkedPerms[perm.id] && <CheckIcon className="h-3 w-3" />}
                              </div>
                              <div className="flex flex-col">
                                <span className="text-sm font-medium leading-none">{perm.name}</span>
                                <span className="text-xs text-muted-foreground mt-1">{perm.key}</span>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full p-12 text-muted-foreground">
                <div className="text-center space-y-2">
                  <ShieldIcon className="h-12 w-12 mx-auto opacity-30" />
                  <p>Select a role to view and edit its permissions.</p>
                </div>
              </div>
            )}
          </Card>
        </div>

      </div>

      {/* Create Role Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Role</DialogTitle>
            <DialogDescription>Define a new role and start assigning permissions.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Role Name</label>
              <Input 
                placeholder="e.g. MARKETING_MANAGER" 
                value={newRoleName} 
                onChange={e => setNewRoleName(e.target.value)} 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Input 
                placeholder="Brief description of responsibilities..." 
                value={newRoleDesc} 
                onChange={e => setNewRoleDesc(e.target.value)} 
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate} disabled={creating || !newRoleName.trim()}>
              {creating ? <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> : null}
              Create Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </div>
  );
}
