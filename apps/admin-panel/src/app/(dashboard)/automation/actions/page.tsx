"use client";

import React from "react";
import { 
  PageHeader, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  Badge,
} from "@commercex/ui";
import { MailIcon, MessageSquareIcon, TagIcon, WebhookIcon, SmartphoneIcon } from "lucide-react";

export default function ActionsPage() {
  const actions = [
    { title: "Send Email", desc: "Send a templated email to the customer or staff.", icon: <MailIcon className="h-5 w-5" />, category: "Communication" },
    { title: "Send SMS", desc: "Send a text message via configured SMS provider.", icon: <SmartphoneIcon className="h-5 w-5" />, category: "Communication" },
    { title: "Send WhatsApp", desc: "Send a WhatsApp Business template message.", icon: <MessageSquareIcon className="h-5 w-5" />, category: "Communication" },
    { title: "Add Customer Tag", desc: "Append a tag to a customer profile.", icon: <TagIcon className="h-5 w-5" />, category: "Data Modification" },
    { title: "Remove Customer Tag", desc: "Remove a specific tag from a customer.", icon: <TagIcon className="h-5 w-5" />, category: "Data Modification" },
    { title: "Send HTTP Request", desc: "Trigger an external webhook or API call.", icon: <WebhookIcon className="h-5 w-5" />, category: "External" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Workflow Actions" 
        text="Discover the tasks that can be executed when a workflow is triggered."
      />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {actions.map((action, i) => (
          <Card key={i} className="hover:border-primary/50 transition-colors cursor-pointer group">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-muted rounded-md group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  {action.icon}
                </div>
                <Badge variant="outline" className="text-[10px]">{action.category}</Badge>
              </div>
              <CardTitle className="text-base mt-4">{action.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{action.desc}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
