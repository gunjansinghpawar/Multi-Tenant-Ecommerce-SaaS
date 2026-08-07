import { create } from 'zustand';

export type CheckoutStep = 'auth' | 'shipping-address' | 'billing-address' | 'shipping-method' | 'payment-method' | 'review';

export interface Address {
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
}

export interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  estimatedDelivery: string;
}

export interface CheckoutState {
  // Steps
  currentStep: CheckoutStep;
  setStep: (step: CheckoutStep) => void;
  
  // Auth
  isGuest: boolean;
  setCheckoutMode: (isGuest: boolean) => void;
  guestEmail: string;
  setGuestEmail: (email: string) => void;

  // Addresses
  shippingAddress: Address | null;
  setShippingAddress: (address: Address) => void;
  
  billingAddress: Address | null;
  billingSameAsShipping: boolean;
  setBillingAddress: (address: Address) => void;
  setBillingSameAsShipping: (same: boolean) => void;

  // Shipping & Payment
  shippingMethod: ShippingMethod | null;
  setShippingMethod: (method: ShippingMethod) => void;
  
  paymentMethodId: string | null;
  setPaymentMethodId: (id: string) => void;

  // Discounts
  couponCode: string | null;
  couponDiscount: number; // percentage or fixed amount, keeping it simple for simulator
  applyCoupon: (code: string) => void;
  removeCoupon: () => void;

  giftCardCode: string | null;
  giftCardBalance: number;
  applyGiftCard: (code: string) => void;
  removeGiftCard: () => void;
  
  // Terms
  termsAccepted: boolean;
  setTermsAccepted: (accepted: boolean) => void;

  // Reset
  resetCheckout: () => void;
}

const initialState = {
  currentStep: 'auth' as CheckoutStep,
  isGuest: true,
  guestEmail: '',
  shippingAddress: null,
  billingAddress: null,
  billingSameAsShipping: true,
  shippingMethod: null,
  paymentMethodId: null,
  couponCode: null,
  couponDiscount: 0,
  giftCardCode: null,
  giftCardBalance: 0,
  termsAccepted: false,
};

export const useCheckoutStore = create<CheckoutState>((set) => ({
  ...initialState,
  
  setStep: (step) => set({ currentStep: step }),
  
  setCheckoutMode: (isGuest) => set({ isGuest }),
  
  setGuestEmail: (email) => set({ guestEmail: email }),

  setShippingAddress: (address) => set({ shippingAddress: address }),
  
  setBillingAddress: (address) => set({ billingAddress: address }),
  
  setBillingSameAsShipping: (same) => set({ billingSameAsShipping: same }),

  setShippingMethod: (method) => set({ shippingMethod: method }),
  
  setPaymentMethodId: (id) => set({ paymentMethodId: id }),

  applyCoupon: (code) => {
    // Dummy logic for simulator
    let discount = 0;
    if (code.toLowerCase() === 'save10') discount = 10;
    if (code.toLowerCase() === 'save20') discount = 20;
    set({ couponCode: code, couponDiscount: discount });
  },
  
  removeCoupon: () => set({ couponCode: null, couponDiscount: 0 }),

  applyGiftCard: (code) => {
    // Dummy logic
    let balance = 0;
    if (code === 'GIFT50') balance = 50;
    set({ giftCardCode: code, giftCardBalance: balance });
  },
  
  removeGiftCard: () => set({ giftCardCode: null, giftCardBalance: 0 }),
  
  setTermsAccepted: (accepted) => set({ termsAccepted: accepted }),

  resetCheckout: () => set(initialState),
}));
