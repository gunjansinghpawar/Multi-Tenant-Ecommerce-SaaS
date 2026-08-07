"use client";

import React from "react";
import { PageHeader, PremiumStatCard, Card, CardHeader, CardTitle, CardContent } from "@commercex/ui";
import { Server, Database, Activity, Cpu } from "lucide-react";

export default function SystemHealthPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="System Health" 
        text="Real-time monitoring of platform infrastructure and services."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <PremiumStatCard
          title="API Latency"
          value="42ms"
          icon={<Activity className="h-5 w-5" />}
          trend={{ value: "-5ms", isPositive: true }}
        />
        <PremiumStatCard
          title="CPU Usage"
          value="24%"
          icon={<Cpu className="h-5 w-5" />}
          trend={{ value: "+2%", isPositive: false }}
        />
        <PremiumStatCard
          title="Database Load"
          value="18%"
          icon={<Database className="h-5 w-5" />}
          trend={{ value: "-4%", isPositive: true }}
        />
        <PremiumStatCard
          title="Server Uptime"
          value="99.99%"
          icon={<Server className="h-5 w-5" />}
          trend={{ value: "Stable", isPositive: true }}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Active Services</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                <span className="font-medium">Core API</span>
              </div>
              <span className="text-sm text-muted-foreground">Operational</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                <span className="font-medium">Authentication (Auth0)</span>
              </div>
              <span className="text-sm text-muted-foreground">Operational</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                <span className="font-medium">Database Cluster</span>
              </div>
              <span className="text-sm text-muted-foreground">Operational</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                <span className="font-medium">Redis Cache</span>
              </div>
              <span className="text-sm text-muted-foreground">Operational</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                <span className="font-medium">Background Workers</span>
              </div>
              <span className="text-sm text-muted-foreground">Degraded Performance</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
