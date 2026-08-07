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
  RHFSelect,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@commercex/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SmartphoneIcon } from "lucide-react";

const twilioSchema = z.object({
  accountSid: z.string().min(1, "Account SID is required"),
  authToken: z.string().min(1, "Auth Token is required"),
  senderId: z.string().min(1, "Sender ID / Number is required"),
  isActive: z.boolean(),
});

export default function ProvidersPage() {
  const form = useForm<z.infer<typeof twilioSchema>>({
    resolver: zodResolver(twilioSchema),
    defaultValues: {
      accountSid: "",
      authToken: "",
      senderId: "",
      isActive: true,
    },
  });

  const onSubmit = (values: z.infer<typeof twilioSchema>) => {
    console.log("Saving SMS Provider configuration:", values);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="SMS Providers" 
        text="Configure your SMS gateways for transactional and marketing messages."
      >
        <Button variant="outline">
          <SmartphoneIcon className="mr-2 h-4 w-4" />
          Test Connection
        </Button>
      </PageHeader>
      
      <Tabs defaultValue="twilio" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="twilio">Twilio</TabsTrigger>
          <TabsTrigger value="messagebird">MessageBird</TabsTrigger>
          <TabsTrigger value="sns">AWS SNS</TabsTrigger>
        </TabsList>
        
        <TabsContent value="twilio" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Twilio Configuration</CardTitle>
              <CardDescription>Enter your Twilio API credentials.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
                  <RHFInput name="accountSid" label="Account SID" />
                  <RHFInput name="authToken" label="Auth Token" inputProps={{ type: "password" }} />
                  <RHFInput name="senderId" label="Sender ID / From Number" description="Your Twilio phone number or alphanumeric Sender ID." />
                  
                  <div className="pt-2">
                    <RHFSwitch name="isActive" label="Set as Primary Provider" description="Use Twilio for all outbound SMS." />
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <Button type="submit">Save Configuration</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messagebird" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>MessageBird</CardTitle>
              <CardDescription>Integration coming soon.</CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
        
        <TabsContent value="sns" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>AWS SNS</CardTitle>
              <CardDescription>Integration coming soon.</CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
