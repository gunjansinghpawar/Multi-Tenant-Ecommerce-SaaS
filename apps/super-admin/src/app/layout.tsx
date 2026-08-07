import React from 'react';
import { Inter } from 'next/font/google';
import '@commercex/ui/globals.css';
import { ThemeProvider, PageTransition, SidebarProvider, Toaster } from '@commercex/ui';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'CommerceX — Super Admin Portal',
  description: 'Platform Super Admin Management Console',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SidebarProvider>
            <PageTransition>{children}</PageTransition>
            <Toaster />
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
