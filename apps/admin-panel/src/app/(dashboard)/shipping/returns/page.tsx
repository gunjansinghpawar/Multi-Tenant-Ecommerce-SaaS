"use client";

import React from "react";
import { 
  PageHeader, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  Button,
  Form,
  RHFInput,
  RHFSwitch,
  RHFSelect
} from "@commercex/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  allowReturns: z.boolean(),
  returnWindow: z.string().min(1, "Return window is required"),
  autoApprove: z.boolean(),
  returnShippingFee: z.string(),
  restockingFee: z.string(),
  returnProvider: z.string(),
});

export default function ReturnsConfigurationPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      allowReturns: true,
      returnWindow: "30",
      autoApprove: false,
      returnShippingFee: "0.00",
      restockingFee: "0.00",
      returnProvider: "shiprocket",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Saving Returns configuration:", values);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Returns Configuration" 
        text="Manage how customer returns and reverse logistics are handled."
      />
      
      <Card>
        <CardHeader>
          <CardTitle>Return Policy Settings</CardTitle>
          <CardDescription>Configure the base settings for your returns process.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
              <RHFSwitch name="allowReturns" label="Enable Customer Returns" description="Allow customers to initiate returns from their account dashboard." />
              
              <div className="grid grid-cols-2 gap-4">
                <RHFInput name="returnWindow" label="Return Window (Days)" inputProps={{ type: "number" }} />
              </div>
              
              <RHFSwitch name="autoApprove" label="Auto-Approve Returns" description="Automatically approve return requests that fall within the return window." />
              
              <div className="grid grid-cols-2 gap-4">
                <RHFInput name="returnShippingFee" label="Return Shipping Fee ($)" inputProps={{ type: "number", step: "0.01" }} />
                <RHFInput name="restockingFee" label="Restocking Fee ($)" inputProps={{ type: "number", step: "0.01" }} />
              </div>

              <RHFSelect 
                name="returnProvider" 
                label="Preferred Reverse Logistics Provider" 
                options={[
                  { label: "Shiprocket", value: "shiprocket" },
                  { label: "Delhivery", value: "delhivery" },
                  { label: "Customer's Responsibility", value: "manual" },
                ]} 
              />
              
              <div className="pt-4 flex justify-end">
                <Button type="submit">Save Settings</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
