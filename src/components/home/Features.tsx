import { motion } from 'framer-motion';
import { Sparkles, Truck, BadgeCheck, RefreshCw } from 'lucide-react';

const features = [
  {
    icon: <Sparkles className="w-10 h-10 text-starry-yellow-400" />,
    title: 'Unique Designs',
    description: 'Each T-shirt features a one-of-a-kind design combining Starry Night aesthetics with superhero characters.'
  },
  {
    icon: <Truck className="w-10 h-10 text-starry-blue-600" />,
    title: 'Fast Shipping',
    description: 'We deliver worldwide with expedited shipping options available for all orders.'
  },
  {
    icon: <BadgeCheck className="w-10 h-10 text-comic-green-500" />,
    title: 'Premium Quality',
    description: '100% premium cotton T-shirts that are comfortable, durable, and machine washable.'
  },
  {
    icon: <RefreshCw className="w-10 h-10 text-comic-red-500" />,
    title: 'Easy Returns',
    description: 'Not satisfied? Return within 30 days for a full refund or exchange with no questions asked.'
  }
];

const Features = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="comic-text text-4xl text-starry-blue-800 mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Why Choose Our T-Shirts?
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
            We combine artistic creativity with quality materials and excellent service
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="text-center p-6 rounded-lg bg-neutral-50 hover:shadow-md transition-shadow"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="bg-white p-4 rounded-full inline-block mb-4 shadow-sm">
                {feature.icon}
              </div>
              <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
              <p className="text-neutral-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;