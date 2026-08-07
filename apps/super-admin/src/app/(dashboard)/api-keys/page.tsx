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
  DialogFooter 
} from "@commercex/ui";
import { KeyIcon, PlusIcon, CopyIcon } from "lucide-react";

export default function ApiKeysPage() {
  const [keys, setKeys] = useState([
    { id: "1", name: "Primary Master Key", key: "cx_live_sec_892348234...", created: "Feb 2026" },
    { id: "2", name: "Development Sandbox", key: "cx_test_sec_102938102...", created: "Jan 2026" }
  ]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [keyName, setKeyName] = useState("");

  const handleGenerateKey = () => {
    if (!keyName.trim()) return;
    setKeys([{ id: Date.now().toString(), name: keyName, key: `cx_live_sec_${Math.random().toString(36).substring(2, 10)}...`, created: "Just now" }, ...keys]);
    setKeyName(""); setIsCreateOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">API Keys</h1>
          <p className="text-muted-foreground mt-1">Manage global secret keys for external API integrations.</p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}><PlusIcon className="mr-2 h-4 w-4" /> Generate New Key</Button>
      </div>

      <Card className="p-6 space-y-4">
        {keys.map((k) => (
          <div key={k.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
            <div className="flex items-center gap-3">
              <KeyIcon className="h-4 w-4 text-primary" />
              <div>
                <h4 className="font-bold text-sm">{k.name}</h4>
                <code className="font-mono text-xs text-muted-foreground">{k.key}</code>
              </div>
            </div>
            <Button variant="outline" size="sm"><CopyIcon className="h-4 w-4 mr-1" /> Copy Key</Button>
          </div>
        ))}
      </Card>

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader><DialogTitle>Generate Secret API Key</DialogTitle><DialogDescription>Provide a label for your new key.</DialogDescription></DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2"><label className="text-sm font-medium">Key Label / Name</label><Input value={keyName} onChange={e => setKeyName(e.target.value)} placeholder="e.g. Webhook Service" /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button><Button onClick={handleGenerateKey}>Generate Key</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}