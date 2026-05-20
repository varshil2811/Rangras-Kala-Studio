import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'resin-art',
    description: '',
    price: '',
    stock: '',
    isCustomOrder: false,
    isActive: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/products', formData);
      toast.success('Product added successfully!');
      navigate('/admin/products');
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to add product';
      toast.error(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-display font-bold text-primary mb-8">Add New Product</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
            <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-secondary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
            <select required name="category" value={formData.category} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-secondary">
              <option value="resin-art">Resin Art</option>
              <option value="warli">Warli Painting</option>
              <option value="name-plates">Name Plates</option>
              <option value="coasters">Coasters</option>
              <option value="home-decor">Home Decor</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
          <textarea required name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-secondary"></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹) *</label>
            <input required type="number" name="price" value={formData.price} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-secondary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity *</label>
            <input required type="number" name="stock" value={formData.stock} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-secondary" />
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Images (Coming Soon)</label>
          <input disabled type="file" multiple accept="image/*" className="w-full border border-gray-300 rounded-md p-2 outline-none bg-gray-50" />
          <p className="text-sm text-gray-500 mt-1">Image upload will be available when cloud storage is connected.</p>
        </div>

        <div className="space-y-4 mb-8">
          <label className="flex items-center space-x-3">
            <input type="checkbox" name="isCustomOrder" checked={formData.isCustomOrder} onChange={handleChange} className="h-4 w-4 text-secondary rounded focus:ring-secondary" />
            <span className="text-gray-700 font-medium">Is Custom Order? (Allows users to enter names/notes)</span>
          </label>
          <label className="flex items-center space-x-3">
            <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} className="h-4 w-4 text-secondary rounded focus:ring-secondary" />
            <span className="text-gray-700 font-medium">Is Active? (Show in shop)</span>
          </label>
        </div>

        <div className="flex justify-end gap-4">
          <button type="button" onClick={() => navigate('/admin/products')} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium transition-colors">Cancel</button>
          <button type="submit" disabled={loading} className="px-6 py-2 bg-primary text-white rounded-md hover:bg-secondary hover:text-primary font-medium transition-colors disabled:opacity-50">
            {loading ? 'Saving...' : 'Save Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
