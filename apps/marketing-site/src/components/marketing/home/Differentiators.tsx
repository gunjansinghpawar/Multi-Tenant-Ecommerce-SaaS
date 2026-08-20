'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Bot, Component, Smartphone, Building2, Blocks, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    title: 'Visual Theme Editor',
    description: 'Edit colors, typography, and layouts with a live preview. No manual deployment or developer required for normal changes.',
    icon: Component,
    href: '/features/themes',
    color: 'text-primary'
  },
  {
    title: 'Multi-Tenant Architecture',
    description: 'Run multiple independent brands and storefronts from a single centralized super admin panel. Perfect for agencies.',
    icon: Building2,
    href: '/solutions/agencies',
    color: 'text-info'
  },
  {
    title: 'AI-Powered Commerce',
    description: 'Generate product descriptions, SEO metadata, and personalized customer recommendations automatically.',
    icon: Bot,
    href: '/features/ai',
    color: 'text-warning'
  },
  {
    title: 'Built-in WhatsApp',
    description: 'Connect your WhatsApp Business API for order confirmations, shipping updates, and abandoned cart recovery.',
    icon: Smartphone,
    href: '/features/whatsapp',
    color: 'text-success'
  },
  {
    title: 'Headless Ready',
    description: 'The backend commerce engine is decoupled from the storefront. Build custom mobile apps or Next.js frontends via API.',
    icon: Blocks,
    href: '/features/headless-commerce',
    color: 'text-primary'
  },
  {
    title: 'High Performance',
    description: 'Edge-delivered static storefronts, optimized imagery, and server-side rendering for perfect Core Web Vitals.',
    icon: Zap,
    href: '/performance',
    color: 'text-destructive'
  }
];

export function Differentiators() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Built for Scale & Speed</h2>
            <p className="text-lg text-muted-foreground">
              Every feature you need to run a high-volume ecommerce business, engineered natively into the platform core.
            </p>
          </div>
          <Link href="/features" className="inline-flex items-center text-primary font-medium hover:underline">
            View all features <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-8 rounded-3xl border border-border bg-card hover:border-primary/50 transition-colors shadow-sm hover:shadow-md"
            >
              <div className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${feature.color}`}>
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {feature.description}
              </p>
              <Link href={feature.href} className="inline-flex items-center text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                Learn more <ArrowRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
