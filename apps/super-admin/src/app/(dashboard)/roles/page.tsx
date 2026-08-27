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
  Skeleton,
  useToast
} from "@commercex/ui";
import { 
  ShieldIcon, 
  SearchIcon,
  PlusIcon,
  CopyIcon,
  Trash2Icon,
  CheckIcon,
  Loader2Icon,
  SaveIcon,
  UsersIcon, 
  ShieldCheckIcon, 
  AlertTriangleIcon, 
  CheckCircleIcon, 
  PlayIcon, 
  LinkIcon 
} from "lucide-react";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { 
  getRolesAction, 
  getPermissionsByCategoryAction, 
  createRoleAction,
  updateRolePermissionsAction,
  deleteRoleAction
} from "../../../actions/role.actions";
import { seedDefaultsAction } from "../../../actions/seed.actions";

type PermissionRow = { id: string; key: string; name: string; description: string | null; category: string };
type RoleRow = {
  id: string;
  name: string;
  description: string | null;
  isSystem: boolean;
  _count: { users?: number; platformUsers?: number };
  permissions: { permission: PermissionRow }[];
};

export default function RolesPage() {
  const { toast } = useToast();
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
  const [seeding, setSeeding] = useState(false);

  // ── Load data ─────────────────────────────────────────────
  const loadData = useCallback(async () => {
    const [rolesResult, permsResult] = await Promise.all([
      getRolesAction('PLATFORM' as any),
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
      toast({ title: "Permissions updated", description: "Role permissions saved successfully." });
    } else {
      toast({ title: "Error", description: "Failed to update permissions.", variant: "destructive" });
    }
    setSaving(false);
  };

  // ── Create Role ───────────────────────────────────────────
  const handleCreate = async () => {
    if (!newRoleName.trim()) return;
    setCreating(true);
    const result = await createRoleAction({ name: newRoleName, description: newRoleDesc, scope: 'PLATFORM' as any });
    if (result.success && result.data) {
      setIsCreateOpen(false);
      setNewRoleName("");
      setNewRoleDesc("");
      await loadData();
      setActiveRoleId((result.data as RoleRow).id);
      setCheckedPermsFromRole(result.data as RoleRow);
      toast({ title: "Role created", description: "New role created successfully." });
    } else {
      toast({ title: "Error", description: "Failed to create role.", variant: "destructive" });
    }
    setCreating(false);
  };

  // ── Delete Role ───────────────────────────────────────────
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleDeleteRequest = () => {
    if (!activeRoleId || activeRole?.isSystem) return;
    setDeleteOpen(true);
  };

  const confirmDeleteRole = async () => {
    if (!activeRoleId || activeRole?.isSystem) return;
    const result = await deleteRoleAction(activeRoleId);
    if (result.success) {
      setActiveRoleId(null);
      await loadData();
      toast({ title: "Role deleted", description: "Role removed successfully." });
    } else {
      toast({ title: "Error", description: "Failed to delete role.", variant: "destructive" });
    }
  };

  // ── Seed Defaults ─────────────────────────────────────────
  const handleSeed = async () => {
    setSeeding(true);
    await seedDefaultsAction();
    await loadData();
    toast({ title: "Defaults seeded", description: "Default roles and permissions created." });
    setSeeding(false);
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
          {roles.length === 0 && (
            <Button variant="outline" onClick={handleSeed} disabled={seeding}>
              {seeding ? <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> : <SaveIcon className="mr-2 h-4 w-4" />} Seed Defaults
            </Button>
          )}
          <Button onClick={() => setIsCreateOpen(true)}>
            <PlusIcon className="mr-2 h-4 w-4" /> Create Role
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        
        {/* LEFT COLUMN: ROLES LIST */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-4">
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
            {filteredRoles.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground bg-card rounded-md border">
                <p className="text-sm">No roles found.</p>
              </div>
            ) : filteredRoles.map(role => (
              <Card 
                key={role.id} 
                className={`p-4 cursor-pointer transition-all ${activeRoleId === role.id ? 'border-primary shadow-sm bg-primary/5' : 'hover:border-primary/50'}`}
                onClick={() => handleSelectRole(role)}
              >
                <div className="flex flex-col 2xl:flex-row 2xl:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <ShieldIcon className={`h-4 w-4 shrink-0 ${activeRoleId === role.id ? 'text-primary' : 'text-muted-foreground'}`} />
                    <h3 className="font-semibold truncate" title={role.name}>{role.name}</h3>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {role.isSystem && <Badge variant="outline" className="text-[10px] whitespace-nowrap px-1.5">System</Badge>}
                    <Badge variant="secondary" className="text-[10px] whitespace-nowrap px-1.5">{role._count?.platformUsers || role._count?.users || 0} Users</Badge>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{role.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{role.permissions?.length || 0} permissions</p>
              </Card>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: PERMISSIONS MATRIX */}
        <div className="lg:col-span-8 xl:col-span-9">
          <Card className="h-[calc(100vh-140px)] flex flex-col shadow-sm border-muted">
            
            {activeRole ? (
              <>
                <div className="p-6 border-b border-border flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">{activeRole.name} Permissions</h2>
                    <p className="text-sm text-muted-foreground mt-1">Select the actions this role can perform.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {!activeRole.isSystem && (
                      <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10 border-destructive/20" onClick={handleDeleteRequest}>
                        <Trash2Icon className="mr-2 h-4 w-4" /> Delete
                      </Button>
                    )}
                    <Button size="sm" onClick={handleSave} disabled={saving}>
                      {saving ? <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> : <SaveIcon className="mr-2 h-4 w-4" />}
                      Save Changes
                    </Button>
                  </div>
                </div>

                <div className="p-6 flex-1 overflow-auto space-y-10">
                  {Object.entries(permissionsByCategory).map(([categoryName, perms]) => {
                    const isAllSelected = perms.every(p => checkedPerms[p.id]);
                    
                    return (
                      <div key={categoryName} className="space-y-5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border/50 pb-3 gap-3">
                          <h3 className="text-lg font-bold tracking-tight">{categoryName}</h3>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-muted-foreground font-medium">Select All</span>
                            <Switch 
                              checked={isAllSelected}
                              onCheckedChange={(val) => toggleCategory(categoryName, val)}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                          {perms.map(perm => (
                            <label 
                              key={perm.id} 
                              className={`relative flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${checkedPerms[perm.id] ? 'border-primary bg-primary/5 shadow-sm' : 'border-border bg-card hover:border-primary/40 hover:bg-muted/30'}`}
                              onClick={() => togglePerm(perm.id)}
                            >
                              <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${checkedPerms[perm.id] ? 'border-primary bg-primary text-primary-foreground' : 'border-input bg-background'}`}>
                                {checkedPerms[perm.id] && <CheckIcon className="h-3.5 w-3.5" />}
                              </div>
                              <div className="flex flex-col flex-1 gap-1">
                                <span className="text-sm font-semibold leading-tight text-foreground">{perm.name}</span>
                                <span className="text-xs text-muted-foreground">{perm.key}</span>
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

      {/* Delete Role Confirmation */}
      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        intent="danger"
        title="Delete Role"
        description={`Are you sure you want to permanently delete the "${activeRole?.name}" role? Users with this role might lose access.`}
        onConfirm={confirmDeleteRole}
      />
    </div>
  );
}
