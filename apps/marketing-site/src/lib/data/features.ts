import { LayoutDashboard, ShoppingCart, BarChart, Bot, Blocks, Zap, Smartphone, Globe, Shield, RefreshCcw, Cpu, Layers } from 'lucide-react';
import React from 'react';

export type FeatureKey = 'store-builder' | 'commerce' | 'marketing' | 'analytics' | 'ai' | 'headless-commerce';

export interface FeatureData {
  title: string;
  subtitle: string;
  description: string;
  color: string;
  icon: React.ElementType;
  mockupType: 'builder' | 'dashboard' | 'marketing' | 'charts' | 'ai-chat' | 'code';
  bentoItems: {
    title: string;
    description: string;
    icon: React.ElementType;
    colSpan?: number;
  }[];
}

export const featuresData: Record<string, FeatureData> = {
  'store-builder': {
    title: 'Visual Store Builder',
    subtitle: 'Design without limits. No code required.',
    description: 'Create stunning, high-converting storefronts with our drag-and-drop visual builder. Start from premium templates and customize every pixel.',
    color: 'from-blue-500/20 to-purple-500/20',
    icon: LayoutDashboard,
    mockupType: 'builder',
    bentoItems: [
      { title: 'Live Preview Engine', description: 'See your changes instantly across mobile, tablet, and desktop breakpoints.', icon: Smartphone, colSpan: 2 },
      { title: 'Global CSS Variables', description: 'Update brand colors and typography centrally.', icon: Layers },
      { title: 'Section Architecture', description: 'Build reusable blocks of content that can be dragged across pages.', icon: Blocks },
      { title: 'Mobile-First Output', description: 'Highly optimized, statically generated HTML for perfect Web Vitals.', icon: Zap, colSpan: 2 },
    ]
  },
  'commerce': {
    title: 'Commerce Engine',
    subtitle: 'High-performance cart and checkout APIs.',
    description: 'The core of your business. Manage complex product variants, track multi-warehouse inventory, and fulfill orders with enterprise-grade tooling.',
    color: 'from-emerald-500/20 to-teal-500/20',
    icon: ShoppingCart,
    mockupType: 'dashboard',
    bentoItems: [
      { title: 'Unlimited Variants', description: 'Handle millions of SKUs with complex matrix attributes and dynamic pricing.', icon: Layers, colSpan: 2 },
      { title: 'Multi-Warehouse', description: 'Intelligent order routing across global fulfillment centers.', icon: Globe },
      { title: 'Automated Fulfillment', description: 'Trigger webhooks and partner integrations instantly on payment.', icon: Zap },
      { title: 'B2B Wholesale', description: 'Custom pricing lists and volume discounts tailored per customer.', icon: Shield, colSpan: 2 },
    ]
  },
  'marketing': {
    title: 'Marketing & SEO',
    subtitle: 'Built-in tools to drive conversion.',
    description: 'Everything you need to grow your audience. From dynamic meta tags and sitemaps to automated email recovery campaigns and discounting engines.',
    color: 'from-pink-500/20 to-rose-500/20',
    icon: BarChart,
    mockupType: 'marketing',
    bentoItems: [
      { title: 'Dynamic Sitemaps', description: 'Automatically generated and pinged to search engines upon product updates.', icon: Globe, colSpan: 2 },
      { title: 'Abandoned Cart', description: 'Multi-channel recovery sequences via Email and SMS.', icon: RefreshCcw },
      { title: 'Advanced Discounting', description: 'BOGO, percentage, fixed, and highly conditional rule engines.', icon: ShoppingCart },
      { title: 'Server-side Tagging', description: 'Bypass ad-blockers with reliable server-side tracking events.', icon: Shield, colSpan: 2 },
    ]
  },
  'analytics': {
    title: 'Analytics & Reporting',
    subtitle: 'Data-driven growth tools.',
    description: 'Real-time dashboards providing actionable insights into your conversion funnels, customer lifetime value, and return on ad spend.',
    color: 'from-amber-500/20 to-orange-500/20',
    icon: BarChart,
    mockupType: 'charts',
    bentoItems: [
      { title: 'Real-time Dashboards', description: 'Monitor active carts, live checkouts, and revenue second-by-second.', icon: Zap, colSpan: 2 },
      { title: 'Cohort Analysis', description: 'Understand retention and lifetime value by customer segment.', icon: Layers },
      { title: 'Custom Reports', description: 'Build and export tailored reports for accounting and marketing.', icon: LayoutDashboard },
      { title: 'Multi-Tenant Aggregation', description: 'For agencies: view metrics across all your managed brands in one screen.', icon: Globe, colSpan: 2 },
    ]
  },
  'ai': {
    title: 'AI Intelligence',
    subtitle: 'Automate operations with native AI.',
    description: 'CommerceX utilizes deep learning to forecast inventory needs, generate SEO-optimized product descriptions, and personalize shopper recommendations.',
    color: 'from-indigo-500/20 to-violet-500/20',
    icon: Bot,
    mockupType: 'ai-chat',
    bentoItems: [
      { title: 'Demand Forecasting', description: 'Predict stock-outs before they happen based on seasonal trends.', icon: BarChart, colSpan: 2 },
      { title: 'Auto-Descriptions', description: 'Generate thousands of product descriptions from simple bullet points.', icon: Bot },
      { title: 'Smart Search', description: 'Vector-based semantic search understands intent, not just keywords.', icon: Zap },
      { title: 'Personalization', description: 'Dynamically rearrange product grids based on individual shopper behavior.', icon: Cpu, colSpan: 2 },
    ]
  },
  'headless-commerce': {
    title: 'Headless API Core',
    subtitle: 'GraphQL core for any frontend.',
    description: 'Decouple your frontend from your backend. Build bespoke React Native apps, interactive WebGL experiences, or custom POS systems on top of our APIs.',
    color: 'from-cyan-500/20 to-blue-500/20',
    icon: Blocks,
    mockupType: 'code',
    bentoItems: [
      { title: 'GraphQL & REST', description: 'Choose the paradigm that fits your team. Fully documented, strongly typed.', icon: Blocks, colSpan: 2 },
      { title: 'Sub-second Latency', description: 'Our API layer is deployed to the edge for lightning-fast responses.', icon: Zap },
      { title: 'Webhooks', description: 'Subscribe to over 50+ event types to synchronize external systems.', icon: RefreshCcw },
      { title: 'Platform SDKs', description: 'Official libraries for React, Vue, Node.js, and React Native.', icon: Cpu, colSpan: 2 },
    ]
  }
};
