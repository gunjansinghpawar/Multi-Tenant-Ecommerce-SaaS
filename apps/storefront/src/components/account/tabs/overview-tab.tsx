import React from 'react';
import { Package, CreditCard, Award, ArrowRight } from 'lucide-react';
import { Button } from '@commercex/ui';
import Link from 'next/link';

export function OverviewTab() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Dashboard Overview</h2>
        <p className="text-muted-foreground mt-1">Welcome back, John! Here is a summary of your account activity.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-full bg-primary/10 text-primary">
              <Package className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
              <h3 className="text-2xl font-bold">12</h3>
            </div>
          </div>
          <Link href="/account/orders" className="text-sm text-primary hover:underline flex items-center gap-1">
            View all orders <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-full bg-primary/10 text-primary">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Wallet Balance</p>
              <h3 className="text-2xl font-bold">$145.00</h3>
            </div>
          </div>
          <Link href="/account/wallet" className="text-sm text-primary hover:underline flex items-center gap-1">
            Manage wallet <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-full bg-primary/10 text-primary">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Loyalty Points</p>
              <h3 className="text-2xl font-bold">2,450</h3>
            </div>
          </div>
          <Link href="/account/loyalty" className="text-sm text-primary hover:underline flex items-center gap-1">
            Redeem points <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="border rounded-xl overflow-hidden">
        <div className="bg-muted/30 px-6 py-4 border-b">
          <h3 className="font-semibold">Recent Orders</h3>
        </div>
        <div className="divide-y">
          {[1, 2].map((i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 gap-4">
              <div>
                <p className="font-medium">Order #ORD-2026-{8492 + i}</p>
                <p className="text-sm text-muted-foreground mt-1">Placed on July {15 + i}, 2026</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary">
                  Delivered
                </span>
                <Button variant="outline" size="sm">Track</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
