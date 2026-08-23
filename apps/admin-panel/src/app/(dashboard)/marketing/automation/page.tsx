"use client";

import React from "react";
import { 
  PageHeader, 
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@commercex/ui";
import { 
  PlusIcon,
  PlayIcon,
  SettingsIcon,
  MousePointer2Icon
} from "lucide-react";

export default function AutomationWorkflowsPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Automation Workflows" 
        text="Build visual logic trees to automatically tag customers, send emails, and manage tasks."
      >
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Create Workflow
        </Button>
      </PageHeader>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Workflows (2)</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                <div className="p-4 bg-muted/30 border-l-2 border-primary cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-sm">VIP Customer Tagging</p>
                    <PlayIcon className="h-4 w-4 text-success fill-current" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Triggers when total spent &gt; $1k</p>
                </div>
                <div className="p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-sm">Post-Purchase Review Request</p>
                    <PlayIcon className="h-4 w-4 text-success fill-current" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Triggers 7 days after delivery</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {/* Visual Builder Mockup */}
          <Card className="h-[600px] flex flex-col relative overflow-hidden bg-[#fafafa] dark:bg-[#0a0a0a]">
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <Button variant="secondary" size="sm">Save Draft</Button>
              <Button size="sm">Publish Workflow</Button>
            </div>
            
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            <div className="relative z-10 flex-1 flex flex-col items-center pt-20 pb-10 space-y-8 overflow-y-auto">
              
              {/* Trigger Node */}
              <div className="bg-card border-2 border-primary shadow-sm rounded-lg p-4 w-64 text-center cursor-move hover:shadow-md transition-shadow">
                <div className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2">
                  <PlayIcon className="h-4 w-4" />
                </div>
                <p className="font-medium text-sm">Order Paid</p>
                <p className="text-xs text-muted-foreground mt-1">Trigger</p>
              </div>

              <div className="w-0.5 h-8 bg-muted-foreground/30"></div>

              {/* Condition Node */}
              <div className="bg-card border shadow-sm rounded-lg p-4 w-64 text-center cursor-move hover:shadow-md transition-shadow">
                <div className="bg-warning/10 text-warning w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2">
                  <SettingsIcon className="h-4 w-4" />
                </div>
                <p className="font-medium text-sm">Customer total spent &gt; $1000</p>
                <p className="text-xs text-muted-foreground mt-1">Condition</p>
              </div>

              <div className="flex gap-32">
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-8 bg-muted-foreground/30"></div>
                  <span className="bg-background px-2 text-xs font-medium border rounded-full text-success absolute mt-2 ml-12">True</span>
                  
                  {/* Action Node (True) */}
                  <div className="bg-card border shadow-sm rounded-lg p-4 w-64 text-center cursor-move hover:shadow-md transition-shadow mt-8">
                    <div className="bg-success/10 text-success w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2">
                      <PlusIcon className="h-4 w-4" />
                    </div>
                    <p className="font-medium text-sm">Add tag: "VIP"</p>
                    <p className="text-xs text-muted-foreground mt-1">Action</p>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-8 bg-muted-foreground/30"></div>
                  <span className="bg-background px-2 text-xs font-medium border rounded-full text-destructive absolute mt-2 -ml-12">False</span>
                  
                  {/* Action Node (False) */}
                  <div className="bg-card border border-dashed shadow-sm rounded-lg p-4 w-64 text-center cursor-pointer hover:bg-muted/50 transition-colors mt-8 flex flex-col items-center justify-center opacity-70">
                    <MousePointer2Icon className="h-6 w-6 text-muted-foreground mb-2" />
                    <p className="text-sm font-medium text-muted-foreground">Add Step</p>
                  </div>
                </div>
              </div>

            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
