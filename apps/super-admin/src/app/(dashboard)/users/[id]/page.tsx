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
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@commercex/ui";
import { 
  ArrowLeftIcon, 
  MailIcon,
  PhoneIcon,
  ShieldIcon,
  ClockIcon,
  MonitorIcon,
  ActivityIcon
} from "lucide-react";

export default function UserProfilePage() {
  const params = useParams();
  const userId = params.id as string;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/users">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ArrowLeftIcon className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">User Profile</h1>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        
        {/* LEFT SIDEBAR: PROFILE CARD */}
        <div className="md:col-span-1 space-y-6">
          <Card className="p-6 flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarFallback className="bg-primary/10 text-primary text-2xl">AJ</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold">Alice Johnson</h2>
            <p className="text-muted-foreground text-sm mb-4">alice@commercex.com</p>
            <Badge variant="secondary" className="mb-6">Super Admin</Badge>
            
            <div className="w-full space-y-3 text-sm text-left">
              <div className="flex items-center gap-3 text-muted-foreground">
                <MailIcon className="h-4 w-4" />
                <span className="text-foreground">alice@commercex.com</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <PhoneIcon className="h-4 w-4" />
                <span className="text-foreground">+1 (555) 019-8234</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <ShieldIcon className="h-4 w-4" />
                <span className="text-foreground">MFA Enabled</span>
              </div>
            </div>

            <Button className="w-full mt-6">Edit Profile</Button>
            <Button variant="outline" className="w-full mt-2 text-destructive hover:bg-destructive/10">Suspend User</Button>
          </Card>
        </div>

        {/* RIGHT AREA: TABS */}
        <div className="md:col-span-2">
          <Card className="p-6 h-full">
            <Tabs defaultValue="activity" className="w-full h-full flex flex-col">
              <TabsList className="bg-muted/50 w-full justify-start">
                <TabsTrigger value="activity">Activity Feed</TabsTrigger>
                <TabsTrigger value="sessions">Active Sessions</TabsTrigger>
                <TabsTrigger value="permissions">Permissions</TabsTrigger>
              </TabsList>

              <TabsContent value="activity" className="mt-6 flex-1">
                <div className="space-y-6">
                  {[
                    { action: "Logged in successfully", time: "2 mins ago", icon: <ActivityIcon className="h-4 w-4 text-emerald-500" /> },
                    { action: "Updated Store settings for 'Fashion Boutique'", time: "3 hours ago", icon: <ActivityIcon className="h-4 w-4 text-primary" /> },
                    { action: "Exported 1,200 user records", time: "1 day ago", icon: <ActivityIcon className="h-4 w-4 text-primary" /> },
                    { action: "Changed password", time: "1 week ago", icon: <ShieldIcon className="h-4 w-4 text-amber-500" /> },
                  ].map((log, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="mt-0.5 bg-muted p-2 rounded-full">{log.icon}</div>
                      <div>
                        <p className="text-sm font-medium">{log.action}</p>
                        <p className="text-xs text-muted-foreground">{log.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="sessions" className="mt-6">
                <div className="space-y-4">
                  {[
                    { device: "MacBook Pro - Chrome", ip: "192.168.1.1", location: "San Francisco, US", time: "Current Session", active: true },
                    { device: "iPhone 13 - Safari", ip: "10.0.0.5", location: "San Francisco, US", time: "Last active 2 hours ago", active: false },
                  ].map((session, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-4">
                        <MonitorIcon className="h-8 w-8 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-sm flex items-center gap-2">
                            {session.device} 
                            {session.active && <Badge variant="outline" className="border-emerald-500/30 text-emerald-500 bg-emerald-500/10">Active Now</Badge>}
                          </p>
                          <p className="text-xs text-muted-foreground">{session.location} • {session.ip}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10">Revoke</Button>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="permissions" className="mt-6">
                <div className="p-12 text-center text-muted-foreground border-2 border-dashed border-border rounded-lg">
                  Role inheritance graph goes here.
                </div>
              </TabsContent>

            </Tabs>
          </Card>
        </div>

      </div>
    </div>
  );
}
