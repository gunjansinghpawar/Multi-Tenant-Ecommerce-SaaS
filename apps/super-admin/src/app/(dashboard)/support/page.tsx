"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Button, Badge, Input, Label, Textarea, useToast, PageHeader } from "@commercex/ui";
import { LifeBuoyIcon, MessageSquareIcon, BookIcon, MailIcon, Loader2Icon, SendIcon } from "lucide-react";

export default function SupportCenterPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message) return;
    
    setLoading(true);
    // Simulate sending message
    await new Promise(res => setTimeout(res, 1000));
    setLoading(false);
    
    toast({
      title: "Message Sent",
      description: "Our support team will get back to you shortly."
    });
    setSubject("");
    setMessage("");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader 
          heading="Support Center" 
          text="Get help with the platform and manage support requests."
        />
        <Button className="shrink-0"><MessageSquareIcon className="mr-2 h-4 w-4" /> Open Support Queue</Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>Send a message directly to the engineering team for critical platform issues.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input 
                    id="subject" 
                    placeholder="e.g. Database connection failing for Tenant X" 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Describe the issue in detail..." 
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <div className="flex justify-end pt-2">
                  <Button type="submit" disabled={loading || !subject || !message}>
                    {loading ? <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> : <SendIcon className="mr-2 h-4 w-4" />}
                    Send Message
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Tickets</CardTitle>
              <CardDescription>Your recently opened support requests.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-10 text-center space-y-3">
                <div className="p-3 bg-muted rounded-full">
                  <LifeBuoyIcon className="w-6 h-6 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">You don't have any active support tickets.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors border border-transparent hover:border-border">
                <div className="p-2 bg-primary/10 text-primary rounded-md shrink-0">
                  <BookIcon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Documentation</h4>
                  <p className="text-xs text-muted-foreground">Read the platform guides</p>
                </div>
              </a>
              <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors border border-transparent hover:border-border">
                <div className="p-2 bg-primary/10 text-primary rounded-md shrink-0">
                  <MailIcon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Email Support</h4>
                  <p className="text-xs text-muted-foreground">support@commercex.dev</p>
                </div>
              </a>
            </CardContent>
          </Card>
          
          <Card className="bg-primary text-primary-foreground border-none">
            <CardContent className="p-6">
              <h3 className="font-bold mb-2">Emergency Support</h3>
              <p className="text-primary-foreground/80 text-sm mb-4">
                For complete platform outages, use the emergency hotline available to Super Admins.
              </p>
              <Button variant="secondary" className="w-full font-semibold">View Hotline Info</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}