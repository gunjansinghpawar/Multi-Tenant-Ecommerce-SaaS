import { notFound } from 'next/navigation';
import { OrdersTab } from '@/components/account/tabs/orders-tab';
import { ProfileTab } from '@/components/account/tabs/profile-tab';
import { AddressesTab } from '@/components/account/tabs/addresses-tab';
import { TicketsTab } from '@/components/account/tabs/tickets-tab';
import { DownloadsTab } from '@/components/account/tabs/downloads-tab';
import { CardsTab } from '@/components/account/tabs/cards-tab';
import { InvoicesTab } from '@/components/account/tabs/invoices-tab';
import { NotificationsTab } from '@/components/account/tabs/notifications-tab';
import { WishlistTab } from '@/components/account/tabs/wishlist-tab';
import { SecurityTab } from '@/components/account/tabs/security-tab';
import { PlaceholderTab } from '@/components/account/tabs/placeholder-tab';

// List of all valid tabs based on the Sidebar configuration
const VALID_TABS = [
  'orders', 'wishlist', 'recently-viewed', 'reviews',
  'cards', 'wallet', 'invoices',
  'coupons', 'loyalty', 'referral',
  'profile', 'addresses', 'security', 'subscriptions', 'notifications',
  'tickets', 'downloads', 'settings'
];

interface PageProps {
  params: Promise<{ tab: string }>;
}

export default async function AccountTabPage({ params }: PageProps) {
  const resolvedParams = await params;
  const tab = resolvedParams.tab;

  if (!VALID_TABS.includes(tab)) {
    notFound();
  }

  // Render fully implemented tabs
  switch (tab) {
    case 'orders':
      return <OrdersTab />;
    case 'profile':
      return <ProfileTab />;
    case 'addresses':
      return <AddressesTab />;
    case 'tickets':
      return <TicketsTab />;
    case 'downloads':
      return <DownloadsTab />;
    case 'cards':
      return <CardsTab />;
    case 'invoices':
      return <InvoicesTab />;
    case 'notifications':
      return <NotificationsTab />;
    case 'wishlist':
      return <WishlistTab />;
    case 'security':
      return <SecurityTab />;

    // Fallback for scaffolded tabs
    default:
      // Format string: 'recently-viewed' -> 'Recently Viewed'
      const formattedTitle = tab.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      return <PlaceholderTab title={formattedTitle} />;
  }
}
