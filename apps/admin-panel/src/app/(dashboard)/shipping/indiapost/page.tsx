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
  customerId: z.string().min(1, "Customer ID is required"),
  apiKey: z.string().min(1, "API Key is required"),
  isActive: z.boolean(),
});

export default function IndiaPostPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerId: "",
      apiKey: "",
      isActive: false,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Saving India Post configuration:", values);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="India Post Integration" 
        text="Configure your India Post credentials and settings."
      />
      
      <Card>
        <CardHeader>
          <CardTitle>API Configuration</CardTitle>
          <CardDescription>Enter your India Post details to connect your store.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
              <RHFInput name="customerId" label="Customer ID" />
              <RHFInput name="apiKey" label="API Key" inputProps={{ type: "password" }} />
              
              <div className="space-y-4 pt-2">
                <RHFSwitch name="isActive" label="Enable Provider" description="Activate India Post as a shipping option at checkout." />
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
