"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { 
  DataTable, 
  Button,
  Badge,
  Input,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  ImportWizardDialog,
  ExportWizardDialog,
  useToast
} from "@commercex/ui";
import { ColumnDef } from "@tanstack/react-table";
import { 
  MoreHorizontalIcon, 
  PlusIcon,
  DownloadIcon,
  UploadIcon,
  StoreIcon
} from "lucide-react";
import { createTenantAction, updateTenantStatusAction, deleteTenantAction } from "../../../actions/tenant.actions";
import { ConfirmDialog } from "@/components/ConfirmDialog";

export type Store = {
  id: string;
  name: string;
  owner: string;
  plan: string;
  status: string;
  created: string;
  storage: string;
};

export function StoresClient({ initialData, availablePlans = [] }: { initialData: Store[], availablePlans?: any[] }) {
  const [data, setData] = useState<Store[]>(initialData);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  
  // Selection states
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isSuspendOpen, setIsSuspendOpen] = useState(false);

  // New store form state
  const [newStoreName, setNewStoreName] = useState("");
  const [newOwnerEmail, setNewOwnerEmail] = useState("");
  const defaultPlanId = availablePlans.length > 0 ? availablePlans[0].id : "";
  const [newPlan, setNewPlan] = useState(defaultPlanId);

  const handleCreateStore = () => {
    if (!newStoreName.trim() || !newOwnerEmail.trim()) {
      toast({ title: "Validation Error", description: "Name and Owner Email are required.", variant: "destructive" });
      return;
    }

    startTransition(async () => {
      const result = await createTenantAction({
        name: newStoreName,
        ownerEmail: newOwnerEmail,
        planId: newPlan
      });

      if (result.success && result.tenant) {
        toast({ title: "Store Created", description: `Successfully created ${result.tenant.name}` });
        
        // Optimistic update
        const selectedPlan = availablePlans.find(p => p.id === newPlan);
        const newStore: Store = {
          id: result.tenant.id,
          name: result.tenant.name,
          owner: newOwnerEmail,
          plan: selectedPlan ? selectedPlan.name : "No Plan",
          status: "Active",
          created: "Just now",
          storage: selectedPlan && selectedPlan.maxStorageGB !== -1 ? `${selectedPlan.maxStorageGB} GB` : "Unlimited"
        };
        setData([newStore, ...data]);
        
        setNewStoreName("");
        setNewOwnerEmail("");
        setIsCreateOpen(false);
      } else {
        toast({ title: "Error", description: result.error, variant: "destructive" });
      }
    });
  };

  const handleDeleteStore = () => {
    if (!selectedStore) return;
    
    startTransition(async () => {
      const result = await deleteTenantAction(selectedStore.id);
      
      if (result.success) {
        toast({ title: "Store Deleted", description: "The store has been deleted." });
        setData(data.filter(s => s.id !== selectedStore.id));
        setIsDeleteOpen(false);
        setSelectedStore(null);
      } else {
        toast({ title: "Error", description: result.error, variant: "destructive" });
      }
    });
  };

  const handleSuspendStore = () => {
    if (!selectedStore) return;
    
    startTransition(async () => {
      const newStatus = selectedStore.status === "Suspended" ? "ACTIVE" : "SUSPENDED";
      const result = await updateTenantStatusAction(selectedStore.id, newStatus);
      
      if (result.success) {
        toast({ title: "Status Updated", description: `Store is now ${newStatus.toLowerCase()}.` });
        setData(data.map(s => s.id === selectedStore.id ? { ...s, status: newStatus === "ACTIVE" ? "Active" : "Suspended" } : s));
        setIsSuspendOpen(false);
        setSelectedStore(null);
      } else {
        toast({ title: "Error", description: result.error, variant: "destructive" });
      }
    });
  };

  const columns: ColumnDef<Store>[] = [
    {
      accessorKey: "name",
      header: "Store Name",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-md bg-primary/10 text-primary flex items-center justify-center">
            <StoreIcon className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <Link href={`/stores/${row.original.id}`} className="font-medium hover:underline text-foreground">
              {row.getValue("name")}
            </Link>
            <span className="text-xs text-muted-foreground">{row.original.id}</span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "owner",
      header: "Owner",
    },
    {
      accessorKey: "plan",
      header: "Plan",
      cell: ({ row }) => {
        const plan = row.getValue("plan") as string;
        const variant = plan === "Enterprise" ? "default" : plan === "Pro" ? "secondary" : "outline";
        return <Badge variant={variant as any}>{plan}</Badge>;
      }
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const color = status === "Active" ? "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20" : 
                      status === "Suspended" ? "bg-destructive/10 text-destructive hover:bg-destructive/20" : 
                      "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20";
        return <Badge variant="outline" className={`border-none ${color}`}>{status}</Badge>;
      }
    },
    {
      accessorKey: "storage",
      header: "Storage",
    },
    {
      accessorKey: "created",
      header: "Created At",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const store = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/stores/${store.id}`}>View Details</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => { setSelectedStore(store); setIsSuspendOpen(true); }}>
                {store.status === "Suspended" ? "Reactivate Store" : "Suspend Store"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-destructive focus:text-destructive"
                onClick={() => { setSelectedStore(store); setIsDeleteOpen(true); }}
              >
                Delete Store
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Stores</h1>
          <p className="text-muted-foreground mt-1">Manage and monitor all tenant stores.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setIsImportOpen(true)}>
            <UploadIcon className="mr-2 h-4 w-4" /> Import
          </Button>
          <Button variant="outline" onClick={() => setIsExportOpen(true)}>
            <DownloadIcon className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button onClick={() => setIsCreateOpen(true)}>
            <PlusIcon className="mr-2 h-4 w-4" /> Create Store
          </Button>
        </div>
      </div>

      {/* STORES TABLE */}
      <DataTable columns={columns} data={data} searchKey="name" />

      {/* --- POPUPS / MODALS --- */}

      {/* 1. CREATE STORE MODAL */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Store</DialogTitle>
            <DialogDescription>Set up a new tenant store environment.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Store Name</label>
              <Input 
                placeholder="e.g. Acme Outfitters" 
                value={newStoreName}
                onChange={(e) => setNewStoreName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Owner Email</label>
              <Input 
                type="email"
                placeholder="owner@acme.com" 
                value={newOwnerEmail}
                onChange={(e) => setNewOwnerEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Subscription Tier</label>
              <select 
                className="w-full h-10 px-3 border rounded-md bg-background text-sm"
                value={newPlan}
                onChange={(e: any) => setNewPlan(e.target.value)}
              >
                {availablePlans.map((plan: any) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name} {plan.monthlyPrice ? `($${plan.monthlyPrice}/mo)` : "(Free)"}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)} disabled={isPending}>Cancel</Button>
            <Button onClick={handleCreateStore} disabled={!newStoreName.trim() || !newOwnerEmail.trim() || isPending}>
              {isPending ? "Creating..." : "Create Store"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 2. IMPORT WIZARD */}
      <ImportWizardDialog
        open={isImportOpen}
        onOpenChange={setIsImportOpen}
        title="Import Tenant Stores"
      />

      {/* 3. EXPORT WIZARD */}
      <ExportWizardDialog
        open={isExportOpen}
        onOpenChange={setIsExportOpen}
        title="Export Tenant Data"
      />

      {/* 4. SUSPEND CONFIRMATION DIALOG */}
      <ConfirmDialog
        open={isSuspendOpen}
        onOpenChange={setIsSuspendOpen}
        intent="warning"
        title={selectedStore?.status === "Suspended" ? "Reactivate Store" : "Suspend Store"}
        description={`Are you sure you want to ${selectedStore?.status === "Suspended" ? "reactivate" : "suspend"} "${selectedStore?.name}"?`}
        confirmLabel={selectedStore?.status === "Suspended" ? "Reactivate" : "Suspend Store"}
        onConfirm={handleSuspendStore}
        loading={isPending}
      />

      {/* 5. DELETE STORE DIALOG */}
      <ConfirmDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        intent="danger"
        title="Delete Store"
        description={`Are you sure you want to permanently delete "${selectedStore?.name}"? This action cannot be undone.`}
        confirmLabel="Delete Store"
        onConfirm={handleDeleteStore}
        loading={isPending}
      />
    </div>
  );
}
