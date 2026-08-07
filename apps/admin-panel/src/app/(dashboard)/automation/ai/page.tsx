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
  Badge
} from "@commercex/ui";
import { SparklesIcon, BotIcon } from "lucide-react";

export default function AIAutomationsPage() {
  const actions = [
    { title: "Smart Discount Generator", desc: "Generate dynamic discount codes based on customer LTV." },
    { title: "Review Sentiment Analysis", desc: "Automatically flag negative reviews for manual support intervention." },
    { title: "Product Recommendation Logic", desc: "Calculate the most likely next purchase for a customer." },
    { title: "Spam Order Detection", desc: "Use AI to evaluate order risk levels beyond standard fraud checks." }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="AI Actions" 
        text="Inject artificial intelligence directly into your workflows to make smart decisions."
      />
      
      <div className="grid gap-6 md:grid-cols-2">
        {actions.map((action, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <BotIcon className="h-6 w-6 text-indigo-500" />
                <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200">
                  <SparklesIcon className="mr-1 h-3 w-3" /> AI Powered
                </Badge>
              </div>
              <CardTitle className="text-base mt-4">{action.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">{action.desc}</CardDescription>
              <Button variant="outline" className="w-full text-xs">Configure AI Prompt</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
