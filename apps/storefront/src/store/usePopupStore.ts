import { create } from 'zustand';

export type PopupType = 
  | 'CONFIRMATION' 
  | 'STATUS' 
  | 'PREFERENCES' 
  | 'ENGAGEMENT' 
  | 'GATEKEEPER' 
  | 'QUICK_VIEW'
  | 'PRODUCT_ACTION'
  | 'CART_ACTION'
  | 'SHARE'
  | null;

export interface PopupData {
  title?: string;
  message?: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  // Specific data payloads
  engagementType?: 'newsletter' | 'exit-intent' | 'abandoned-cart';
  gatekeeperType?: 'age' | 'cookie';
  productActionType?: 'quick-add' | 'size-guide' | 'stock-alert' | 'notify-me' | 'back-in-stock' | 'product-preview';
  cartActionType?: 'shipping-calculator' | 'coupon' | 'gift-card';
  productId?: string;
  shareUrl?: string;
  preventClose?: boolean;
}

interface PopupState {
  activePopup: PopupType;
  popupData: PopupData | null;
  openPopup: (type: PopupType, data?: PopupData | null) => void;
  closePopup: () => void;
}

export const usePopupStore = create<PopupState>((set) => ({
  activePopup: null,
  popupData: null,
  openPopup: (type, data = null) => {
    // Lock body scroll
    if (typeof window !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
    set({ activePopup: type, popupData: data });
  },
  closePopup: () => {
    // Unlock body scroll
    if (typeof window !== 'undefined') {
      document.body.style.overflow = 'unset';
    }
    set({ activePopup: null, popupData: null });
  },
}));
