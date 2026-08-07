"use client";

import React, { useState } from "react";
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
  DeleteDialog,
  WarningDialog,
  ImportWizardDialog,
  ExportWizardDialog
} from "@commercex/ui";
import { ColumnDef } from "@tanstack/react-table";
import { 
  MoreHorizontalIcon, 
  PlusIcon,
  DownloadIcon,
  UploadIcon,
  StoreIcon
} from "lucide-react";

type Store = {
  id: string;
  name: string;
  owner: string;
  plan: "Free" | "Pro" | "Enterprise";
  status: "Active" | "Suspended" | "Pending";
  created: string;
  storage: string;
};

const initialStoreData: Store[] = [
  { id: "str_1", name: "Fashion Boutique", owner: "jane@fashion.com", plan: "Pro", status: "Active", created: "Oct 12, 2025", storage: "12 GB" },
  { id: "str_2", name: "Tech Gadgets", owner: "mark@tech.com", plan: "Enterprise", status: "Active", created: "Nov 05, 2025", storage: "450 GB" },
  { id: "str_3", name: "Home Essentials", owner: "sarah@home.com", plan: "Free", status: "Pending", created: "Jan 14, 2026", storage: "1 GB" },
  { id: "str_4", name: "Sporting Goods", owner: "mike@sport.com", plan: "Pro", status: "Suspended", created: "Aug 22, 2025", storage: "8 GB" },
  { id: "str_5", name: "Beauty Supply", owner: "linda@beauty.com", plan: "Pro", status: "Active", created: "Dec 01, 2025", storage: "22 GB" },
  { id: "str_6", name: "Digital Assets", owner: "alex@digital.com", plan: "Enterprise", status: "Active", created: "Feb 10, 2026", storage: "890 GB" },
  { id: "str_7", name: "Local Grocery", owner: "tom@grocery.com", plan: "Free", status: "Active", created: "Mar 15, 2026", storage: "3 GB" },
];

export default function StoresPage() {
  const [data, setData] = useState<Store[]>(initialStoreData);
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
  const [newPlan, setNewPlan] = useState<"Free" | "Pro" | "Enterprise">("Pro");

  const handleCreateStore = () => {
    if (!newStoreName.trim()) return;
    const newStore: Store = {
      id: `str_${Date.now().toString().slice(-4)}`,
      name: newStoreName,
      owner: newOwnerEmail || "admin@store.com",
      plan: newPlan,
      status: "Active",
      created: "Just now",
      storage: "0 GB"
    };
    setData([newStore, ...data]);
    setNewStoreName("");
    setNewOwnerEmail("");
    setIsCreateOpen(false);
  };

  const handleDeleteStore = () => {
    if (!selectedStore) return;
    setData(data.filter(s => s.id !== selectedStore.id));
    setIsDeleteOpen(false);
    setSelectedStore(null);
  };

  const handleSuspendStore = () => {
    if (!selectedStore) return;
    setData(data.map(s => s.id === selectedStore.id ? { ...s, status: s.status === "Suspended" ? "Active" : "Suspended" } : s));
    setIsSuspendOpen(false);
    setSelectedStore(null);
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
                className="text-destructive"
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
                <option value="Free">Free Tier</option>
                <option value="Pro">Pro Growth ($99/mo)</option>
                <option value="Enterprise">Enterprise ($499/mo)</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateStore} disabled={!newStoreName.trim()}>
              Create Store
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
      <WarningDialog
        open={isSuspendOpen}
        onOpenChange={setIsSuspendOpen}
        title={selectedStore?.status === "Suspended" ? "Reactivate Store" : "Suspend Store"}
        description={`Are you sure you want to ${selectedStore?.status === "Suspended" ? "reactivate" : "suspend"} "${selectedStore?.name}"?`}
        confirmText={selectedStore?.status === "Suspended" ? "Reactivate" : "Suspend Store"}
        onConfirm={handleSuspendStore}
      />

      {/* 5. DELETE STORE DIALOG */}
      <DeleteDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title="Delete Store"
        description={`Are you sure you want to permanently delete "${selectedStore?.name}"? This action cannot be undone.`}
        confirmText="Delete Store"
        onConfirm={handleDeleteStore}
      />
    </div>
  );
}
