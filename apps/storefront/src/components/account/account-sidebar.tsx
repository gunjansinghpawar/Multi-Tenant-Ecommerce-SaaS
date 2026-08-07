'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@commercex/utils';
import { 
  LayoutDashboard, ShoppingBag, Heart, MapPin, User, Shield, 
  CreditCard, Wallet, Tag, Award, Repeat, Bell, Star, 
  LifeBuoy, Download, FileText, Users, Clock, Settings, LogOut 
} from 'lucide-react';
import { Button } from '@commercex/ui';

const NAV_GROUPS = [
  {
    title: 'Overview',
    items: [
      { name: 'Dashboard', href: '/account', icon: LayoutDashboard },
    ]
  },
  {
    title: 'Shopping',
    items: [
      { name: 'Orders', href: '/account/orders', icon: ShoppingBag },
      { name: 'Wishlist', href: '/account/wishlist', icon: Heart },
      { name: 'Recently Viewed', href: '/account/recently-viewed', icon: Clock },
      { name: 'Reviews', href: '/account/reviews', icon: Star },
    ]
  },
  {
    title: 'Payments & Billing',
    items: [
      { name: 'Saved Cards', href: '/account/cards', icon: CreditCard },
      { name: 'Wallet', href: '/account/wallet', icon: Wallet },
      { name: 'Invoices', href: '/account/invoices', icon: FileText },
    ]
  },
  {
    title: 'Rewards & Offers',
    items: [
      { name: 'Coupons', href: '/account/coupons', icon: Tag },
      { name: 'Loyalty Points', href: '/account/loyalty', icon: Award },
      { name: 'Referral', href: '/account/referral', icon: Users },
    ]
  },
  {
    title: 'Account Management',
    items: [
      { name: 'Profile', href: '/account/profile', icon: User },
      { name: 'Addresses', href: '/account/addresses', icon: MapPin },
      { name: 'Security', href: '/account/security', icon: Shield },
      { name: 'Subscriptions', href: '/account/subscriptions', icon: Repeat },
      { name: 'Notifications', href: '/account/notifications', icon: Bell },
    ]
  },
  {
    title: 'Support',
    items: [
      { name: 'Support Tickets', href: '/account/tickets', icon: LifeBuoy },
      { name: 'Downloads', href: '/account/downloads', icon: Download },
      { name: 'Settings', href: '/account/settings', icon: Settings },
    ]
  }
];

export function AccountSidebar({ isMobile = false, onMobileClose }: { isMobile?: boolean, onMobileClose?: () => void }) {
  const pathname = usePathname();

  return (
    <div className={cn("flex flex-col gap-8", !isMobile && "sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto no-scrollbar pb-12")}>
      {/* User Mini Profile */}
      <div className="flex items-center gap-4 px-3 pb-6 border-b">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
          JD
        </div>
        <div>
          <h3 className="font-semibold text-foreground">John Doe</h3>
          <p className="text-xs text-muted-foreground">Premium Member</p>
        </div>
      </div>

      <nav className="flex flex-col gap-6">
        {NAV_GROUPS.map((group) => (
          <div key={group.title}>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
              {group.title}
            </h4>
            <div className="flex flex-col space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => onMobileClose?.()}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                      isActive 
                        ? "bg-primary/10 text-primary" 
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="pt-4 border-t mt-auto">
        <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10">
          <LogOut className="mr-3 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
