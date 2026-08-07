"use client";

import React from "react";
import { 
  PageHeader, 
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
} from "@commercex/ui";
import { 
  CreditCardIcon, 
  WalletIcon,
  BanknoteIcon,
  SettingsIcon
} from "lucide-react";

export default function PaymentMethodsPage() {
  const providers = [
    { 
      name: "Stripe", 
      type: "Credit & Debit Cards", 
      status: "Active", 
      icon: CreditCardIcon, 
      color: "text-blue-500",
      description: "Accept all major global credit cards, Apple Pay, and Google Pay." 
    },
    { 
      name: "Razorpay", 
      type: "UPI, Cards, NetBanking", 
      status: "Active", 
      icon: BanknoteIcon, 
      color: "text-indigo-600",
      description: "Primary gateway for India. Supports UPI apps, wallets, and domestic cards." 
    },
    { 
      name: "PayPal", 
      type: "Digital Wallet", 
      status: "Inactive", 
      icon: WalletIcon, 
      color: "text-[#003087]",
      description: "Allow customers to check out quickly using their PayPal account." 
    }
  ];

  const manualMethods = [
    { name: "Cash on Delivery (COD)", status: "Active", desc: "Allow customers to pay in cash when the package is delivered. Includes an extra $5 COD fee." },
    { name: "Store Wallet", status: "Active", desc: "Customers can pay using pre-loaded wallet balances or loyalty points." },
    { name: "Direct Bank Transfer (BACS)", status: "Inactive", desc: "Provide bank details at checkout. Order fulfills only after manual confirmation." }
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <PageHeader 
          heading="Payment Methods" 
          text="Configure payment gateways, digital wallets, and manual payment options."
        />
        <Button>Add New Gateway</Button>
      </div>

      <div className="space-y-8">
        
        {/* Automated Gateways */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Payment Providers</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {providers.map((p, i) => (
              <Card key={i} className={`border-2 ${p.status === 'Active' ? 'border-primary/20 bg-primary/5' : ''}`}>
                <CardHeader className="pb-2 flex flex-row items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-white dark:bg-black rounded-md border flex items-center justify-center">
                      <p.icon className={`h-6 w-6 ${p.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-base">{p.name}</CardTitle>
                      <p className="text-xs text-muted-foreground">{p.type}</p>
                    </div>
                  </div>
                  <Badge variant={p.status === 'Active' ? 'success' : 'secondary'}>{p.status}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{p.description}</p>
                  <div className="flex justify-end pt-2 border-t border-primary/10">
                    <Button variant="outline" size="sm">
                      <SettingsIcon className="mr-2 h-4 w-4" />
                      Manage API Keys
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Manual Methods */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Manual Payment Methods</h3>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {manualMethods.map((m, i) => (
                  <div key={i} className="flex items-center justify-between p-4">
                    <div>
                      <p className="font-medium">{m.name}</p>
                      <p className="text-sm text-muted-foreground">{m.desc}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium">{m.status}</span>
                      <div className={`w-10 h-5 rounded-full relative cursor-pointer border ${m.status === 'Active' ? 'bg-primary' : 'bg-muted'}`}>
                        <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 shadow-sm ${m.status === 'Active' ? 'right-0.5' : 'left-0.5'}`}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
