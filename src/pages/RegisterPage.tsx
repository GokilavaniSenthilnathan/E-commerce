import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        // Handle successful registration - In a real app, this would create an account
        console.log('Registration successful', formData);
        // Redirect or show success message
      }, 1500);
    }
  };

  // Generate starry background elements
  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < 30; i++) {
      const size = Math.random() * 3 + 1;
      stars.push(
        <motion.div
          key={i}
          className="star absolute bg-white rounded-full"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-starry-blue-900 via-starry-purple-800 to-starry-blue-800 py-12 relative overflow-hidden">
      {generateStars()}
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Star className="w-8 h-8 text-starry-yellow-400" />
              </motion.div>
              <span className="comic-text text-3xl text-white ml-2">Starry Heroes</span>
            </div>
            <h1 className="text-2xl font-bold text-white mt-4">Create Your Account</h1>
            <p className="text-starry-blue-100 mt-2">
              Join our community of cosmic superhero fans
            </p>
          </div>
          
          <motion.div 
            className="bg-white rounded-lg shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="p-8">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="fullName" className="block text-sm font-medium text-neutral-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-neutral-400" />
                    </div>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      className={`block w-full pl-10 input ${errors.fullName ? 'border-comic-red-500 focus:ring-comic-red-500 focus:border-comic-red-500' : ''}`}
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="mt-1 text-comic-red-500 text-sm">{errors.fullName}</p>
                  )}
                </div>
                
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-neutral-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className={`block w-full pl-10 input ${errors.email ? 'border-comic-red-500 focus:ring-comic-red-500 focus:border-comic-red-500' : ''}`}
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-comic-red-500 text-sm">{errors.email}</p>
                  )}
                </div>
                
                <div className="mb-6">
                  <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-neutral-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className={`block w-full pl-10 pr-10 input ${errors.password ? 'border-comic-red-500 focus:ring-comic-red-500 focus:border-comic-red-500' : ''}`}
                      placeholder="••••••••••"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-neutral-400 hover:text-neutral-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-neutral-400 hover:text-neutral-600" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-comic-red-500 text-sm">{errors.password}</p>
                  )}
                </div>
                
                <div className="mb-8">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-neutral-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      className={`block w-full pl-10 pr-10 input ${errors.confirmPassword ? 'border-comic-red-500 focus:ring-comic-red-500 focus:border-comic-red-500' : ''}`}
                      placeholder="••••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-neutral-400 hover:text-neutral-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-neutral-400 hover:text-neutral-600" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-comic-red-500 text-sm">{errors.confirmPassword}</p>
                  )}
                </div>
                
                <div className="mb-6">
                  <motion.button
                    type="submit"
                    className={`w-full btn-primary flex items-center justify-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    disabled={isLoading}
                    whileHover={!isLoading ? { scale: 1.02 } : {}}
                    whileTap={!isLoading ? { scale: 0.98 } : {}}
                  >
                    {isLoading ? (
                      <>
                        <LoadingSpinner />
                        <span className="ml-2">Creating account...</span>
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </motion.button>
                </div>
              </form>
              
              <div className="text-center">
                <p className="text-neutral-600">
                  Already have an account?{" "}
                  <Link to="/login" className="text-starry-blue-600 hover:text-starry-blue-800 font-medium">
                    Sign in
                  </Link>
                </p>
              </div>
              
              <div className="mt-6 pt-6 border-t border-neutral-200 text-xs text-neutral-500 text-center">
                By creating an account, you agree to our{" "}
                <Link to="/terms" className="text-starry-blue-600 hover:text-starry-blue-800">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-starry-blue-600 hover:text-starry-blue-800">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

// Loading spinner component
const LoadingSpinner = () => (
  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export default RegisterPage;