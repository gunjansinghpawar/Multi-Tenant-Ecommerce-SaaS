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
  loginId: z.string().min(1, "Login ID is required"),
  licenseKey: z.string().min(1, "License Key is required"),
  profileCode: z.string().min(1, "Profile Code is required"),
  isActive: z.boolean(),
});

export default function BlueDartPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      loginId: "",
      licenseKey: "",
      profileCode: "",
      isActive: false,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Saving Blue Dart configuration:", values);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Blue Dart Integration" 
        text="Configure your Blue Dart API credentials and settings."
      />
      
      <Card>
        <CardHeader>
          <CardTitle>API Configuration</CardTitle>
          <CardDescription>Enter your Blue Dart API details to connect your store.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
              <RHFInput name="loginId" label="Login ID" />
              <RHFInput name="licenseKey" label="License Key" inputProps={{ type: "password" }} />
              <RHFInput name="profileCode" label="Profile Code" />
              
              <div className="space-y-4 pt-2">
                <RHFSwitch name="isActive" label="Enable Provider" description="Activate Blue Dart as a shipping option at checkout." />
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
