import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user, token } = useAuth();
  const [cart, setCart] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Load cart from DB when user logs in
  useEffect(() => {
    const fetchCart = async () => {
      if (user && token) {
        try {
          const { data } = await axios.get('https://rangras-kala-studio.onrender.com/api/cart');
          // Format the response to match the frontend structure: { product, quantity, customNote, price }
          const formattedCart = data.cartItems ? data.cartItems.map(item => ({
            product: item.product,
            quantity: item.quantity,
            customNote: item.customNote || '',
            price: item.price
          })) : [];
          setCart(formattedCart);
        } catch (error) {
          console.error("Failed to fetch cart", error);
        }
      } else {
        setCart([]); // Clear cart if logged out
      }
      setIsInitialLoad(false);
    };
    fetchCart();
  }, [user, token]);

  // Sync cart to DB when it changes
  useEffect(() => {
    const syncCart = async () => {
      if (!isInitialLoad && user && token) {
        try {
          const cartItems = cart.map(item => ({
            product: item.product._id,
            quantity: item.quantity,
            customNote: item.customNote,
            price: item.product.price
          }));
          await axios.post('https://rangras-kala-studio.onrender.com/api/cart', { cartItems });
        } catch (error) {
          console.error("Failed to sync cart", error);
        }
      }
    };
    
    // Only sync if it's not the initial load, to avoid overwriting the DB with an empty cart on refresh
    if (!isInitialLoad) {
      const timeoutId = setTimeout(() => syncCart(), 500); // debounce sync
      return () => clearTimeout(timeoutId);
    }
  }, [cart, user, token, isInitialLoad]);


  const addToCart = (product, quantity = 1, customNote = '') => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.product._id === product._id && item.customNote === customNote);
      if (existingItemIndex >= 0) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      }
      return [...prevCart, { product, quantity, customNote, price: product.price }];
    });
  };

  const removeFromCart = (index) => {
    setCart(prevCart => prevCart.filter((_, i) => i !== index));
  };

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(prevCart => {
      const newCart = [...prevCart];
      newCart[index].quantity = newQuantity;
      return newCart;
    });
  };

  const clearCart = () => setCart([]);

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal }}>
      {children}
    </CartContext.Provider>
  );
};
