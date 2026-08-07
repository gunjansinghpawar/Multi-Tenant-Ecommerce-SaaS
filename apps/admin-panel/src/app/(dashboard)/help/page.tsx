"use client";

import React from "react";
import { PageHeader, Card, CardHeader, CardTitle, CardDescription, CardContent, Button } from "@commercex/ui";
import { Search, MessageSquare, PlayCircle, Book, ArrowRight } from "lucide-react";

export default function TenantHelpPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Help Center" 
        text="Find answers, watch tutorials, or contact support."
      />

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-6 flex flex-col items-center justify-center space-y-4">
           <div className="text-center space-y-2">
             <h3 className="text-xl font-bold">How can we help you today?</h3>
             <p className="text-muted-foreground max-w-md mx-auto">Search our knowledge base for quick answers to common questions about managing your store.</p>
           </div>
           <div className="w-full max-w-md relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search for articles..." 
                className="w-full h-10 pl-10 pr-4 rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
           </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="hover:border-primary/50 transition-colors cursor-pointer group">
          <CardHeader>
            <div className="h-10 w-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Book className="h-5 w-5" />
            </div>
            <CardTitle>Merchant Guide</CardTitle>
            <CardDescription>Everything you need to know about setting up products and orders.</CardDescription>
          </CardHeader>
          <CardContent>
            <span className="text-sm font-medium text-primary flex items-center">
              Browse Articles <ArrowRight className="ml-1 h-4 w-4" />
            </span>
          </CardContent>
        </Card>

        <Card className="hover:border-primary/50 transition-colors cursor-pointer group">
          <CardHeader>
            <div className="h-10 w-10 bg-purple-500/10 text-purple-500 rounded-lg flex items-center justify-center mb-2 group-hover:bg-purple-500 group-hover:text-white transition-colors">
              <PlayCircle className="h-5 w-5" />
            </div>
            <CardTitle>Video Tutorials</CardTitle>
            <CardDescription>Step-by-step visual guides on using the CommerceX dashboard.</CardDescription>
          </CardHeader>
          <CardContent>
            <span className="text-sm font-medium text-purple-600 flex items-center">
              Watch Videos <ArrowRight className="ml-1 h-4 w-4" />
            </span>
          </CardContent>
        </Card>

        <Card className="hover:border-primary/50 transition-colors cursor-pointer group">
          <CardHeader>
            <div className="h-10 w-10 bg-blue-500/10 text-blue-500 rounded-lg flex items-center justify-center mb-2 group-hover:bg-blue-500 group-hover:text-white transition-colors">
              <MessageSquare className="h-5 w-5" />
            </div>
            <CardTitle>Contact Support</CardTitle>
            <CardDescription>Can't find what you need? Reach out to our merchant success team.</CardDescription>
          </CardHeader>
          <CardContent>
            <span className="text-sm font-medium text-blue-600 flex items-center">
              Start Chat <ArrowRight className="ml-1 h-4 w-4" />
            </span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
