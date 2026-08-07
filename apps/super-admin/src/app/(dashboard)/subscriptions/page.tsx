"use client";

import React, { useState } from "react";
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
  DeleteDialog
} from "@commercex/ui";
import { CheckIcon, PlusIcon } from "lucide-react";

export default function SubscriptionsPage() {
  const [plans, setPlans] = useState([
    { name: "Starter", price: "$0", desc: "Free tier for small stores", storage: "5 GB" },
    { name: "Pro Growth", price: "$99", desc: "High volume e-commerce", storage: "100 GB" },
    { name: "Enterprise", price: "$499", desc: "Dedicated instance & SLA", storage: "1 TB" },
  ]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [planName, setPlanName] = useState("");
  const [price, setPrice] = useState("");

  const handleCreatePlan = () => {
    if (!planName.trim()) return;
    setPlans([...plans, { name: planName, price: `$${price || 0}`, desc: "Custom tier", storage: "50 GB" }]);
    setPlanName(""); setPrice(""); setIsCreateOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Subscription Plans</h1>
          <p className="text-muted-foreground mt-1">Configure global platform tiers and pricing limits.</p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" /> Create New Plan
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((p, i) => (
          <Card key={i} className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4"><h3 className="text-xl font-bold">{p.name}</h3><Badge variant="outline">{p.storage}</Badge></div>
              <div className="text-3xl font-bold mb-4">{p.price} <span className="text-sm font-normal text-muted-foreground">/mo</span></div>
              <p className="text-sm text-muted-foreground mb-4">{p.desc}</p>
            </div>
            <Button variant="outline" className="w-full">Edit Plan Settings</Button>
          </Card>
        ))}
      </div>

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader><DialogTitle>Create Subscription Plan</DialogTitle><DialogDescription>Define pricing tier parameters.</DialogDescription></DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2"><label className="text-sm font-medium">Plan Name</label><Input value={planName} onChange={e => setPlanName(e.target.value)} placeholder="e.g. Business VIP" /></div>
            <div className="space-y-2"><label className="text-sm font-medium">Monthly Price ($)</label><Input value={price} onChange={e => setPrice(e.target.value)} placeholder="199" /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button><Button onClick={handleCreatePlan}>Create Plan</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}