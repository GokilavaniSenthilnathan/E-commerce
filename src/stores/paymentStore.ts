import { create } from 'zustand';
import { loadStripe } from '@stripe/stripe-js';

interface PaymentState {
  isProcessing: boolean;
  error: string | null;
  processPayment: (amount: number) => Promise<{ success: boolean; error?: string }>;
}

export const usePaymentStore = create<PaymentState>((set) => ({
  isProcessing: false,
  error: null,

  processPayment: async (amount) => {
    set({ isProcessing: true, error: null });

    try {
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
      if (!stripe) throw new Error('Failed to initialize Stripe');

      // Here you would typically:
      // 1. Create a payment intent on your server
      // 2. Confirm the payment with Stripe
      // 3. Handle the result

      // For demo purposes, we'll simulate a successful payment
      await new Promise(resolve => setTimeout(resolve, 2000));

      set({ isProcessing: false });
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Payment failed';
      set({ isProcessing: false, error: errorMessage });
      return { success: false, error: errorMessage };
    }
  }
}));