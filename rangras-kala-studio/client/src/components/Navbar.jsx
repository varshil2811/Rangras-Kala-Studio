import { Link, useLocation } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiMenu, FiLogOut, FiX } from 'react-icons/fi';
import { FaLeaf } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const isAdminRoute = location.pathname.startsWith('/admin') && user;

  const publicLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const adminLinks = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Products', path: '/admin/products' },
    { name: 'Orders', path: '/admin/orders' },
    { name: 'Messages', path: '/admin/messages' }
  ];

  const currentLinks = isAdminRoute ? adminLinks : publicLinks;

  const NavItem = ({ item }) => {
    const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
    return (
      <Link 
        to={item.path} 
        className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 group ${isActive ? 'text-secondary' : 'text-text hover:text-secondary'}`}
      >
        {item.name}
        <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-secondary transform origin-center transition-transform duration-300 ease-out ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
      </Link>
    );
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-background/90 backdrop-blur-md shadow-md py-2' : 'bg-background py-4'}`}>
      {/* Decorative Top Line */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-accent via-secondary to-primary"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
            <motion.div 
              whileHover={{ rotate: 180 }} 
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="text-secondary"
            >
              <FaLeaf className="text-2xl" />
            </motion.div>
            <h1 className="font-display text-2xl font-bold text-primary tracking-tight">
              Rangras <span className="font-accent text-secondary italic font-light text-3xl ml-1">Kala</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {currentLinks.map((link) => (
              <NavItem key={link.name} item={link} />
            ))}
          </div>

          {/* Right Icons */}
          <div className="hidden md:flex items-center space-x-6">
            {!isAdminRoute ? (
              <>
                <Link to={user ? "/admin/dashboard" : "/admin"} className="text-text hover:text-secondary transition-colors duration-300" title="Admin">
                  <FiUser className="h-5 w-5" />
                </Link>
                <Link to="/cart" className="text-text hover:text-secondary transition-colors relative group duration-300">
                  <FiShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  {cartCount > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-secondary text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center shadow-md"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </Link>
              </>
            ) : (
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-500 bg-red-50 border border-red-100 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow"
              >
                <FiLogOut className="h-4 w-4" />
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <div className="flex items-center gap-4 mr-4">
              {!isAdminRoute && (
                <Link to="/cart" className="text-text relative">
                  <FiShoppingCart className="h-6 w-6" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-secondary text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center shadow-md">
                      {cartCount}
                    </span>
                  )}
                </Link>
              )}
            </div>
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-primary p-2 hover:bg-accent/20 rounded-lg transition-colors focus:outline-none"
            >
              {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Slide-Down */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-white border-t border-accent/20 shadow-xl absolute w-full"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {currentLinks.map((link) => {
                const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
                return (
                  <Link 
                    key={link.name}
                    to={link.path} 
                    className={`block px-4 py-3 rounded-xl font-medium transition-colors ${isActive ? 'bg-secondary/10 text-secondary' : 'text-text hover:bg-accent/10'}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                );
              })}
              
              <div className="pt-4 mt-4 border-t border-accent/20">
                {isAdminRoute ? (
                  <button 
                    onClick={() => { logout(); setIsOpen(false); }} 
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-500 bg-red-50 rounded-xl font-medium"
                  >
                    <FiLogOut /> Logout
                  </button>
                ) : (
                  <Link 
                    to={user ? "/admin/dashboard" : "/admin"} 
                    className="flex items-center justify-center gap-2 px-4 py-3 text-primary bg-accent/20 rounded-xl font-medium" 
                    onClick={() => setIsOpen(false)}
                  >
                    <FiUser /> {user ? "Admin Dashboard" : "Admin Login"}
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
