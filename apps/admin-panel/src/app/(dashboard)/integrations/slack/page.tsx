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
  Form,
  RHFSwitch,
  RHFInput
} from "@commercex/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  webhookUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  notifyOrders: z.boolean(),
  notifyRefunds: z.boolean(),
  notifyStock: z.boolean(),
});

export default function SlackIntegrationPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      webhookUrl: "",
      notifyOrders: true,
      notifyRefunds: true,
      notifyStock: false,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Updating Slack settings:", values);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Slack Notifications" 
        text="Send automated alerts and updates from your store directly to a Slack channel."
      />
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Slack Webhook Settings</CardTitle>
            <CardDescription>Configure where and what notifications are sent.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <RHFInput name="webhookUrl" label="Incoming Webhook URL" inputProps={{ placeholder: "https://hooks.slack.com/services/..." }} />
                
                <div className="space-y-4 pt-4 border-t">
                  <h4 className="text-sm font-medium">Events to Notify</h4>
                  <RHFSwitch name="notifyOrders" label="New Orders" description="Receive a message when a new order is placed." />
                  <RHFSwitch name="notifyRefunds" label="Refunds Processed" description="Receive a message when a refund is issued." />
                  <RHFSwitch name="notifyStock" label="Low Stock Alerts" description="Get notified when a product variant drops below its threshold." />
                </div>
                
                <div className="pt-4 border-t flex justify-between">
                  <Button type="button" variant="outline">Send Test Message</Button>
                  <Button type="submit">Save Configuration</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
