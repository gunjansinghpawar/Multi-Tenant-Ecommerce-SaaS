'use client';

import React from 'react';
import Link from 'next/link';
import { X, ChevronRight } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@commercex/ui';
import { useUiStore } from '../../store/use-ui-store';

const navigationLinks = [
  { name: 'New Arrivals', href: '/collections/new' },
  { name: 'Men', href: '/collections/men' },
  { name: 'Women', href: '/collections/women' },
  { name: 'Accessories', href: '/collections/accessories' },
  { name: 'Sale', href: '/collections/sale', highlight: true },
];

export function MobileMenu() {
  const { isMobileMenuOpen, setMobileMenuOpen } = useUiStore();

  return (
    <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
      <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0 flex flex-col">
        <SheetHeader className="p-6 border-b border-border/50 text-left">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          <nav className="flex flex-col py-4">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center justify-between px-6 py-4 hover:bg-muted/50 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className={`text-base font-medium ${link.highlight ? 'text-destructive' : 'text-foreground'}`}>
                  {link.name}
                </span>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-6 border-t border-border/50 bg-muted/20">
          <div className="flex flex-col gap-4">
            <Link href="/account" className="text-sm font-medium hover:underline underline-offset-4" onClick={() => setMobileMenuOpen(false)}>
              My Account
            </Link>
            <Link href="/orders" className="text-sm font-medium hover:underline underline-offset-4" onClick={() => setMobileMenuOpen(false)}>
              Order History
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:underline underline-offset-4" onClick={() => setMobileMenuOpen(false)}>
              Contact Support
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
