import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBox, FiLogOut, FiUser, FiMail, FiCalendar, FiClock, FiShoppingBag, FiChevronRight, FiStar } from 'react-icons/fi';
import { FaLeaf } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const UserOrders = () => {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredOrder, setHoveredOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('https://rangras-kala-studio.onrender.com/api/orders/myorders');
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  const monogram = user?.name ? user.name.charAt(0).toUpperCase() : 'C';

  return (
    <div className="min-h-screen bg-[#FDFBF7] relative overflow-hidden pt-32 pb-20 font-body">
      {/* Floating Animated Background Elements */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0], 
          rotate: [0, 5, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-10 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div 
        animate={{ 
          y: [0, 30, 0], 
          rotate: [0, -10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-accent/15 rounded-full blur-[100px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10"
        >
          {/* Left Column: Glassmorphic Profile Card */}
          <motion.div variants={itemVariants} className="lg:col-span-4">
            <div className="bg-white/70 backdrop-blur-2xl border border-white/50 rounded-[2rem] p-8 shadow-[0_20px_50px_rgb(0,0,0,0.05)] sticky top-32 group overflow-hidden">
              
              {/* Card Hover Gradient Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

              <div className="flex flex-col items-center text-center mb-10 relative z-10">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="w-32 h-32 rounded-full bg-gradient-to-br from-secondary to-[#c29654] p-1 shadow-2xl shadow-secondary/30 mb-6 relative cursor-pointer"
                >
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-secondary/10"></div>
                    <span className="text-5xl font-display font-bold text-secondary relative z-10">{monogram}</span>
                  </div>
                  <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg"
                  >
                    <FaLeaf className="text-secondary text-xl" />
                  </motion.div>
                </motion.div>
                
                <h1 className="text-3xl font-display font-bold text-primary mb-2">{user?.name || 'Artisan Customer'}</h1>
                <div className="flex items-center gap-2 bg-accent/10 px-4 py-1.5 rounded-full border border-accent/20">
                  <FiStar className="text-secondary fill-secondary" />
                  <span className="text-xs font-bold text-primary uppercase tracking-widest">Premium Member</span>
                </div>
              </div>

              <div className="space-y-4 mb-10 relative z-10">
                <motion.div whileHover={{ x: 5 }} className="flex items-center gap-4 p-4 rounded-2xl bg-white/60 border border-white/80 shadow-sm transition-all cursor-default">
                  <div className="p-3 bg-primary/5 rounded-xl text-secondary"><FiMail className="text-xl" /></div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-text/50 font-bold mb-0.5">Email Address</p>
                    <p className="text-sm font-medium text-primary truncate">{user?.email}</p>
                  </div>
                </motion.div>
                <motion.div whileHover={{ x: 5 }} className="flex items-center gap-4 p-4 rounded-2xl bg-white/60 border border-white/80 shadow-sm transition-all cursor-default">
                  <div className="p-3 bg-primary/5 rounded-xl text-secondary"><FiShoppingBag className="text-xl" /></div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-text/50 font-bold mb-0.5">Total Orders</p>
                    <p className="text-lg font-display font-bold text-primary">{orders.length} <span className="text-sm font-medium text-text/70">Placed</span></p>
                  </div>
                </motion.div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout} 
                className="w-full relative overflow-hidden group flex items-center justify-center gap-3 text-red-500 font-bold bg-white border-2 border-red-100 hover:border-red-500 hover:text-white px-6 py-4 rounded-2xl transition-all duration-300 shadow-sm z-10"
              >
                <div className="absolute inset-0 bg-red-500 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
                <FiLogOut className="text-xl relative z-10 group-hover:-translate-x-1 transition-transform" /> 
                <span className="relative z-10">Secure Logout</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Right Column: Dynamic Order Collection */}
          <motion.div variants={itemVariants} className="lg:col-span-8">
            <div className="bg-white/50 backdrop-blur-xl border border-white/60 rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_50px_rgb(0,0,0,0.03)] min-h-[600px] relative overflow-hidden">
              
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-8 border-b border-accent/15 relative z-10">
                <div>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "3rem" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-1 bg-secondary rounded-full mb-4"
                  />
                  <h2 className="text-4xl font-display font-bold text-primary tracking-tight">Your Collection</h2>
                  <p className="text-text/60 mt-2 text-lg">A gallery of your handmade artisan acquisitions</p>
                </div>
                {orders.length > 0 && (
                  <button onClick={() => navigate('/shop')} className="text-secondary font-bold hover:text-primary transition-colors flex items-center gap-2 group">
                    Shop More <FiChevronRight className="group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
              </div>

              {loading ? (
                <div className="space-y-6 relative z-10">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="animate-pulse bg-white/60 h-40 rounded-[2rem] border border-white/80 shadow-sm"></div>
                  ))}
                </div>
              ) : orders.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="text-center py-20 flex flex-col items-center justify-center relative z-10"
                >
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-32 h-32 bg-gradient-to-br from-accent/20 to-secondary/10 rounded-full flex items-center justify-center mb-8 border border-white shadow-xl shadow-accent/5 relative"
                  >
                    <div className="absolute inset-0 rounded-full border border-secondary/20 animate-ping opacity-20"></div>
                    <FiShoppingBag className="text-5xl text-secondary" />
                  </motion.div>
                  <h3 className="text-3xl font-display font-bold text-primary mb-3">No Masterpieces Yet</h3>
                  <p className="text-text/60 max-w-md mx-auto mb-10 text-lg leading-relaxed">
                    Your collection is waiting to be curated. Explore our gallery to discover exquisite handmade creations.
                  </p>
                  <motion.button 
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/shop')} 
                    className="px-8 py-4 bg-primary text-secondary font-bold text-lg rounded-2xl hover:bg-primary/90 transition-all shadow-[0_10px_30px_rgba(44,62,80,0.2)] flex items-center gap-3"
                  >
                    Explore Gallery <FiChevronRight />
                  </motion.button>
                </motion.div>
              ) : (
                <div className="space-y-6 relative z-10">
                  <AnimatePresence>
                    {orders.map((order, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.15, type: "spring", stiffness: 100 }}
                        onHoverStart={() => setHoveredOrder(order._id)}
                        onHoverEnd={() => setHoveredOrder(null)}
                        key={order._id} 
                        className="group bg-white/70 backdrop-blur-md border-2 border-white hover:border-secondary/30 p-6 sm:p-8 rounded-[2rem] transition-all duration-500 shadow-sm hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] relative overflow-hidden cursor-pointer"
                      >
                        {/* Dynamic status glow */}
                        <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 ${order.orderStatus === 'pending' ? 'bg-yellow-400' : 'bg-green-500'}`}></div>
                        
                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 relative z-10">
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                              <span className="text-xs font-mono text-text/60 bg-accent/10 px-3 py-1.5 rounded-lg border border-accent/20">#{order._id.substring(order._id.length - 8).toUpperCase()}</span>
                              <motion.span 
                                animate={hoveredOrder === order._id && order.orderStatus === 'pending' ? { scale: [1, 1.05, 1] } : {}}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase ${order.orderStatus === 'pending' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' : 'bg-green-100 text-green-800 border border-green-200'}`}
                              >
                                {order.orderStatus}
                              </motion.span>
                            </div>
                            <h4 className="font-display text-xl text-primary flex items-center gap-3 font-medium">
                              <div className="p-2 bg-secondary/10 rounded-full text-secondary"><FiCalendar className="text-lg" /></div>
                              {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </h4>
                          </div>
                          
                          <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-2 border-t md:border-t-0 md:border-l border-accent/10 pt-4 md:pt-0 md:pl-8">
                            <div className="text-left md:text-right">
                              <p className="text-xs text-text/50 uppercase tracking-widest font-bold mb-1">Total Investment</p>
                              <p className="font-display font-bold text-3xl text-primary tracking-tight"><span className="font-sans text-secondary/80 mr-0.5">₹</span>{order.totalAmount.toLocaleString()}</p>
                            </div>
                            <div className="overflow-hidden">
                              <motion.div 
                                initial={{ y: 20, opacity: 0 }}
                                animate={hoveredOrder === order._id ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                                className="text-sm font-bold text-secondary flex items-center gap-1 mt-2"
                              >
                                View Order <FiChevronRight className="text-lg" />
                              </motion.div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
};

export default UserOrders;
