'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, Search, ShoppingBag, User } from 'lucide-react';
import { Button } from '@commercex/ui';
import { cn } from '@commercex/utils';
import { useCartStore } from '../../store/use-cart-store';
import { useUiStore } from '../../store/use-ui-store';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartCount, setIsOpen: setCartOpen } = useCartStore();
  const { toggleMobileMenu, toggleSearchModal, setAuthModalOpen } = useUiStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-300 border-b',
        isScrolled
          ? 'bg-background/80 backdrop-blur-md border-border shadow-sm'
          : 'bg-background border-transparent'
      )}
    >
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between">

          {/* Mobile Menu & Search (Left) */}
          <div className="flex flex-1 items-center tablet:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu} aria-label="Open menu" aria-haspopup="dialog">
              <Menu className="h-5 w-5" aria-hidden="true" />
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleSearchModal} aria-label="Search" aria-haspopup="dialog" className="ml-1 hidden foldable:flex">
              <Search className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>

          {/* Desktop Navigation (Left) */}
          <nav className="hidden tablet:flex flex-1 items-center gap-6">
            <Link href="/collections/new" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              New Arrivals
            </Link>
            <Link href="/collections/men" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Men
            </Link>
            <Link href="/collections/women" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Women
            </Link>
          </nav>

          {/* Logo (Center) */}
          <div className="flex flex-shrink-0 items-center justify-center">
            <Link href="/" className="font-bold text-2xl tracking-tight uppercase">
              Commerce<span className="text-primary">X</span>
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex flex-1 items-center justify-end gap-1 sm:gap-2">
            <Button variant="ghost" size="icon" onClick={toggleSearchModal} aria-label="Search" aria-haspopup="dialog" className="hidden tablet:flex">
              <Search className="h-5 w-5" aria-hidden="true" />
            </Button>

            <Button variant="ghost" size="icon" aria-label="Account" aria-haspopup="dialog" className="hidden mobile:flex" onClick={() => setAuthModalOpen(true)}>
              <User className="h-5 w-5" aria-hidden="true" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="relative"
              aria-label="Cart"
              aria-haspopup="dialog"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag className="h-5 w-5" aria-hidden="true" />
              {cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground"
                  aria-label={`${cartCount} items in cart`}
                >
                  {cartCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
