import React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider, PageTransition, Toaster } from '@commercex/ui';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'CommerceX — Tenant Storefront',
  description: 'Default Tenant Storefront Shell',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <PageTransition>{children}</PageTransition>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
