'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, ArrowRight } from 'lucide-react';
import { Button, Input } from '@commercex/ui';
import { NewsletterForm } from '../forms/NewsletterForm';

const footerLinks = {
  shop: [
    { name: 'New Arrivals', href: '/collections/new' },
    { name: 'Bestsellers', href: '/collections/bestsellers' },
    { name: 'Men', href: '/collections/men' },
    { name: 'Women', href: '/collections/women' },
    { name: 'Sale', href: '/collections/sale' },
  ],
  support: [
    { name: 'Contact Us', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Shipping & Returns', href: '/shipping-returns' },
    { name: 'Track Order', href: '/track-order' },
    { name: 'Size Guide', href: '/size-guide' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Sustainability', href: '/sustainability' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border pt-16 pb-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-5 gap-8 laptop:gap-12 mb-16">
          
          {/* Brand & Newsletter Column */}
          <div className="laptop:col-span-2">
            <Link href="/" className="font-bold text-2xl tracking-tight uppercase inline-block mb-6">
              Commerce<span className="text-primary">X</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Subscribe to our newsletter to receive exclusive offers, latest news and updates.
            </p>
            <NewsletterForm />
            <div className="flex items-center gap-4 mt-8 text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-foreground transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-foreground transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-foreground transition-colors" aria-label="Youtube">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Shop</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground hover:underline underline-offset-4 text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground hover:underline underline-offset-4 text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground hover:underline underline-offset-4 text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col tablet:flex-row items-center justify-between pt-8 border-t border-border/50 gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} CommerceX. All rights reserved.
          </p>
          <div className="flex gap-4 items-center">
             {/* Payment Icons Placeholder */}
             <div className="flex gap-2 opacity-50 grayscale">
                <div className="h-6 w-10 bg-muted rounded border border-border"></div>
                <div className="h-6 w-10 bg-muted rounded border border-border"></div>
                <div className="h-6 w-10 bg-muted rounded border border-border"></div>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
