'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Check, Play, ShoppingBag, Sparkles, TrendingUp } from 'lucide-react';
import { Button } from '@commercex/ui';

const metrics = [
  ['Revenue', '$84,290', '+24.8%'],
  ['Orders', '1,284', '+18.2%'],
  ['Conversion', '4.82%', '+0.9%'],
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border pt-28 sm:pt-32 lg:pt-36">
      <div className="absolute inset-0 marketing-grid pointer-events-none opacity-60" />
      <div className="absolute left-1/2 top-0 h-[620px] w-[900px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px] pointer-events-none" />

      <div className="marketing-container relative">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45 }}>
            <span className="eyebrow"><Sparkles className="h-3.5 w-3.5" /> CommerceX 2.0</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .55, delay: .08 }}
            className="mt-7 text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-8xl"
          >
            The operating system for <span className="text-primary">modern commerce.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .55, delay: .16 }}
            className="mx-auto mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg"
          >
            Launch storefronts, manage products and orders, automate growth, and understand every customer—from one connected multi-tenant platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .55, delay: .24 }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link href="/register">
              <Button size="lg" className="h-12 rounded-full px-7 shadow-xl shadow-primary/20">
                Start for free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline" className="h-12 rounded-full px-7 bg-background/70">
                <Play className="mr-2 h-4 w-4" /> See CommerceX in action
              </Button>
            </Link>
          </motion.div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
            {['No credit card', '14-day trial', 'Cancel anytime'].map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-500" />{item}</span>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .7, delay: .3 }}
          className="relative mx-auto mt-16 max-w-6xl pb-20 sm:mt-20"
        >
          <div className="overflow-hidden rounded-[22px] border border-border bg-card shadow-[0_30px_90px_-35px_hsl(var(--primary)/.35)]">
            <div className="flex h-12 items-center justify-between border-b border-border bg-muted/40 px-4">
              <div className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-red-400/80" /><span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" /></div>
              <div className="hidden rounded-md border border-border bg-background px-4 py-1 text-[10px] text-muted-foreground sm:block">app.commercex.com / overview</div>
              <div className="w-12" />
            </div>

            <div className="grid min-h-[460px] grid-cols-[180px_1fr]">
              <aside className="hidden border-r border-border bg-muted/20 p-4 sm:block">
                <div className="mb-8 flex items-center gap-2 text-sm font-semibold"><ShoppingBag className="h-4 w-4 text-primary" /> CommerceX</div>
                <div className="space-y-1 text-xs text-muted-foreground">
                  {['Overview', 'Orders', 'Products', 'Customers', 'Marketing', 'Analytics'].map((item, i) => (
                    <div key={item} className={`rounded-lg px-3 py-2 ${i === 0 ? 'bg-primary/10 font-medium text-primary' : ''}`}>{item}</div>
                  ))}
                </div>
              </aside>

              <div className="bg-background p-5 sm:p-7">
                <div className="flex items-end justify-between gap-4">
                  <div><p className="text-xs text-muted-foreground">Good morning, Alex</p><h2 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">Store overview</h2></div>
                  <span className="hidden rounded-lg border border-border px-3 py-2 text-xs text-muted-foreground sm:block">Last 30 days</span>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {metrics.map(([label, value, change]) => (
                    <div key={label} className="rounded-xl border border-border bg-card p-4">
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <div className="mt-2 flex items-end justify-between gap-2"><p className="text-xl font-semibold">{value}</p><span className="text-[11px] font-medium text-emerald-600">{change}</span></div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
                  <div className="rounded-xl border border-border p-4">
                    <div className="flex items-center justify-between"><p className="text-sm font-medium">Revenue</p><TrendingUp className="h-4 w-4 text-emerald-500" /></div>
                    <div className="mt-6 flex h-40 items-end gap-2">
                      {[32,45,38,60,52,68,58,76,64,82,74,92,84,98].map((height, i) => <div key={i} className="flex-1 rounded-t-md bg-primary/15" style={{ height: `${height}%` }}><div className="h-full rounded-t-md bg-primary/70" style={{ width: i % 3 === 0 ? '100%' : '70%' }} /></div>)}
                    </div>
                  </div>
                  <div className="rounded-xl border border-border p-4">
                    <p className="text-sm font-medium">Recent activity</p>
                    <div className="mt-5 space-y-4 text-xs">
                      {['Order #4092 paid', 'New customer joined', 'Campaign reached 12k'].map((item, i) => <div key={item} className="flex gap-3"><span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-primary" /><div><p className="font-medium">{item}</p><p className="mt-1 text-muted-foreground">{i + 2} min ago</p></div></div>)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="absolute -right-3 top-28 hidden w-56 rounded-2xl border border-border bg-card p-4 shadow-2xl lg:block">
            <div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600"><Check className="h-4 w-4" /></span><div><p className="text-xs font-semibold">Payment received</p><p className="mt-0.5 text-[11px] text-muted-foreground">Order #4092 · $248.00</p></div></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
