import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import React, { useState } from 'react';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In a real app, you would send this to your backend
      console.log('Subscribing email:', email);
      setIsSubmitted(true);
      setEmail('');
      // Reset after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  // Generate decorative stars
  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < 15; i++) {
      stars.push(
        <motion.div
          key={i}
          className="absolute"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 * i, duration: 0.5 }}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Star className="w-5 h-5 text-starry-yellow-400" fill="currentColor" />
        </motion.div>
      );
    }
    return stars;
  };

  return (
    <section className="py-20 bg-starry-blue-900 relative overflow-hidden">
      {/* Decorative stars */}
      {generateStars()}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div 
            className="inline-block comic-text bg-comic-red-500 text-white px-6 py-2 rounded-full mb-6 transform rotate-2 shadow-lg"
            initial={{ rotate: -5, scale: 0.9 }}
            whileInView={{ rotate: 2, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Join Our Universe!
          </motion.div>
          
          <motion.h2 
            className="comic-text text-4xl md:text-5xl text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Subscribe for <span className="text-starry-yellow-400">Exclusive</span> Updates & Offers
          </motion.h2>
          
          <motion.p 
            className="text-neutral-300 mb-8 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Be the first to know about new releases, special promotions, and limited edition drops. Plus, get 10% off your first order!
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="input flex-grow"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button 
                type="submit"
                className="btn-secondary whitespace-nowrap"
                disabled={isSubmitted}
              >
                {isSubmitted ? 'Subscribed!' : 'Subscribe Now'}
              </button>
            </form>
            <p className="text-neutral-400 text-sm mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;