"use client";

import React from "react";
import { 
  Card,
  Button
} from "@commercex/ui";

export default function LocalizationSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Localization</h3>
        <p className="text-sm text-muted-foreground">
          Configure regional settings, currencies, and languages.
        </p>
      </div>
      <div className="border-t border-border"></div>

      <div className="space-y-8">
        
        {/* Currency */}
        <section className="flex flex-col md:flex-row gap-6 md:gap-12">
          <div className="md:w-1/3">
            <h4 className="font-medium text-sm">Store Currency</h4>
            <p className="text-sm text-muted-foreground mt-1">The primary currency used for pricing and reporting.</p>
          </div>
          <div className="md:w-2/3">
            <Card className="p-4 space-y-4">
              <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background max-w-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                <option value="USD">USD ($) - US Dollar</option>
                <option value="EUR">EUR (€) - Euro</option>
                <option value="GBP">GBP (£) - British Pound</option>
                <option value="CAD">CAD ($) - Canadian Dollar</option>
              </select>
            </Card>
          </div>
        </section>

        <div className="border-t border-border"></div>

        {/* Timezone */}
        <section className="flex flex-col md:flex-row gap-6 md:gap-12">
          <div className="md:w-1/3">
            <h4 className="font-medium text-sm">Timezone</h4>
            <p className="text-sm text-muted-foreground mt-1">Used for order timestamps and scheduled events.</p>
          </div>
          <div className="md:w-2/3">
            <Card className="p-4 space-y-4">
              <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background max-w-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                <option value="America/New_York">(UTC-05:00) Eastern Time (US & Canada)</option>
                <option value="America/Chicago">(UTC-06:00) Central Time (US & Canada)</option>
                <option value="America/Denver">(UTC-07:00) Mountain Time (US & Canada)</option>
                <option value="America/Los_Angeles">(UTC-08:00) Pacific Time (US & Canada)</option>
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
