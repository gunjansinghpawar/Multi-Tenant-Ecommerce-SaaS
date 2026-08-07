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
  enableOrderConfirmation: z.boolean(),
  orderConfirmationTemplate: z.string(),
  enableShippingUpdate: z.boolean(),
  shippingUpdateTemplate: z.string(),
  enablePasswordReset: z.boolean(),
  passwordResetTemplate: z.string(),
});

export default function TransactionalEmailsPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      enableOrderConfirmation: true,
      orderConfirmationTemplate: "Order Confirmation",
      enableShippingUpdate: true,
      shippingUpdateTemplate: "Shipping Update",
      enablePasswordReset: true,
      passwordResetTemplate: "Password Reset",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Saving Transactional settings:", values);
  };

  const templates = [
    { label: "None", value: "" },
    { label: "Order Confirmation Template", value: "Order Confirmation" },
    { label: "Shipping Update Template", value: "Shipping Update" },
    { label: "Password Reset Template", value: "Password Reset" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Transactional Emails" 
        text="Map system events to the correct email templates."
      />
      
      <Card>
        <CardHeader>
          <CardTitle>Event Mapping</CardTitle>
          <CardDescription>Select which template to send when these events occur in your store.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-2xl">
              
              <div className="flex items-start space-x-6 border-b pb-4">
                <div className="w-56 pt-2">
                  <RHFSwitch name="enableOrderConfirmation" label="Order Placed" />
                </div>
                <div className="flex-1">
                  <RHFSelect name="orderConfirmationTemplate" label="Template to Send" options={templates} />
                </div>
              </div>

              <div className="flex items-start space-x-6 border-b pb-4">
                <div className="w-56 pt-2">
                  <RHFSwitch name="enableShippingUpdate" label="Order Shipped" />
                </div>
                <div className="flex-1">
                  <RHFSelect name="shippingUpdateTemplate" label="Template to Send" options={templates} />
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="w-56 pt-2">
                  <RHFSwitch name="enablePasswordReset" label="Password Reset Request" />
                </div>
                <div className="flex-1">
                  <RHFSelect name="passwordResetTemplate" label="Template to Send" options={templates} />
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button type="submit">Save Mappings</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
