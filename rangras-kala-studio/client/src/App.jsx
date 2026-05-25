import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import UserAuth from './pages/UserAuth';
import UserOrders from './pages/UserOrders';

// Admin Imports
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import ManageProducts from './pages/admin/ManageProducts';
import AddProduct from './pages/admin/AddProduct';
import EditProduct from './pages/admin/EditProduct';
import ManageOrders from './pages/admin/ManageOrders';
import ManageMessages from './pages/admin/ManageMessages';

import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Toaster } from 'react-hot-toast';

// Simple Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user || user.role !== 'admin') return <Navigate to="/admin" />;
  return children;
};

// Route wrapper for /admin to bypass login if already authenticated
const AdminRouteWrapper = () => {
  const { user } = useAuth();
  if (user && user.role === 'admin') return <Navigate to="/admin/dashboard" />;
  return <AdminLogin />;
};

const pageTransition = {
  initial: { opacity: 0, y: 18 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        className="h-full"
      >
        <Routes location={location}>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<UserAuth />} />
          <Route path="/profile" element={<UserOrders />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminRouteWrapper />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/products" element={<ProtectedRoute><ManageProducts /></ProtectedRoute>} />
          <Route path="/admin/products/add" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
          <Route path="/admin/products/edit/:id" element={<ProtectedRoute><EditProduct /></ProtectedRoute>} />
          <Route path="/admin/orders" element={<ProtectedRoute><ManageOrders /></ProtectedRoute>} />
          <Route path="/admin/messages" element={<ProtectedRoute><ManageMessages /></ProtectedRoute>} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const AppContent = () => {
  const { token } = useAuth();
  const location = useLocation();
  const isAuth = token || localStorage.getItem('token');
  
  const isAdminRoute = location.pathname.startsWith('/admin');

  // If not logged in and not trying to access the admin login, show the Login Portal ONLY
  if (!isAuth && !isAdminRoute) {
    return (
      <>
        <UserAuth />
        <Toaster position="bottom-center" />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-text font-body relative">
      <Navbar />
      <main className="flex-grow">
        <AnimatedRoutes />
      </main>
      <Footer />
      <Toaster position="bottom-center" />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
