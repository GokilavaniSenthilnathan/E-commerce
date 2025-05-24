import { motion } from 'framer-motion';
import { ShoppingBag, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  // Creates a star field effect for the background
  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < 50; i++) {
      const size = Math.random() * 3 + 1;
      stars.push(
        <motion.div
          key={i}
          className="star"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.7 + 0.3,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      );
    }
    return stars;
  };

  return (
    <div className="starry-bg min-h-[90vh] flex items-center justify-center py-20">
      {generateStars()}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <motion.div 
            className="text-center lg:text-left max-w-xl mb-12 lg:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-block comic-text text-starry-yellow-400 text-2xl mb-4 px-6 py-2 bg-starry-blue-800 rotate-2 rounded-md"
              initial={{ rotate: -5 }}
              animate={{ rotate: 2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Limited Edition Collection
            </motion.div>
            
            <motion.h1 
              className="comic-text text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-starry-yellow-400">Starry Night</span>{" "}
              Meets{" "}
              <span className="text-comic-red-500">Superheroes</span>
            </motion.h1>
            
            <motion.p 
              className="text-neutral-200 text-lg mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Discover our unique collection of T-shirts featuring your favorite comic superheroes reimagined through the artistic lens of Van Gogh's Starry Night. Where cosmic art meets heroic legends!
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link to="/products" className="btn-primary w-full sm:w-auto flex items-center justify-center">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Shop Collection
              </Link>
              <Link to="/about" className="btn-outline w-full sm:w-auto flex items-center justify-center">
                Learn More
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="comic-border bg-white p-4 rotate-3 relative"
            initial={{ opacity: 0, x: 20, rotate: 0 }}
            animate={{ opacity: 1, x: 0, rotate: 3 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.div 
              className="absolute -top-12 -right-12 comic-text bg-comic-red-500 text-white px-6 py-3 rounded-full rotate-12 shadow-lg z-20"
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: 12 }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20, 
                delay: 0.9 
              }}
            >
              New Arrivals!
            </motion.div>
            <img 
              src="https://images.pexels.com/photos/6347888/pexels-photo-6347888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Starry Hero T-Shirt" 
              className="w-full max-w-md object-cover shadow-lg"
            />
            <motion.div
              className="absolute -bottom-8 -left-8 speech-bubble comic-text text-xl"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className="flex items-center">
                <Star className="text-starry-yellow-400 h-5 w-5 mr-1" fill="currentColor" />
                <Star className="text-starry-yellow-400 h-5 w-5 mr-1" fill="currentColor" />
                <Star className="text-starry-yellow-400 h-5 w-5 mr-1" fill="currentColor" />
                <Star className="text-starry-yellow-400 h-5 w-5 mr-1" fill="currentColor" />
                <Star className="text-starry-yellow-400 h-5 w-5" fill="currentColor" />
              </div>
              <span>Wow! Amazing!</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;