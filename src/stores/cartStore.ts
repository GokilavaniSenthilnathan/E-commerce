import { create } from 'zustand';
import { CartItem, Product } from '../types';

interface CartState {
  items: CartItem[];
  addToCart: (product: Product, quantity: number, size: string, color?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  
  addToCart: (product, quantity, size, color) => {
    const { items } = get();
    const existingItem = items.find(
      item => 
        item.product.id === product.id && 
        item.size === size && 
        item.color === color
    );
    
    if (existingItem) {
      const updatedItems = items.map(item => 
        item === existingItem
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      set({ items: updatedItems });
    } else {
      set({ items: [...items, { product, quantity, size, color }] });
    }
  },
  
  removeFromCart: (productId) => {
    set({ items: get().items.filter(item => item.product.id !== productId) });
  },
  
  updateQuantity: (productId, quantity) => {
    set({
      items: get().items.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      ),
    });
  },
  
  clearCart: () => set({ items: [] }),
  
  get totalItems() {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },
  
  get totalPrice() {
    return get().items.reduce(
      (sum, item) => sum + item.product.price * item.quantity, 
      0
    );
  },
}));