"use client";

import React from "react";
import { 
  PageHeader, 
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
} from "@commercex/ui";
import { 
  LandmarkIcon,
  GlobeIcon,
  PlusIcon,
  Settings2Icon
} from "lucide-react";

export default function TaxesPage() {
  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <PageHeader 
          heading="Taxes & Duties" 
          text="Manage regional tax rates, GST/VAT configurations, and tax overrides."
        />
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Tax Zone
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        
        {/* Settings Column */}
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center">
                <Settings2Icon className="mr-2 h-5 w-5 text-muted-foreground" />
                Global Tax Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">All prices include tax</label>
                  <p className="text-xs text-muted-foreground">Useful for B2C stores.</p>
                </div>
                <div className="w-10 h-5 bg-primary rounded-full relative cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Charge tax on shipping</label>
                  <p className="text-xs text-muted-foreground">Applies local rate to freight.</p>
                </div>
                <div className="w-10 h-5 bg-muted border rounded-full relative cursor-pointer">
                  <div className="w-4 h-4 bg-muted-foreground rounded-full absolute left-0.5 top-0.5"></div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <label className="text-sm font-medium">Store Tax ID (GSTIN/VAT)</label>
                <input type="text" defaultValue="GSTIN29ABCDE1234F1Z5" className="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm font-mono shadow-sm" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tax Zones Column */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-lg font-semibold">Active Tax Zones</h3>
          
          <Card>
            <CardHeader className="pb-3 border-b flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <LandmarkIcon className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">India (Base Region)</CardTitle>
              </div>
              <Badge variant="outline">Default</Badge>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="font-medium">GST Configuration</p>
                  <p className="text-sm text-muted-foreground">Automatically splits into CGST/SGST (intra-state) or IGST (inter-state).</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">18.0%</p>
                  <p className="text-xs text-muted-foreground">Standard Rate</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">Manage Product Overrides</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3 border-b flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <GlobeIcon className="h-5 w-5 text-blue-500" />
                <CardTitle className="text-base">United States</CardTitle>
              </div>
              <Badge variant="secondary">Active</Badge>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="font-medium">State-Level Sales Tax</p>
                  <p className="text-sm text-muted-foreground">Collecting in California and New York based on physical nexus.</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">7.25% - 8.87%</p>
                  <p className="text-xs text-muted-foreground">Calculated at checkout</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">Manage State Registrations</Button>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
