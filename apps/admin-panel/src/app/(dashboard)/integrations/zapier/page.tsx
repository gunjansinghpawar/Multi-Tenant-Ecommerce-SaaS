"use client";

import React from "react";
import { 
  PageHeader, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  Button,
} from "@commercex/ui";
import { ExternalLinkIcon } from "lucide-react";

export default function ZapierIntegrationPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Zapier Integration" 
        text="Connect CommerceX to 5,000+ apps using Zapier workflows."
      />
      
      <Card>
        <CardHeader>
          <CardTitle>Automate Your Workflows</CardTitle>
          <CardDescription>No coding required to build powerful automations.</CardDescription>
        </CardHeader>
        <CardContent className="max-w-md">
          <div className="rounded-md border p-6 text-center space-y-4">
            <div className="mx-auto w-12 h-12 flex items-center justify-center mb-4">
              <img src="https://cdn.worldvectorlogo.com/logos/zapier-2.svg" alt="Zapier" className="w-12 h-12" />
            </div>
            <h3 className="text-lg font-medium">Connect Zapier</h3>
            <p className="text-sm text-muted-foreground">
              Our Zapier app is currently in beta. You can use it to create contacts in your CRM, update Google Sheets, and much more.
            </p>
            <Button className="w-full mt-4 bg-[#FF4A00] hover:bg-[#E54300] text-white border-0">
              Get Invite Link <ExternalLinkIcon className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
