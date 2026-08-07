import React from "react";
import { Button, Card, Input, Label, Switch } from "@commercex/ui";
import { Settings, Shield, Bell, Database } from "lucide-react";

export default function SuperAdminSettings() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage global configurations for the CommerceX platform.
        </p>
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Settings className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">General Configuration</h2>
          </div>
          <div className="space-y-4 max-w-xl">
            <div className="grid gap-2">
              <Label htmlFor="platformName">Platform Name</Label>
              <Input id="platformName" defaultValue="CommerceX Enterprise" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="supportEmail">Support Email</Label>
              <Input id="supportEmail" defaultValue="support@commercex.dev" />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button>Save Changes</Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Security & Access</h2>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Require 2FA for Super Admins</h4>
                <p className="text-sm text-muted-foreground">Enforce two-factor authentication for all platform administrators.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Enforce Password Policies</h4>
                <p className="text-sm text-muted-foreground">Require strong passwords across all tenants.</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Database className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">System Maintenance</h2>
          </div>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-lg bg-muted/20">
              <div>
                <h4 className="font-medium">Maintenance Mode</h4>
                <p className="text-sm text-muted-foreground">Suspend access to all tenants for system updates.</p>
              </div>
              <Button variant="destructive">Enable Maintenance</Button>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-lg bg-muted/20">
              <div>
                <h4 className="font-medium">Clear Cache</h4>
                <p className="text-sm text-muted-foreground">Clear edge cache and invalidate CDN assets.</p>
              </div>
              <Button variant="outline">Clear System Cache</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
