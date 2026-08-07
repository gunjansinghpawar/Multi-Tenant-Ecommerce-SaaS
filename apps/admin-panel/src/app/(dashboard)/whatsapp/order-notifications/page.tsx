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
  enableOrderCreated: z.boolean(),
  orderCreatedTemplate: z.string(),
  enableOrderPaid: z.boolean(),
  orderPaidTemplate: z.string(),
  enableOrderCancelled: z.boolean(),
  orderCancelledTemplate: z.string(),
});

export default function OrderNotificationsPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      enableOrderCreated: true,
      orderCreatedTemplate: "order_placed_v1",
      enableOrderPaid: true,
      orderPaidTemplate: "payment_success_v1",
      enableOrderCancelled: false,
      orderCancelledTemplate: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Saving Order Notifications settings:", values);
  };

  const templates = [
    { label: "None", value: "" },
    { label: "order_placed_v1", value: "order_placed_v1" },
    { label: "payment_success_v1", value: "payment_success_v1" },
    { label: "order_cancelled_v1", value: "order_cancelled_v1" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Order Notifications" 
        text="Automatically send order status updates via WhatsApp."
      />
      
      <Card>
        <CardHeader>
          <CardTitle>Map Order Events</CardTitle>
          <CardDescription>Select which approved templates should be triggered for order events.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-2xl">
              
              <div className="flex items-start space-x-6 border-b pb-4">
                <div className="w-48 pt-2">
                  <RHFSwitch name="enableOrderCreated" label="Order Created" />
                </div>
                <div className="flex-1">
                  <RHFSelect name="orderCreatedTemplate" label="Message Template" options={templates} />
                </div>
              </div>

              <div className="flex items-start space-x-6 border-b pb-4">
                <div className="w-48 pt-2">
                  <RHFSwitch name="enableOrderPaid" label="Payment Received" />
                </div>
                <div className="flex-1">
                  <RHFSelect name="orderPaidTemplate" label="Message Template" options={templates} />
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="w-48 pt-2">
                  <RHFSwitch name="enableOrderCancelled" label="Order Cancelled" />
                </div>
                <div className="flex-1">
                  <RHFSelect name="orderCancelledTemplate" label="Message Template" options={templates} />
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
