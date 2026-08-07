"use client";

import React from "react";
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

export default function MarketingPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { audience: "", templateId: "", schedule: "now" },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Sending SMS Broadcast:", values);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="SMS Marketing" 
        text="Send bulk promotional SMS to your customer segments."
      />

      <Card>
        <CardHeader>
          <CardTitle>Broadcast Details</CardTitle>
          <CardDescription>Select who to send to and what SMS template to use. Note: Carrier fees apply.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
              <RHFSelect 
                name="audience" 
                label="Target Audience" 
                options={[
                  { label: "All Opt-In Customers (1,250)", value: "all" },
                  { label: "VIP Customers (120)", value: "vip" },
                  { label: "Local Region (450)", value: "local" },
                ]} 
              />

              <RHFSelect 
                name="templateId" 
                label="Marketing Template (DLT Approved)" 
                options={[
                  { label: "Weekend Promo (DLT-555)", value: "promo_1" },
                  { label: "Flash Sale Alert (DLT-888)", value: "flash_sale" },
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
                  Send SMS Broadcast
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
