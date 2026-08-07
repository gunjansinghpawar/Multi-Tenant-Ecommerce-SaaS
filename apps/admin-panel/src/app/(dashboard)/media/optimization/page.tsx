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
  autoCompress: z.boolean(),
  generateWebp: z.boolean(),
  preserveExif: z.boolean(),
});

export default function MediaOptimizationPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      autoCompress: true,
      generateWebp: true,
      preserveExif: false,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Media Optimization" 
        text="Configure automatic image compression and formatting to improve storefront load times."
      />
      
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Processing Rules</CardTitle>
          <CardDescription>These rules apply automatically when new images are uploaded.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <RHFSwitch 
                name="autoCompress" 
                label="Auto-Compress Images" 
                description="Losslessly compress PNG and JPG files by up to 40% without visible quality loss." 
              />
              <RHFSwitch 
                name="generateWebp" 
                label="Generate WebP Variants" 
                description="Automatically serve modern WebP formats to supported browsers for faster loading." 
              />
              <RHFSwitch 
                name="preserveExif" 
                label="Preserve EXIF Data" 
                description="Keep camera metadata (location, date) in uploaded files. (Usually turned off for privacy and size)." 
              />
              
              <div className="pt-4 border-t flex justify-end">
                <Button type="submit">Save Optimization Settings</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
