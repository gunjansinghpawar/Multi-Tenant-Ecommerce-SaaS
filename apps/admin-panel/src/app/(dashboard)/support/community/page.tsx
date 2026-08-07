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
import { MessagesSquareIcon, GithubIcon, ExternalLinkIcon } from "lucide-react";

export default function CommunityPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Community" 
        text="Join the conversation with thousands of other CommerceX merchants."
      />
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="bg-[#5865F2]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <MessagesSquareIcon className="h-6 w-6 text-[#5865F2]" />
            </div>
            <CardTitle>Discord Server</CardTitle>
            <CardDescription>Join our official Discord to chat with the team and other founders.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white">
              Join Discord <ExternalLinkIcon className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="bg-slate-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <GithubIcon className="h-6 w-6 text-slate-900" />
            </div>
            <CardTitle>GitHub Discussions</CardTitle>
            <CardDescription>Contribute to our open source packages and discuss architecture.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full border-slate-300 hover:bg-slate-50 text-slate-900">
              View Discussions <ExternalLinkIcon className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
