'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@commercex/ui';
import { cn } from '@/lib/utils';
import {
  Menu, X, ChevronDown, Package, LayoutDashboard, ShoppingCart,
  BarChart, Smartphone, Bot, Blocks, Rocket, Store, Briefcase,
  Building2, Terminal, BookOpen, Users, FileText, Zap, Shield,
  ArrowRight, Globe, Lock, PlayCircle, Map, MessageSquare
} from 'lucide-react';

const productNav = [
  { name: 'Platform Overview', desc: 'The unified CommerceX operating system.', icon: Package, href: '/platform' },
  { name: 'Store Builder', desc: 'Design without limits using our visual editor.', icon: LayoutDashboard, href: '/features/store-builder' },
  { name: 'Commerce Engine', desc: 'High-performance cart and checkout APIs.', icon: ShoppingCart, href: '/features/commerce' },
  { name: 'Marketing', desc: 'Built-in SEO and conversion tools.', icon: BarChart, href: '/features/marketing' },
  { name: 'Analytics', desc: 'Real-time data and multi-tenant reporting.', icon: BarChart, href: '/features/analytics' },
  { name: 'AI Intelligence', desc: 'Automate descriptions and forecasting.', icon: Bot, href: '/features/ai' },
  { name: 'Headless API', desc: 'GraphQL core for any frontend.', icon: Blocks, href: '/features/headless-commerce' },
];

const solutionsNav = [
  { name: 'Enterprise', desc: 'For high-volume global brands.', icon: Building2, href: '/solutions/enterprise' },
  { name: 'Agencies', desc: 'Manage dozens of client storefronts.', icon: Briefcase, href: '/solutions/agencies' },
  { name: 'B2B Wholesale', desc: 'Custom pricing and bulk ordering.', icon: Store, href: '/features/b2b' },
  { name: 'Startups', desc: 'Scale fast with zero technical debt.', icon: Rocket, href: '/solutions/startups' },
  { name: 'D2C Brands', desc: 'Direct-to-consumer digital experiences.', icon: Package, href: '/solutions/d2c' },
  { name: 'Retail', desc: 'Omnichannel point of sale integrations.', icon: Store, href: '/solutions/retail' },
];

const resourcesNav = [
  { name: 'Developers', desc: 'API docs, SDKs, and webhooks.', icon: Terminal, href: '/developers' },
  { name: 'Integrations', desc: 'Connect to your favorite tools.', icon: Blocks, href: '/integrations' },
  { name: 'Themes', desc: 'Premium headless starter kits.', icon: LayoutDashboard, href: '/themes' },
  { name: 'Blog', desc: 'Latest product updates and commerce strategies.', icon: FileText, href: '/blog' },
  { name: 'Case Studies', desc: 'How top brands scale with CommerceX.', icon: BookOpen, href: '/case-studies' },
  { name: 'Resources', desc: 'Guides, webinars, and whitepapers.', icon: BookOpen, href: '/resources' },
];

const companyNav = [
  { name: 'About Us', desc: 'Our mission and leadership team.', icon: Users, href: '/about' },
  { name: 'Careers', desc: 'Join the commerce revolution.', icon: Rocket, href: '/careers' },
  { name: 'Contact', desc: 'Get in touch with our sales team.', icon: MessageSquare, href: '/contact' },
  { name: 'Customers', desc: 'Join 10,000+ scaling brands.', icon: Globe, href: '/customers' },
  { name: 'Status', desc: 'Real-time platform uptime.', icon: Zap, href: '/status' },
  { name: 'Security', desc: 'Enterprise-grade compliance & SOC2.', icon: Shield, href: '/security' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const renderDropdown = (items: any[], activeKey: string, align: 'center' | 'right' = 'center') => (
    <AnimatePresence>
      {activeDropdown === activeKey && (
        <motion.div
          id={`${activeKey}-dropdown`}
          initial={{ opacity: 0, y: 15, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.98 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={cn(
            "absolute top-full pt-6 w-[800px]",
            align === 'center' ? "left-1/2 -translate-x-1/2" : "right-0"
          )}
        >
          {/* Glassmorphic Mega Menu */}
          <div className="relative bg-card/95 backdrop-blur-2xl border border-white/10 rounded-[24px] shadow-2xl overflow-hidden flex">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />

            {/* Links Grid */}
            <div className="w-2/3 p-6 grid grid-cols-2 gap-x-2 gap-y-1 relative z-10">
              {items.map((item) => (
                <Link key={item.name} href={item.href} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group">
                  <div className="mt-0.5 rounded-lg bg-background/50 border border-white/10 p-2 text-muted-foreground group-hover:text-primary group-hover:border-primary/30 group-hover:bg-primary/10 transition-all shadow-sm">
                    <item.icon size={18} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{item.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{item.desc}</div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Featured Sidebar */}
            <div className="w-1/3 bg-muted/30 border-l border-white/5 p-6 relative z-10 flex flex-col justify-between group cursor-pointer">
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors" />
              <div>
                <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-bold tracking-widest text-primary uppercase mb-4">
                  Featured
                </div>
                <h4 className="font-bold text-lg mb-2">CommerceX V2.4</h4>
                <p className="text-sm text-muted-foreground mb-4">Explore our massive new update featuring native AI forecasting and Edge caching.</p>
              </div>
              <div className="flex items-center text-sm font-bold text-primary group-hover:translate-x-1 transition-transform">
                Read the changelog <ArrowRight size={16} className="ml-1" />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-500 border-b',
        isScrolled
          ? 'bg-background/40 backdrop-blur-2xl border-white/10 shadow-2xl py-3'
          : 'bg-transparent border-transparent py-6'
      )}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group relative z-10">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform group-hover:scale-105 shadow-lg shadow-primary/20">
            <Package size={20} strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold tracking-tight">CommerceX</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">

          <div className="relative" onMouseEnter={() => setActiveDropdown('product')} onMouseLeave={() => setActiveDropdown(null)} onFocus={() => setActiveDropdown('product')} onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setActiveDropdown(null); }}>
            <button aria-expanded={activeDropdown === 'product'} aria-controls="product-dropdown" className={cn("flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", activeDropdown === 'product' ? 'bg-white/10 text-foreground' : 'text-muted-foreground hover:text-foreground')}>
              Product <ChevronDown size={14} className={cn("transition-transform opacity-50", activeDropdown === 'product' && "rotate-180")} aria-hidden="true" />
            </button>
            {renderDropdown(productNav, 'product')}
          </div>

          <div className="relative" onMouseEnter={() => setActiveDropdown('solutions')} onMouseLeave={() => setActiveDropdown(null)} onFocus={() => setActiveDropdown('solutions')} onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setActiveDropdown(null); }}>
            <button aria-expanded={activeDropdown === 'solutions'} aria-controls="solutions-dropdown" className={cn("flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", activeDropdown === 'solutions' ? 'bg-white/10 text-foreground' : 'text-muted-foreground hover:text-foreground')}>
              Solutions <ChevronDown size={14} className={cn("transition-transform opacity-50", activeDropdown === 'solutions' && "rotate-180")} aria-hidden="true" />
            </button>
            {renderDropdown(solutionsNav, 'solutions')}
          </div>

          <div className="relative" onMouseEnter={() => setActiveDropdown('resources')} onMouseLeave={() => setActiveDropdown(null)} onFocus={() => setActiveDropdown('resources')} onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setActiveDropdown(null); }}>
            <button aria-expanded={activeDropdown === 'resources'} aria-controls="resources-dropdown" className={cn("flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", activeDropdown === 'resources' ? 'bg-white/10 text-foreground' : 'text-muted-foreground hover:text-foreground')}>
              Resources <ChevronDown size={14} className={cn("transition-transform opacity-50", activeDropdown === 'resources' && "rotate-180")} aria-hidden="true" />
            </button>
            {renderDropdown(resourcesNav, 'resources', 'right')}
          </div>

          <div className="relative" onMouseEnter={() => setActiveDropdown('company')} onMouseLeave={() => setActiveDropdown(null)} onFocus={() => setActiveDropdown('company')} onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setActiveDropdown(null); }}>
            <button aria-expanded={activeDropdown === 'company'} aria-controls="company-dropdown" className={cn("flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", activeDropdown === 'company' ? 'bg-white/10 text-foreground' : 'text-muted-foreground hover:text-foreground')}>
              Company <ChevronDown size={14} className={cn("transition-transform opacity-50", activeDropdown === 'company' && "rotate-180")} aria-hidden="true" />
            </button>
            {renderDropdown(companyNav, 'company', 'right')}
          </div>

          <Link href="/pricing" className="text-sm font-bold text-muted-foreground hover:text-foreground transition-all px-4 py-2 rounded-full">
            Pricing
          </Link>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3 relative z-10">
          <Link href="/login" className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors px-3 py-2" data-track="login_nav">
            Sign In
          </Link>
          <Link href="/demo" data-track="demo_nav">
            <Button size="sm" className="rounded-full px-5 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
              Book Demo
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 -mr-2 text-foreground/80 hover:text-foreground relative z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-3xl pt-24 pb-8 px-4 overflow-y-auto lg:hidden flex flex-col"
          >
            <div className="flex-1 flex flex-col gap-8">

              {/* Product Group */}
              <div>
                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4 px-2">Product</h3>
                <div className="grid grid-cols-1 gap-2">
                  {productNav.map((item) => (
                    <Link key={item.name} href={item.href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 active:bg-muted transition-colors">
                      <div className="rounded-lg bg-background border border-border p-2 text-primary">
                        <item.icon size={18} />
                      </div>
                      <span className="font-bold">{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Solutions Group */}
              <div>
                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4 px-2">Solutions</h3>
                <div className="grid grid-cols-1 gap-2">
                  {solutionsNav.map((item) => (
                    <Link key={item.name} href={item.href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 active:bg-muted transition-colors">
                      <div className="rounded-lg bg-background border border-border p-2 text-primary">
                        <item.icon size={18} />
                      </div>
                      <span className="font-bold">{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Resources & Company (Merged for brevity on mobile) */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div>
                  <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4 px-2">Resources</h3>
                  <div className="flex flex-col gap-2">
                    {resourcesNav.map(item => (
                      <Link key={item.name} href={item.href} className="px-2 py-1 text-sm font-medium hover:text-primary transition-colors">{item.name}</Link>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4 px-2">Company</h3>
                  <div className="flex flex-col gap-2">
                    {companyNav.map(item => (
                      <Link key={item.name} href={item.href} className="px-2 py-1 text-sm font-medium hover:text-primary transition-colors">{item.name}</Link>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Sticky Mobile CTA Bottom */}
            <div className="sticky bottom-0 left-0 right-0 pt-6 mt-6 bg-background/95 backdrop-blur-xl border-t border-border flex flex-col gap-3">
              <Link href="/demo" className="w-full" data-track="demo_nav_mobile">
                <Button size="lg" className="w-full rounded-full shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
                  Book Demo
                </Button>
              </Link>
              <Link href="/login" className="w-full" data-track="login_nav_mobile">
                <Button size="lg" variant="outline" className="w-full rounded-full font-bold">
                  Sign In
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
