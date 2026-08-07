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
import { GithubIcon } from "lucide-react";

export default function GitHubIntegrationPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="GitHub Integration" 
        text="Connect your GitHub account to manage headless storefront deployments."
      />
      
      <Card>
        <CardHeader>
          <CardTitle>GitHub Authentication</CardTitle>
          <CardDescription>Authorize CommerceX to access your repositories.</CardDescription>
        </CardHeader>
        <CardContent className="max-w-md">
          <div className="rounded-md border p-6 text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <GithubIcon className="h-6 w-6 text-slate-800" />
            </div>
            <h3 className="text-lg font-medium">Connect GitHub</h3>
            <p className="text-sm text-muted-foreground">
              By connecting GitHub, you can link your custom storefront repositories and trigger automatic deployments on changes.
            </p>
            <Button className="w-full mt-4 bg-slate-900 hover:bg-slate-800 text-white border-0">
              Authorize GitHub App
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
