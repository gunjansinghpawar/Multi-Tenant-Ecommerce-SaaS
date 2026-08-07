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
  pricesIncludeTax: z.boolean(),
  chargeTaxOnShipping: z.boolean(),
});

export default function TaxSettingsPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pricesIncludeTax: false,
      chargeTaxOnShipping: true,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Tax Settings" 
        text="Manage how taxes are calculated for your products and shipping."
      />
      
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Tax Calculations</CardTitle>
          <CardDescription>Determine how taxes are applied at checkout.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <RHFSwitch name="pricesIncludeTax" label="All prices include tax" description="If enabled, tax is already included in product prices (common in EU/UK)." />
              <RHFSwitch name="chargeTaxOnShipping" label="Charge tax on shipping rates" description="If enabled, standard tax rates apply to shipping fees." />
              
              <div className="pt-4 flex justify-end">
                <Button type="submit">Save Tax Settings</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
