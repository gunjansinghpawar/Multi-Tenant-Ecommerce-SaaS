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
  RHFInput,
  Button
} from "@commercex/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  invoicePrefix: z.string(),
  invoiceNotes: z.string(),
});

export default function InvoiceSettingsPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      invoicePrefix: "INV-",
      invoiceNotes: "Thank you for shopping with us!",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Invoice Settings" 
        text="Customize the appearance and content of customer invoices."
      />
      
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Invoice Template</CardTitle>
          <CardDescription>Configure numbering and footer notes.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <RHFInput name="invoicePrefix" label="Invoice Prefix" description="e.g. INV-1001" />
              <RHFInput name="invoiceNotes" label="Footer Notes" description="Text displayed at the bottom of the invoice." />
              
              <div className="pt-4 flex justify-end">
                <Button type="submit">Save Invoice Settings</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
