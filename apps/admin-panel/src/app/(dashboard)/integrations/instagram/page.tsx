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
import { LinkIcon } from "lucide-react";

export default function InstagramIntegrationPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Instagram Integration" 
        text="Enable Instagram Shopping and showcase your posts on your storefront."
      />
      
      <Card>
        <CardHeader>
          <CardTitle>Instagram Business Account</CardTitle>
          <CardDescription>Connect your account to unlock Instagram features.</CardDescription>
        </CardHeader>
        <CardContent className="max-w-md">
          <div className="rounded-md border p-6 text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
              <LinkIcon className="h-6 w-6 text-pink-600" />
            </div>
            <h3 className="text-lg font-medium">Connect Instagram</h3>
            <p className="text-sm text-muted-foreground">
              By connecting your account, you can import your Instagram feed directly into your storefront's theme.
            </p>
            <Button className="w-full mt-4 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:opacity-90 text-white border-0">
              Authenticate with Instagram
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
