"use client";

import React, { useState } from "react";
import { 
  PageHeader, 
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Form,
  RHFInput,
  RHFSelect
} from "@commercex/ui";
import { SendIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  audience: z.string().min(1, "Select an audience segment"),
  templateId: z.string().min(1, "Select a template"),
  schedule: z.string(),
});

export default function BroadcastPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { audience: "", templateId: "", schedule: "now" },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Sending Broadcast:", values);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Send Broadcast" 
        text="Send a bulk WhatsApp message to a specific customer segment."
      />

      <Card>
        <CardHeader>
          <CardTitle>Broadcast Details</CardTitle>
          <CardDescription>Select who to send to and what message template to use.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
              <RHFSelect 
                name="audience" 
                label="Target Audience" 
                options={[
                  { label: "All Customers (2,450)", value: "all" },
                  { label: "VIP Customers (320)", value: "vip" },
                  { label: "Inactive Customers (>90 days) (850)", value: "inactive" },
                ]} 
              />

              <RHFSelect 
                name="templateId" 
                label="Marketing Template" 
                options={[
                  { label: "summer_sale_promo_v2", value: "summer_sale" },
                  { label: "winback_discount", value: "winback" },
                ]} 
              />
              
              <RHFSelect 
                name="schedule" 
                label="When to send?" 
                options={[
                  { label: "Send Immediately", value: "now" },
                  { label: "Schedule for Later", value: "later" },
                ]} 
              />
              
              <div className="pt-4 flex justify-end">
                <Button type="submit">
                  <SendIcon className="mr-2 h-4 w-4" />
                  Send Broadcast
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
