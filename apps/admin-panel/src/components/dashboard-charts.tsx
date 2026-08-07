"use client";

import React, { useState, useEffect } from "react";
import { 
  Card,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from "@commercex/ui";
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

const revenueData = [
  { name: "Jan", total: 12000 },
  { name: "Feb", total: 15000 },
  { name: "Mar", total: 18000 },
  { name: "Apr", total: 16000 },
  { name: "May", total: 21000 },
  { name: "Jun", total: 25000 },
  { name: "Jul", total: 22000 },
  { name: "Aug", total: 31000 },
  { name: "Sep", total: 28000 },
  { name: "Oct", total: 35000 },
  { name: "Nov", total: 42000 },
  { name: "Dec", total: 48000 },
];

const ordersData = [
  { name: "Jan", orders: 120 }, { name: "Feb", orders: 150 }, { name: "Mar", orders: 180 },
  { name: "Apr", orders: 160 }, { name: "May", orders: 210 }, { name: "Jun", orders: 250 },
  { name: "Jul", orders: 220 }, { name: "Aug", orders: 310 }, { name: "Sep", orders: 280 },
];

const CustomTooltip = ({ active, payload, label, prefix = "" }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/95 border border-border p-3 rounded-lg shadow-xl backdrop-blur-md">
        <p className="font-medium text-sm text-foreground mb-1">{label}</p>
        <p className="text-primary font-bold text-sm">
          {prefix}{payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export function DashboardCharts() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);

  const chartColor = theme === "dark" ? "#60a5fa" : "#3b82f6";
  const chartFill = theme === "dark" ? "url(#colorGradientDark)" : "url(#colorGradientLight)";

  return (
    <Card className="p-6 min-h-[400px]">
      <Tabs defaultValue="revenue" className="w-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-lg tracking-tight">Sales Over Time</h3>
          <TabsList className="bg-muted/50 h-9">
            <TabsTrigger value="revenue" className="text-xs">Revenue</TabsTrigger>
            <TabsTrigger value="orders" className="text-xs">Orders</TabsTrigger>
            <TabsTrigger value="customers" className="text-xs">Customers</TabsTrigger>
          </TabsList>
        </div>

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

        <TabsContent value="orders" className="h-[300px] mt-0 w-full">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ordersData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" strokeOpacity={0.1} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'currentColor', opacity: 0.5 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'currentColor', opacity: 0.5 }} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'currentColor', opacity: 0.05 }} />
                <Bar dataKey="orders" fill={chartColor} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : <div className="w-full h-full bg-muted/20 animate-pulse rounded-lg" />}
        </TabsContent>

        <TabsContent value="customers" className="h-[300px] mt-0 w-full">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" strokeOpacity={0.1} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'currentColor', opacity: 0.5 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'currentColor', opacity: 0.5 }} dx={-10} />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'currentColor', strokeOpacity: 0.1, strokeWidth: 2 }} />
                <Line type="monotone" dataKey="total" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          ) : <div className="w-full h-full bg-muted/20 animate-pulse rounded-lg" />}
        </TabsContent>
      </Tabs>
    </Card>
  );
}
