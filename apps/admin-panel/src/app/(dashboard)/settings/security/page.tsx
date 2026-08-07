"use client";

import React from "react";
import { 
  Card,
  Button,
  Switch
} from "@commercex/ui";

export default function SecuritySettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Security</h3>
        <p className="text-sm text-muted-foreground">
          Manage store-wide security policies and access controls.
        </p>
      </div>
      <div className="border-t border-border"></div>

      <div className="space-y-8">
        
        {/* MFA Enforcement */}
        <section className="flex flex-col md:flex-row gap-6 md:gap-12">
          <div className="md:w-1/3">
            <h4 className="font-medium text-sm">Two-Factor Authentication</h4>
            <p className="text-sm text-muted-foreground mt-1">Require all staff members to enable 2FA on their accounts.</p>
          </div>
          <div className="md:w-2/3">
            <Card className="p-4 space-y-4 max-w-md flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Enforce 2FA</p>
                <p className="text-xs text-muted-foreground">Staff will be prompted to setup 2FA on next login.</p>
              </div>
              <Switch />
            </Card>
          </div>
        </section>

        <div className="border-t border-border"></div>

        {/* Session Timeout */}
        <section className="flex flex-col md:flex-row gap-6 md:gap-12">
          <div className="md:w-1/3">
            <h4 className="font-medium text-sm">Idle Session Timeout</h4>
            <p className="text-sm text-muted-foreground mt-1">Automatically log out inactive staff members.</p>
          </div>
          <div className="md:w-2/3">
            <Card className="p-4 space-y-4">
              <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background max-w-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                <option value="15m">15 Minutes</option>
                <option value="30m">30 Minutes</option>
                <option value="1h">1 Hour</option>
                <option value="never">Never</option>
              </select>
            </Card>
          </div>
        </section>

        <div className="flex justify-end gap-4 pt-4">
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}
