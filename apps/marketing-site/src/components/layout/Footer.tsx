import React from 'react';
import Link from 'next/link';
import { Package, Twitter, Github, Linkedin } from 'lucide-react';

const footerLinks = {
  Product: [
    { name: 'Platform Overview', href: '/platform' },
    { name: 'Store Builder', href: '/features/store-builder' },
    { name: 'Commerce Engine', href: '/features/commerce' },
    { name: 'Marketing & SEO', href: '/features/marketing' },
    { name: 'WhatsApp Automation', href: '/features/whatsapp' },
    { name: 'AI Features', href: '/features/ai' },
    { name: 'Headless Commerce', href: '/features/headless-commerce' },
  ],
  Solutions: [
    { name: 'Startups', href: '/solutions/startups' },
    { name: 'D2C Brands', href: '/solutions/d2c' },
    { name: 'Agencies', href: '/solutions/agencies' },
    { name: 'Enterprise', href: '/solutions/enterprise' },
    { name: 'Retail', href: '/solutions/retail' },
  ],
  Resources: [
    { name: 'Documentation', href: '/docs' },
    { name: 'Blog', href: '/blog' },
    { name: 'Guides', href: '/guides' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Community', href: '/community' },
  ],
  Developers: [
    { name: 'API Reference', href: '/api' },
    { name: 'Webhooks', href: '/developers/webhooks' },
    { name: 'SDKs', href: '/developers/sdks' },
    { name: 'Status', href: '/status' },
    { name: 'Security', href: '/security' },
  ],
  Company: [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact Sales', href: '/contact/sales' },
    { name: 'Partners', href: '/partners' },
    { name: 'Legal', href: '/legal' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 lg:gap-12 mb-16">
          <div className="col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform group-hover:scale-105 shadow-sm">
                <Package size={20} strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold tracking-tight">CommerceX</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Create, customize, launch, and grow your entire ecommerce business from one unified platform. Engineered for scale.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors bg-muted p-2 rounded-full">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors bg-muted p-2 rounded-full">
                <Github size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors bg-muted p-2 rounded-full">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="col-span-1">
              <h3 className="font-semibold text-sm tracking-tight mb-5">{category}</h3>
              <ul className="space-y-3.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground hover:underline underline-offset-4 transition-all"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} CommerceX Inc. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link href="/cookie-policy" className="hover:text-foreground transition-colors">Cookie Policy</Link>
            <div className="flex items-center gap-2 ml-2 pl-4 border-l border-border">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
              </span>
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
