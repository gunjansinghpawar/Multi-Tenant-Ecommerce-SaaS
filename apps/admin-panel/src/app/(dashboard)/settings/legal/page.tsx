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
  Button
} from "@commercex/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  termsOfService: z.string(),
  refundPolicy: z.string(),
});

export default function LegalSettingsPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      termsOfService: "Enter your terms here...",
      refundPolicy: "Enter your refund policy here...",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Legal Pages" 
        text="Manage your store's legal policies."
      />
      
      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle>Store Policies</CardTitle>
          <CardDescription>These policies are linked in your footer and checkout.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Terms of Service</label>
                <textarea 
                  className="w-full min-h-[150px] p-3 rounded-md border bg-transparent text-sm" 
                  {...form.register("termsOfService")}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Refund Policy</label>
                <textarea 
                  className="w-full min-h-[150px] p-3 rounded-md border bg-transparent text-sm" 
                  {...form.register("refundPolicy")}
                />
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button type="submit">Save Policies</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
