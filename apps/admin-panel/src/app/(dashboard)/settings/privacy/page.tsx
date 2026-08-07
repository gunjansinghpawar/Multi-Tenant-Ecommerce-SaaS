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
  Button
} from "@commercex/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  cookieBanner: z.boolean(),
  gdprCompliance: z.boolean(),
});

export default function PrivacySettingsPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cookieBanner: true,
      gdprCompliance: true,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Privacy Settings" 
        text="Configure privacy rules and compliance settings for your store."
      />
      
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Data Privacy</CardTitle>
          <CardDescription>Manage how customer data is handled.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <RHFSwitch name="cookieBanner" label="Show Cookie Consent Banner" description="Display a cookie consent banner to visitors." />
              <RHFSwitch name="gdprCompliance" label="Enable GDPR Features" description="Enable features like 'Request Data' and 'Delete Account' for customers." />
              
              <div className="pt-4 flex justify-end">
                <Button type="submit">Save Privacy Settings</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
