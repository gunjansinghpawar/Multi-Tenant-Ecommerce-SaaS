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
  clientId: z.string().min(1, "Client ID is required"),
  token: z.string().min(1, "Token is required"),
  isSandbox: z.boolean(),
  isActive: z.boolean(),
});

export default function DelhiveryPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientId: "",
      token: "",
      isSandbox: true,
      isActive: false,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Saving Delhivery configuration:", values);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Delhivery Integration" 
        text="Configure your Delhivery API credentials and settings."
      />
      
      <Card>
        <CardHeader>
          <CardTitle>API Configuration</CardTitle>
          <CardDescription>Enter your Delhivery API details to connect your store.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
              <RHFInput name="clientId" label="Client ID" />
              <RHFInput name="token" label="API Token" inputProps={{ type: "password" }} />
              
              <div className="space-y-4 pt-2">
                <RHFSwitch name="isSandbox" label="Sandbox Mode" description="Enable sandbox mode to test integration without real tracking." />
                <RHFSwitch name="isActive" label="Enable Provider" description="Activate Delhivery as a shipping option at checkout." />
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
