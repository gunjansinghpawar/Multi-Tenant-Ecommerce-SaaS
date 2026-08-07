'use client';

import React, { useState } from 'react';
import { AccountSidebar } from '../../components/account/account-sidebar';
import { Menu, X } from 'lucide-react';
import { Button, Sheet, SheetContent, SheetHeader, SheetTitle } from '@commercex/ui';

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 min-h-screen">
      
      {/* Mobile Header / Trigger */}
      <div className="lg:hidden flex items-center justify-between mb-6 pb-4 border-b">
        <h1 className="text-xl font-bold">My Account</h1>
        <Button variant="outline" size="sm" onClick={() => setIsMobileMenuOpen(true)}>
          <Menu className="h-4 w-4 mr-2" /> Menu
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <AccountSidebar />
        </aside>

        {/* Mobile Sidebar (Sheet) */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetContent side="left" className="w-[85vw] sm:w-[350px] p-6">
            <SheetHeader className="mb-6 flex flex-row items-center justify-between space-y-0">
              <SheetTitle className="text-left">Account Menu</SheetTitle>
            </SheetHeader>
            <AccountSidebar isMobile onMobileClose={() => setIsMobileMenuOpen(false)} />
          </SheetContent>
        </Sheet>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
