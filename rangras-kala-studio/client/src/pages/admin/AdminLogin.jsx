import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FaLock, FaEnvelope, FaLeaf } from 'react-icons/fa';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back to the studio');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error('Invalid credentials (use admin@rangraskala.com / admin)');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-primary selection:bg-secondary selection:text-primary">
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1615529182904-14819c35db37?w=1600&auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30 scale-105 animate-[pulse_20s_ease-in-out_infinite_alternate]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1209]/95 via-[#1A1209]/80 to-[#1A1209]/95 mix-blend-multiply"></div>
        {/* Floating Decorative Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md px-6 relative z-10"
      >
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] relative overflow-hidden group">
          {/* Subtle moving glow inside the card */}
          <div className="absolute -inset-10 bg-gradient-to-r from-secondary/0 via-secondary/10 to-secondary/0 rotate-45 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out"></div>
          
          <div className="text-center mb-10 relative z-10">
            <Link to="/" className="inline-flex items-center justify-center gap-2 mb-6 group/logo">
              <FaLeaf className="text-3xl text-secondary group-hover/logo:rotate-180 transition-transform duration-700" />
            </Link>
            <h2 className="text-3xl font-display font-bold text-white tracking-wide">
              Studio <span className="font-accent text-secondary italic font-light text-4xl">Portal</span>
            </h2>
            <p className="text-gray-300/80 mt-3 text-sm font-light">Secure access for master artisans</p>
          </div>

          <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div className="relative group/input">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40 group-focus-within/input:text-secondary transition-colors">
                  <FaEnvelope />
                </div>
                <input
                  type="email"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 pl-12 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-transparent focus:bg-white/10 transition-all duration-300"
                  placeholder="Artisan Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="relative group/input">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40 group-focus-within/input:text-secondary transition-colors">
                  <FaLock />
                </div>
                <input
                  type="password"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 pl-12 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-transparent focus:bg-white/10 transition-all duration-300"
                  placeholder="Secret Key"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-secondary text-primary font-semibold rounded-xl hover:bg-white transition-colors duration-300 shadow-lg shadow-secondary/20 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
              ) : (
                "Unlock Workspace"
              )}
            </motion.button>
          </form>
          
          <div className="mt-8 text-center relative z-10">
            <Link to="/" className="text-sm text-white/50 hover:text-secondary transition-colors">
              &larr; Return to Gallery
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
