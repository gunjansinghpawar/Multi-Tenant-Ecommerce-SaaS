"use client";

import React from "react";
import { 
  PageHeader, 
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from "@commercex/ui";
import { 
  MailIcon, 
  MessageSquareIcon, 
  SmartphoneIcon, 
  BellRingIcon,
  ShoppingCartIcon,
  PlusIcon
} from "lucide-react";

export default function CampaignsPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Marketing Campaigns" 
        text="Manage your omni-channel marketing blasts and triggered recovery flows."
      >
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          New Campaign
        </Button>
      </PageHeader>

      <Tabs defaultValue="broadcasts" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2 h-auto">
          <TabsTrigger value="broadcasts" className="py-2">Broadcasts (One-off)</TabsTrigger>
          <TabsTrigger value="triggered" className="py-2">Triggered Flows</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="broadcasts">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "Email Campaigns", icon: MailIcon, count: 12, desc: "Newsletters & announcements" },
                { name: "WhatsApp Campaigns", icon: MessageSquareIcon, count: 3, desc: "Rich media messages" },
                { name: "SMS Campaigns", icon: SmartphoneIcon, count: 8, desc: "High open-rate text alerts" },
                { name: "Push Notifications", icon: BellRingIcon, count: 24, desc: "App & Web push alerts" },
              ].map((item, idx) => (
                <Card key={idx} className="cursor-pointer hover:border-primary transition-colors">
                  <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle className="text-base flex items-center">
                      <item.icon className="mr-2 h-5 w-5 text-muted-foreground" />
                      {item.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{item.count}</div>
                    <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Recent Broadcasts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md divide-y">
                  {[
                    { name: "Black Friday Early Access", type: "Email", status: "Sent", date: "Oct 24, 2026", metrics: "24% Open • 3% CTR" },
                    { name: "Flash Sale Alert", type: "SMS", status: "Sent", date: "Oct 15, 2026", metrics: "98% Delivered" },
                    { name: "Winter Collection Drop", type: "Push", status: "Scheduled", date: "Nov 01, 2026", metrics: "-" },
                  ].map((campaign, i) => (
                    <div key={i} className="p-4 flex items-center justify-between">
                      <div>
                        <p className="font-medium text-primary hover:underline cursor-pointer">{campaign.name}</p>
                        <p className="text-sm text-muted-foreground">{campaign.type} • {campaign.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{campaign.status}</p>
                        <p className="text-xs text-muted-foreground mt-1">{campaign.metrics}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="triggered">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShoppingCartIcon className="mr-2 h-5 w-5" />
                  Abandoned Cart Recovery
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-md bg-muted/20">
                    <p className="text-sm text-muted-foreground">Recovered Revenue</p>
                    <p className="text-2xl font-bold text-success">$12,450</p>
                  </div>
                  <div className="p-4 border rounded-md bg-muted/20">
                    <p className="text-sm text-muted-foreground">Recovery Rate</p>
                    <p className="text-2xl font-bold">14.2%</p>
                  </div>
                  <div className="p-4 border rounded-md bg-muted/20">
                    <p className="text-sm text-muted-foreground">Emails Sent</p>
                    <p className="text-2xl font-bold">1,204</p>
                  </div>
                </div>

                <div className="border rounded-md divide-y">
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium">1. Reminder (1 hour later)</p>
                      <p className="text-sm text-muted-foreground">"You left something behind!"</p>
                    </div>
                    <Button variant="outline" size="sm">Edit Email</Button>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium">2. Discount Offer (24 hours later)</p>
                      <p className="text-sm text-muted-foreground">"Take 10% off your cart"</p>
                    </div>
                    <Button variant="outline" size="sm">Edit Email</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
