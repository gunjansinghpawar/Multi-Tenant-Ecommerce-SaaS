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
  storeName: z.string().min(2),
  contactEmail: z.string().email(),
  senderEmail: z.string().email(),
  industry: z.string(),
});

export default function SettingsGeneralPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      storeName: "CommerceX Store",
      contactEmail: "support@commercex.com",
      senderEmail: "noreply@commercex.com",
      industry: "Apparel & Fashion",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="General Settings" 
        text="View and update your core store details."
      />
      
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Store Details</CardTitle>
          <CardDescription>Your customers will see this information.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <RHFInput name="storeName" label="Store Name" />
              <div className="grid grid-cols-2 gap-4">
                <RHFInput name="contactEmail" label="Contact Email" description="Where customers can reach you." />
                <RHFInput name="senderEmail" label="Sender Email" description="Email used for automated receipts." />
              </div>
              <RHFInput name="industry" label="Store Industry" />
              
              <div className="pt-4 flex justify-end">
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
