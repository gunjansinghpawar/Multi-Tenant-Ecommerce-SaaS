'use client';

import dynamic from 'next/dynamic';

const CartDrawer = dynamic(() => import('../cart/cart-drawer').then(mod => mod.CartDrawer), { ssr: false });
const MobileMenu = dynamic(() => import('./mobile-menu').then(mod => mod.MobileMenu), { ssr: false });
const SearchModal = dynamic(() => import('../search/search-modal').then(mod => mod.SearchModal), { ssr: false });
const AuthModal = dynamic(() => import('../auth/auth-modal').then(mod => mod.AuthModal), { ssr: false });
const AIAssistantWidget = dynamic(() => import('../ai/AIAssistantWidget').then(mod => mod.AIAssistantWidget), { ssr: false });
const InstallPrompt = dynamic(() => import('../pwa/InstallPrompt').then(mod => mod.InstallPrompt), { ssr: false });
const OfflineIndicator = dynamic(() => import('../pwa/OfflineIndicator').then(mod => mod.OfflineIndicator), { ssr: false });
const PopupManager = dynamic(() => import('../popups/PopupManager').then(mod => mod.PopupManager), { ssr: false });
const CompareDrawer = dynamic(() => import('../product/compare-drawer').then(mod => mod.CompareDrawer), { ssr: false });
const SalesPop = dynamic(() => import('../popups/SalesPop').then(mod => mod.SalesPop), { ssr: false });
const AnalyticsProvider = dynamic(() => import('../analytics/AnalyticsProvider').then(mod => mod.AnalyticsProvider), { ssr: false });

export function ClientOverlays() {
  return (
    <>
      <CartDrawer />
      <SearchModal />
      <AuthModal />
      <MobileMenu />
      <AIAssistantWidget />
      <InstallPrompt />
      <OfflineIndicator />
      <PopupManager />
      <CompareDrawer />
      <SalesPop />
    </>
  );
}
