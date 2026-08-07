import React from 'react';
import { Inter } from 'next/font/google';
import '@commercex/ui/globals.css';
import { ThemeProvider, PageTransition, SidebarProvider, Toaster } from '@commercex/ui';
import { Providers } from '../store/provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'CommerceX — Merchant Admin Dashboard',
  description: 'Multi-Tenant Merchant Management Dashboard',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Providers>
            <SidebarProvider>
              <PageTransition>{children}</PageTransition>
              <Toaster />
            </SidebarProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
