"use client";

import React from "react";
import { 
  PageHeader, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  Input
} from "@commercex/ui";
import { SearchIcon, BookOpenIcon, MonitorIcon, CreditCardIcon, BoxIcon } from "lucide-react";

export default function KnowledgeBasePage() {
  const categories = [
    { title: "Getting Started", icon: <MonitorIcon className="h-6 w-6 text-blue-500" />, count: 12 },
    { title: "Products & Inventory", icon: <BoxIcon className="h-6 w-6 text-orange-500" />, count: 34 },
    { title: "Billing & Subscriptions", icon: <CreditCardIcon className="h-6 w-6 text-emerald-500" />, count: 8 },
    { title: "Store Management", icon: <BookOpenIcon className="h-6 w-6 text-purple-500" />, count: 45 },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Knowledge Base" 
        text="Find answers, tutorials, and guides to master CommerceX."
      />
      
      <Card className="bg-slate-900 text-white border-0">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-6">How can we help you?</h2>
          <div className="relative max-w-xl mx-auto text-foreground">
            <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Search for articles (e.g. 'how to add products')..." className="pl-10 h-12 text-base rounded-full" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, i) => (
          <Card key={i} className="hover:border-primary/50 transition-colors cursor-pointer group">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto bg-muted p-3 rounded-full mb-2 group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <CardTitle className="text-lg">{cat.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground">{cat.count} Articles</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
