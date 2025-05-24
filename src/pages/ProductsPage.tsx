import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import { Product } from '../types';
import { ShoppingCart, Heart, Filter, X } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';

const ProductsPage = () => {
  const location = useLocation();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const addToCart = useCartStore(state => state.addToCart);

  // Parse query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    const type = params.get('type');
    
    if (category) {
      setSelectedCategory(category);
    }
    
    if (type) {
      setSelectedType(type);
    }
    
    applyFilters(category, type, sortBy);
  }, [location.search]);

  // Apply filters and sorting
  const applyFilters = (category: string | null, type: string | null, sort: string) => {
    let filtered = [...products];
    
    if (category) {
      filtered = filtered.filter(p => p.category === category);
    }
    
    if (type) {
      filtered = filtered.filter(p => p.type === type);
    }
    
    // Apply sorting
    switch (sort) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // In a real app, you would sort by date
        filtered.sort((a, b) => a.id.localeCompare(b.id));
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
    
    setFilteredProducts(filtered);
  };

  // Handle sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortBy = e.target.value;
    setSortBy(newSortBy);
    applyFilters(selectedCategory, selectedType, newSortBy);
  };

  // Handle category selection
  const handleCategoryFilter = (category: string | null) => {
    setSelectedCategory(category);
    applyFilters(category, selectedType, sortBy);
  };

  // Handle type selection
  const handleTypeFilter = (type: string | null) => {
    setSelectedType(type);
    applyFilters(selectedCategory, type, sortBy);
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedType(null);
    setSortBy('featured');
    applyFilters(null, null, 'featured');
  };

  // Get unique categories
  const categories = Array.from(new Set(products.map(p => p.category)));
  
  // Get unique types
  const types = Array.from(new Set(products.map(p => p.type)));

  return (
    <div className="bg-neutral-50 min-h-screen">
      {/* Hero Banner */}
      <div className="bg-starry-night bg-cover bg-center py-20 relative">
        <div className="absolute inset-0 bg-starry-blue-900 opacity-60"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1 
            className="comic-text text-5xl text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Explore Our T-Shirts
          </motion.h1>
          <motion.p 
            className="text-neutral-100 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Browse our unique collection of superhero T-shirts with a Starry Night artistic twist
          </motion.p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-4">
            <button 
              className="btn-outline w-full flex items-center justify-center"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="w-5 h-5 mr-2" />
              {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>
          
          {/* Filters Sidebar - Mobile */}
          {isFilterOpen && (
            <motion.div 
              className="lg:hidden bg-white p-6 rounded-lg shadow-md mb-6"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Filters</h3>
                <button 
                  className="text-neutral-500 hover:text-neutral-800"
                  onClick={() => setIsFilterOpen(false)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold mb-2">Categories</h4>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category} className="flex items-center">
                      <input 
                        type="radio" 
                        id={`category-${category}`}
                        name="category"
                        checked={selectedCategory === category}
                        onChange={() => handleCategoryFilter(category)}
                        className="mr-2"
                      />
                      <label htmlFor={`category-${category}`}>{category}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold mb-2">T-Shirt Types</h4>
                <div className="space-y-2">
                  {types.map(type => (
                    <div key={type} className="flex items-center">
                      <input 
                        type="radio" 
                        id={`type-${type}`}
                        name="type"
                        checked={selectedType === type}
                        onChange={() => handleTypeFilter(type)}
                        className="mr-2"
                      />
                      <label htmlFor={`type-${type}`}>{type}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <button 
                className="btn-outline w-full"
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            </motion.div>
          )}
          
          {/* Filters Sidebar - Desktop */}
          <motion.div 
            className="hidden lg:block w-64 bg-white p-6 rounded-lg shadow-md h-fit sticky top-24"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-bold text-lg mb-4">Filters</h3>
            
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Categories</h4>
              <div className="space-y-2">
                {categories.map(category => (
                  <div key={category} className="flex items-center">
                    <input 
                      type="radio" 
                      id={`category-${category}`}
                      name="category"
                      checked={selectedCategory === category}
                      onChange={() => handleCategoryFilter(category)}
                      className="mr-2"
                    />
                    <label htmlFor={`category-${category}`}>{category}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="font-semibold mb-2">T-Shirt Types</h4>
              <div className="space-y-2">
                {types.map(type => (
                  <div key={type} className="flex items-center">
                    <input 
                      type="radio" 
                      id={`type-${type}`}
                      name="type"
                      checked={selectedType === type}
                      onChange={() => handleTypeFilter(type)}
                      className="mr-2"
                    />
                    <label htmlFor={`type-${type}`}>{type}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <button 
              className="btn-outline w-full"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          </motion.div>
          
          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort and Results */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <p className="text-neutral-600 mb-4 sm:mb-0">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
              </p>
              <div className="flex items-center">
                <label htmlFor="sort" className="mr-2 text-neutral-600">Sort by:</label>
                <select 
                  id="sort" 
                  className="input max-w-xs"
                  value={sortBy}
                  onChange={handleSortChange}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>
            
            {/* Products */}
            {filteredProducts.length > 0 ? (
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {filteredProducts.map(product => (
                  <motion.div 
                    key={product.id} 
                    className="card group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative overflow-hidden">
                      <a href={`/products/${product.id}`}>
                        <img 
                          src={product.imageUrl} 
                          alt={product.name} 
                          className="w-full h-64 object-cover object-center transition-transform duration-500 group-hover:scale-110"
                        />
                      </a>
                      <div className="absolute top-0 right-0 p-2">
                        <button className="bg-white rounded-full p-2 shadow-md hover:bg-starry-blue-50 transition-colors">
                          <Heart className="w-5 h-5 text-comic-red-500" />
                        </button>
                      </div>
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-starry-blue-900 to-transparent pt-16 pb-4 px-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <button 
                          className="btn-primary w-full flex items-center justify-center"
                          onClick={() => addToCart(product, 1, 'M')}
                        >
                          <ShoppingCart className="mr-2 w-5 h-5" />
                          Add to Cart
                        </button>
                      </div>
                      {product.featured && (
                        <div className="absolute top-2 left-2 bg-comic-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          Featured
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="comic-text text-xs text-comic-red-500 mb-1">{product.category}</div>
                      <a href={`/products/${product.id}`}>
                        <h3 className="font-semibold text-lg mb-2 hover:text-starry-blue-600 transition-colors">{product.name}</h3>
                      </a>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-starry-blue-800">${product.price.toFixed(2)}</span>
                        <span className="text-sm text-neutral-500">{product.type}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <p className="text-neutral-600 mb-4">No products match your current filters.</p>
                <button 
                  className="btn-primary"
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;