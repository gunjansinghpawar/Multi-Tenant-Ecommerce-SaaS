import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useCartStore } from './use-cart-store';

export interface WishlistItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  inStock?: boolean;
}

interface WishlistState {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (productId: string) => void;
  clearWishlist: () => void;
  moveToCart: (productId: string) => void;
  bulkMoveToCart: () => void;
  bulkRemove: (productIds: string[]) => void;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => {
        set((state) => {
          if (state.items.find((i) => i.productId === item.productId)) {
            return state; // Already exists
          }
          return { items: [...state.items, item] };
        });
      },
      
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId)
        }));
      },
      
      clearWishlist: () => {
        set({ items: [] });
      },
      
      moveToCart: (productId) => {
        const item = get().items.find((i) => i.productId === productId);
        if (item) {
          // Add to cart
          useCartStore.getState().addItem({
            id: crypto.randomUUID(),
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: 1,
            image: item.image,
          });
          // Remove from wishlist
          get().removeItem(productId);
        }
      },
      
      bulkMoveToCart: () => {
        const items = get().items;
        const cartStore = useCartStore.getState();
        
        items.forEach((item) => {
          cartStore.addItem({
            id: crypto.randomUUID(),
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: 1,
            image: item.image,
          });
        });
        
        // Empty the wishlist after moving
        set({ items: [] });
      },
      
      bulkRemove: (productIds) => {
        set((state) => ({
          items: state.items.filter((i) => !productIds.includes(i.productId))
        }));
      },
      
      isInWishlist: (productId) => {
        return get().items.some((i) => i.productId === productId);
      }
    }),
    {
      name: 'commercex-wishlist-storage',
    }
  )
);
