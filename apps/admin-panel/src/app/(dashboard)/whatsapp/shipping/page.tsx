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
  RHFSelect,
  RHFSwitch
} from "@commercex/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  enableShipped: z.boolean(),
  shippedTemplate: z.string(),
  enableOutForDelivery: z.boolean(),
  outForDeliveryTemplate: z.string(),
  enableDelivered: z.boolean(),
  deliveredTemplate: z.string(),
});

export default function ShippingUpdatesPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      enableShipped: true,
      shippedTemplate: "order_shipped_v1",
      enableOutForDelivery: false,
      outForDeliveryTemplate: "",
      enableDelivered: true,
      deliveredTemplate: "order_delivered_v1",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Saving Shipping Updates settings:", values);
  };

  const templates = [
    { label: "None", value: "" },
    { label: "order_shipped_v1", value: "order_shipped_v1" },
    { label: "out_for_delivery_v1", value: "out_for_delivery_v1" },
    { label: "order_delivered_v1", value: "order_delivered_v1" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Shipping Updates" 
        text="Automatically send logistics and tracking updates via WhatsApp."
      />
      
      <Card>
        <CardHeader>
          <CardTitle>Map Shipping Events</CardTitle>
          <CardDescription>Select which approved templates should be triggered for logistics events.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-2xl">
              
              <div className="flex items-start space-x-6 border-b pb-4">
                <div className="w-48 pt-2">
                  <RHFSwitch name="enableShipped" label="Order Shipped" />
                </div>
                <div className="flex-1">
                  <RHFSelect name="shippedTemplate" label="Message Template" options={templates} />
                </div>
              </div>

              <div className="flex items-start space-x-6 border-b pb-4">
                <div className="w-48 pt-2">
                  <RHFSwitch name="enableOutForDelivery" label="Out for Delivery" />
                </div>
                <div className="flex-1">
                  <RHFSelect name="outForDeliveryTemplate" label="Message Template" options={templates} />
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="w-48 pt-2">
                  <RHFSwitch name="enableDelivered" label="Order Delivered" />
                </div>
                <div className="flex-1">
                  <RHFSelect name="deliveredTemplate" label="Message Template" options={templates} />
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button type="submit">Save Configurations</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
