import { Link, useLocation } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiMenu, FiLogOut } from 'react-icons/fi';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const isAdminRoute = location.pathname.startsWith('/admin') && user;

  const publicLinks = (
    <>
      <Link to="/" className="text-primary hover:text-secondary px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</Link>
      <Link to="/shop" className="text-text hover:text-secondary px-3 py-2 rounded-md text-sm font-medium transition-colors">Shop</Link>
      <Link to="/about" className="text-text hover:text-secondary px-3 py-2 rounded-md text-sm font-medium transition-colors">About</Link>
      <Link to="/contact" className="text-text hover:text-secondary px-3 py-2 rounded-md text-sm font-medium transition-colors">Contact</Link>
    </>
  );

  const adminLinks = (
    <>
      <Link to="/admin/dashboard" className="text-primary hover:text-secondary px-3 py-2 rounded-md text-sm font-medium transition-colors">Dashboard</Link>
      <Link to="/admin/products" className="text-text hover:text-secondary px-3 py-2 rounded-md text-sm font-medium transition-colors">Products</Link>
      <Link to="/admin/orders" className="text-text hover:text-secondary px-3 py-2 rounded-md text-sm font-medium transition-colors">Orders</Link>
      <Link to="/admin/messages" className="text-text hover:text-secondary px-3 py-2 rounded-md text-sm font-medium transition-colors">Messages</Link>
    </>
  );

  return (
    <nav className="bg-background shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <h1 className="font-display text-2xl font-bold text-primary">Rangras Kala</h1>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              {isAdminRoute ? adminLinks : publicLinks}
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            {!isAdminRoute ? (
              <>
                <Link to={user ? "/admin/dashboard" : "/admin"} className="text-text hover:text-secondary transition-colors" title="Admin">
                  <FiUser className="h-6 w-6" />
                </Link>
                <Link to="/cart" className="text-text hover:text-secondary transition-colors relative">
                  <FiShoppingCart className="h-6 w-6" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </>
            ) : (
              <button
                onClick={logout}
                className="flex items-center gap-2 text-text hover:text-red-500 transition-colors font-medium text-sm"
              >
                <FiLogOut className="h-5 w-5" />
                Logout
              </button>
            )}
          </div>
          <div className="flex items-center md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-text hover:text-secondary">
              <FiMenu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-accent">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isAdminRoute ? (
              <>
                <Link to="/admin/dashboard" className="block px-3 py-2 text-primary font-medium" onClick={() => setIsOpen(false)}>Dashboard</Link>
                <Link to="/admin/products" className="block px-3 py-2 text-text font-medium" onClick={() => setIsOpen(false)}>Products</Link>
                <Link to="/admin/orders" className="block px-3 py-2 text-text font-medium" onClick={() => setIsOpen(false)}>Orders</Link>
                <Link to="/admin/messages" className="block px-3 py-2 text-text font-medium" onClick={() => setIsOpen(false)}>Messages</Link>
                <button onClick={() => { logout(); setIsOpen(false); }} className="block w-full text-left px-3 py-2 text-red-500 font-medium">Logout</button>
              </>
            ) : (
              <>
                <Link to="/" className="block px-3 py-2 text-primary font-medium" onClick={() => setIsOpen(false)}>Home</Link>
                <Link to="/shop" className="block px-3 py-2 text-text font-medium" onClick={() => setIsOpen(false)}>Shop</Link>
                <Link to="/about" className="block px-3 py-2 text-text font-medium" onClick={() => setIsOpen(false)}>About</Link>
                <Link to="/contact" className="block px-3 py-2 text-text font-medium" onClick={() => setIsOpen(false)}>Contact</Link>
                <Link to={user ? "/admin/dashboard" : "/admin"} className="block px-3 py-2 text-text font-medium" onClick={() => setIsOpen(false)}>Admin Portal</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
