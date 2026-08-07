"use client";

import React, { useState } from "react";
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
  DialogFooter 
} from "@commercex/ui";
import { FlagIcon, PlusIcon } from "lucide-react";

export default function FeatureFlagsPage() {
  const [flags, setFlags] = useState([
    { key: "enable_new_checkout_v2", desc: "Next-gen checkout engine", status: true, rollout: "100%" },
    { key: "beta_ai_product_description", desc: "AI assistant in tenant admin", status: true, rollout: "25%" },
    { key: "dark_mode_storefront", desc: "Native dark mode toggle", status: false, rollout: "0%" },
  ]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [flagKey, setFlagKey] = useState("");
  const [flagDesc, setFlagDesc] = useState("");

  const handleCreateFlag = () => {
    if (!flagKey.trim()) return;
    setFlags([{ key: flagKey, desc: flagDesc || "New feature flag", status: true, rollout: "10%" }, ...flags]);
    setFlagKey(""); setFlagDesc(""); setIsCreateOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Feature Flags</h1>
          <p className="text-muted-foreground mt-1">Manage dynamic feature toggles and canary rollouts.</p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}><PlusIcon className="mr-2 h-4 w-4" /> Create Flag</Button>
      </div>

      <Card className="p-6 space-y-4">
        {flags.map((flag, i) => (
          <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
            <div>
              <code className="font-bold text-sm bg-muted px-2 py-1 rounded">{flag.key}</code>
              <p className="text-xs text-muted-foreground mt-1">{flag.desc}</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline">Rollout: {flag.rollout}</Badge>
              <Switch defaultChecked={flag.status} />
            </div>
          </div>
        ))}
      </Card>

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader><DialogTitle>Create Feature Flag</DialogTitle><DialogDescription>Define a new feature flag key.</DialogDescription></DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2"><label className="text-sm font-medium">Flag Key</label><Input value={flagKey} onChange={e => setFlagKey(e.target.value)} placeholder="enable_custom_checkout" /></div>
            <div className="space-y-2"><label className="text-sm font-medium">Description</label><Input value={flagDesc} onChange={e => setFlagDesc(e.target.value)} placeholder="Description of feature scope" /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button><Button onClick={handleCreateFlag}>Create Flag</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}