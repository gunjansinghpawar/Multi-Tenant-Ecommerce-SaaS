"use client";

import React from "react";
import { 
  PageHeader, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  Button
} from "@commercex/ui";
import { BookIcon, KeyIcon, WebhookIcon, TerminalIcon, AppWindowIcon, CodeIcon, LockIcon, ActivityIcon, ExternalLinkIcon } from "lucide-react";
import Link from "next/link";

export default function DeveloperDocsPage() {
  const modules = [
    { 
      title: "API Keys", 
      icon: <KeyIcon className="h-5 w-5 text-indigo-500" />,
      desc: "Generate secret tokens to authenticate HTTP requests to the CommerceX REST API. Never expose these in client-side code.",
      link: "/developer/api-keys",
      guide: "To get started, navigate to the API Keys tab, click 'Generate New Key', and copy the 'sk_live_' prefix into your server's Auth header."
    },
    { 
      title: "Webhooks", 
      icon: <WebhookIcon className="h-5 w-5 text-emerald-500" />,
      desc: "Receive real-time HTTP POST payloads when events (like order.created) occur in your store.",
      link: "/developer/webhooks",
      guide: "Register an endpoint in the Webhooks tab. Ensure your server returns a 2xx status code within 5 seconds to prevent retries and failing statuses."
    },
    { 
      title: "SDK & Libraries", 
      icon: <TerminalIcon className="h-5 w-5 text-blue-500" />,
      desc: "Install our official Node.js and React packages to speed up development of headless storefronts.",
      link: "/developer/sdk",
      guide: "Check the SDK tab for npm install commands and initialization snippets. The SDK automatically handles retries and typing."
    },
    { 
      title: "OAuth Apps", 
      icon: <AppWindowIcon className="h-5 w-5 text-orange-500" />,
      desc: "Build public applications that other CommerceX merchants can install on their stores.",
      link: "/developer/oauth",
      guide: "Register a new OAuth App to receive a Client ID and Secret. You will use these to negotiate the standard OAuth2 authorization code flow."
    },
    { 
      title: "Custom Scripts", 
      icon: <CodeIcon className="h-5 w-5 text-purple-500" />,
      desc: "Inject analytics tracking, chat widgets, or custom CSS into your storefront's <head> or <body>.",
      link: "/developer/scripts",
      guide: "Paste raw HTML/JS into the Custom Scripts text areas. For conversion tracking (like FB Pixel), use the 'Checkout Completion Scripts' box."
    },
    { 
      title: "Environment Variables", 
      icon: <LockIcon className="h-5 w-5 text-slate-600" />,
      desc: "Securely store configuration values and third-party API keys without hardcoding them.",
      link: "/developer/env-vars",
      guide: "Values stored here are encrypted. If you prefix a key with 'NEXT_PUBLIC_', it will be accessible in the browser via process.env."
    },
    { 
      title: "System Logs", 
      icon: <ActivityIcon className="h-5 w-5 text-red-500" />,
      desc: "Monitor traffic, debug failed API calls, and review webhook delivery latencies.",
      link: "/developer/logs",
      guide: "The Logs tab shows a live tail of API requests. Look for 4xx or 5xx status codes to identify authentication or validation errors."
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Developer Guide & Documentation" 
        text="A comprehensive overview of the CommerceX extensibility platform."
      >
        <Button variant="outline">
          Full API Reference <ExternalLinkIcon className="ml-2 h-4 w-4" />
        </Button>
      </PageHeader>
      
      <Card className="bg-slate-900 text-white border-0 mb-8">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-4">
            <BookIcon className="h-8 w-8 text-primary" />
            <h2 className="text-2xl font-bold">Platform Overview</h2>
          </div>
          <p className="text-slate-300 max-w-3xl leading-relaxed">
            Welcome to the Developer Center. This portal gives you direct access to the underlying infrastructure powering your store. Whether you are building a custom headless storefront using our <strong>SDK</strong>, integrating an ERP via <strong>Webhooks</strong>, or writing <strong>Custom Scripts</strong> for analytics, you can manage all your configurations here. Review the guide below to understand how each module operates.
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {modules.map((mod, i) => (
          <Card key={i} className="flex flex-col h-full border-slate-200 shadow-sm hover:border-primary/40 transition-colors">
            <CardHeader className="pb-3 border-b">
              <div className="flex justify-between items-start">
                <CardTitle className="flex items-center gap-2 text-lg">
                  {mod.icon} {mod.title}
                </CardTitle>
                <Link href={mod.link}>
                  <Button variant="secondary" size="sm" className="h-7 text-xs">Open Module</Button>
                </Link>
              </div>
              <CardDescription className="pt-2 text-sm">{mod.desc}</CardDescription>
            </CardHeader>
            <CardContent className="pt-4 flex-1">
              <div className="bg-slate-50 p-3 rounded text-sm text-slate-700 border border-slate-100 h-full">
                <strong>Usage Guide:</strong> {mod.guide}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
