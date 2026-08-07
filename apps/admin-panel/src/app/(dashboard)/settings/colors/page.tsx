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
  primaryColor: z.string(),
  secondaryColor: z.string(),
});

export default function ColorsSettingsPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      primaryColor: "#000000",
      secondaryColor: "#ffffff",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Brand Colors" 
        text="Define the primary and secondary colors of your store theme."
      />
      
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Color Palette</CardTitle>
          <CardDescription>Use HEX codes for accurate representation.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex gap-4 items-center">
                <div className="h-10 w-10 rounded-md bg-black border"></div>
                <div className="flex-1">
                  <RHFInput name="primaryColor" label="Primary Color" />
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="h-10 w-10 rounded-md bg-white border"></div>
                <div className="flex-1">
                  <RHFInput name="secondaryColor" label="Secondary Color" />
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button type="submit">Save Colors</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
