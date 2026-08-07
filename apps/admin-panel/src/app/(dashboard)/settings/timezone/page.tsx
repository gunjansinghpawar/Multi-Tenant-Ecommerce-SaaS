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
  timezone: z.string(),
});

export default function TimezoneSettingsPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      timezone: "UTC",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Timezone Settings" 
        text="Set the store timezone used for orders, analytics, and scheduler."
      />
      
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Store Timezone</CardTitle>
          <CardDescription>This affects timestamps across the admin panel.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <RHFInput name="timezone" label="Timezone" />
              
              <div className="pt-4 flex justify-end">
                <Button type="submit">Save Timezone</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
