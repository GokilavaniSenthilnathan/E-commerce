import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore } from '../../stores/cartStore';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const totalItems = useCartStore(state => state.totalItems);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-starry-blue-900 shadow-lg py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <motion.div 
              className="mr-2"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Star className="w-8 h-8 text-starry-yellow-400" />
            </motion.div>
            <span className="comic-text text-2xl text-white">Starry Heroes</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-white hover:text-starry-yellow-400 transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-white hover:text-starry-yellow-400 transition-colors">
              T-Shirts
            </Link>
            <div className="relative group">
              <button className="text-white hover:text-starry-yellow-400 transition-colors">
                Categories
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-1">
                  <Link to="/products?category=Marvel+Universe" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">
                    Marvel Universe
                  </Link>
                  <Link to="/products?category=DC+Comics" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">
                    DC Comics
                  </Link>
                  <Link to="/products?category=Anime+Superheroes" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">
                    Anime Superheroes
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="text-white hover:text-starry-yellow-400 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <Link to="/login" className="text-white hover:text-starry-yellow-400 transition-colors">
              <User className="w-5 h-5" />
            </Link>
            <Link to="/cart" className="text-white hover:text-starry-yellow-400 transition-colors relative">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 bg-comic-red-500 text-white text-xs rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
            <button 
              className="md:hidden text-white hover:text-starry-yellow-400 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          className="md:hidden bg-starry-blue-800 mt-2"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-white hover:text-starry-yellow-400 transition-colors">
                Home
              </Link>
              <Link to="/products" className="text-white hover:text-starry-yellow-400 transition-colors">
                T-Shirts
              </Link>
              <Link to="/products?category=Marvel+Universe" className="text-white hover:text-starry-yellow-400 transition-colors">
                Marvel Universe
              </Link>
              <Link to="/products?category=DC+Comics" className="text-white hover:text-starry-yellow-400 transition-colors">
                DC Comics
              </Link>
              <Link to="/products?category=Anime+Superheroes" className="text-white hover:text-starry-yellow-400 transition-colors">
                Anime Superheroes
              </Link>
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;