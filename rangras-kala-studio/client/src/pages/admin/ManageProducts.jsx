import { Link } from 'react-router-dom';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/products');
      setProducts(data);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to load products';
      toast.error(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        toast.success('Product deleted successfully');
        fetchProducts(); // Refresh list
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to delete product';
        toast.error(`Error: ${errorMessage}`);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display font-bold text-primary">Manage Products</h1>
        <Link to="/admin/products/add" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary hover:text-primary transition-colors">
          + Add Product
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No products found. Add some!</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm">
                <th className="px-6 py-3 font-medium">Product Name</th>
                <th className="px-6 py-3 font-medium">Category</th>
                <th className="px-6 py-3 font-medium">Price</th>
                <th className="px-6 py-3 font-medium">Stock</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map(product => (
                <tr key={product._id}>
                  <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 capitalize">{product.category.replace('-', ' ')}</td>
                  <td className="px-6 py-4">₹{product.price}</td>
                  <td className="px-6 py-4">{product.stock}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {product.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-3">
                    <Link to={`/admin/products/edit/${product._id}`} className="text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 p-2 rounded-lg hover:bg-blue-100" title="Edit">
                      <FiEdit className="w-5 h-5" />
                    </Link>
                    <button onClick={() => handleDelete(product._id)} className="text-red-600 hover:text-red-800 transition-colors bg-red-50 p-2 rounded-lg hover:bg-red-100" title="Delete">
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManageProducts;
