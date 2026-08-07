"use client";

import React, { useState, useEffect } from "react";
import { 
  PageHeader, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
} from "@commercex/ui";
import { UsersIcon, ShoppingCartIcon, ActivityIcon, ArrowUpRightIcon } from "lucide-react";

export default function RealTimeAnalyticsPage() {
  const [activeUsers, setActiveUsers] = useState(124);
  const [activeCarts, setActiveCarts] = useState(45);
  const [salesToday, setSalesToday] = useState(12850);

  // Simulate real-time data fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers(prev => prev + Math.floor(Math.random() * 5) - 2);
      if (Math.random() > 0.7) {
        setActiveCarts(prev => prev + Math.floor(Math.random() * 3) - 1);
      }
      if (Math.random() > 0.85) {
        setSalesToday(prev => prev + Math.floor(Math.random() * 150));
      }
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          heading="Real-Time Dashboard" 
          text="Live view of active users, current carts, and today's sales."
        />
        <div className="flex items-center space-x-2 text-sm text-green-500 font-medium">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span>Live Updates Active</span>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-green-200 dark:border-green-900/50 bg-green-50/30 dark:bg-green-950/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Users Right Now</CardTitle>
            <UsersIcon className="h-4 w-4 text-green-600 animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold text-green-600 transition-all duration-500">{activeUsers}</div>
            <p className="text-sm text-muted-foreground mt-2">users on site</p>
          </CardContent>
        </Card>
        
        <Card className="border-blue-200 dark:border-blue-900/50 bg-blue-50/30 dark:bg-blue-950/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Carts</CardTitle>
            <ShoppingCartIcon className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold text-blue-600 transition-all duration-500">{activeCarts}</div>
            <p className="text-sm text-muted-foreground mt-2">users currently checking out</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 dark:border-orange-900/50 bg-orange-50/30 dark:bg-orange-950/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Sales Today</CardTitle>
            <ActivityIcon className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold text-orange-600 transition-all duration-500">${salesToday.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground mt-2">since midnight (EST)</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Live Activity Stream</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-sm animate-in fade-in slide-in-from-top-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-muted-foreground">Just now</span>
                <span className="font-medium">User from NY, USA completed a purchase ($124.50)</span>
              </div>
              <div className="flex items-center space-x-3 text-sm opacity-80">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <span className="text-muted-foreground">1 min ago</span>
                <span className="font-medium">User from London, UK added item to cart</span>
              </div>
              <div className="flex items-center space-x-3 text-sm opacity-60">
                <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                <span className="text-muted-foreground">2 mins ago</span>
                <span className="font-medium">New account registered (test@example.com)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Active Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm border-b pb-2">
                <span className="truncate">/products/wireless-headphones</span>
                <span className="font-medium flex items-center text-green-600"><ArrowUpRightIcon className="h-3 w-3 mr-1" /> 45</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b pb-2">
                <span className="truncate">/</span>
                <span className="font-medium flex items-center">32</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b pb-2">
                <span className="truncate">/cart</span>
                <span className="font-medium flex items-center">18</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="truncate">/collections/summer-sale</span>
                <span className="font-medium flex items-center text-green-600"><ArrowUpRightIcon className="h-3 w-3 mr-1" /> 12</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
