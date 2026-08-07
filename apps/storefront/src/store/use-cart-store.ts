import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant?: Record<string, string>;
}

interface CartState {
  items: CartItem[];
  savedItems: CartItem[];
  isOpen: boolean;
  cartCount: number;
  cartTotal: number;
  discountCode: string | null;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  moveToSaved: (id: string) => void;
  moveToCart: (id: string) => void;
  clearCart: () => void;
  setIsOpen: (isOpen: boolean) => void;
  setDiscountCode: (code: string | null) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      savedItems: [],
      isOpen: false,
      cartCount: 0,
      cartTotal: 0,
      discountCode: null,
      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.productId === item.productId);
          
          let newItems;
          if (existingItem) {
            newItems = state.items.map((i) =>
              i.productId === item.productId
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            );
          } else {
            newItems = [...state.items, item];
          }

          return {
            items: newItems,
            cartCount: newItems.reduce((total, i) => total + i.quantity, 0),
            cartTotal: newItems.reduce((total, i) => total + i.price * i.quantity, 0),
            isOpen: true,
          };
        });
      },
      removeItem: (id) => {
        set((state) => {
          const newItems = state.items.filter((i) => i.id !== id);
          return {
            items: newItems,
            cartCount: newItems.reduce((total, i) => total + i.quantity, 0),
            cartTotal: newItems.reduce((total, i) => total + i.price * i.quantity, 0),
          };
        });
      },
      updateQuantity: (id, quantity) => {
        set((state) => {
          if (quantity <= 0) {
            const newItems = state.items.filter((i) => i.id !== id);
            return {
              items: newItems,
              cartCount: newItems.reduce((total, i) => total + i.quantity, 0),
              cartTotal: newItems.reduce((total, i) => total + i.price * i.quantity, 0),
            };
          }

          const newItems = state.items.map((i) =>
            i.id === id ? { ...i, quantity } : i
          );
          return {
            items: newItems,
            cartCount: newItems.reduce((total, i) => total + i.quantity, 0),
            cartTotal: newItems.reduce((total, i) => total + i.price * i.quantity, 0),
          };
        });
      },
      moveToSaved: (id) => {
        set((state) => {
          const itemToMove = state.items.find((i) => i.id === id);
          if (!itemToMove) return state;
          
          const newItems = state.items.filter((i) => i.id !== id);
          const newSavedItems = [...state.savedItems, itemToMove];
          
          return {
            items: newItems,
            savedItems: newSavedItems,
            cartCount: newItems.reduce((total, i) => total + i.quantity, 0),
            cartTotal: newItems.reduce((total, i) => total + i.price * i.quantity, 0),
          };
        });
      },
      moveToCart: (id) => {
        set((state) => {
          const itemToMove = state.savedItems.find((i) => i.id === id);
          if (!itemToMove) return state;
          
          const newSavedItems = state.savedItems.filter((i) => i.id !== id);
          
          const existingItem = state.items.find((i) => i.productId === itemToMove.productId);
          let newItems;
          if (existingItem) {
            newItems = state.items.map((i) =>
              i.productId === itemToMove.productId
                ? { ...i, quantity: i.quantity + itemToMove.quantity }
                : i
            );
          } else {
            newItems = [...state.items, itemToMove];
          }

          return {
            items: newItems,
            savedItems: newSavedItems,
            cartCount: newItems.reduce((total, i) => total + i.quantity, 0),
            cartTotal: newItems.reduce((total, i) => total + i.price * i.quantity, 0),
          };
        });
      },
      clearCart: () => set({ items: [], cartCount: 0, cartTotal: 0, discountCode: null }),
      setIsOpen: (isOpen) => set({ isOpen }),
      setDiscountCode: (code) => set({ discountCode: code }),
    }),
    {
      name: 'commercex-cart-storage',
    }
  )
);
