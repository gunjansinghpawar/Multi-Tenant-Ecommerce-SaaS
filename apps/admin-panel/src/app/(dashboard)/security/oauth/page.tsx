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
  Badge,
} from "@commercex/ui";
import { ExternalLinkIcon, ShieldAlertIcon } from "lucide-react";

export default function OAuthAppsPage() {
  const apps = [
    {
      id: "app_1",
      name: "Zapier",
      description: "Automate your workflows by connecting CommerceX to 5,000+ apps.",
      icon: "https://cdn.worldvectorlogo.com/logos/zapier-2.svg",
      authorizedAt: "Mar 15, 2023",
      permissions: ["Read Orders", "Read Customers", "Write Customers"],
    },
    {
      id: "app_2",
      name: "Mailchimp Integration",
      description: "Sync your customers and orders for targeted email campaigns.",
      icon: "https://cdn.worldvectorlogo.com/logos/mailchimp-freddie-icon.svg",
      authorizedAt: "Jul 22, 2023",
      permissions: ["Read Customers", "Read Products", "Read Orders"],
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Authorized OAuth Apps" 
        text="Manage third-party applications that have access to your account."
      />
      
      <div className="grid gap-6">
        {apps.map((app) => (
          <Card key={app.id}>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="h-16 w-16 rounded-xl border bg-white p-2 shadow-sm flex items-center justify-center">
                    <img src={app.icon} alt={app.name} className="h-full w-full object-contain" />
                  </div>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        {app.name}
                        <Badge variant="outline" className="font-normal text-xs">Connected</Badge>
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">{app.description}</p>
                    </div>
                    
                    <Button variant="outline" className="text-destructive hover:bg-destructive hover:text-destructive-foreground">
                      Revoke Access
                    </Button>
                  </div>
                  
                  <div className="rounded-lg bg-muted/50 p-4 space-y-3">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <ShieldAlertIcon className="h-4 w-4 text-muted-foreground" />
                      Permissions granted:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {app.permissions.map(perm => (
                        <Badge key={perm} variant="secondary" className="bg-background border">{perm}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    Authorized on {app.authorizedAt}
                    <span>&middot;</span>
                    <a href="#" className="flex items-center gap-1 hover:underline">
                      View details <ExternalLinkIcon className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {apps.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-12 text-center">
              <div className="rounded-full bg-muted p-4 mb-4">
                <ShieldAlertIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No Authorized Apps</h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                You haven't granted any third-party applications access to your CommerceX account.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
