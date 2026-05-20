import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiMinus, FiPlus, FiShoppingCart } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [customNote, setCustomNote] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(data);
      } catch (error) {
        toast.error('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 py-24 text-center text-text/60 font-body text-lg">Loading product details...</div>;
  }

  if (!product) {
    return <div className="max-w-7xl mx-auto px-4 py-24 text-center text-red-500 font-body text-lg">Product not found.</div>;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, customNote);
    toast.success('Added to cart!');
  };

  const whatsappMessage = encodeURIComponent(`Hi! I'm interested in the ${product.name}. Could you provide more details?`);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-body text-text">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Images */}
        <div className="w-full md:w-1/2">
          <div className="rounded-2xl overflow-hidden border border-accent/10 shadow-lg shadow-accent/5">
            <img
              src={product.images && product.images.length > 0 ? product.images[0] : 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800&auto=format&fit=crop&q=80'}
              alt={product.name}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Info */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <span className="text-secondary font-bold uppercase tracking-wider text-sm mb-2">{product.category.replace('-', ' ')}</span>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">{product.name}</h1>
          <p className="text-3xl font-bold text-secondary mb-6">₹{product.price}</p>

          <p className="text-text/80 mb-8 leading-relaxed text-lg">
            {product.description}
          </p>

          {product.isCustomOrder && (
            <div className="mb-8 p-4 bg-accent/5 rounded-xl border border-accent/10">
              <label htmlFor="customNote" className="block text-sm font-bold text-primary mb-2">Customization Requirements (Name, Colors, etc.)</label>
              <textarea
                id="customNote"
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                rows="3"
                className="w-full bg-white border border-accent/20 rounded-lg p-3 focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all resize-none"
                placeholder="Enter names to be written, preferred colors, or special instructions..."
              ></textarea>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex items-center border-2 border-accent/20 rounded-xl bg-white overflow-hidden">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-5 py-3 text-text hover:bg-accent/10 transition-colors"><FiMinus /></button>
              <span className="px-4 py-3 font-bold text-lg w-12 text-center">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-5 py-3 text-text hover:bg-accent/10 transition-colors"><FiPlus /></button>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-1 min-w-[200px] flex items-center justify-center bg-primary text-secondary px-6 py-4 rounded-xl hover:bg-primary/90 transition-all font-bold shadow-xl shadow-primary/20"
            >
              <FiShoppingCart className="mr-3 text-xl" /> Add to Cart
            </button>
          </div>

          <a
            href={`https://wa.me/919023239808?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center w-full bg-[#25D366] text-white px-6 py-4 rounded-xl hover:bg-[#20bd5a] transition-all font-bold shadow-lg shadow-[#25D366]/20 hover:-translate-y-1"
          >
            <FaWhatsapp className="mr-3 h-6 w-6" /> Order via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
