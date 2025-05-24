import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Home } from 'lucide-react';

const NotFoundPage = () => {
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
    <div className="starry-bg min-h-[80vh] flex items-center justify-center">
      {generateStars()}
      
      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ rotate: -5, scale: 0.8, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-block comic-text bg-comic-red-500 text-white px-6 py-2 rounded-full mb-6 transform shadow-lg"
          >
            404 - Page Not Found
          </motion.div>
          
          <motion.h1 
            className="comic-text text-5xl md:text-6xl text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Oops! This Page Has <span className="text-starry-yellow-400">Vanished</span> Into The Cosmos
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="relative inline-block comic-border bg-white p-6 mb-8 rotate-2 overflow-hidden">
              <motion.div 
                className="absolute inset-0 bg-starry-blue-100 opacity-50"
                animate={{ 
                  background: [
                    "radial-gradient(circle at 20% 30%, rgba(66, 135, 245, 0.3) 0%, transparent 70%)",
                    "radial-gradient(circle at 70% 60%, rgba(66, 135, 245, 0.3) 0%, transparent 70%)",
                    "radial-gradient(circle at 40% 80%, rgba(66, 135, 245, 0.3) 0%, transparent 70%)",
                  ]
                }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  <motion.div
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                  >
                    <Star className="w-20 h-20 text-starry-yellow-400" />
                  </motion.div>
                </div>
                
                <p className="text-starry-blue-800 text-lg mb-4">
                  Even superheroes get lost sometimes!
                </p>
                <p className="text-neutral-600 mb-8">
                  The page you're looking for has disappeared into another dimension. Let's guide you back to our universe.
                </p>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/" className="btn-primary inline-flex items-center">
                    <Home className="mr-2 h-5 w-5" />
                    Return to Homepage
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
          
          <motion.p 
            className="text-neutral-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            If you think this is an error, please contact our support team at help@starryheroes.com
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;