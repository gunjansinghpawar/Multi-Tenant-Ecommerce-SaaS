import { create } from "zustand";

export type AuthView = 'login' | 'register' | 'forgot_password' | 'reset_password' | 'magic_link' | 'otp';

interface UiState {
  isMobileMenuOpen: boolean;
  isSearchModalOpen: boolean;
  isQuickViewOpen: boolean;
  isFilterDrawerOpen: boolean;
  isAuthModalOpen: boolean;
  authModalView: AuthView;
  quickViewProductId: string | null;
  toggleMobileMenu: () => void;
  setMobileMenuOpen: (isOpen: boolean) => void;
  toggleSearchModal: () => void;
  setSearchModalOpen: (isOpen: boolean) => void;
  toggleFilterDrawer: () => void;
  setFilterDrawerOpen: (isOpen: boolean) => void;
  setAuthModalOpen: (isOpen: boolean, view?: AuthView) => void;
  setAuthModalView: (view: AuthView) => void;
  openQuickView: (productId: string) => void;
  closeQuickView: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  isMobileMenuOpen: false,
  isSearchModalOpen: false,
  isQuickViewOpen: false,
  isFilterDrawerOpen: false,
  isAuthModalOpen: false,
  authModalView: 'login',
  quickViewProductId: null,
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  setMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
  toggleSearchModal: () => set((state) => ({ isSearchModalOpen: !state.isSearchModalOpen })),
  setSearchModalOpen: (isOpen) => set({ isSearchModalOpen: isOpen }),
  toggleFilterDrawer: () => set((state) => ({ isFilterDrawerOpen: !state.isFilterDrawerOpen })),
  setFilterDrawerOpen: (isOpen) => set({ isFilterDrawerOpen: isOpen }),
  setAuthModalOpen: (isOpen, view) => set((state) => ({ isAuthModalOpen: isOpen, authModalView: view || state.authModalView })),
  setAuthModalView: (view) => set({ authModalView: view }),
  openQuickView: (productId) => set({ isQuickViewOpen: true, quickViewProductId: productId }),
  closeQuickView: () => set({ isQuickViewOpen: false, quickViewProductId: null }),
}));

