import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMinus, FiPlus, FiShoppingBag, FiArrowLeft, FiHeart, FiCheck, FiTruck, FiShield } from 'react-icons/fi';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [customNote, setCustomNote] = useState('');
  const [activeImage, setActiveImage] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`https://rangras-kala-studio.onrender.com/api/products/${id}`);
        setProduct(data);
      } catch (error) {
        toast.error('Failed to load product details');
        navigate('/shop');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = () => {
    addToCart(product, quantity, customNote);
    setIsAdded(true);
    toast.success('Masterpiece added to your collection');
    setTimeout(() => setIsAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] pt-32 pb-20 flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="w-16 h-16 border-4 border-accent/20 border-t-secondary rounded-full"></motion.div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-32 pb-20 font-body relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[50%] h-[800px] bg-secondary/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[40%] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none translate-y-1/3 -translate-x-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <Link to="/shop" className="inline-flex items-center gap-2 text-text/60 hover:text-primary font-bold mb-10 transition-colors group">
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Gallery
        </Link>

        <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[3rem] p-6 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.03)]">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            
            {/* Image Gallery */}
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, type: "spring" }} className="lg:w-1/2">
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-[#FDFBF7] mb-6 group shadow-sm border border-accent/10">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={activeImage}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    src={product.images[activeImage] || 'https://placehold.co/800x1000?text=Art'} 
                    alt={product.name} 
                    className="w-full h-full object-cover" 
                  />
                </AnimatePresence>
                
                {/* Wishlist Button Overlay */}
                <button className="absolute top-6 right-6 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-text/40 hover:text-red-500 hover:shadow-lg transition-all duration-300">
                  <FiHeart className="text-xl" />
                </button>
              </div>
              
              {/* Thumbnail Navigator */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
                  {product.images.map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 border-2 transition-all duration-300 ${activeImage === idx ? 'border-secondary shadow-md scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                    >
                      <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, type: "spring", delay: 0.2 }} className="lg:w-1/2 flex flex-col justify-center">
              
              <div className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary font-bold text-xs uppercase tracking-widest rounded-full mb-6 border border-secondary/20 w-max">
                {product.category.replace('-', ' ')}
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-display font-bold text-primary mb-4 leading-tight">{product.name}</h1>
              
              <div className="flex items-center gap-6 mb-8">
                <p className="text-4xl font-display font-bold text-secondary"><span className="font-sans text-secondary/80 mr-0.5">₹</span>{product.price}</p>
                <div className="h-8 w-px bg-accent/20"></div>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${product.stock > 0 ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-red-500'}`}></div>
                  <span className="text-sm font-bold uppercase tracking-widest text-text/60">
                    {product.stock > 0 ? 'Available in Studio' : 'Currently Unavailable'}
                  </span>
                </div>
              </div>

              <p className="text-text/70 mb-10 leading-relaxed text-lg font-medium">{product.description}</p>

              {/* Quantity Selector */}
              <div className="mb-8">
                <label className="block text-xs font-bold uppercase tracking-widest text-text/60 mb-3">Quantity</label>
                <div className="inline-flex items-center bg-[#FDFBF7] border border-accent/20 rounded-2xl p-2 shadow-sm">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-primary hover:bg-white hover:shadow-sm transition-all disabled:opacity-30"
                    disabled={quantity <= 1}
                  >
                    <FiMinus />
                  </button>
                  <span className="w-16 text-center font-display font-bold text-xl text-primary">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-primary hover:bg-white hover:shadow-sm transition-all disabled:opacity-30"
                    disabled={quantity >= product.stock}
                  >
                    <FiPlus />
                  </button>
                </div>
              </div>

              {/* Custom Note */}
              <div className="mb-10 group">
                <label className="block text-xs font-bold uppercase tracking-widest text-text/60 mb-3">Artisan Note (Optional)</label>
                <textarea 
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="Special requests or customization details..."
                  className="w-full bg-[#FDFBF7] border-2 border-transparent focus:border-secondary/50 rounded-2xl p-4 text-primary font-medium outline-none transition-all resize-none shadow-sm group-hover:bg-white h-24"
                ></textarea>
              </div>

              {/* Add to Cart Button */}
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`relative w-full overflow-hidden flex items-center justify-center gap-3 py-5 rounded-2xl font-bold text-lg transition-all duration-300 shadow-[0_15px_30px_rgba(44,62,80,0.15)] ${
                  isAdded 
                    ? 'bg-green-500 text-white' 
                    : product.stock === 0 
                      ? 'bg-accent/30 text-text/40 cursor-not-allowed' 
                      : 'bg-primary text-secondary hover:bg-primary/90'
                }`}
              >
                <AnimatePresence mode="wait">
                  {isAdded ? (
                    <motion.div key="added" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="flex items-center gap-2">
                      <FiCheck className="text-2xl" /> Masterpiece Added
                    </motion.div>
                  ) : (
                    <motion.div key="add" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="flex items-center gap-3">
                      <FiShoppingBag className="text-xl" /> Acquire Masterpiece
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 mt-10 pt-8 border-t border-accent/15">
                <div className="flex items-center gap-3 text-text/60">
                  <div className="p-3 bg-secondary/10 rounded-xl text-secondary"><FiTruck className="text-xl" /></div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest">Shipping</p>
                    <p className="text-sm font-medium text-primary">Global Secure Delivery</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-text/60">
                  <div className="p-3 bg-secondary/10 rounded-xl text-secondary"><FiShield className="text-xl" /></div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest">Authenticity</p>
                    <p className="text-sm font-medium text-primary">100% Original Artwork</p>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
