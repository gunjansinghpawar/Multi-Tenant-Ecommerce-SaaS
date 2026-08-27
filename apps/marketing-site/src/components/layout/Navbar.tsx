'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Menu, Package, X } from 'lucide-react';
import { Button } from '@commercex/ui';
import { cn } from '@/lib/utils';

const productNav = [
  ['Platform', 'One connected commerce operating system.', '/platform'],
  ['Store Builder', 'Create storefronts without limits.', '/features/store-builder'],
  ['Commerce Engine', 'Products, inventory, checkout, and orders.', '/features/commerce'],
  ['AI Intelligence', 'Automate content, insights, and forecasting.', '/features/ai'],
  ['Marketing', 'SEO, campaigns, and customer growth.', '/features/marketing'],
  ['Headless API', 'Build custom experiences on your stack.', '/features/headless-commerce'],
];

const solutionNav = [
  ['D2C Brands', 'Move faster from launch to scale.', '/solutions/d2c'],
  ['Agencies', 'Operate multiple client storefronts.', '/solutions/agencies'],
  ['Enterprise', 'Govern global commerce at scale.', '/solutions/enterprise'],
  ['Startups', 'Launch lean and grow without rewrites.', '/solutions/startups'],
  ['Retail', 'Connect digital and physical commerce.', '/solutions/retail'],
];

const resourceNav = [
  ['Developers', 'APIs, SDKs, webhooks, and guides.', '/developers'],
  ['Case Studies', 'See how teams use CommerceX.', '/case-studies'],
  ['Blog', 'Commerce strategy and product updates.', '/blog'],
  ['Changelog', 'What is new in the platform.', '/changelog'],
  ['FAQ', 'Answers to common questions.', '/faq'],
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(null); setMobile(false); }, [pathname]);

  const menu = (label: string, items: string[][]) => (
    <div className="relative" onMouseEnter={() => setOpen(label)} onMouseLeave={() => setOpen(null)}>
      <button aria-expanded={open === label} className={cn('flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground', open === label && 'bg-muted text-foreground')}>
        {label}<ChevronDown className={cn('h-3.5 w-3.5 transition-transform', open === label && 'rotate-180')} />
      </button>
      <AnimatePresence>
        {open === label && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} className="absolute left-1/2 top-full w-[620px] -translate-x-1/2 pt-3">
            <div className="grid grid-cols-2 gap-1 rounded-2xl border border-border bg-card p-3 shadow-2xl">
              {items.map(([name, desc, href]) => (
                <Link key={name} href={href} className="group rounded-xl p-4 transition hover:bg-muted">
                  <div className="flex items-center justify-between"><span className="text-sm font-semibold">{name}</span><ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" /></div>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">{desc}</p>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <header className={cn('fixed inset-x-0 top-0 z-50 transition-all duration-300', scrolled ? 'border-b border-border/80 bg-background/85 backdrop-blur-xl' : 'bg-transparent')}>
      <div className="marketing-container flex h-[72px] items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/20"><Package className="h-4 w-4" /></span>
          <span className="text-lg font-semibold tracking-[-0.02em]">CommerceX</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {menu('Product', productNav)}
          {menu('Solutions', solutionNav)}
          {menu('Resources', resourceNav)}
          <Link href="/pricing" className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground">Pricing</Link>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/login" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">Sign in</Link>
          <Link href="/demo"><Button size="sm" className="rounded-full px-5">Book a demo</Button></Link>
        </div>

        <button onClick={() => setMobile(!mobile)} className="rounded-lg p-2 lg:hidden" aria-label={mobile ? 'Close menu' : 'Open menu'}>
          {mobile ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {mobile && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'calc(100vh - 72px)' }} exit={{ opacity: 0, height: 0 }} className="overflow-y-auto border-t border-border bg-background lg:hidden">
            <div className="marketing-container py-6">
              {[['Product', productNav], ['Solutions', solutionNav], ['Resources', resourceNav]].map(([label, items]) => (
                <div key={label as string} className="border-b border-border py-4">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label as string}</p>
                  <div className="grid gap-1">
                    {(items as string[][]).map(([name, desc, href]) => <Link key={name} href={href} className="rounded-xl p-3 hover:bg-muted"><p className="text-sm font-semibold">{name}</p><p className="mt-1 text-xs text-muted-foreground">{desc}</p></Link>)}
                  </div>
                </div>
              ))}
              <Link href="/pricing" className="block py-5 text-sm font-semibold">Pricing</Link>
              <div className="flex gap-3"><Link href="/login" className="flex-1"><Button variant="outline" className="w-full rounded-full">Sign in</Button></Link><Link href="/demo" className="flex-1"><Button className="w-full rounded-full">Book a demo</Button></Link></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
