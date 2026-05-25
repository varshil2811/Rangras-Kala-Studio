import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter, FiSearch, FiArrowRight } from 'react-icons/fi';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('https://rangras-kala-studio.onrender.com/api/products');
        setProducts(data);

        const uniqueCategories = ['All', ...new Set(data.map(p => p.category))];
        setCategories(uniqueCategories);

        const params = new URLSearchParams(location.search);
        const categoryParam = params.get('category');
        if (categoryParam) {
          setSelectedCategory(categoryParam);
          setFilteredProducts(data.filter(p => p.category === categoryParam));
        } else {
          setFilteredProducts(data);
        }
      } catch (error) {
        console.error('Error fetching products', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [location]);

  useEffect(() => {
    let result = products;
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }
    if (searchQuery) {
      result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    setFilteredProducts(result);
  }, [selectedCategory, searchQuery, products]);

  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-28 pb-20 font-body relative overflow-hidden">
      {/* Dynamic Background */}
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 150, repeat: Infinity, ease: "linear" }} className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Dynamic Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, type: "spring" }} className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-primary mb-6 tracking-tight">Artisan Gallery</h1>
          <p className="text-text/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">Discover our collection of handcrafted masterpieces, uniquely designed to bring earthy luxury into your space.</p>
        </motion.div>

        {/* Dynamic Filters & Search */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16 bg-white/60 backdrop-blur-xl p-4 rounded-[2rem] border border-white/60 shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
          <div className="flex items-center gap-3 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 px-2 hide-scrollbar">
            <div className="p-2 bg-secondary/10 rounded-xl text-secondary mr-2 hidden md:block"><FiFilter /></div>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${selectedCategory === category
                    ? 'bg-primary text-secondary shadow-lg shadow-primary/20 scale-105'
                    : 'bg-[#FDFBF7] text-text/60 hover:bg-secondary/10 hover:text-primary border border-accent/10'
                  }`}
              >
                {category.replace('-', ' ')}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80 group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-text/40 group-focus-within:text-secondary transition-colors">
              <FiSearch />
            </div>
            <input
              type="text"
              placeholder="Search masterpieces..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#FDFBF7] border-2 border-transparent focus:border-secondary/50 rounded-2xl outline-none transition-all focus:bg-white text-primary font-medium placeholder:text-text/40 shadow-sm"
            />
          </div>
        </motion.div>

        {/* Dynamic Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {[1, 2, 3, 4, 5, 6].map(n => (
              <div key={n} className="animate-pulse bg-white/50 rounded-[2.5rem] h-40 border border-white/80 shadow-sm"></div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
            <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6"><FiSearch className="text-4xl text-secondary" /></div>
            <h2 className="text-2xl font-display font-bold text-primary mb-3">No creations found</h2>
            <p className="text-text/60 text-lg">Try adjusting your search or category filter.</p>
            <button onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }} className="mt-8 px-6 py-3 bg-secondary/10 text-primary font-bold rounded-xl hover:bg-secondary/20 transition-colors">Clear Filters</button>
          </motion.div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
            <AnimatePresence>
              {filteredProducts.map((product, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  key={product._id}
                  className="group bg-white rounded-[2.5rem] overflow-hidden border border-accent/10 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col"
                >
                  <div className="relative aspect-square overflow-hidden bg-[#FDFBF7]">
                    <img
                      src={product.images[0] || 'https://placehold.co/400x500?text=Art'}
                      alt={product.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary uppercase tracking-widest shadow-sm">
                      {product.category.replace('-', ' ')}
                    </div>

                    <Link
                      to={`/product/${product._id}`}
                      className="absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 bg-secondary text-primary px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-xl hover:bg-secondary/90 w-max"
                    >
                      View Masterpiece <FiArrowRight />
                    </Link>
                  </div>

                  <div className="p-5 md:p-6 flex flex-col flex-1 bg-white relative z-10">
                    <h3 className="text-xl font-display font-bold text-primary mb-2 line-clamp-1 group-hover:text-secondary transition-colors">{product.name}</h3>
                    <p className="text-text/60 text-sm line-clamp-2 mb-6 flex-1 leading-relaxed">{product.description}</p>
                    <div className="flex justify-between items-end pt-4 border-t border-accent/10">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-text/40 mb-1">Investment</p>
                        <span className="text-2xl text-primary font-display font-bold"><span className="font-sans text-secondary/80 mr-0.5">₹</span>{product.price}</span>
                      </div>
                      {product.stock > 0 ? (
                        <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
                      ) : (
                        <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded-md">Sold Out</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Shop;
