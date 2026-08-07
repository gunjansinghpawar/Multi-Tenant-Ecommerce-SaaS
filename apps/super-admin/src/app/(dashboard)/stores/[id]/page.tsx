"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  Card,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Button,
  Badge,
  StatCard
} from "@commercex/ui";
import { 
  ArrowLeftIcon, 
  ExternalLinkIcon,
  CreditCardIcon,
  UsersIcon,
  ActivityIcon,
  HardDriveIcon
} from "lucide-react";

export default function StoreDetailsPage() {
  const params = useParams();
  const storeId = params.id as string;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/stores">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ArrowLeftIcon className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight">Tech Gadgets</h1>
              <Badge variant="default" className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-none">Active</Badge>
              <Badge variant="outline">Enterprise Plan</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">ID: {storeId} • Created on Nov 05, 2025</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="text-destructive hover:bg-destructive/10">Suspend</Button>
          <Button>
            <ExternalLinkIcon className="mr-2 h-4 w-4" /> Open Store Admin
          </Button>
        </div>
      </div>

      {/* METRICS ROW */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="Monthly Revenue" value="$45.2k" icon={<CreditCardIcon className="h-4 w-4 text-muted-foreground"/>} />
        <StatCard title="Active Users" value="1,248" icon={<UsersIcon className="h-4 w-4 text-muted-foreground"/>} />
        <StatCard title="API Requests" value="1.2M/mo" icon={<ActivityIcon className="h-4 w-4 text-muted-foreground"/>} />
        <StatCard title="Storage Used" value="450 GB" icon={<HardDriveIcon className="h-4 w-4 text-muted-foreground"/>} />
      </div>

      {/* TABS */}
      <Card className="p-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="bg-muted/50 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="users">Users (12)</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="logs">Audit Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Store Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-muted-foreground">Owner Email</div>
                  <div className="font-medium">mark@tech.com</div>
                  <div className="text-muted-foreground">Contact Phone</div>
                  <div className="font-medium">+1 (555) 123-4567</div>
                  <div className="text-muted-foreground">Region</div>
                  <div className="font-medium">US-East (N. Virginia)</div>
                  <div className="text-muted-foreground">Custom Domain</div>
                  <div className="font-medium text-primary">shop.techgadgets.com</div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Limits & Usage</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Products (14,230 / 50,000)</span>
                      <span className="font-medium">28%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "28%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Storage (450 GB / 2 TB)</span>
                      <span className="font-medium">22%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "22%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Dummy content for other tabs */}
          <TabsContent value="settings" className="mt-0">
            <div className="py-12 text-center text-muted-foreground">Settings configuration interface goes here.</div>
          </TabsContent>
          <TabsContent value="users" className="mt-0">
            <div className="py-12 text-center text-muted-foreground">Store users data table goes here.</div>
          </TabsContent>
          <TabsContent value="billing" className="mt-0">
            <div className="py-12 text-center text-muted-foreground">Billing history and invoices go here.</div>
          </TabsContent>
          <TabsContent value="logs" className="mt-0">
            <div className="py-12 text-center text-muted-foreground">Audit logs data table goes here.</div>
          </TabsContent>

        </Tabs>
      </Card>
    </div>
  );
}
