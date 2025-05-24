import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../stores/cartStore';
import { Trash2, ShoppingBag, ArrowRight, Check, X, AlertCircle } from 'lucide-react';

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice } = useCartStore();
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  // Calculate order summary values
  const subtotal = totalPrice;
  const shipping = subtotal > 50 ? 0 : 4.99;
  const tax = subtotal * 0.07; // 7% tax
  const orderTotal = subtotal + shipping + tax;

  // Handle promo code application
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setIsApplyingPromo(true);
    setPromoError('');
    setPromoSuccess('');

    // Simulate API call
    setTimeout(() => {
      if (promoCode.toLowerCase() === 'starry20') {
        setPromoSuccess('Promo code applied! 20% discount will be applied at checkout.');
      } else {
        setPromoError('Invalid promo code. Please try again.');
      }
      setIsApplyingPromo(false);
    }, 800);
  };

  if (items.length === 0) {
    return (
      <div className="bg-neutral-50 min-h-screen py-12">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-lg mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white p-8 rounded-lg shadow-md mb-6">
              <div className="comic-text text-6xl text-starry-blue-400 mb-4">Your cart is empty!</div>
              <div className="starry-bg p-12 rounded-lg mb-6 relative overflow-hidden">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: Math.random() * 3 + 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
                <ShoppingBag className="w-20 h-20 text-white mx-auto mb-4" />
              </div>
              <p className="text-neutral-600 mb-6">
                Looks like your shopping cart is feeling a bit lonely. Discover our unique Starry Night superhero T-shirts and add some cosmic style to your wardrobe!
              </p>
              <Link
                to="/products"
                className="btn-primary inline-flex items-center justify-center"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Explore T-Shirts
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-3xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Your Shopping Cart
        </motion.h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <motion.div 
            className="lg:w-2/3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Items ({totalItems})</h2>
                
                <div className="divide-y divide-neutral-200">
                  {items.map((item, index) => (
                    <motion.div 
                      key={`${item.product.id}-${item.size}-${item.color}`} 
                      className="py-6 first:pt-0 last:pb-0"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0, overflow: 'hidden' }}
                    >
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Link to={`/products/${item.product.id}`} className="block w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
                          <img 
                            src={item.product.imageUrl} 
                            alt={item.product.name}
                            className="w-full h-full object-cover rounded-md"
                          />
                        </Link>
                        
                        <div className="flex-1">
                          <Link to={`/products/${item.product.id}`}>
                            <h3 className="font-medium text-lg hover:text-starry-blue-600 transition-colors">
                              {item.product.name}
                            </h3>
                          </Link>
                          
                          <div className="text-neutral-500 text-sm mt-1 mb-3">
                            <p>Size: {item.size}</p>
                            {item.color && <p>Color: {item.color}</p>}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <button 
                                className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-100 transition-colors"
                                onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                                aria-label="Decrease quantity"
                              >
                                <span className="text-lg">-</span>
                              </button>
                              <span className="mx-3">{item.quantity}</span>
                              <button 
                                className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-100 transition-colors"
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                aria-label="Increase quantity"
                              >
                                <span className="text-lg">+</span>
                              </button>
                            </div>
                            
                            <div className="flex items-center">
                              <span className="font-semibold mr-4">
                                ${(item.product.price * item.quantity).toFixed(2)}
                              </span>
                              <motion.button 
                                className="text-neutral-400 hover:text-comic-red-500 transition-colors p-2 rounded-full hover:bg-neutral-100"
                                onClick={() => removeFromCart(item.product.id)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                aria-label="Remove item"
                              >
                                <Trash2 className="w-5 h-5" />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <Link 
                to="/products" 
                className="inline-flex items-center text-starry-blue-600 hover:text-starry-blue-800 transition-colors"
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Continue Shopping
              </Link>
            </div>
          </motion.div>
          
          {/* Order Summary */}
          <motion.div 
            className="lg:w-1/3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-24">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Shipping</span>
                    {shipping === 0 ? (
                      <span className="text-comic-green-500 font-medium">Free</span>
                    ) : (
                      <span className="font-medium">${shipping.toFixed(2)}</span>
                    )}
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Tax (7%)</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  
                  {shipping > 0 && (
                    <div className="text-xs text-comic-green-600 italic">
                      Free shipping on orders over $50!
                    </div>
                  )}
                  
                  <div className="pt-4 mt-4 border-t border-neutral-200">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total</span>
                      <motion.span 
                        className="text-xl font-bold text-starry-blue-800"
                        key={orderTotal}
                        initial={{ scale: 1 }}
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 0.3 }}
                      >
                        ${orderTotal.toFixed(2)}
                      </motion.span>
                    </div>
                  </div>
                </div>
                
                {/* Promo Code */}
                <div className="mb-6">
                  <div className="collapse-title p-0">
                    <button 
                      className="text-starry-blue-600 hover:text-starry-blue-800 transition-colors text-sm font-medium mb-2"
                      onClick={() => document.getElementById('promo-collapse')?.classList.toggle('hidden')}
                    >
                      Have a promo code?
                    </button>
                  </div>
                  
                  <div id="promo-collapse" className="mt-2">
                    <form onSubmit={handleApplyPromo} className="flex mb-2">
                      <input
                        type="text"
                        placeholder="Enter promo code"
                        className="input flex-grow rounded-r-none"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        disabled={isApplyingPromo}
                      />
                      <button
                        type="submit"
                        className={`btn px-4 py-2 bg-starry-blue-600 text-white rounded-l-none rounded-r-md flex items-center justify-center transition-colors ${
                          isApplyingPromo ? 'opacity-70 cursor-not-allowed' : 'hover:bg-starry-blue-700'
                        }`}
                        disabled={isApplyingPromo}
                      >
                        {isApplyingPromo ? 'Applying...' : 'Apply'}
                      </button>
                    </form>
                    
                    <AnimatePresence>
                      {promoError && (
                        <motion.div
                          className="text-comic-red-500 text-sm flex items-center"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <X className="w-4 h-4 mr-1" />
                          {promoError}
                        </motion.div>
                      )}
                      
                      {promoSuccess && (
                        <motion.div
                          className="text-comic-green-600 text-sm flex items-center"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <Check className="w-4 h-4 mr-1" />
                          {promoSuccess}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                
                {/* Checkout Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link 
                    to="/checkout" 
                    className="btn-primary w-full flex items-center justify-center text-lg"
                  >
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </motion.div>
                
                <div className="mt-6 text-center">
                  <div className="text-sm text-neutral-500 mb-4">We accept</div>
                  <div className="flex justify-center space-x-2">
                    <div className="w-12 h-8 bg-neutral-200 rounded flex items-center justify-center text-xs font-medium">VISA</div>
                    <div className="w-12 h-8 bg-neutral-200 rounded flex items-center justify-center text-xs font-medium">MC</div>
                    <div className="w-12 h-8 bg-neutral-200 rounded flex items-center justify-center text-xs font-medium">AMEX</div>
                    <div className="w-12 h-8 bg-neutral-200 rounded flex items-center justify-center text-xs font-medium">PYPL</div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-neutral-200">
                  <div className="flex items-center text-sm text-neutral-600 mb-2">
                    <AlertCircle className="w-4 h-4 mr-2 text-starry-blue-600" />
                    <span>Secure checkout</span>
                  </div>
                  <div className="text-xs text-neutral-500">
                    Your information is protected using SSL encryption technology.
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;