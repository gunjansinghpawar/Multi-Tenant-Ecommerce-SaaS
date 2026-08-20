import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { trackEvent } from '../lib/analytics';

export interface CompareItem {
  productId: string;
  name: string;
  price: number;
  compareAtPrice?: number | null;
  image: string;
  brand?: string;
  inStock?: boolean;
}

interface CompareState {
  items: CompareItem[];
  addItem: (item: CompareItem) => void;
  removeItem: (productId: string) => void;
  clearCompare: () => void;
  isInCompare: (productId: string) => boolean;
}

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const currentItems = get().items;
        // Limit to 4 items for comparison
        if (currentItems.length >= 4) {
          return;
        }
        if (!currentItems.find((i) => i.productId === item.productId)) {
          trackEvent('compare_add', { item });
          set({ items: [...currentItems, item] });
        }
      },
      removeItem: (productId) => {
        const currentItems = get().items;
        const itemToRemove = currentItems.find((i) => i.productId === productId);
        if (itemToRemove) {
          trackEvent('compare_remove', { item: itemToRemove });
        }
        set({
          items: currentItems.filter((i) => i.productId !== productId),
        });
      },
      clearCompare: () => set({ items: [] }),
      isInCompare: (productId) => get().items.some((i) => i.productId === productId),
    }),
    {
      name: 'commercex-compare-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
