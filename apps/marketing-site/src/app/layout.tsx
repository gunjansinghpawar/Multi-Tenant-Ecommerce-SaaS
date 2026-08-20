import React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider, PageTransition, Toaster } from '@commercex/ui';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AnalyticsProvider } from '@/components/providers/AnalyticsProvider';

const inter = Inter({ subsets: ['latin'] });

import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://commercex.com'),
  title: {
    default: 'CommerceX — The Complete Multi-Tenant Ecommerce OS',
    template: '%s | CommerceX',
  },
  description: 'Create, launch, manage, market, analyze, and scale an entire ecommerce business from one platform.',
  openGraph: {
    title: 'CommerceX — The Complete Multi-Tenant Ecommerce OS',
    description: 'Create, launch, manage, market, analyze, and scale an entire ecommerce business from one platform.',
    url: 'https://commercex.com',
    siteName: 'CommerceX',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CommerceX',
    description: 'The Complete Multi-Tenant Ecommerce OS',
    creator: '@commercex',
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

const globalSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://commercex.com/#organization',
      name: 'CommerceX',
      url: 'https://commercex.com',
      logo: 'https://commercex.com/logo.png',
      sameAs: [
        'https://twitter.com/commercex',
        'https://linkedin.com/company/commercex',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://commercex.com/#website',
      url: 'https://commercex.com',
      name: 'CommerceX',
      publisher: {
        '@id': 'https://commercex.com/#organization',
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
        />
      </head>
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased selection:bg-primary/30 selection:text-primary`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AnalyticsProvider />
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:p-4 focus:bg-background focus:text-foreground focus:outline-none focus:ring-2 focus:ring-primary rounded-br-lg font-medium">
            Skip to main content
          </a>
          <Navbar />
          <PageTransition>
            <main id="main-content" className="flex-1 pt-16" tabIndex={-1}>
              {children}
            </main>
          </PageTransition>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
