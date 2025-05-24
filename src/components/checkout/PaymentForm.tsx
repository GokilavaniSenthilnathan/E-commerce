import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Calendar, Lock } from 'lucide-react';

interface PaymentFormProps {
  onSubmit: (data: any) => void;
  isProcessing: boolean;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onSubmit, isProcessing }) => {
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvc: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(cardData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Card Number
        </label>
        <div className="relative">
          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            className="pl-10 input w-full"
            value={cardData.number}
            onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
            maxLength={19}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expiry Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="MM/YY"
              className="pl-10 input w-full"
              value={cardData.expiry}
              onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
              maxLength={5}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CVC
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="123"
              className="pl-10 input w-full"
              value={cardData.cvc}
              onChange={(e) => setCardData({ ...cardData, cvc: e.target.value })}
              maxLength={4}
            />
          </div>
        </div>
      </div>

      <motion.button
        type="submit"
        className="btn-primary w-full"
        disabled={isProcessing}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isProcessing ? 'Processing...' : 'Pay Now'}
      </motion.button>
    </form>
  );
};

export default PaymentForm;