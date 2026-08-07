"use client";

import React from "react";
import { PageHeader, Card, CardContent, CardHeader, CardTitle, CardDescription, Form, RHFSwitch, Button } from "@commercex/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BellRing } from "lucide-react";

const notificationSchema = z.object({
  emailAlerts: z.boolean(),
  systemAlerts: z.boolean(),
  newStoreAlerts: z.boolean(),
  billingAlerts: z.boolean(),
});

type NotificationValues = z.infer<typeof notificationSchema>;

export default function NotificationsSettingsPage() {
  const form = useForm<NotificationValues>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      emailAlerts: true,
      systemAlerts: true,
      newStoreAlerts: true,
      billingAlerts: false,
    },
  });

  const onSubmit = (data: NotificationValues) => {
    console.log("Saving notification settings:", data);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Platform Notifications" 
        text="Configure global alerts and notification rules for the platform."
      />

      <Card className="max-w-3xl">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <BellRing className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>Global Notification Preferences</CardTitle>
              <CardDescription>Select what events trigger emails to Super Admins.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <RHFSwitch
                  name="systemAlerts"
                  label="Critical System Alerts"
                  description="Receive immediate alerts for downtime, database failures, or high server load."
                />
                <RHFSwitch
                  name="newStoreAlerts"
                  label="New Store Provisions"
                  description="Get notified when a new tenant signs up or provisions a store."
                />
                <RHFSwitch
                  name="billingAlerts"
                  label="Billing & Subscription Events"
                  description="Failed payments or subscription changes across the platform."
                />
                <RHFSwitch
                  name="emailAlerts"
                  label="Marketing & Feature Updates"
                  description="Occasional emails regarding platform upgrades and new features."
                />
              </div>

              <div className="pt-4 flex justify-end">
                <Button type="submit">
                  Save Preferences
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
