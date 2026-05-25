import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiBox, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const UserOrders = () => {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 min-h-[70vh]">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display font-bold text-primary">My Profile</h1>
        <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 font-medium hover:bg-red-50 px-4 py-2 rounded-lg transition-colors">
          <FiLogOut /> Logout
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-accent/10 mb-8">
        <h2 className="text-xl font-bold text-primary mb-2">Hello, {user?.name || 'Customer'}</h2>
        <p className="text-text/70">{user?.email}</p>
      </div>

      <h2 className="text-2xl font-display font-bold text-primary mb-6 flex items-center gap-2">
        <FiBox /> Order History
      </h2>

      {loading ? (
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-20 bg-accent/10 rounded"></div>
            <div className="h-20 bg-accent/10 rounded"></div>
          </div>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-12 bg-accent/5 rounded-2xl border border-accent/10">
          <p className="text-text/70 text-lg">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={order._id} className="bg-white border border-accent/10 p-6 rounded-2xl flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <p className="font-bold text-primary mb-1">Order ID: <span className="text-text/70 font-normal text-sm">{order._id}</span></p>
                <p className="text-sm text-text/60">Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-sm text-text/60 mb-1">Total Amount</p>
                  <p className="font-bold text-secondary">₹{order.totalAmount}</p>
                </div>
                <div>
                  <p className="text-sm text-text/60 mb-1">Status</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.orderStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                    {order.orderStatus.toUpperCase()}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
export default UserOrders;
