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
  Badge
} from "@commercex/ui";
import { ShieldCheckIcon, SmartphoneIcon, KeyRoundIcon, AlertTriangleIcon } from "lucide-react";

export default function TwoFactorAuthPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Two-Factor Authentication (2FA)" 
        text="Add an extra layer of security to your account."
      />
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Authenticator App</CardTitle>
                <CardDescription>Use an app like Google Authenticator or Authy.</CardDescription>
              </div>
              <Badge variant="default" className="bg-emerald-500 hover:bg-emerald-600">Enabled</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 rounded-lg border p-4 bg-muted/50">
              <ShieldCheckIcon className="h-8 w-8 text-emerald-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">Status: Active</p>
                <p className="text-xs text-muted-foreground">Configured on iPhone 13 Pro</p>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Reconfigure</Button>
              <Button variant="destructive">Disable</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>SMS Authentication</CardTitle>
                <CardDescription>Receive a code via SMS when you log in.</CardDescription>
              </div>
              <Badge variant="secondary">Not Configured</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 rounded-lg border p-4 bg-muted/50">
              <SmartphoneIcon className="h-8 w-8 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium">Status: Inactive</p>
                <p className="text-xs text-muted-foreground">No phone number linked</p>
              </div>
            </div>
            <div className="flex justify-end">
              <Button variant="default">Setup SMS Auth</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <KeyRoundIcon className="h-5 w-5 text-primary" />
              <CardTitle>Recovery Codes</CardTitle>
            </div>
            <CardDescription>
              Recovery codes can be used to access your account in the event you lose access to your device and cannot receive two-factor authentication codes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-orange-200 bg-orange-50 p-4 dark:border-orange-900/50 dark:bg-orange-950/20 mb-4 flex gap-3">
              <AlertTriangleIcon className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
              <div className="text-sm text-orange-800 dark:text-orange-300">
                <p className="font-medium mb-1">Keep your recovery codes secure</p>
                <p>These codes are the only way to regain access to your account if you lose your authentication device. Do not share them with anyone.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Button variant="outline">View Recovery Codes</Button>
              <Button variant="secondary">Generate New Codes</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
