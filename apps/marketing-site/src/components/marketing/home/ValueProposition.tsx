'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Layout, CreditCard, Truck, MessageCircle, BarChart3, Users, Zap, Search } from 'lucide-react';

const traditionalStack = [
  { name: 'Website', icon: Layout },
  { name: 'CMS', icon: Search },
  { name: 'Payment', icon: CreditCard },
  { name: 'Shipping', icon: Truck },
  { name: 'WhatsApp', icon: MessageCircle },
  { name: 'Analytics', icon: BarChart3 },
  { name: 'Marketing', icon: Zap },
  { name: 'Customers', icon: Users },
];

export function ValueProposition() {
  return (
    <section className="py-24 bg-muted/30 border-y border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">One Platform. <br className="md:hidden"/> Not Ten Tools.</h2>
          <p className="text-lg text-muted-foreground">
            Stop stitching together different plugins, subscriptions, and tools. We built a complete operating system where everything naturally connects.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* The Problem: Multiple Tools */}
          <div className="relative p-8 rounded-3xl bg-background border border-border shadow-sm">
            <div className="absolute -top-3 -right-3 rotate-12">
              <span className="bg-destructive text-destructive-foreground text-xs font-bold px-3 py-1 rounded-full shadow-lg">The Old Way</span>
            </div>
            
            <h3 className="text-xl font-semibold mb-8 text-center text-muted-foreground">The Fragmented Stack</h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {traditionalStack.map((tool, i) => (
                <div key={i} className="flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-border bg-muted/20 text-center gap-2 opacity-70">
                  <tool.icon size={24} className="text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground">{tool.name}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-border flex flex-col gap-2 text-sm text-center text-destructive/80 font-medium">
              <p>Multiple Logins & Subscriptions</p>
              <p>Complex Integrations & Data Silos</p>
              <p>High Maintenance Costs</p>
            </div>
          </div>

          {/* The Solution: One Platform */}
          <div className="relative p-8 rounded-3xl bg-gradient-to-br from-primary/10 to-background border border-primary/20 shadow-lg shadow-primary/5">
            <div className="absolute -top-3 -right-3 rotate-12">
              <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-lg">The CommerceX Way</span>
            </div>
            
            <h3 className="text-xl font-semibold mb-8 text-center text-foreground">The Connected Ecosystem</h3>
            
            <div className="relative h-[240px] flex items-center justify-center">
              {/* Center Core */}
              <div className="absolute w-24 h-24 bg-primary rounded-full z-10 flex items-center justify-center shadow-xl shadow-primary/30">
                <span className="text-primary-foreground font-bold text-center leading-tight">Commerce<br/>Core</span>
              </div>
              
              {/* Orbiting nodes */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute w-[220px] h-[220px] rounded-full border border-primary/20 border-dashed"
              >
                {[0, 45, 90, 135, 180, 225, 270, 315].map((degree, i) => {
                  const ToolIcon = traditionalStack[i].icon;
                  return (
                    <div 
                      key={i} 
                      className="absolute w-10 h-10 bg-background border border-border rounded-full flex items-center justify-center shadow-sm"
                      style={{
                        top: '50%',
                        left: '50%',
                        transform: `translate(-50%, -50%) rotate(${degree}deg) translateX(110px) rotate(-${degree}deg)`,
                      }}
                    >
                      <ToolIcon size={16} className="text-primary" />
                    </div>
                  );
                })}
              </motion.div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-primary/10 flex flex-col gap-2 text-sm text-center text-primary font-medium">
              <p>Single Unified Dashboard</p>
              <p>Native Automated Workflows</p>
              <p>Predictable Pricing</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
