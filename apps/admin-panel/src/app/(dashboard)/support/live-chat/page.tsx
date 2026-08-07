"use client";

import React from "react";
import { 
  PageHeader, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  Button
} from "@commercex/ui";
import { MessageCircleIcon, HeadphonesIcon } from "lucide-react";

export default function LiveChatPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Live Chat" 
        text="Connect instantly with a support representative."
      />
      
      <Card className="max-w-2xl border-blue-100 bg-blue-50/30">
        <CardContent className="flex flex-col items-center justify-center p-12 text-center">
          <div className="bg-blue-100 p-4 rounded-full mb-4 relative">
            <MessageCircleIcon className="h-10 w-10 text-blue-600" />
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-emerald-500 border-2 border-white"></span>
          </div>
          <h3 className="text-xl font-semibold mb-2">We're online!</h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-sm">
            Our support agents are currently available to assist you. Typical response time is under 2 minutes.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
            <HeadphonesIcon className="mr-2 h-5 w-5" /> Start Chat
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
