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
  RHFSwitch,
  RHFInput,
  Button
} from "@commercex/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AlertTriangleIcon } from "lucide-react";

const formSchema = z.object({
  enableMaintenance: z.boolean(),
  password: z.string().optional(),
  message: z.string().optional(),
});

export default function MaintenanceSettingsPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      enableMaintenance: false,
      password: "",
      message: "We are currently updating our store. We'll be back soon!",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Maintenance Mode" 
        text="Temporarily hide your storefront from visitors."
      />
      
      <Card className="max-w-2xl border-orange-200">
        <CardHeader className="bg-orange-50/50">
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <AlertTriangleIcon className="h-5 w-5" /> Password Protection
          </CardTitle>
          <CardDescription>Only visitors with the password can access your store.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <RHFSwitch name="enableMaintenance" label="Enable Maintenance Mode" description="Visitors will see a holding page." />
              <RHFInput name="password" label="Storefront Password" description="Give this to people who need early access." />
              <RHFInput name="message" label="Message to Visitors" />
              
              <div className="pt-4 flex justify-end">
                <Button type="submit" variant="destructive">Save Maintenance Settings</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
