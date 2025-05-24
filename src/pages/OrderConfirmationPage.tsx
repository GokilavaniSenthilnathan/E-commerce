import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useOrderStore } from '../stores/orderStore';
import { Check, Package, Truck, Star } from 'lucide-react';

const OrderConfirmationPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { getOrderById } = useOrderStore();
  const order = orderId ? getOrderById(orderId) : undefined;

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Order confirmation content */}
          {/* (Component implementation continues with confirmation details) */}
        </motion.div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;