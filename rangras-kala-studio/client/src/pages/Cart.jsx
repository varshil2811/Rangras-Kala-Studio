import { Link } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-display font-bold text-primary mb-6">Your Cart is Empty</h2>
        <p className="text-text mb-8">Looks like you haven't added any beautiful art to your cart yet.</p>
        <Link to="/shop" className="bg-primary text-white px-8 py-3 rounded-md hover:bg-secondary hover:text-primary font-bold transition-colors">
          Browse Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-display font-bold text-primary mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {cart.map((item, index) => (
                <li key={index} className="p-6 flex flex-col sm:flex-row items-center gap-6">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-24 h-24 object-cover rounded-md" />
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-lg font-bold text-primary">{item.product.name}</h3>
                    <p className="text-gray-500 font-bold mb-2"><span className="font-sans text-secondary/80 mr-0.5">₹</span>{item.product.price}</p>
                    {item.customNote && (
                      <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded italic">Note: {item.customNote}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button onClick={() => updateQuantity(index, item.quantity - 1)} className="p-2 text-gray-600 hover:bg-gray-100"><FiMinus /></button>
                      <span className="px-3 font-bold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(index, item.quantity + 1)} className="p-2 text-gray-600 hover:bg-gray-100"><FiPlus /></button>
                    </div>
                    <button onClick={() => removeFromCart(index)} className="text-red-500 hover:text-red-700 p-2">
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
            <h2 className="text-xl font-display font-bold text-primary mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-bold"><span className="font-sans text-secondary/80 mr-0.5">₹</span>{getCartTotal()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-green-600 font-bold">Free</span>
              </div>
              <div className="border-t border-gray-200 pt-4 flex justify-between">
                <span className="font-bold text-lg text-primary">Total</span>
                <span className="font-bold text-xl text-primary"><span className="font-sans text-secondary/80 mr-0.5">₹</span>{getCartTotal()}</span>
              </div>
            </div>
            <Link to="/checkout" className="block w-full text-center bg-primary text-white py-3 rounded-md hover:bg-secondary hover:text-primary transition-colors font-bold">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
