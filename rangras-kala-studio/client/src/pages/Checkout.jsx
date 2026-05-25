import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiShoppingBag, FiCreditCard, FiTruck, FiShield, FiArrowRight } from 'react-icons/fi';

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
      await axios.post('https://rangras-kala-studio.onrender.com/api/orders', {
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
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 font-body relative overflow-hidden">
        {/* Animated Background Confetti/Orbs */}
        <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} transition={{ duration: 10, repeat: Infinity }} className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-[100px] pointer-events-none" />
        <motion.div animate={{ scale: [1, 1.5, 1], rotate: [0, -90, 0] }} transition={{ duration: 15, repeat: Infinity }} className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, type: 'spring', bounce: 0.4 }}
          className="max-w-lg w-full bg-white/80 backdrop-blur-2xl rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] p-12 text-center border border-white relative z-10"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 20 }}
            className="mx-auto w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-8 shadow-xl shadow-green-500/30"
          >
            <FiCheckCircle className="w-16 h-16 text-white" />
          </motion.div>

          <h2 className="text-4xl font-display font-bold text-primary mb-4">Masterpiece Secured!</h2>
          <p className="text-text/70 mb-10 text-lg leading-relaxed">
            Your exquisite handmade selections are being prepared. We have securely received your order and will contact you shortly with the shipping details.
          </p>

          <div className="bg-[#FDFBF7] rounded-3xl p-8 mb-10 text-left border border-accent/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
            <p className="text-xs text-text/50 uppercase tracking-widest font-bold mb-1">Prepared For</p>
            <p className="font-display text-xl font-bold text-primary mb-5">{formData.name}</p>
            <p className="text-xs text-text/50 uppercase tracking-widest font-bold mb-1">Payment Method</p>
            <p className="font-display text-xl font-bold text-primary uppercase flex items-center gap-2">
              {formData.paymentMethod === 'cod' ? <FiTruck className="text-secondary" /> : <FiCreditCard className="text-secondary" />}
              {formData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Razorpay Secure'}
            </p>
          </div>

          <Link
            to="/profile"
            className="group flex items-center justify-center w-full bg-primary text-secondary px-8 py-5 rounded-2xl hover:bg-primary/90 transition-all font-bold text-lg shadow-xl shadow-primary/20 hover:-translate-y-1"
          >
            <FiShoppingBag className="mr-3 text-xl" /> View My Collection
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-32 pb-20 font-body relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-1/2 h-[600px] bg-gradient-to-bl from-accent/10 to-transparent rounded-bl-[100%] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center md:text-left">
          <h1 className="text-5xl font-display font-bold text-primary mb-3">Secure Checkout</h1>
          <p className="text-text/60 text-lg flex items-center justify-center md:justify-start gap-2">
            <FiShield className="text-secondary" /> 256-bit Encrypted Artisan Portal
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column: Form */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="lg:w-2/3"
          >
            <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-white/60">
              
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-accent/15">
                <div className="p-3 bg-secondary/10 rounded-2xl text-secondary"><FiTruck className="text-xl" /></div>
                <h2 className="text-2xl font-display font-bold text-primary">Shipping Destination</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="group">
                  <label className="block text-xs font-bold uppercase tracking-widest text-text/60 mb-2 ml-1">Full Name</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-[#FDFBF7] border-2 border-transparent focus:border-secondary rounded-2xl p-4 text-primary font-medium outline-none transition-all group-hover:bg-white group-hover:shadow-sm" placeholder="e.g. John Doe" />
                </div>
                <div className="group">
                  <label className="block text-xs font-bold uppercase tracking-widest text-text/60 mb-2 ml-1">Email Address</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-[#FDFBF7] border-2 border-transparent focus:border-secondary rounded-2xl p-4 text-primary font-medium outline-none transition-all group-hover:bg-white group-hover:shadow-sm" placeholder="john@example.com" />
                </div>
                <div className="group md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-text/60 mb-2 ml-1">Phone Number</label>
                  <input required type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-[#FDFBF7] border-2 border-transparent focus:border-secondary rounded-2xl p-4 text-primary font-medium outline-none transition-all group-hover:bg-white group-hover:shadow-sm" placeholder="+91 98765 43210" />
                </div>
              </div>

              <div className="group mb-6">
                <label className="block text-xs font-bold uppercase tracking-widest text-text/60 mb-2 ml-1">Street Address</label>
                <textarea required name="address" value={formData.address} onChange={handleChange} rows="2" className="w-full bg-[#FDFBF7] border-2 border-transparent focus:border-secondary rounded-2xl p-4 text-primary font-medium outline-none transition-all resize-none group-hover:bg-white group-hover:shadow-sm" placeholder="House/Flat No., Street Name, Landmark"></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="group">
                  <label className="block text-xs font-bold uppercase tracking-widest text-text/60 mb-2 ml-1">City</label>
                  <input required type="text" name="city" value={formData.city} onChange={handleChange} className="w-full bg-[#FDFBF7] border-2 border-transparent focus:border-secondary rounded-2xl p-4 text-primary font-medium outline-none transition-all group-hover:bg-white group-hover:shadow-sm" placeholder="Mumbai" />
                </div>
                <div className="group">
                  <label className="block text-xs font-bold uppercase tracking-widest text-text/60 mb-2 ml-1">State</label>
                  <input required type="text" name="state" value={formData.state} onChange={handleChange} className="w-full bg-[#FDFBF7] border-2 border-transparent focus:border-secondary rounded-2xl p-4 text-primary font-medium outline-none transition-all group-hover:bg-white group-hover:shadow-sm" placeholder="Maharashtra" />
                </div>
                <div className="group">
                  <label className="block text-xs font-bold uppercase tracking-widest text-text/60 mb-2 ml-1">PIN Code</label>
                  <input required type="text" name="pincode" value={formData.pincode} onChange={handleChange} className="w-full bg-[#FDFBF7] border-2 border-transparent focus:border-secondary rounded-2xl p-4 text-primary font-medium outline-none transition-all group-hover:bg-white group-hover:shadow-sm" placeholder="400001" />
                </div>
              </div>

              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-accent/15">
                <div className="p-3 bg-secondary/10 rounded-2xl text-secondary"><FiCreditCard className="text-xl" /></div>
                <h2 className="text-2xl font-display font-bold text-primary">Payment Method</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                <label className={`relative flex flex-col items-center justify-center p-6 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${formData.paymentMethod === 'razorpay' ? 'border-secondary bg-secondary/5' : 'border-accent/10 hover:border-secondary/50 bg-[#FDFBF7]'}`}>
                  <input type="radio" name="paymentMethod" value="razorpay" checked={formData.paymentMethod === 'razorpay'} onChange={handleChange} className="absolute opacity-0" />
                  <FiCreditCard className={`text-3xl mb-3 ${formData.paymentMethod === 'razorpay' ? 'text-secondary' : 'text-text/40'}`} />
                  <span className={`font-bold ${formData.paymentMethod === 'razorpay' ? 'text-primary' : 'text-text/60'}`}>Pay Online</span>
                  <span className="text-[10px] uppercase tracking-widest text-text/40 mt-1">Razorpay Secure</span>
                  {formData.paymentMethod === 'razorpay' && (
                    <motion.div layoutId="paymentOutline" className="absolute inset-0 border-2 border-secondary rounded-2xl pointer-events-none" />
                  )}
                </label>
                
                <label className={`relative flex flex-col items-center justify-center p-6 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${formData.paymentMethod === 'cod' ? 'border-secondary bg-secondary/5' : 'border-accent/10 hover:border-secondary/50 bg-[#FDFBF7]'}`}>
                  <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleChange} className="absolute opacity-0" />
                  <FiTruck className={`text-3xl mb-3 ${formData.paymentMethod === 'cod' ? 'text-secondary' : 'text-text/40'}`} />
                  <span className={`font-bold ${formData.paymentMethod === 'cod' ? 'text-primary' : 'text-text/60'}`}>Cash on Delivery</span>
                  <span className="text-[10px] uppercase tracking-widest text-text/40 mt-1">Pay upon arrival</span>
                  {formData.paymentMethod === 'cod' && (
                    <motion.div layoutId="paymentOutline" className="absolute inset-0 border-2 border-secondary rounded-2xl pointer-events-none" />
                  )}
                </label>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                disabled={loading} 
                className="group relative w-full bg-primary text-secondary py-5 rounded-2xl transition-all font-bold text-xl disabled:opacity-70 shadow-[0_15px_30px_rgba(44,62,80,0.2)] overflow-hidden"
              >
                <div className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {loading ? 'Processing Masterpiece...' : 'Confirm Order Securely'}
                  {!loading && <FiArrowRight className="group-hover:translate-x-2 transition-transform" />}
                </span>
              </motion.button>
            </form>
          </motion.div>

          {/* Right Column: Order Summary Glass Panel */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, type: "spring", delay: 0.2 }}
            className="lg:w-1/3"
          >
            <div className="bg-primary p-8 md:p-10 rounded-[2.5rem] shadow-2xl sticky top-32 text-white relative overflow-hidden">
              {/* Decorative interior elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-xl translate-y-1/2 -translate-x-1/2"></div>
              
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/10 relative z-10">
                <div className="p-3 bg-secondary/20 rounded-2xl text-secondary"><FiShoppingBag className="text-xl" /></div>
                <h2 className="text-2xl font-display font-bold text-white">Order Summary</h2>
              </div>
              
              <div className="space-y-6 mb-8 relative z-10">
                {cart.map((item, i) => (
                  <div key={i} className="flex gap-4 items-center bg-white/5 p-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors cursor-default">
                    <div className="w-16 h-16 rounded-xl bg-white/10 overflow-hidden shrink-0 relative flex items-center justify-center border border-white/20">
                      <img src={item.product.images[0] || "https://placehold.co/100x100?text=Art"} alt={item.product.name} className="w-full h-full object-cover" />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-secondary text-primary text-xs font-bold rounded-full flex items-center justify-center shadow-lg">{item.quantity}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white line-clamp-1 text-sm mb-1">{item.product.name}</p>
                      <p className="font-display font-bold text-secondary"><span className="font-sans text-secondary/80 mr-0.5">₹</span>{(item.product.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-white/10 rounded-2xl p-6 relative z-10 border border-white/10 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-3 text-sm text-white/70 font-medium">
                  <span>Subtotal</span>
                  <span><span className="font-sans text-secondary/80 mr-0.5">₹</span>{getCartTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mb-4 text-sm text-white/70 font-medium">
                  <span>Artisan Shipping</span>
                  <span className="text-secondary font-bold">Complimentary</span>
                </div>
                <div className="border-t border-white/20 pt-4 mt-2">
                  <div className="flex justify-between items-end">
                    <span className="text-white font-bold uppercase tracking-widest text-xs">Total Investment</span>
                    <span className="font-display font-bold text-4xl text-secondary"><span className="font-sans text-secondary/80 mr-0.5">₹</span>{getCartTotal().toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
