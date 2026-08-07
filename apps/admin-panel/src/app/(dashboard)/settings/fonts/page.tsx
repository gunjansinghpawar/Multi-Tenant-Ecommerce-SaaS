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
  headingFont: z.string(),
  bodyFont: z.string(),
});

export default function FontsSettingsPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      headingFont: "Inter",
      bodyFont: "Inter",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Typography" 
        text="Manage the fonts used across your storefront."
      />
      
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Global Fonts</CardTitle>
          <CardDescription>Select from Google Fonts.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <RHFInput name="headingFont" label="Heading Font" description="Used for titles and large text." />
              <RHFInput name="bodyFont" label="Body Font" description="Used for paragraphs and general UI." />
              
              <div className="pt-4 flex justify-end">
                <Button type="submit">Save Typography</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
