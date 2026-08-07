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
  RHFSwitch,
  RHFInput
} from "@commercex/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ExternalLinkIcon, LinkIcon } from "lucide-react";

const formSchema = z.object({
  pixelId: z.string().optional(),
  conversionApiToken: z.string().optional(),
  enablePixel: z.boolean(),
});

export default function FacebookIntegrationPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pixelId: "10928374656",
      conversionApiToken: "EAABwzLix...",
      enablePixel: true,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Updating Facebook settings:", values);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Facebook Integration" 
        text="Connect your Facebook Page and configure Meta Pixel."
      />
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Facebook Account</CardTitle>
              <CardDescription>Connect to your Business Manager.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 flex flex-col items-center justify-center py-6 text-center">
              <div className="rounded-full bg-blue-100 p-3 mb-2">
                <LinkIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Not Connected</h3>
                <p className="text-sm text-muted-foreground mt-1">Connect your account to sync products.</p>
              </div>
              <Button className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white">
                Connect Facebook
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Tracking Settings</CardTitle>
              <CardDescription>Configure Meta Pixel and Conversions API.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <RHFSwitch name="enablePixel" label="Enable Meta Pixel" description="Track page views, add to carts, and purchases." />
                  <RHFInput name="pixelId" label="Meta Pixel ID" placeholder="e.g. 1234567890" />
                  <RHFInput name="conversionApiToken" label="Conversions API Access Token" inputProps={{ type: "password" }} placeholder="Paste your CAPI token here" />
                  
                  <div className="pt-4 border-t flex justify-end">
                    <Button type="submit">Save Tracking Settings</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
