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
  enableInvoice: z.boolean(),
  templateId: z.string(),
  triggerEvent: z.string(),
});

export default function InvoicePage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      enableInvoice: true,
      templateId: "invoice_sent_v1",
      triggerEvent: "order_fulfilled",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Saving Invoice settings:", values);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Invoice Delivery" 
        text="Send PDF invoices to customers directly via WhatsApp."
      />
      
      <Card>
        <CardHeader>
          <CardTitle>Invoice Settings</CardTitle>
          <CardDescription>Configure when and how invoices are sent.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
              <RHFSwitch name="enableInvoice" label="Enable Auto-Invoicing via WA" description="Attach a PDF invoice to the message." />
              
              <RHFSelect 
                name="triggerEvent" 
                label="Trigger Event" 
                options={[
                  { label: "When Order is Paid", value: "order_paid" },
                  { label: "When Order is Fulfilled", value: "order_fulfilled" },
                ]} 
              />

              <RHFSelect 
                name="templateId" 
                label="Message Template" 
                options={[
                  { label: "invoice_sent_v1 (Requires Document header)", value: "invoice_sent_v1" },
                ]} 
              />
              
              <div className="pt-4 flex justify-end">
                <Button type="submit">Save Settings</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
