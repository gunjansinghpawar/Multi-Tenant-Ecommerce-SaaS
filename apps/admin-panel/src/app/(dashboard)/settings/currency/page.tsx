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
  baseCurrency: z.string(),
});

export default function CurrencySettingsPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      baseCurrency: "USD - US Dollar",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Currency Settings" 
        text="Manage the base currency used for pricing and reporting."
      />
      
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Base Currency</CardTitle>
          <CardDescription>This is the currency products are priced in.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <RHFInput name="baseCurrency" label="Currency" />
              
              <div className="pt-4 flex justify-end">
                <Button type="submit">Save Currency</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
