import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiTwitter } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-primary text-background">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <h2 className="font-display text-2xl font-bold text-accent mb-4">Rangras Kala</h2>
            <p className="text-sm font-accent text-gray-300 mb-4">Made with Rang-Ras-Kala</p>
            <p className="text-sm text-gray-300">
              Handcrafted with love. Bringing traditional art and modern decor to your home.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-bold tracking-wider uppercase mb-4 text-secondary">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/shop?category=resin-art" className="text-sm text-gray-300 hover:text-accent">Resin Art</Link></li>
              <li><Link to="/shop?category=warli" className="text-sm text-gray-300 hover:text-accent">Warli Painting</Link></li>
              <li><Link to="/shop?category=name-plates" className="text-sm text-gray-300 hover:text-accent">Name Plates</Link></li>
              <li><Link to="/shop?category=coasters" className="text-sm text-gray-300 hover:text-accent">Coasters</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold tracking-wider uppercase mb-4 text-secondary">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-sm text-gray-300 hover:text-accent">Contact Us</Link></li>
              <li><Link to="/faq" className="text-sm text-gray-300 hover:text-accent">FAQs</Link></li>
              <li><Link to="/shipping" className="text-sm text-gray-300 hover:text-accent">Shipping Policy</Link></li>
              <li><Link to="/returns" className="text-sm text-gray-300 hover:text-accent">Returns & Exchanges</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold tracking-wider uppercase mb-4 text-secondary">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-300 hover:text-accent"><FiInstagram className="h-6 w-6" /></a>
              <a href="#" className="text-gray-300 hover:text-accent"><FiFacebook className="h-6 w-6" /></a>
              <a href="#" className="text-gray-300 hover:text-accent"><FiTwitter className="h-6 w-6" /></a>
            </div>
            <a href="https://wa.me/919023239808" target="_blank" rel="noreferrer" className="inline-flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors">
              <FaWhatsapp className="h-5 w-5" />
              <span>Chat with us</span>
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Rangras Kala Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
