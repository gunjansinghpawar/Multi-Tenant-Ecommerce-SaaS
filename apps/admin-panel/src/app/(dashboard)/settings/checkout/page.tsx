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
  requirePhone: z.boolean(),
  requireAccount: z.boolean(),
});

export default function CheckoutSettingsPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      requirePhone: true,
      requireAccount: false,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Checkout Settings" 
        text="Configure rules and required fields for the checkout process."
      />
      
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Checkout Rules</CardTitle>
          <CardDescription>Determine what customers must provide to checkout.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <RHFSwitch name="requirePhone" label="Require Phone Number" description="Make phone number mandatory for shipping updates." />
              <RHFSwitch name="requireAccount" label="Require Customer Account" description="Customers must log in to complete checkout." />
              
              <div className="pt-4 flex justify-end">
                <Button type="submit">Save Checkout Rules</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
