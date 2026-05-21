import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    category: 'resin-art',
    description: '',
    price: '',
    stock: '',
    isCustomOrder: false,
    isActive: true
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`https://rangras-kala-studio.onrender.com/api/products/${id}`);
        setFormData({
          name: data.name,
          category: data.category,
          description: data.description,
          price: data.price,
          stock: data.stock,
          isCustomOrder: data.isCustomOrder,
          isActive: data.isActive
        });
      } catch (error) {
        toast.error('Failed to load product details');
        navigate('/admin/products');
      } finally {
        setFetching(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

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
      await axios.put(`https://rangras-kala-studio.onrender.com/api/products/${id}`, formData);
      toast.success('Product updated successfully!');
      navigate('/admin/products');
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to update product';
      toast.error(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="max-w-4xl mx-auto px-4 py-12 text-center">Loading product data...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-body">
      <h1 className="text-3xl font-display font-bold text-primary mb-8">Edit Product</h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-accent/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-text mb-2">Product Name *</label>
            <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border border-accent/20 rounded-xl p-3 outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-2">Category *</label>
            <select required name="category" value={formData.category} onChange={handleChange} className="w-full border border-accent/20 rounded-xl p-3 outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all">
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
          <label className="block text-sm font-medium text-text mb-2">Description *</label>
          <textarea required name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full border border-accent/20 rounded-xl p-3 outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all resize-none"></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-text mb-2">Price (₹) *</label>
            <input required type="number" name="price" value={formData.price} onChange={handleChange} className="w-full border border-accent/20 rounded-xl p-3 outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-2">Stock Quantity *</label>
            <input required type="number" name="stock" value={formData.stock} onChange={handleChange} className="w-full border border-accent/20 rounded-xl p-3 outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all" />
          </div>
        </div>

        <div className="mb-8 p-4 bg-accent/5 rounded-xl border border-accent/10">
          <label className="block text-sm font-medium text-text mb-2">Product Images (Coming Soon)</label>
          <input disabled type="file" multiple accept="image/*" className="w-full border border-accent/20 rounded-xl p-3 outline-none bg-white cursor-not-allowed opacity-70" />
          <p className="text-sm text-text/60 mt-2">Image upload will be available when cloud storage is connected.</p>
        </div>

        <div className="space-y-4 mb-8">
          <label className="flex items-center space-x-3 cursor-pointer p-4 border border-accent/10 rounded-xl hover:bg-accent/5 transition-colors">
            <input type="checkbox" name="isCustomOrder" checked={formData.isCustomOrder} onChange={handleChange} className="h-5 w-5 text-secondary rounded focus:ring-secondary border-accent/30" />
            <span className="text-text font-medium">Is Custom Order? (Allows users to enter names/notes)</span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer p-4 border border-accent/10 rounded-xl hover:bg-accent/5 transition-colors">
            <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} className="h-5 w-5 text-secondary rounded focus:ring-secondary border-accent/30" />
            <span className="text-text font-medium">Is Active? (Show in shop)</span>
          </label>
        </div>

        <div className="flex justify-end gap-4">
          <button type="button" onClick={() => navigate('/admin/products')} className="px-8 py-3 border border-accent/20 text-text rounded-xl hover:bg-accent/5 font-medium transition-colors">Cancel</button>
          <button type="submit" disabled={loading} className="px-8 py-3 bg-primary text-secondary rounded-xl hover:bg-primary/90 font-bold transition-all disabled:opacity-50 shadow-lg shadow-primary/20">
            {loading ? 'Saving...' : 'Update Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
