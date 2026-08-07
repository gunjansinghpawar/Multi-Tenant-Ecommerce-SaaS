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
  RHFInput,
  RHFSwitch
} from "@commercex/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  apiKey: z.string().min(1, "API Key is required"),
  apiSecret: z.string().min(1, "API Secret is required"),
  webhookUrl: z.string().url("Must be a valid URL"),
  isSandbox: z.boolean(),
  isActive: z.boolean(),
});

export default function ShiprocketPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiKey: "",
      apiSecret: "",
      webhookUrl: "https://yourdomain.com/api/webhooks/shiprocket",
      isSandbox: true,
      isActive: false,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Saving Shiprocket configuration:", values);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Shiprocket Integration" 
        text="Configure your Shiprocket API credentials and settings."
      />
      
      <Card>
        <CardHeader>
          <CardTitle>API Configuration</CardTitle>
          <CardDescription>Enter your Shiprocket API details to connect your store.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
              <RHFInput name="apiKey" label="API Key" />
              <RHFInput name="apiSecret" label="API Secret" inputProps={{ type: "password" }} />
              <RHFInput name="webhookUrl" label="Webhook URL" inputProps={{ readOnly: true }} />
              
              <div className="space-y-4 pt-2">
                <RHFSwitch name="isSandbox" label="Sandbox Mode" description="Enable sandbox mode to test integration without real tracking." />
                <RHFSwitch name="isActive" label="Enable Provider" description="Activate Shiprocket as a shipping option at checkout." />
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button type="submit">Save Configuration</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
