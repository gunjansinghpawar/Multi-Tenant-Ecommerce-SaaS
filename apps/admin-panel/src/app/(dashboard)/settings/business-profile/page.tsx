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
  legalName: z.string(),
  phone: z.string(),
  address: z.string(),
  city: z.string(),
  country: z.string(),
  postalCode: z.string(),
});

export default function BusinessProfilePage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      legalName: "CommerceX Inc.",
      phone: "+1 (555) 123-4567",
      address: "123 Market St",
      city: "San Francisco",
      country: "United States",
      postalCode: "94105",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Business Profile" 
        text="Manage your legal entity and physical location details."
      />
      
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Business Address</CardTitle>
          <CardDescription>This address appears on invoices and shipping labels.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <RHFInput name="legalName" label="Legal Business Name" />
              <RHFInput name="phone" label="Phone Number" />
              <RHFInput name="address" label="Street Address" />
              
              <div className="grid grid-cols-2 gap-4">
                <RHFInput name="city" label="City" />
                <RHFInput name="country" label="Country" />
              </div>
              <RHFInput name="postalCode" label="ZIP / Postal Code" />
              
              <div className="pt-4 flex justify-end">
                <Button type="submit">Save Profile</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
