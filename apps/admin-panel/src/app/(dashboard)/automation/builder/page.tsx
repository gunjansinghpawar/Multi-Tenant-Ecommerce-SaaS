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
import { PlusIcon, PlayIcon, PauseIcon, SettingsIcon, GitMergeIcon } from "lucide-react";
import { EntityRowActions, EntityBulkActions } from "../../../../components/ui/entity-actions";

export default function WorkflowBuilderPage() {
  const workflows = [
    {
      id: "wf_1",
      name: "Abandoned Cart Recovery",
      description: "Sends an email 4 hours after cart abandonment.",
      status: "active",
      trigger: "Cart Abandoned",
      steps: 3,
      lastExecuted: "10 mins ago"
    },
    {
      id: "wf_2",
      name: "VIP Customer Tagging",
      description: "Automatically tags customers who spend over $500 as VIP.",
      status: "paused",
      trigger: "Order Paid",
      steps: 2,
      lastExecuted: "2 days ago"
    },
    {
      id: "wf_3",
      name: "Low Stock Alert Notification",
      description: "Sends a Slack message when inventory drops below 10.",
      status: "active",
      trigger: "Inventory Updated",
      steps: 2,
      lastExecuted: "1 hour ago"
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Workflow Builder" 
        text="Design, manage, and monitor your automated business processes."
      >
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Create Workflow
        </Button>
      </PageHeader>
      
      <Card>
        <CardHeader>
          <CardTitle>Active Workflows</CardTitle>
          <CardDescription>Manage your currently running automations.</CardDescription>
        </CardHeader>
        <CardContent>
          <EntityBulkActions selectedCount={0} />
          <div className="space-y-4">
            {workflows.map((wf) => (
              <div key={wf.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-primary/10 p-2 rounded-lg">
                    <GitMergeIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{wf.name}</h3>
                      {wf.status === 'active' ? (
                        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-emerald-200 text-[10px]">Active</Badge>
                      ) : (
                        <Badge variant="secondary" className="text-[10px]">Paused</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{wf.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                      <span className="flex items-center gap-1"><span className="font-medium text-foreground">Trigger:</span> {wf.trigger}</span>
                      <span className="flex items-center gap-1"><span className="font-medium text-foreground">Steps:</span> {wf.steps}</span>
                      <span className="flex items-center gap-1"><span className="font-medium text-foreground">Last Run:</span> {wf.lastExecuted}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 flex gap-2 self-start sm:self-center">
                  {wf.status === 'active' ? (
                    <Button variant="outline" size="sm" className="text-orange-600 hover:text-orange-700 hover:bg-orange-50">
                      <PauseIcon className="h-4 w-4 mr-1" /> Pause
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">
                      <PlayIcon className="h-4 w-4 mr-1" /> Resume
                    </Button>
                  )}
                  <EntityRowActions id={wf.id} entityName="Workflow" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
