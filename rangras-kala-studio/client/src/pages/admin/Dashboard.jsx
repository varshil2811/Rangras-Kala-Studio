import { Link } from 'react-router-dom';
import { FiBox, FiShoppingBag, FiMessageSquare, FiDollarSign } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [stats, setStats] = useState({
    productCount: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    newMessages: 0,
    recentOrders: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const { data } = await axios.get('https://rangras-kala-studio.onrender.com/api/dashboard');
        setStats(data);
      } catch (error) {
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-display font-bold text-primary mb-8">Admin Dashboard</h1>

      {loading ? (
        <div className="text-center text-gray-500 p-12">Loading dashboard...</div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                <FiBox className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{stats.productCount}</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                <FiDollarSign className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₹{stats.totalRevenue.toLocaleString('en-IN')}</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
                <FiShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Pending Orders</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingOrders}</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                <FiMessageSquare className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">New Messages</p>
                <p className="text-2xl font-bold text-gray-900">{stats.newMessages}</p>
              </div>
            </div>
          </div>

          {/* Quick Actions & Recent Orders */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-primary">Recent Orders</h2>
                  <Link to="/admin/orders" className="text-secondary hover:text-primary text-sm font-medium">View All</Link>
                </div>
                <div className="overflow-x-auto">
                  {stats.recentOrders.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">No recent orders.</div>
                  ) : (
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50 text-gray-500 text-sm">
                          <th className="px-6 py-3 font-medium">Order ID</th>
                          <th className="px-6 py-3 font-medium">Customer</th>
                          <th className="px-6 py-3 font-medium">Amount</th>
                          <th className="px-6 py-3 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {stats.recentOrders.map(order => (
                          <tr key={order._id}>
                            <td className="px-6 py-4">#{order._id.substring(order._id.length - 6)}</td>
                            <td className="px-6 py-4">{order.customerName}</td>
                            <td className="px-6 py-4">₹{order.totalAmount}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.orderStatus === 'delivered' ? 'bg-green-100 text-green-800' :
                                order.orderStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                  order.orderStatus === 'cancelled' ? 'bg-red-100 text-red-800' :
                                    'bg-blue-100 text-blue-800'
                                }`}>
                                {order.orderStatus}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-primary mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <Link to="/admin/products/add" className="block w-full text-center bg-primary text-white py-2 rounded-md hover:bg-secondary hover:text-primary transition-colors font-medium">Add New Product</Link>
                  <Link to="/admin/products" className="block w-full text-center border border-primary text-primary py-2 rounded-md hover:bg-primary hover:text-white transition-colors font-medium">Manage Products</Link>
                  <Link to="/admin/orders" className="block w-full text-center border border-primary text-primary py-2 rounded-md hover:bg-primary hover:text-white transition-colors font-medium">Manage Orders</Link>
                  <Link to="/admin/messages" className="block w-full text-center border border-primary text-primary py-2 rounded-md hover:bg-primary hover:text-white transition-colors font-medium">View Messages</Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
