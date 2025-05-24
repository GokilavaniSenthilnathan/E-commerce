import { Link } from 'react-router-dom';
import { Star, Mail, Instagram, Twitter, Facebook, CreditCard, Shield, Truck } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-starry-blue-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Star className="w-6 h-6 text-starry-yellow-400 mr-2" />
              <span className="comic-text text-xl">Starry Heroes</span>
            </div>
            <p className="text-neutral-300 mb-4">
              Unique T-shirts featuring superhero characters with a Starry Night artistic twist.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-300 hover:text-starry-yellow-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-300 hover:text-starry-yellow-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-300 hover:text-starry-yellow-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-neutral-300 hover:text-starry-yellow-400 transition-colors">
                  All T-Shirts
                </Link>
              </li>
              <li>
                <Link to="/products?category=Marvel+Universe" className="text-neutral-300 hover:text-starry-yellow-400 transition-colors">
                  Marvel Universe
                </Link>
              </li>
              <li>
                <Link to="/products?category=DC+Comics" className="text-neutral-300 hover:text-starry-yellow-400 transition-colors">
                  DC Comics
                </Link>
              </li>
              <li>
                <Link to="/products?theme=Starry+Night" className="text-neutral-300 hover:text-starry-yellow-400 transition-colors">
                  Starry Night Theme
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-neutral-300 hover:text-starry-yellow-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-neutral-300 hover:text-starry-yellow-400 transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-neutral-300 hover:text-starry-yellow-400 transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-neutral-300 hover:text-starry-yellow-400 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Newsletter</h3>
            <p className="text-neutral-300 mb-4">
              Subscribe to get special offers and updates on new designs!
            </p>
            <form className="flex mb-4">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-starry-blue-800 text-white px-4 py-2 rounded-l-md w-full focus:outline-none focus:ring-2 focus:ring-starry-yellow-400"
              />
              <button type="submit" className="bg-starry-yellow-400 hover:bg-starry-yellow-500 text-starry-blue-900 px-4 py-2 rounded-r-md transition-colors">
                <Mail className="w-5 h-5" />
              </button>
            </form>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center text-neutral-300">
                <CreditCard className="w-4 h-4 mr-1" />
                <span className="text-xs">Secure Payment</span>
              </div>
              <div className="flex items-center text-neutral-300">
                <Shield className="w-4 h-4 mr-1" />
                <span className="text-xs">Privacy Protected</span>
              </div>
              <div className="flex items-center text-neutral-300">
                <Truck className="w-4 h-4 mr-1" />
                <span className="text-xs">Fast Shipping</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-starry-blue-700 mt-8 pt-8 text-center text-neutral-400 text-sm">
          <p>© {new Date().getFullYear()} Starry Heroes. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link to="/privacy" className="hover:text-starry-yellow-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-starry-yellow-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;