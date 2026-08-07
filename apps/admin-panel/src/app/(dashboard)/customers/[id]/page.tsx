"use client";

import React, { useState } from "react";
import { 
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from "@commercex/ui";
import { 
  MailIcon, 
  MapPinIcon, 
  PhoneIcon, 
  MessageSquareIcon,
  StarIcon,
  GiftIcon,
  CreditCardIcon,
  HeartIcon,
  ShoppingCartIcon,
  ClockIcon,
  TagIcon,
  MoreHorizontalIcon
} from "lucide-react";

export default function CustomerProfilePage({ params }: { params: { id: string } }) {
  const customerId = params.id || "CUS-001";
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Profile Card */}
      <Card className="bg-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center text-primary text-3xl font-bold">
                AS
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold tracking-tight">Alice Smith</h1>
                  <Badge variant="success">Active</Badge>
                  <Badge variant="secondary">VIP</Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center"><MailIcon className="h-4 w-4 mr-1"/> alice@example.com</span>
                  <span className="flex items-center"><PhoneIcon className="h-4 w-4 mr-1"/> +1 (555) 123-4567</span>
                  <span className="flex items-center"><MapPinIcon className="h-4 w-4 mr-1"/> New York, USA</span>
                </div>
                <div className="flex gap-2 pt-1">
                  <Badge variant="outline" className="text-xs font-normal">Customer since Oct 2024</Badge>
                  <Badge variant="outline" className="text-xs font-normal">Accepts Marketing</Badge>
                </div>
              </div>
            </div>

            <div className="flex gap-4 md:text-right">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Lifetime Value</p>
                <p className="text-2xl font-bold text-primary">$450.00</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold">5</p>
              </div>
              <div className="pt-2 pl-4 border-l">
                <Button variant="outline" size="icon"><MoreHorizontalIcon className="h-4 w-4"/></Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Interface */}
      <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5 h-auto">
          <TabsTrigger value="overview" className="py-3">Overview & Timeline</TabsTrigger>
          <TabsTrigger value="purchases" className="py-3">Purchases & Subs</TabsTrigger>
          <TabsTrigger value="engagement" className="py-3">Engagement</TabsTrigger>
          <TabsTrigger value="loyalty" className="py-3">Loyalty & Wallet</TabsTrigger>
          <TabsTrigger value="details" className="py-3">Profile & Details</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          
          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Communication Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative border-l ml-3 space-y-8">
                      {[
                        { title: "Email Sent: 'Your VIP Discount'", time: "Today, 10:00 AM", icon: MailIcon, color: "text-primary" },
                        { title: "Order #ORD-1092 Delivered", time: "Yesterday, 2:34 PM", icon: ShoppingCartIcon, color: "text-success" },
                        { title: "Support Ticket #880 Closed", time: "Oct 20, 2026", icon: MessageSquareIcon, color: "text-muted-foreground" },
                      ].map((event, idx) => (
                        <div key={idx} className="pl-6 relative">
                          <div className="absolute -left-[13px] top-1 bg-background">
                            <event.icon className={`h-6 w-6 bg-background rounded-full ${event.color}`} />
                          </div>
                          <p className="font-medium">{event.title}</p>
                          <p className="text-sm text-muted-foreground mt-1">{event.time}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Internal Notes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-md border border-yellow-200 dark:border-yellow-900/50">
                      <p className="text-sm text-yellow-800 dark:text-yellow-200">Customer prefers text message updates for shipping.</p>
                      <p className="text-xs text-yellow-700/70 dark:text-yellow-400/50 mt-2 text-right">John D. - Oct 15</p>
                    </div>
                    <div className="flex gap-2">
                      <input type="text" className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" placeholder="Add note..."/>
                      <Button size="sm">Add</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Tags</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">VIP</Badge>
                      <Badge variant="secondary">Wholesale</Badge>
                      <Badge variant="secondary">Newsletter</Badge>
                      <Badge variant="outline" className="text-muted-foreground border-dashed cursor-pointer hover:bg-muted"><PlusIcon className="h-3 w-3 mr-1"/> Add Tag</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* PURCHASES TAB */}
          <TabsContent value="purchases" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Active Subscriptions</CardTitle>
                <Button size="sm" variant="outline">Create Subscription</Button>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md divide-y">
                  <div className="p-4 flex items-center justify-between hover:bg-muted/50">
                    <div>
                      <p className="font-medium text-primary">Monthly Coffee Beans</p>
                      <p className="text-sm text-muted-foreground">Next billing: Nov 01, 2026</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="success" className="mb-1">Active</Badge>
                      <p className="font-bold">$24.99 / mo</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Order History (5)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md divide-y">
                  {[
                    { id: "ORD-1092", date: "Oct 24, 2026", status: "Delivered", total: "$120.00" },
                    { id: "ORD-0955", date: "Sep 10, 2026", status: "Delivered", total: "$85.00" },
                    { id: "ORD-0801", date: "Aug 02, 2026", status: "Refunded", total: "$45.00" },
                  ].map((order, i) => (
                    <div key={i} className="p-4 flex items-center justify-between hover:bg-muted/50 cursor-pointer">
                      <div>
                        <p className="font-medium text-primary hover:underline">{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={order.status === 'Refunded' ? 'secondary' : 'default' as any} className="mb-1">{order.status}</Badge>
                        <p className="font-medium">{order.total}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ENGAGEMENT TAB */}
          <TabsContent value="engagement" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center"><StarIcon className="mr-2 h-5 w-5 text-yellow-500" /> Product Reviews</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-md p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">Wireless Earbuds Pro</p>
                      <div className="flex text-yellow-500">
                        <StarIcon className="h-4 w-4 fill-current"/><StarIcon className="h-4 w-4 fill-current"/><StarIcon className="h-4 w-4 fill-current"/><StarIcon className="h-4 w-4 fill-current"/><StarIcon className="h-4 w-4 fill-current"/>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground italic">"Amazing sound quality and battery life. Best purchase ever!"</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center"><HeartIcon className="mr-2 h-5 w-5 text-rose-500" /> Wishlist (3 Items)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Leather Wallet - Brown</li>
                    <li>Ceramic Mug - White</li>
                    <li>Cotton T-Shirt (M)</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center"><MessageSquareIcon className="mr-2 h-5 w-5" /> Support Tickets</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md divide-y">
                    <div className="p-4 flex items-center justify-between">
                      <div>
                        <p className="font-medium">#880 - Damaged item on arrival</p>
                        <p className="text-sm text-muted-foreground">Opened Oct 19, 2026</p>
                      </div>
                      <Badge variant="secondary">Closed</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* LOYALTY TAB */}
          <TabsContent value="loyalty" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-primary flex items-center"><GiftIcon className="mr-2 h-5 w-5" /> Loyalty Points</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-primary">1,250</div>
                  <p className="text-sm text-muted-foreground mt-2">Gold Tier • Equivalent to $12.50 discount</p>
                  <Button className="mt-4 w-full" variant="outline">Adjust Balance</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center"><CreditCardIcon className="mr-2 h-5 w-5" /> Store Wallet</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">$45.00</div>
                  <p className="text-sm text-muted-foreground mt-2">Store credit balance</p>
                  <Button className="mt-4 w-full" variant="outline">Add Credit</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center"><TagIcon className="mr-2 h-5 w-5" /> Referral Program</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium">Personal Link</p>
                      <code className="text-xs bg-muted p-2 rounded-md block mt-1">ref.store.com/alice-s</code>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-center pt-2 border-t">
                      <div>
                        <p className="text-2xl font-bold">4</p>
                        <p className="text-xs text-muted-foreground">Referred</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">$40</p>
                        <p className="text-xs text-muted-foreground">Earned</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* DETAILS TAB */}
          <TabsContent value="details" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Default Addresses</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="text-sm font-medium mb-2 text-muted-foreground uppercase tracking-wider">Shipping</p>
                    <div className="text-sm space-y-1">
                      <p className="font-medium">Alice Smith</p>
                      <p>123 Main Street</p>
                      <p>Apt 4B</p>
                      <p>New York, NY 10001</p>
                      <p>United States</p>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <p className="text-sm font-medium mb-2 text-muted-foreground uppercase tracking-wider">Billing</p>
                    <p className="text-sm text-muted-foreground italic">Same as shipping address</p>
                  </div>
                  <Button variant="outline" className="w-full">Manage Addresses</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Segment Memberships (Groups)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <p className="font-medium text-sm">VIP Customers</p>
                      <p className="text-xs text-muted-foreground">Dynamic Segment</p>
                    </div>
                    <Badge variant="primary">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <p className="font-medium text-sm">Summer Sale 2026 Cohort</p>
                      <p className="text-xs text-muted-foreground">Static Group</p>
                    </div>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
        </div>
      </Tabs>
    </div>
  );
}
