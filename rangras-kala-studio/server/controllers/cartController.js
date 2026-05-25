const Cart = require('../models/Cart');

const getUserCart = async (req, res) => {
  try {
    if (req.user._id === 'admin_id') return res.json({ cartItems: [] });
    let cart = await Cart.findOne({ user: req.user._id }).populate('cartItems.product');
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, cartItems: [], totalPrice: 0 });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const syncUserCart = async (req, res) => {
  try {
    if (req.user._id === 'admin_id') return res.json({ cartItems: [] });
    const { cartItems } = req.body;
    let cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
      cart = new Cart({ user: req.user._id, cartItems: [] });
    }
    
    cart.cartItems = cartItems;
    cart.totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    
    await cart.save();
    
    const updatedCart = await Cart.findById(cart._id).populate('cartItems.product');
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUserCart, syncUserCart };
