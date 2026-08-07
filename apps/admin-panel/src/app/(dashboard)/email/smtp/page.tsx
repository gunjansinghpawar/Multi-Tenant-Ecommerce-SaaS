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
import { MailIcon } from "lucide-react";

const formSchema = z.object({
  host: z.string().min(1, "SMTP Host is required"),
  port: z.string().min(1, "Port is required"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  encryption: z.string(),
  fromEmail: z.string().email("Valid email required"),
  fromName: z.string().min(1, "Sender name required"),
  isActive: z.boolean(),
});

export default function SMTPPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      host: "",
      port: "587",
      username: "",
      password: "",
      encryption: "TLS",
      fromEmail: "noreply@yourdomain.com",
      fromName: "Your Store",
      isActive: false,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Saving SMTP configuration:", values);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="SMTP Configuration" 
        text="Connect your own SMTP server for sending emails."
      >
        <Button variant="outline">
          <MailIcon className="mr-2 h-4 w-4" />
          Test Connection
        </Button>
      </PageHeader>
      
      <Card>
        <CardHeader>
          <CardTitle>Server Details</CardTitle>
          <CardDescription>Enter your mail server credentials.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <RHFInput name="host" label="SMTP Host" inputProps={{ placeholder: "smtp.example.com" }} />
                </div>
                <RHFInput name="port" label="Port" inputProps={{ type: "number" }} />
              </div>
              
              <RHFSelect 
                name="encryption" 
                label="Encryption Method" 
                options={[
                  { label: "TLS", value: "TLS" },
                  { label: "SSL", value: "SSL" },
                  { label: "None", value: "None" },
                ]} 
              />
              
              <div className="grid grid-cols-2 gap-4">
                <RHFInput name="username" label="Username / Email" />
                <RHFInput name="password" label="Password" inputProps={{ type: "password" }} />
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <RHFInput name="fromName" label="Default Sender Name" />
                <RHFInput name="fromEmail" label="Default Sender Email" />
              </div>
              
              <div className="pt-2">
                <RHFSwitch name="isActive" label="Set as Primary Provider" description="Use this SMTP server for all outbound emails." />
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
