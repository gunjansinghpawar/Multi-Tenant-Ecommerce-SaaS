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
  brandName: z.string(),
  slogan: z.string(),
  description: z.string(),
});

export default function BrandingPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brandName: "CommerceX",
      slogan: "Next Generation E-Commerce",
      description: "We sell the best products at the best prices.",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Branding" 
        text="Define your global brand identity across all channels."
      />
      
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Brand Basics</CardTitle>
          <CardDescription>Short text identifying your brand.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <RHFInput name="brandName" label="Brand Name" />
              <RHFInput name="slogan" label="Slogan / Tagline" />
              <RHFInput name="description" label="Short Description" />
              
              <div className="pt-4 flex justify-end">
                <Button type="submit">Save Branding</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
