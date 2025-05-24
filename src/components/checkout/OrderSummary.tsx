import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Truck, Shield } from 'lucide-react';
import { CartItem } from '../../types';

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  subtotal,
  shipping,
  tax,
  total
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={`${item.product.id}-${item.size}`} className="flex items-center">
            <img
              src={item.product.imageUrl}
              alt={item.product.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="ml-4 flex-1">
              <h3 className="text-sm font-medium">{item.product.name}</h3>
              <p className="text-sm text-gray-500">
                Size: {item.size} {item.color && `| Color: ${item.color}`}
              </p>
              <p className="text-sm">Qty: {item.quantity}</p>
            </div>
            <span className="font-medium">
              ${(item.product.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="space-y-2 border-t border-gray-200 pt-4">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          {shipping === 0 ? (
            <span className="text-green-600">Free</span>
          ) : (
            <span>${shipping.toFixed(2)}</span>
          )}
        </div>
        <div className="flex justify-between text-sm">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg pt-2">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-center text-sm text-gray-600">
          <Truck className="h-5 w-5 mr-2" />
          <span>Free shipping on orders over $50</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Shield className="h-5 w-5 mr-2" />
          <span>Secure payment processing</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;