import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { getFeaturedProducts } from '../../data/products';
import { useCartStore } from '../../stores/cartStore';

const FeaturedProducts = () => {
  const featuredProducts = getFeaturedProducts();
  const addToCart = useCartStore(state => state.addToCart);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="comic-text text-4xl text-starry-blue-800 mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Featured T-Shirts
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-starry-yellow-400 mx-auto mb-4"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <motion.p 
            className="text-neutral-600 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Discover our most popular designs where cosmic artistry meets superhero legends
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featuredProducts.map(product => (
            <motion.div 
              key={product.id} 
              className="card group"
              variants={itemVariants}
            >
              <div className="relative overflow-hidden">
                <Link to={`/products/${product.id}`}>
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-80 object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />
                </Link>
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
              </div>
              <div className="p-4">
                <div className="comic-text text-xs text-comic-red-500 mb-1">{product.category}</div>
                <Link to={`/products/${product.id}`} className="block">
                  <h3 className="font-semibold text-lg mb-2 hover:text-starry-blue-600 transition-colors">{product.name}</h3>
                </Link>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-starry-blue-800">${product.price.toFixed(2)}</span>
                  <span className="text-sm text-neutral-500">{product.type}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <Link to="/products" className="btn-outline inline-flex items-center">
            View All T-Shirts
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;