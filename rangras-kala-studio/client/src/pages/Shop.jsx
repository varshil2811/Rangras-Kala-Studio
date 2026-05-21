import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FiFilter, FiSearch } from 'react-icons/fi';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'resin-art', name: 'Resin Art' },
    { id: 'warli', name: 'Warli Painting' },
    { id: 'name-plates', name: 'Name Plates' },
    { id: 'coasters', name: 'Coasters' },
    { id: 'home-decor', name: 'Home Decor' },
    { id: 'other', name: 'Other' }
  ];

  useEffect(() => {
    // Sync active category if URL changes (e.g., user clicks a link from home while already on shop page)
    const cat = searchParams.get('category');
    if (cat) {
      setActiveCategory(cat);
    }
  }, [searchParams]);

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    if (catId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catId);
    }
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('https://rangras-kala-studio.onrender.com/api/products');
        // Only show active products in the shop
        const activeProducts = data.filter(p => p.isActive);
        setProducts(activeProducts);
      } catch (error) {
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-body">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-display font-bold text-primary mb-4">Our Collection</h1>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24 border border-accent/10">
            <h3 className="text-lg font-bold text-primary mb-4 flex items-center"><FiFilter className="mr-2" /> Categories</h3>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.id}>
                  <button onClick={() => handleCategoryChange(category.id)} className={`text-left w-full transition-colors ${activeCategory === category.id ? 'text-secondary font-bold' : 'text-text hover:text-primary'}`}>
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex-1">
          {loading ? (
            <div className="flex justify-center items-center h-64 text-text/60">
              Loading beautiful creations...
            </div>
          ) : filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center items-center h-64 text-text/60 bg-white rounded-lg border border-accent/10"
            >
              No products found in this category.
            </motion.div>
          ) : (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode='popLayout'>
                {filteredProducts.map((product) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.3 }}
                    key={product._id}
                    className="bg-white rounded-2xl shadow-sm border border-accent/10 overflow-hidden group hover:shadow-lg flex flex-col"
                  >
                    <div className="relative h-64 overflow-hidden bg-accent/5">
                      <Link to={`/product/${product._id}`}>
                        <img
                          src={product.images && product.images.length > 0 ? product.images[0] : 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=500&auto=format&fit=crop&q=60'}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </Link>
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="text-lg font-bold text-primary mb-1 line-clamp-1">{product.name}</h3>
                      <p className="text-sm text-text/60 mb-4 capitalize">{product.category.replace('-', ' ')}</p>
                      <div className="mt-auto flex justify-between items-center">
                        <span className="text-xl text-secondary font-bold">₹{product.price}</span>
                        <Link to={`/product/${product._id}`} className="bg-primary text-secondary px-4 py-2 rounded-xl hover:bg-primary/90 transition-colors font-medium text-sm shadow-md shadow-primary/20">
                          View Details
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
