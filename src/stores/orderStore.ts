import { create } from 'zustand';
import { Order, OrderStatus, Address, PaymentMethod } from '../types';

interface OrderState {
  currentOrder: Order | null;
  orders: Order[];
  createOrder: (
    items: CartItem[],
    shippingAddress: Address,
    billingAddress: Address,
    paymentMethod: PaymentMethod
  ) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getOrderById: (orderId: string) => Order | undefined;
  getUserOrders: (userId: string) => Order[];
}

export const useOrderStore = create<OrderState>((set, get) => ({
  currentOrder: null,
  orders: [],

  createOrder: async (items, shippingAddress, billingAddress, paymentMethod) => {
    // Calculate order totals
    const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const shipping = subtotal > 50 ? 0 : 4.99;
    const tax = subtotal * 0.07; // 7% tax
    const total = subtotal + shipping + tax;

    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      userId: 'current-user-id', // In a real app, get from auth context
      items,
      status: 'pending',
      shippingAddress,
      billingAddress,
      paymentMethod,
      subtotal,
      shipping,
      tax,
      total,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    set(state => ({
      orders: [...state.orders, newOrder],
      currentOrder: newOrder
    }));

    return newOrder;
  },

  updateOrderStatus: (orderId, status) => {
    set(state => ({
      orders: state.orders.map(order =>
        order.id === orderId
          ? { ...order, status, updatedAt: new Date() }
          : order
      )
    }));
  },

  getOrderById: (orderId) => {
    return get().orders.find(order => order.id === orderId);
  },

  getUserOrders: (userId) => {
    return get().orders.filter(order => order.userId === userId);
  }
}));