'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Shield, Zap, Blocks } from 'lucide-react';

export function CorePillars() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-h2 mb-4">Built on Four Pillars</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We don't compromise on architecture. Every layer of CommerceX is designed to deliver absolute performance and security.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Bento Box 1: Multi-Tenancy (Spans 2 columns on lg) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-card border border-border rounded-3xl p-8 relative overflow-hidden group hover:border-primary/50 transition-colors"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Layers className="w-48 h-48 text-primary" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                <Layers size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4">True Multi-Tenancy</h3>
              <p className="text-muted-foreground leading-relaxed max-w-md">
                Complete data isolation per merchant with centralized management. Push platform updates to thousands of stores instantly without breaking individual tenant configurations or exposing cross-tenant data.
              </p>
            </div>
          </motion.div>

          {/* Bento Box 2: Edge Delivery */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-3xl p-8 relative overflow-hidden group hover:border-info/50 transition-colors"
          >
            <div className="absolute -bottom-8 -right-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Zap className="w-48 h-48 text-info" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-info/10 flex items-center justify-center text-info mb-6">
                <Zap size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Edge Delivery</h3>
              <p className="text-muted-foreground leading-relaxed">
                Statically generated storefronts cached across 300+ global nodes ensuring zero-layout-shift.
              </p>
            </div>
          </motion.div>

          {/* Bento Box 3: Security */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-3xl p-8 relative overflow-hidden group hover:border-destructive/50 transition-colors"
          >
            <div className="absolute top-8 -right-12 opacity-10 group-hover:opacity-20 transition-opacity">
              <Shield className="w-48 h-48 text-destructive" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center text-destructive mb-6">
                <Shield size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Bank-Grade Security</h3>
              <p className="text-muted-foreground leading-relaxed">
                SOC2 compliant infrastructure, automated DDoS protection, and rigorous RBAC for merchants.
              </p>
            </div>
          </motion.div>

          {/* Bento Box 4: Headless APIs (Spans 2 columns on lg) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 bg-card border border-border rounded-3xl p-8 relative overflow-hidden group hover:border-emerald-500/50 transition-colors"
          >
            <div className="absolute -bottom-16 right-0 opacity-10 group-hover:opacity-20 transition-opacity">
              <Blocks className="w-64 h-64 text-emerald-500" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6">
                <Blocks size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4">API-First Headless Core</h3>
              <p className="text-muted-foreground leading-relaxed max-w-md">
                Every feature in CommerceX is accessible via our GraphQL and REST APIs. Build custom mobile apps, point-of-sale integrations, or completely bespoke web experiences on top of our engine.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
