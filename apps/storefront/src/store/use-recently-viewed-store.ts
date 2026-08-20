import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ProductCardProps } from '../components/product/product-card';

interface RecentlyViewedState {
  items: ProductCardProps[];
  addViewedItem: (item: ProductCardProps) => void;
  clearHistory: () => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set, get) => ({
      items: [],
      addViewedItem: (item) => {
        const currentItems = get().items;
        // Remove if already exists to put it at the beginning
        const filtered = currentItems.filter((i) => i.id !== item.id);
        // Keep max 10 items
        set({ items: [item, ...filtered].slice(0, 10) });
      },
      clearHistory: () => set({ items: [] }),
    }),
    {
      name: 'commercex-recently-viewed',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
