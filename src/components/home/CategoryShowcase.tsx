import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 'marvel',
    name: 'Marvel Universe',
    image: 'https://images.pexels.com/photos/4065906/pexels-photo-4065906.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'From Iron Man to Spider-Man, celebrate Marvel heroes with our unique artistic twist.',
    link: '/products?category=Marvel+Universe'
  },
  {
    id: 'dc',
    name: 'DC Comics',
    image: 'https://images.pexels.com/photos/6185245/pexels-photo-6185245.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Batman, Superman, Wonder Woman and more reimagined through a starry lens.',
    link: '/products?category=DC+Comics'
  },
  {
    id: 'anime',
    name: 'Anime Superheroes',
    image: 'https://images.pexels.com/photos/5558237/pexels-photo-5558237.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Your favorite anime heroes meet Van Gogh in this unique collection.',
    link: '/products?category=Anime+Superheroes'
  }
];

const CategoryShowcase = () => {
  return (
    <section className="py-20 relative bg-starry-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="comic-text text-4xl text-starry-blue-800 mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Explore Categories
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
            Find your perfect T-shirt from our comic-inspired collections
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div 
              key={category.id}
              className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group bg-white"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-starry-blue-900 to-transparent opacity-60" />
                <motion.div 
                  className="absolute inset-0 flex items-end p-6"
                  whileHover={{ y: -10 }}
                >
                  <h3 className="comic-text text-3xl text-white">{category.name}</h3>
                </motion.div>
              </div>
              <div className="p-6">
                <p className="text-neutral-600 mb-4">{category.description}</p>
                <Link 
                  to={category.link}
                  className="inline-block comic-text bg-starry-blue-600 hover:bg-starry-blue-700 text-white px-6 py-2 rounded-md transition-colors"
                >
                  View Collection
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;