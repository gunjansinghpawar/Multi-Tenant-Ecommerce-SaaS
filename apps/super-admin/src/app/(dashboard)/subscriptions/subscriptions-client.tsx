"use client";

import React, { useState, useTransition } from "react";
import { 
  Card, 
  Button, 
  Badge, 
  Input, 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter,
  useToast,
  DeleteDialog
} from "@commercex/ui";
import { PlusIcon, EditIcon, Trash2Icon } from "lucide-react";
import { 
  createPlanAction, 
  updatePlanAction, 
  deletePlanAction, 
  togglePlanStatusAction 
} from "../../../actions/plan.actions";

export type Plan = {
  id: string;
  name: string;
  description: string;
  priceMonth: number;
  priceYear: number;
  features: string[];
  limits: any;
  isActive: boolean;
};

export function SubscriptionsClient({ initialPlans }: { initialPlans: Plan[] }) {
  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  // Modal States
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  
  // Selected Plan
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  // Form State
  const [planName, setPlanName] = useState("");
  const [description, setDescription] = useState("");
  const [priceMonth, setPriceMonth] = useState("");
  const [storageLimit, setStorageLimit] = useState("");

  const resetForm = () => {
    setPlanName("");
    setDescription("");
    setPriceMonth("");
    setStorageLimit("");
    setSelectedPlan(null);
  };

  const openEditModal = (plan: Plan) => {
    setSelectedPlan(plan);
    setPlanName(plan.name);
    setDescription(plan.description);
    setPriceMonth(plan.priceMonth.toString());
    setStorageLimit(plan.limits?.storage || "10 GB");
    setIsEditOpen(true);
  };

  const handleCreatePlan = () => {
    if (!planName.trim()) {
      toast({ title: "Validation Error", description: "Plan name is required.", variant: "destructive" });
      return;
    }

    startTransition(async () => {
      const pm = parseFloat(priceMonth) || 0;
      const py = pm * 12; // Auto-calculate yearly price

      const result = await createPlanAction({
        name: planName,
        description: description || "Custom subscription tier.",
        priceMonth: pm,
        priceYear: py,
        storageLimit: storageLimit || "10 GB"
      });

      if (result.success && result.plan) {
        toast({ title: "Plan Created", description: `Successfully created ${result.plan.name}` });
        setPlans([...plans, result.plan as any]);
        resetForm();
        setIsCreateOpen(false);
      } else {
        toast({ title: "Error", description: result.error, variant: "destructive" });
      }
    });
  };

  const handleUpdatePlan = () => {
    if (!selectedPlan || !planName.trim()) return;

    startTransition(async () => {
      const pm = parseFloat(priceMonth) || 0;
      const py = pm * 12; 

      const result = await updatePlanAction(selectedPlan.id, {
        name: planName,
        description: description,
        priceMonth: pm,
        priceYear: py,
        storageLimit: storageLimit
      });

      if (result.success && result.plan) {
        toast({ title: "Plan Updated", description: "The plan has been updated." });
        setPlans(plans.map(p => p.id === selectedPlan.id ? (result.plan as any) : p));
        resetForm();
        setIsEditOpen(false);
      } else {
        toast({ title: "Error", description: result.error, variant: "destructive" });
      }
    });
  };

  const handleDeletePlan = () => {
    if (!selectedPlan) return;

    startTransition(async () => {
      const result = await deletePlanAction(selectedPlan.id);
      
      if (result.success) {
        toast({ title: "Plan Deleted", description: "The subscription plan has been permanently deleted." });
        setPlans(plans.filter(p => p.id !== selectedPlan.id));
        setIsDeleteOpen(false);
        setIsEditOpen(false); // Close edit modal too if open
        setSelectedPlan(null);
      } else {
        toast({ title: "Error", description: result.error, variant: "destructive" });
        setIsDeleteOpen(false);
      }
    });
  };

  const handleToggleStatus = (plan: Plan) => {
    startTransition(async () => {
      const result = await togglePlanStatusAction(plan.id, !plan.isActive);
      if (result.success) {
        toast({ title: "Status Updated", description: `Plan is now ${!plan.isActive ? 'Active' : 'Inactive'}.` });
        setPlans(plans.map(p => p.id === plan.id ? { ...p, isActive: !p.isActive } : p));
      } else {
        toast({ title: "Error", description: result.error, variant: "destructive" });
      }
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Subscription Plans</h1>
          <p className="text-muted-foreground mt-1">Configure global platform tiers and pricing limits.</p>
        </div>
        <Button onClick={() => { resetForm(); setIsCreateOpen(true); }}>
          <PlusIcon className="mr-2 h-4 w-4" /> Create New Plan
        </Button>
      </div>

      {plans.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed">
          <h3 className="text-lg font-medium mb-2">No Plans Configured</h3>
          <p className="text-muted-foreground mb-4">You have not set up any subscription tiers for your tenants yet.</p>
          <Button onClick={() => setIsCreateOpen(true)}>Create Your First Plan</Button>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <Card key={p.id} className={`p-6 flex flex-col justify-between ${!p.isActive ? 'opacity-60 grayscale' : ''}`}>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold">{p.name}</h3>
                    {!p.isActive && <Badge variant="secondary" className="text-[10px]">Inactive</Badge>}
                  </div>
                  <Badge variant="outline">{p.limits?.storage || "N/A"}</Badge>
                </div>
                <div className="text-3xl font-bold mb-4">
                  ${p.priceMonth} <span className="text-sm font-normal text-muted-foreground">/mo</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{p.description}</p>
                
                {p.features && p.features.length > 0 && (
                  <ul className="space-y-2 mb-6">
                    {p.features.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-center text-sm">
                        <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" className="flex-1" onClick={() => openEditModal(p)}>
                  <EditIcon className="w-4 h-4 mr-2" /> Edit Plan
                </Button>
                <Button 
                  variant={p.isActive ? "secondary" : "default"} 
                  className="px-3"
                  onClick={() => handleToggleStatus(p)}
                  disabled={isPending}
                >
                  {p.isActive ? "Deactivate" : "Activate"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* CREATE MODAL */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Subscription Plan</DialogTitle>
            <DialogDescription>Define pricing tier parameters.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Plan Name</label>
              <Input value={planName} onChange={e => setPlanName(e.target.value)} placeholder="e.g. Business VIP" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Input value={description} onChange={e => setDescription(e.target.value)} placeholder="Perfect for scaling businesses" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Monthly Price ($)</label>
                <Input type="number" value={priceMonth} onChange={e => setPriceMonth(e.target.value)} placeholder="199" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Storage Limit</label>
                <Input value={storageLimit} onChange={e => setStorageLimit(e.target.value)} placeholder="100 GB" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)} disabled={isPending}>Cancel</Button>
            <Button onClick={handleCreatePlan} disabled={isPending || !planName.trim()}>
              {isPending ? "Creating..." : "Create Plan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* EDIT MODAL */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Subscription Plan</DialogTitle>
            <DialogDescription>Modify pricing or limits for this tier.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Plan Name</label>
              <Input value={planName} onChange={e => setPlanName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Input value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Monthly Price ($)</label>
                <Input type="number" value={priceMonth} onChange={e => setPriceMonth(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Storage Limit</label>
                <Input value={storageLimit} onChange={e => setStorageLimit(e.target.value)} />
              </div>
            </div>
          </div>
          <DialogFooter className="flex justify-between sm:justify-between w-full items-center">
             <Button variant="destructive" size="icon" onClick={() => setIsDeleteOpen(true)} disabled={isPending}>
               <Trash2Icon className="h-4 w-4" />
             </Button>
             <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditOpen(false)} disabled={isPending}>Cancel</Button>
              <Button onClick={handleUpdatePlan} disabled={isPending || !planName.trim()}>
                {isPending ? "Saving..." : "Save Changes"}
              </Button>
             </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* DELETE DIALOG */}
      <DeleteDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title="Delete Plan"
        description={`Are you sure you want to permanently delete the "${selectedPlan?.name}" plan? This cannot be undone.`}
        confirmText={isPending ? "Deleting..." : "Delete Plan"}
        onConfirm={handleDeletePlan}
      />
    </div>
  );
}
