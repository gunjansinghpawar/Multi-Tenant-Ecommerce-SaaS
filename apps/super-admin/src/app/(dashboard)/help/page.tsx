"use client";

import React from "react";
import { PageHeader, Card, CardHeader, CardTitle, CardDescription, CardContent, Button } from "@commercex/ui";
import { BookOpen, LifeBuoy, FileText, ArrowRight } from "lucide-react";

export default function HelpPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Help & Documentation" 
        text="Learn how to manage the platform and get support."
      />

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="hover:border-primary/50 transition-colors cursor-pointer group">
          <CardHeader>
            <div className="h-10 w-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <BookOpen className="h-5 w-5" />
            </div>
            <CardTitle>Platform Guide</CardTitle>
            <CardDescription>Comprehensive guide on managing tenants, stores, and infrastructure.</CardDescription>
          </CardHeader>
          <CardContent>
            <span className="text-sm font-medium text-primary flex items-center">
              Read Documentation <ArrowRight className="ml-1 h-4 w-4" />
            </span>
          </CardContent>
        </Card>

        <Card className="hover:border-primary/50 transition-colors cursor-pointer group">
          <CardHeader>
            <div className="h-10 w-10 bg-emerald-500/10 text-emerald-500 rounded-lg flex items-center justify-center mb-2 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
              <FileText className="h-5 w-5" />
            </div>
            <CardTitle>API Reference</CardTitle>
            <CardDescription>Technical documentation for integrating with the CommerceX API.</CardDescription>
          </CardHeader>
          <CardContent>
            <span className="text-sm font-medium text-emerald-600 flex items-center">
              View API Docs <ArrowRight className="ml-1 h-4 w-4" />
            </span>
          </CardContent>
        </Card>

        <Card className="hover:border-primary/50 transition-colors cursor-pointer group">
          <CardHeader>
            <div className="h-10 w-10 bg-blue-500/10 text-blue-500 rounded-lg flex items-center justify-center mb-2 group-hover:bg-blue-500 group-hover:text-white transition-colors">
              <LifeBuoy className="h-5 w-5" />
            </div>
            <CardTitle>Support Tickets</CardTitle>
            <CardDescription>Need technical assistance? Create a ticket for the engineering team.</CardDescription>
          </CardHeader>
          <CardContent>
            <span className="text-sm font-medium text-blue-600 flex items-center">
              Open Ticket <ArrowRight className="ml-1 h-4 w-4" />
            </span>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8 bg-primary/5 border-primary/20">
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <h3 className="font-semibold text-lg">System Outage?</h3>
            <p className="text-muted-foreground text-sm">Check the status page for real-time infrastructure updates.</p>
          </div>
          <Button variant="outline">View Status Page</Button>
        </CardContent>
      </Card>
    </div>
  );
}
