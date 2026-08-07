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
  RHFSelect,
  RHFSwitch
} from "@commercex/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  enableOtp: z.boolean(),
  templateId: z.string().min(1, "Template is required"),
  otpLength: z.string(),
  expiryMins: z.string(),
  enableWhatsappFallback: z.boolean(),
});

export default function OTPAuthPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      enableOtp: true,
      templateId: "login_otp_v1",
      otpLength: "6",
      expiryMins: "5",
      enableWhatsappFallback: true,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Saving SMS OTP settings:", values);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="SMS OTP Settings" 
        text="Configure SMS-based one-time passwords for authentication."
      />
      
      <Card>
        <CardHeader>
          <CardTitle>Authentication Settings</CardTitle>
          <CardDescription>Manage how OTPs are generated and sent via SMS.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
              <RHFSwitch name="enableOtp" label="Enable SMS OTP Login" description="Provide this as an option on your storefront login page." />
              
              <RHFSelect 
                name="templateId" 
                label="OTP SMS Template" 
                options={[
                  { label: "Login OTP (Approved)", value: "login_otp_v1" },
                  { label: "Registration Code (Approved)", value: "reg_code_v1" },
                ]} 
              />
              
              <div className="grid grid-cols-2 gap-4">
                <RHFSelect 
                  name="otpLength" 
                  label="OTP Length" 
                  options={[
                    { label: "4 Digits", value: "4" },
                    { label: "6 Digits", value: "6" },
                  ]} 
                />
                <RHFInput name="expiryMins" label="Expiry (Minutes)" inputProps={{ type: "number" }} />
              </div>

              <div className="pt-2 border-t">
                <RHFSwitch name="enableWhatsappFallback" label="WhatsApp Fallback" description="If SMS fails, automatically attempt to send OTP via WhatsApp." />
              </div>
              
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
