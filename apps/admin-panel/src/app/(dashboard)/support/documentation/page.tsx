"use client";

import React from "react";
import { 
  PageHeader, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  Button
} from "@commercex/ui";
import { CodeIcon, TerminalIcon, WebhookIcon, ExternalLinkIcon } from "lucide-react";

export default function DocumentationPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Developer Documentation" 
        text="API references, SDKs, and integration guides for developers."
      />
      
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <div className="bg-slate-100 w-10 h-10 rounded-md flex items-center justify-center mb-4">
              <CodeIcon className="h-5 w-5 text-slate-800" />
            </div>
            <CardTitle>REST API</CardTitle>
            <CardDescription>Read the complete reference for our REST API.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full justify-between">
              View API Docs <ExternalLinkIcon className="h-4 w-4 text-muted-foreground" />
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="bg-indigo-100 w-10 h-10 rounded-md flex items-center justify-center mb-4">
              <TerminalIcon className="h-5 w-5 text-indigo-600" />
            </div>
            <CardTitle>GraphQL API</CardTitle>
            <CardDescription>Explore our GraphQL schema and run queries.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full justify-between">
              Open GraphiQL <ExternalLinkIcon className="h-4 w-4 text-muted-foreground" />
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="bg-orange-100 w-10 h-10 rounded-md flex items-center justify-center mb-4">
              <WebhookIcon className="h-5 w-5 text-orange-600" />
            </div>
            <CardTitle>Webhooks</CardTitle>
            <CardDescription>Learn how to subscribe to real-time store events.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full justify-between">
              Webhook Guide <ExternalLinkIcon className="h-4 w-4 text-muted-foreground" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
