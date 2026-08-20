import React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider, PageTransition, Toaster } from '@commercex/ui';
import { AnnouncementBar } from '../components/layout/announcement-bar';
import { Header } from '../components/layout/header';
import { SkipToContent } from '../components/layout/skip-to-content';
import { Footer } from '../components/layout/footer';
import { ClientOverlays } from '../components/layout/client-overlays';
import { OrganizationSchema, LocalBusinessSchema } from '../components/seo/structured-data';

const inter = Inter({ subsets: ['latin'] });

import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://commercex.com'),
  title: {
    default: 'CommerceX — Tenant Storefront',
    template: '%s | CommerceX',
  },
  description: 'Next-generation headless eCommerce storefront powered by CommerceX.',
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'CommerceX — Tenant Storefront',
    description: 'Next-generation headless eCommerce storefront powered by CommerceX.',
    siteName: 'CommerceX',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CommerceX Storefront',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CommerceX — Tenant Storefront',
    description: 'Next-generation headless eCommerce storefront powered by CommerceX.',
    creator: '@commercex',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <OrganizationSchema />
        <LocalBusinessSchema />
      </head>
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SkipToContent />
          <AnnouncementBar message="Free shipping on all orders over $100!" href="/collections/sale" />
          <Header />
          <main id="main-content" className="flex-1 flex flex-col">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />

          {/* Overlays */}
          <ClientOverlays />

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
