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
  Form,
  RHFSwitch
} from "@commercex/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ExternalLinkIcon, CheckCircle2Icon } from "lucide-react";

const formSchema = z.object({
  syncProducts: z.boolean(),
  syncOrders: z.boolean(),
  trackConversions: z.boolean(),
});

export default function GoogleIntegrationPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      syncProducts: true,
      syncOrders: false,
      trackConversions: true,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Updating Google settings:", values);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Google Integration" 
        text="Connect your store to Google Merchant Center and Google Ads."
      >
        <Button variant="outline">
          View Documentation <ExternalLinkIcon className="ml-2 h-4 w-4" />
        </Button>
      </PageHeader>
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Connection Status</CardTitle>
              <CardDescription>Link your Google Account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 flex flex-col items-center justify-center py-6 text-center">
              <div className="rounded-full bg-emerald-100 p-3 mb-2">
                <CheckCircle2Icon className="h-8 w-8 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-medium">Connected</h3>
                <p className="text-sm text-muted-foreground mt-1">hello@commercex.com</p>
              </div>
              <Button variant="outline" className="w-full mt-2 text-destructive hover:text-destructive hover:bg-destructive/10">
                Disconnect Account
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Sync Settings</CardTitle>
              <CardDescription>Configure what data is shared with Google.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <RHFSwitch name="syncProducts" label="Product Feed Sync" description="Automatically sync your products to Google Merchant Center daily." />
                    <RHFSwitch name="syncOrders" label="Order Sync" description="Send order data to Google for enhanced conversion tracking." />
                    <RHFSwitch name="trackConversions" label="Google Analytics 4 Tracking" description="Enable native GA4 e-commerce events on your storefront." />
                  </div>
                  
                  <div className="pt-4 border-t flex justify-end">
                    <Button type="submit">Save Settings</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
