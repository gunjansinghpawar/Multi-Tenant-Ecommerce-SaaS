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
  RHFSwitch
} from "@commercex/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MessageCircleIcon } from "lucide-react";

const formSchema = z.object({
  phoneNumberId: z.string().min(1, "Phone Number ID is required"),
  wabaId: z.string().min(1, "WhatsApp Business Account ID is required"),
  accessToken: z.string().min(1, "Access Token is required"),
  webhookUrl: z.string().url("Must be a valid URL"),
  verifyToken: z.string().min(1, "Verify Token is required"),
  isActive: z.boolean(),
});

export default function ConnectAPIPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumberId: "",
      wabaId: "",
      accessToken: "",
      webhookUrl: "https://yourdomain.com/api/webhooks/whatsapp",
      verifyToken: "random_secure_token",
      isActive: false,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Saving API configuration:", values);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Connect WhatsApp API" 
        text="Link your WhatsApp Business Account (WABA) to the platform."
      >
        <Button variant="outline">
          <MessageCircleIcon className="mr-2 h-4 w-4" />
          Test Connection
        </Button>
      </PageHeader>
      
      <Card>
        <CardHeader>
          <CardTitle>Meta App Configuration</CardTitle>
          <CardDescription>Enter the credentials from your Meta Developer Dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
              <RHFInput name="phoneNumberId" label="Phone Number ID" />
              <RHFInput name="wabaId" label="WhatsApp Business Account ID" />
              <RHFInput name="accessToken" label="Permanent Access Token" inputProps={{ type: "password" }} />
              
              <div className="p-4 bg-muted/50 rounded-lg space-y-4">
                <h4 className="text-sm font-semibold">Webhook Configuration</h4>
                <RHFInput name="webhookUrl" label="Callback URL" inputProps={{ readOnly: true }} />
                <RHFInput name="verifyToken" label="Verify Token" />
              </div>
              
              <div className="pt-2">
                <RHFSwitch name="isActive" label="Enable WhatsApp Integration" description="Start processing messages via WhatsApp." />
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button type="submit">Save Configuration</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
