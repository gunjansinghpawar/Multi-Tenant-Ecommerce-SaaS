'use client';

import { usePopupStore } from '@/store/usePopupStore';
import { ConfirmationModal } from './ConfirmationModal';
import { StatusModal } from './StatusModal';
import { PreferencesModal } from './PreferencesModal';
import { EngagementModal } from './EngagementModal';
import { GatekeeperModal } from './GatekeeperModal';
import { ProductQuickViewModal } from './ProductQuickViewModal';
import { useEffect, useState } from 'react';

export function PopupManager() {
  const { activePopup, closePopup } = usePopupStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !activePopup) return null;

  const renderActiveModal = () => {
    switch (activePopup) {
      case 'CONFIRMATION': return <ConfirmationModal />;
      case 'STATUS': return <StatusModal />;
      case 'PREFERENCES': return <PreferencesModal />;
      case 'ENGAGEMENT': return <EngagementModal />;
      case 'GATEKEEPER': return <GatekeeperModal />;
      case 'QUICK_VIEW': return <ProductQuickViewModal />;
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={() => {
          // Gatekeeper modals prevent clicking outside to close
          if (activePopup !== 'GATEKEEPER') {
            closePopup();
          }
        }}
      />
      
      {/* Modal Container */}
      <div className="relative z-10 flex items-center justify-center w-full">
        {renderActiveModal()}
      </div>
    </div>
  );
}
