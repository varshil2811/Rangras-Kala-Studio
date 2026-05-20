import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiShoppingBag } from 'react-icons/fi';

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cod'
  });

  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (cart.length === 0 && !isSubmitted) {
    navigate('/cart');
    return null;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('http://localhost:5000/api/orders', {
        customerName: formData.name,
        totalAmount: getCartTotal()
      });
      setIsSubmitted(true);
      clearCart();
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-body">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="max-w-lg w-full bg-white rounded-3xl shadow-2xl shadow-accent/10 p-10 text-center border border-accent/10 relative overflow-hidden"
        >
          {/* Decorative background circle */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-0"></div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mx-auto w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6 relative z-10"
          >
            <FiCheckCircle className="w-12 h-12 text-green-500" />
          </motion.div>

          <h2 className="text-3xl font-display font-bold text-primary mb-4 relative z-10">Thank You For Your Order!</h2>
          <p className="text-text/70 mb-8 text-lg relative z-10">
            Your beautiful handmade items will be on their way soon. We have received your order and will contact you shortly with the shipping details.
          </p>

          <div className="bg-background rounded-xl p-6 mb-8 text-left border border-accent/10 relative z-10">
            <p className="text-sm text-text/60 mb-1">Customer Name</p>
            <p className="font-bold text-primary mb-4">{formData.name}</p>
            <p className="text-sm text-text/60 mb-1">Payment Method</p>
            <p className="font-bold text-primary uppercase">{formData.paymentMethod}</p>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center justify-center w-full bg-primary text-secondary px-8 py-4 rounded-xl hover:bg-primary/90 transition-all font-bold shadow-lg shadow-primary/20 hover:-translate-y-1 relative z-10"
          >
            <FiShoppingBag className="mr-2" /> Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-body">
      <h1 className="text-3xl font-display font-bold text-primary mb-8">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-2/3">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-accent/10">
            <h2 className="text-xl font-bold text-primary mb-6 border-b border-accent/10 pb-4">Shipping Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-text mb-2">Full Name</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border border-accent/20 rounded-xl p-3 focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-2">Email</label>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-accent/20 rounded-xl p-3 focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-2">Phone Number</label>
                <input required type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full border border-accent/20 rounded-xl p-3 focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all" />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-text mb-2">Street Address</label>
              <textarea required name="address" value={formData.address} onChange={handleChange} rows="2" className="w-full border border-accent/20 rounded-xl p-3 focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all resize-none"></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-text mb-2">City</label>
                <input required type="text" name="city" value={formData.city} onChange={handleChange} className="w-full border border-accent/20 rounded-xl p-3 focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-2">State</label>
                <input required type="text" name="state" value={formData.state} onChange={handleChange} className="w-full border border-accent/20 rounded-xl p-3 focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-2">PIN Code</label>
                <input required type="text" name="pincode" value={formData.pincode} onChange={handleChange} className="w-full border border-accent/20 rounded-xl p-3 focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all" />
              </div>
            </div>

            <h2 className="text-xl font-bold text-primary mb-4 border-b border-accent/10 pb-4">Payment Method</h2>
            <div className="space-y-4 mb-8">
              <label className="flex items-center space-x-3 p-4 border border-accent/20 rounded-xl cursor-pointer hover:bg-accent/5 transition-colors">
                <input type="radio" name="paymentMethod" value="razorpay" checked={formData.paymentMethod === 'razorpay'} onChange={handleChange} className="h-5 w-5 text-secondary focus:ring-secondary border-accent/30" />
                <span className="text-text font-medium">Pay Online (Razorpay)</span>
              </label>
              <label className="flex items-center space-x-3 p-4 border border-accent/20 rounded-xl cursor-pointer hover:bg-accent/5 transition-colors">
                <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleChange} className="h-5 w-5 text-secondary focus:ring-secondary border-accent/30" />
                <span className="text-text font-medium">Cash on Delivery</span>
              </label>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-primary text-secondary py-4 rounded-xl hover:bg-primary/90 transition-all font-bold text-lg disabled:opacity-70 shadow-lg shadow-primary/20">
              {loading ? 'Processing...' : 'Place Order securely'}
            </button>
          </form>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-white p-8 rounded-2xl border border-accent/10 shadow-sm sticky top-24">
            <h2 className="text-xl font-bold text-primary mb-6 border-b border-accent/10 pb-4">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {cart.map((item, i) => (
                <div key={i} className="flex justify-between text-base">
                  <span className="text-text/80 line-clamp-1 flex-1 pr-4">{item.quantity} × {item.product.name}</span>
                  <span className="font-bold text-primary">₹{item.product.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-accent/10 pt-4 space-y-2">
              <div className="flex justify-between font-bold text-xl">
                <span className="text-primary">Total Amount</span>
                <span className="text-secondary">₹{getCartTotal()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
