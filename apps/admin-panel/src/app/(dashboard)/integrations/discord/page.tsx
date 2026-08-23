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
  notifySupport: z.boolean(),
});

export default function DiscordIntegrationPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      webhookUrl: "",
      notifyOrders: false,
      notifySupport: false,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Updating Discord settings:", values);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Discord Notifications" 
        text="Send automated alerts from your store to a Discord channel."
      />
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Discord Webhook Settings</CardTitle>
            <CardDescription>Configure your channel integration.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <RHFInput name="webhookUrl" label="Discord Webhook URL" inputProps={{ placeholder: "https://discord.com/api/webhooks/..." }} />
                
                <div className="space-y-4 pt-4 border-t">
                  <h4 className="text-sm font-medium">Events to Notify</h4>
                  <RHFSwitch name="notifyOrders" label="New Orders" description="Post a rich embed message when a new order is placed." />
                  <RHFSwitch name="notifySupport" label="New Support Tickets" description="Notify staff when a customer opens a ticket." />
                </div>
                
                <div className="pt-4 border-t flex justify-between">
                  <Button type="button" variant="outline">Send Test Embed</Button>
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
