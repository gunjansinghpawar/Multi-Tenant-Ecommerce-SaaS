"use client";

import React from "react";
import { 
  Card,
  Button,
  Input,
  Badge
} from "@commercex/ui";
import { PlusIcon, CheckCircle2Icon } from "lucide-react";

export default function DomainsSettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Domains</h3>
          <p className="text-sm text-muted-foreground">
            Manage custom domains and SSL certificates for your storefront.
          </p>
        </div>
        <Button size="sm"><PlusIcon className="mr-2 h-4 w-4" /> Add Domain</Button>
      </div>
      <div className="border-t border-border"></div>

      <div className="space-y-4">
        {/* Primary Domain */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h4 className="font-bold text-lg">shop.fashionboutique.com</h4>
              <Badge variant="outline" className="bg-primary/10 text-primary border-none">Primary</Badge>
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-none">
                <CheckCircle2Icon className="mr-1 h-3 w-3" /> SSL Active
              </Badge>
            </div>
            <Button variant="ghost" size="sm">Edit</Button>
          </div>
          <div className="bg-muted p-4 rounded-md font-mono text-sm text-muted-foreground flex justify-between items-center">
            <span>CNAME Record</span>
            <span>alias.commercex.com</span>
          </div>
        </Card>

        {/* System Domain */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h4 className="font-medium text-foreground">fashion-boutique.commercex.com</h4>
              <Badge variant="secondary">System</Badge>
            </div>
            <Button variant="ghost" size="sm" disabled>Default</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
