import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Star, ArrowLeft, Share2, Check } from 'lucide-react';
import { getProductById } from '../data/products';
import { useCartStore } from '../stores/cartStore';
import NotFoundPage from './NotFoundPage';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProductById(id) : undefined;
  const addToCart = useCartStore(state => state.addToCart);
  
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  
  useEffect(() => {
    if (product) {
      // Set defaults
      setSelectedSize(product.sizes[1] || product.sizes[0]); // Default to medium or first available
      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
      }
      
      // Update document title
      document.title = `${product.name} | Starry Heroes`;
    }
  }, [product]);
  
  if (!product) {
    return <NotFoundPage />;
  }
  
  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    setAddedToCart(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setAddedToCart(false);
    }, 3000);
  };
  
  return (
    <div className="bg-neutral-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex items-center text-sm">
            <Link to="/" className="text-neutral-500 hover:text-starry-blue-600 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/products" className="text-neutral-500 hover:text-starry-blue-600 transition-colors">T-Shirts</Link>
            <span className="mx-2">/</span>
            <span className="text-neutral-800 font-medium">{product.name}</span>
          </nav>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Product Images */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="comic-border bg-white p-4 rotate-1 mb-6">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full object-cover"
              />
            </div>
            
            {/* Back to Products */}
            <Link 
              to="/products" 
              className="inline-flex items-center text-starry-blue-600 hover:text-starry-blue-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to T-Shirts
            </Link>
          </motion.div>
          
          {/* Product Details */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-2">
              <span className="inline-block comic-text px-3 py-1 bg-starry-blue-100 text-starry-blue-800 rounded-full text-sm">
                {product.category}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
            
            <div className="flex items-center mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-5 h-5 text-starry-yellow-400" 
                    fill="currentColor"
                  />
                ))}
              </div>
              <span className="ml-2 text-neutral-600">(24 reviews)</span>
            </div>
            
            <div className="text-2xl font-bold text-starry-blue-800 mb-6">
              ${product.price.toFixed(2)}
            </div>
            
            <p className="text-neutral-600 mb-8">{product.description}</p>
            
            {/* Size Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Size
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`px-4 py-2 border rounded-md ${
                      selectedSize === size 
                        ? 'border-starry-blue-600 bg-starry-blue-50 text-starry-blue-800' 
                        : 'border-neutral-300 hover:border-neutral-400'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-8">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Color
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      className={`relative w-10 h-10 rounded-full border-2 ${
                        selectedColor === color ? 'border-starry-blue-600' : 'border-transparent'
                      }`}
                      style={{ 
                        backgroundColor: color.toLowerCase().replace(' ', ''),
                        boxShadow: selectedColor === color ? '0 0 0 2px rgba(37, 99, 235, 0.3)' : 'none'
                      }}
                      onClick={() => setSelectedColor(color)}
                      aria-label={color}
                    >
                      {selectedColor === color && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <Check className="w-5 h-5 text-white" />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-neutral-500 mt-1">Selected: {selectedColor}</p>
              </div>
            )}
            
            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row items-stretch gap-4 mb-8">
              <div className="flex border border-neutral-300 rounded-md w-32">
                <button 
                  className="px-3 py-2 border-r border-neutral-300 hover:bg-neutral-100"
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                >
                  -
                </button>
                <input 
                  type="number" 
                  min="1" 
                  value={quantity} 
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} 
                  className="text-center flex-1 focus:outline-none"
                />
                <button 
                  className="px-3 py-2 border-l border-neutral-300 hover:bg-neutral-100"
                  onClick={() => setQuantity(prev => prev + 1)}
                >
                  +
                </button>
              </div>
              
              <button 
                className={`btn-primary flex-1 flex items-center justify-center ${addedToCart ? 'bg-starry-blue-700' : ''}`}
                onClick={handleAddToCart}
                disabled={addedToCart}
              >
                {addedToCart ? (
                  <>
                    <Check className="mr-2 h-5 w-5" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </>
                )}
              </button>
              
              <button className="p-3 border border-neutral-300 rounded-md hover:bg-neutral-100">
                <Heart className="h-6 w-6 text-comic-red-500" />
              </button>
            </div>
            
            {/* Additional Info */}
            <div className="border-t border-neutral-200 pt-6 space-y-4">
              <div className="flex items-start">
                <div className="text-neutral-500 w-24 flex-shrink-0">Type:</div>
                <div>{product.type}</div>
              </div>
              <div className="flex items-start">
                <div className="text-neutral-500 w-24 flex-shrink-0">Theme:</div>
                <div>{product.theme}</div>
              </div>
              <div className="flex items-start">
                <div className="text-neutral-500 w-24 flex-shrink-0">SKU:</div>
                <div>SH-{product.id}</div>
              </div>
              
              {/* Share */}
              <div className="flex items-center mt-6 pt-6 border-t border-neutral-200">
                <span className="text-neutral-500 mr-4">Share:</span>
                <div className="flex space-x-3">
                  <button className="text-neutral-600 hover:text-starry-blue-600 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button className="text-neutral-600 hover:text-starry-blue-600 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </button>
                  <button className="text-neutral-600 hover:text-starry-blue-600 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button className="text-neutral-600 hover:text-starry-blue-600 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;