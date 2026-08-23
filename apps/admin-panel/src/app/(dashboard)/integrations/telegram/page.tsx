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

const formSchema = z.object({
  botToken: z.string().optional().or(z.literal("")),
  chatId: z.string().optional().or(z.literal("")),
  notifyOrders: z.boolean(),
});

export default function TelegramIntegrationPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      botToken: "",
      chatId: "",
      notifyOrders: false,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Updating Telegram settings:", values);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Telegram Bot Integration" 
        text="Receive notifications directly to a Telegram group or personal chat."
      />
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Bot Settings</CardTitle>
            <CardDescription>Enter your bot token from BotFather.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <RHFInput name="botToken" label="Bot Token" inputProps={{ placeholder: "e.g. 123456789:ABCdefGHIjklmNOPQrsTUVwxyZ" }} />
                <RHFInput name="chatId" label="Chat ID" inputProps={{ placeholder: "e.g. -100123456789" }} />
                
                <div className="space-y-4 pt-4 border-t">
                  <h4 className="text-sm font-medium">Events to Notify</h4>
                  <RHFSwitch name="notifyOrders" label="New Orders" description="Receive instant notifications for new orders." />
                </div>
                
                <div className="pt-4 border-t flex justify-between">
                  <Button type="button" variant="outline">Test Connection</Button>
                  <Button type="submit">Save Configuration</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
