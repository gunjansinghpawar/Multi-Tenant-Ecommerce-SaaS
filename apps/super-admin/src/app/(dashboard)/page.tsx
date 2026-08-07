"use client";

import React, { useState, useEffect } from "react";
import { 
  Card, 
  StatCard, 
  Button,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@commercex/ui";
import { 
  UsersIcon, 
  StoreIcon, 
  CreditCardIcon, 
  HardDriveIcon,
  ShieldIcon,
  ActivityIcon,
  ServerIcon,
  StarIcon,
  PlusIcon,
  UserPlusIcon,
  SettingsIcon,
  BookOpenIcon,
  ArrowRightIcon,
  TerminalIcon,
  AlertCircleIcon,
  CheckCircle2Icon
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line
} from "recharts";
import { useTheme } from "next-themes";

// --- DUMMY DATA ---
const revenueData = [
  { name: "Jan", total: 45000 }, { name: "Feb", total: 52000 }, { name: "Mar", total: 48000 },
  { name: "Apr", total: 61000 }, { name: "May", total: 59000 }, { name: "Jun", total: 68000 },
  { name: "Jul", total: 72000 }, { name: "Aug", total: 71000 }, { name: "Sep", total: 84000 },
  { name: "Oct", total: 89000 }, { name: "Nov", total: 94000 }, { name: "Dec", total: 102000 },
];

const newStoresData = [
  { name: "Jan", stores: 12 }, { name: "Feb", stores: 18 }, { name: "Mar", stores: 15 },
  { name: "Apr", stores: 22 }, { name: "May", stores: 28 }, { name: "Jun", stores: 24 },
  { name: "Jul", stores: 32 }, { name: "Aug", stores: 35 }, { name: "Sep", stores: 41 },
];

const apiUsageData = [
  { name: "Mon", requests: 1240000 }, { name: "Tue", requests: 1350000 }, { name: "Wed", requests: 1420000 },
  { name: "Thu", requests: 1380000 }, { name: "Fri", requests: 1510000 }, { name: "Sat", requests: 1250000 },
  { name: "Sun", requests: 1120000 },
];

const activityLogs = [
  { id: 1, type: "store", message: "Fashion Boutique registered", time: "2 hours ago", status: "success" },
  { id: 2, type: "user", message: "Admin user logged in (192.168.1.1)", time: "5 hours ago", status: "info" },
  { id: 3, type: "store", message: "Tech Gadgets subscription updated", time: "1 day ago", status: "success" },
  { id: 4, type: "system", message: "Nightly backup completed", time: "2 days ago", status: "success" },
];

const systemLogs = [
  { id: 1, level: "error", message: "Database connection timeout", source: "db-cluster-01", time: "10 mins ago" },
  { id: 2, level: "warn", message: "High memory usage detected", source: "worker-node-03", time: "45 mins ago" },
  { id: 3, level: "info", message: "API Gateway rate limit refreshed", source: "gateway-01", time: "1 hour ago" },
  { id: 4, level: "info", message: "New SSL certificate deployed", source: "load-balancer", time: "3 hours ago" },
];

// --- CUSTOM TOOLTIP ---
const CustomTooltip = ({ active, payload, label, prefix = "", suffix = "" }: any) => {
  if (active && payload && payload.length) {
    let value = payload[0].value;
    if (value > 1000000) value = (value / 1000000).toFixed(1) + "M";
    else if (value > 1000) value = (value / 1000).toFixed(1) + "k";
    else value = value.toLocaleString();

    return (
      <div className="bg-background/95 border border-border p-3 rounded-lg shadow-xl backdrop-blur-md">
        <p className="font-medium text-sm text-foreground mb-1">{label}</p>
        <p className="text-primary font-bold text-sm">
          {prefix}{value}{suffix}
        </p>
      </div>
    );
  }
  return null;
};

export default function SuperAdminDashboard() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const chartColor = theme === "dark" ? "#60a5fa" : "#3b82f6";
  const chartFill = theme === "dark" ? "url(#colorGradientDark)" : "url(#colorGradientLight)";

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in slide-in-from-bottom-4 fade-in duration-700">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">Super Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Global platform metrics and infrastructure health.
          </p>
        </div>
      </div>

      {/* PRIMARY METRICS ROW */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 animate-in slide-in-from-bottom-6 fade-in duration-700 delay-100 fill-mode-both">
        <StatCard
          title="Platform Revenue"
          value="$124.5k"
          description="+18% from last month"
          icon={<CreditCardIcon className="h-4 w-4 text-muted-foreground" />}
          trend={{ value: "up", isPositive: true }}
        />
        <StatCard
          title="Active Stores"
          value="1,248"
          description="+12% from last month"
          icon={<StoreIcon className="h-4 w-4 text-muted-foreground" />}
          trend={{ value: "up", isPositive: true }}
        />
        <StatCard
          title="Total Users"
          value="48.2k"
          description="+4.1% from last month"
          icon={<UsersIcon className="h-4 w-4 text-muted-foreground" />}
          trend={{ value: "up", isPositive: true }}
        />
        <StatCard
          title="Active Subscriptions"
          value="892"
          description="95% Pro, 5% Enterprise"
          icon={<StarIcon className="h-4 w-4 text-amber-500" />}
          trend={{ value: "up", isPositive: true }}
        />
      </div>

      {/* INFRASTRUCTURE HEALTH ROW */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 animate-in slide-in-from-bottom-8 fade-in duration-700 delay-200 fill-mode-both">
        <Card className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">System Admins</p>
            <div className="flex items-center mt-1">
              <h4 className="text-2xl font-bold">24</h4>
              <span className="text-xs ml-2 text-muted-foreground">3 pending</span>
            </div>
          </div>
          <div className="h-10 w-10 bg-primary/10 flex items-center justify-center rounded-lg text-primary">
            <ShieldIcon className="h-5 w-5" />
          </div>
        </Card>
        <Card className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Global Storage</p>
            <div className="flex items-center mt-1">
              <h4 className="text-2xl font-bold">842 <span className="text-sm font-normal text-muted-foreground">GB</span></h4>
            </div>
          </div>
          <div className="h-10 w-10 bg-muted flex items-center justify-center rounded-lg text-muted-foreground">
            <HardDriveIcon className="h-5 w-5" />
          </div>
        </Card>
        <Card className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">API Usage</p>
            <div className="flex items-center mt-1">
              <h4 className="text-2xl font-bold">14.2k <span className="text-sm font-normal text-muted-foreground">req/m</span></h4>
            </div>
          </div>
          <div className="h-10 w-10 bg-indigo-500/10 flex items-center justify-center rounded-lg text-indigo-500">
            <ActivityIcon className="h-5 w-5" />
          </div>
        </Card>
        <Card className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Server Status</p>
            <div className="flex items-center mt-1">
              <h4 className="text-2xl font-bold text-emerald-500">99.99%</h4>
            </div>
          </div>
          <div className="h-10 w-10 bg-emerald-500/10 flex items-center justify-center rounded-lg text-emerald-500 relative">
            <ServerIcon className="h-5 w-5" />
            <span className="absolute top-2 right-2 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
        </Card>
      </div>

      {/* MAIN LAYOUT GRID */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 animate-in slide-in-from-bottom-10 fade-in duration-700 delay-300 fill-mode-both">
        
        {/* LEFT COLUMN (Graphs) */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-6 min-h-[400px]">
            <Tabs defaultValue="revenue" className="w-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg tracking-tight">Platform Analytics</h3>
                <TabsList className="bg-muted/50 h-9">
                  <TabsTrigger value="revenue" className="text-xs">Revenue</TabsTrigger>
                  <TabsTrigger value="stores" className="text-xs">Stores</TabsTrigger>
                  <TabsTrigger value="api" className="text-xs">API Traffic</TabsTrigger>
                </TabsList>
              </div>

              {/* REVENUE CHART */}
              <TabsContent value="revenue" className="h-[300px] mt-0 w-full">
                {mounted ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorGradientLight" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorGradientDark" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" strokeOpacity={0.1} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'currentColor', opacity: 0.5 }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'currentColor', opacity: 0.5 }} tickFormatter={(value) => `$${value/1000}k`} dx={-10} />
                      <Tooltip content={<CustomTooltip prefix="$" />} cursor={{ stroke: 'currentColor', strokeOpacity: 0.1, strokeWidth: 2 }} />
                      <Area type="monotone" dataKey="total" stroke={chartColor} strokeWidth={2} fillOpacity={1} fill={chartFill} />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : <div className="w-full h-full bg-muted/20 animate-pulse rounded-lg" />}
              </TabsContent>

              {/* NEW STORES CHART */}
              <TabsContent value="stores" className="h-[300px] mt-0 w-full">
                {mounted ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={newStoresData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" strokeOpacity={0.1} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'currentColor', opacity: 0.5 }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'currentColor', opacity: 0.5 }} />
                      <Tooltip content={<CustomTooltip />} cursor={{ fill: 'currentColor', opacity: 0.05 }} />
                      <Bar dataKey="stores" fill={chartColor} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : <div className="w-full h-full bg-muted/20 animate-pulse rounded-lg" />}
              </TabsContent>
              
              {/* API TRAFFIC CHART */}
              <TabsContent value="api" className="h-[300px] mt-0 w-full">
                {mounted ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={apiUsageData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" strokeOpacity={0.1} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'currentColor', opacity: 0.5 }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'currentColor', opacity: 0.5 }} tickFormatter={(value) => `${value/1000000}M`} />
                      <Tooltip content={<CustomTooltip suffix=" reqs" />} cursor={{ stroke: 'currentColor', strokeOpacity: 0.1, strokeWidth: 2 }} />
                      <Line type="monotone" dataKey="requests" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, fill: '#8b5cf6' }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : <div className="w-full h-full bg-muted/20 animate-pulse rounded-lg" />}
              </TabsContent>

            </Tabs>
          </Card>
        </div>

        {/* RIGHT COLUMN (Actions & Activity) */}
        <div className="lg:col-span-3 space-y-6 flex flex-col">
          
          {/* QUICK ACTIONS */}
          <Card className="p-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <h3 className="font-semibold text-lg tracking-tight mb-4">Platform Administration</h3>
            <div className="grid grid-cols-2 gap-3 relative z-10">
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2 hover:border-primary hover:text-primary transition-colors">
                <StoreIcon className="h-5 w-5" />
                <span className="text-xs font-medium">New Store</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2 hover:border-primary hover:text-primary transition-colors">
                <ShieldIcon className="h-5 w-5" />
                <span className="text-xs font-medium">New Admin</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2 hover:border-primary hover:text-primary transition-colors">
                <SettingsIcon className="h-5 w-5" />
                <span className="text-xs font-medium">System Settings</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2 hover:border-primary hover:text-primary transition-colors">
                <BookOpenIcon className="h-5 w-5" />
                <span className="text-xs font-medium">Documentation</span>
              </Button>
            </div>
          </Card>

          {/* ACTIVITY & LOGS */}
          <Card className="p-6 flex-1 flex flex-col min-h-[300px] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-bl from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <Tabs defaultValue="activity" className="w-full flex flex-col h-full relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg tracking-tight">System Events</h3>
                <TabsList className="bg-muted/50 h-8">
                  <TabsTrigger value="activity" className="text-[11px] px-2">Activity</TabsTrigger>
                  <TabsTrigger value="logs" className="text-[11px] px-2">Logs</TabsTrigger>
                </TabsList>
              </div>

              {/* ACTIVITY FEED */}
              <TabsContent value="activity" className="flex-1 mt-0">
                <div className="space-y-4">
                  {activityLogs.map(log => (
                    <div key={log.id} className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {log.status === "success" ? (
                          <CheckCircle2Icon className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <ActivityIcon className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <div className="flex flex-col flex-1">
                        <span className="text-sm font-medium">{log.message}</span>
                        <span className="text-xs text-muted-foreground">{log.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* LOGS FEED */}
              <TabsContent value="logs" className="flex-1 mt-0">
                <div className="space-y-4">
                  {systemLogs.map(log => (
                    <div key={log.id} className="flex flex-col border-l-2 pl-3 pb-1" style={{ 
                      borderColor: log.level === "error" ? "#ef4444" : log.level === "warn" ? "#f59e0b" : "#3b82f6" 
                    }}>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium font-mono">{log.message}</span>
                      </div>
                      <div className="flex items-center justify-between mt-0.5">
                        <span className="text-xs text-muted-foreground flex items-center">
                          <TerminalIcon className="h-3 w-3 mr-1 inline-block" /> {log.source}
                        </span>
                        <span className="text-[10px] text-muted-foreground">{log.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

            </Tabs>
          </Card>

        </div>
      </div>
    </div>
  );
}
