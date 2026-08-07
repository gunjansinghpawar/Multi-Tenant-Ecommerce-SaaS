"use client";

import React from "react";
import { 
  PageHeader, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  Form,
  RHFSwitch,
  Button
} from "@commercex/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  orderConfirm: z.boolean(),
  shippingUpdate: z.boolean(),
  refundNotice: z.boolean(),
});

export default function NotificationsSettingsPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orderConfirm: true,
      shippingUpdate: true,
      refundNotice: true,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Customer Notifications" 
        text="Manage which transactional emails are sent to customers."
      />
      
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
          <CardDescription>Enable or disable automated system emails.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <RHFSwitch name="orderConfirm" label="Order Confirmation" description="Sent automatically after a successful purchase." />
              <RHFSwitch name="shippingUpdate" label="Shipping Updates" description="Sent when an order is fulfilled or tracking is added." />
              <RHFSwitch name="refundNotice" label="Refund Notification" description="Sent when a refund is processed." />
              
              <div className="pt-4 flex justify-end">
                <Button type="submit">Save Notifications</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
