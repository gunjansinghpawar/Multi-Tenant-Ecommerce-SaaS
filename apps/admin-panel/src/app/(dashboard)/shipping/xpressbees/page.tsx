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
  xbKey: z.string().min(1, "XB Key is required"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  isActive: z.boolean(),
});

export default function XpressbeesPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      xbKey: "",
      username: "",
      password: "",
      isActive: false,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Saving Xpressbees configuration:", values);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Xpressbees Integration" 
        text="Configure your Xpressbees API credentials and settings."
      />
      
      <Card>
        <CardHeader>
          <CardTitle>API Configuration</CardTitle>
          <CardDescription>Enter your Xpressbees API details to connect your store.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
              <RHFInput name="xbKey" label="XB Key" />
              <RHFInput name="username" label="Username" />
              <RHFInput name="password" label="Password" inputProps={{ type: "password" }} />
              
              <div className="space-y-4 pt-2">
                <RHFSwitch name="isActive" label="Enable Provider" description="Activate Xpressbees as a shipping option at checkout." />
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
