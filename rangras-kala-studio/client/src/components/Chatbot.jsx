import React, { useState, useRef, useEffect } from 'react';
import { FiMessageSquare, FiX, FiSend, FiFeather } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Welcome to Rangras Kala Studio. How may I assist you today?", isBot: true }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    // Show the tooltip after 3 seconds of page load to grab attention
    const timer = setTimeout(() => {
      if (!isOpen) setShowTooltip(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });
      const data = await response.json();
      
      setMessages(prev => [...prev, { text: data.reply || "Sorry, I am having trouble connecting right now.", isBot: true }]);
    } catch (error) {
      setMessages(prev => [...prev, { text: "Error: Unable to reach the server.", isBot: true }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Tooltip and Floating Button Wrapper */}
      <div className="fixed bottom-6 right-6 flex flex-col items-end z-50">
        
        {/* Welcome Tooltip */}
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="mb-4 mr-2 bg-[#140e07] px-5 py-3 rounded-2xl rounded-br-none shadow-[0_15px_30px_rgba(0,0,0,0.6)] border border-[#D4A853]/30 cursor-pointer hover:border-[#D4A853]/60 transition-colors relative group"
              onClick={() => {
                setIsOpen(true);
                setShowTooltip(false);
              }}
            >
              <p className="text-sm font-body text-[#E8C99A] group-hover:text-white transition-colors">Need help finding the perfect art? ✨</p>
              {/* Tooltip Arrow */}
              <div className="absolute -bottom-2 right-4 w-4 h-4 bg-[#140e07] border-b border-r border-[#D4A853]/30 transform rotate-45"></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Button with Ripple Effect */}
        <div className="relative">
          {/* Ripple Effect (Only when closed) */}
          {!isOpen && (
            <div className="absolute inset-0 bg-[#D4A853] rounded-full animate-ping opacity-20 pointer-events-none"></div>
          )}
          
          <motion.button 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsOpen(!isOpen);
              setShowTooltip(false);
            }}
            className="relative p-4 bg-gradient-to-br from-[#1A1209] to-[#0a0703] text-[#D4A853] rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.6)] transition-all flex items-center justify-center group border border-[#D4A853]/30"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                  <FiX size={24} />
                </motion.div>
              ) : (
                <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                  <FiMessageSquare size={24} className="group-hover:text-[#E8C99A] group-hover:scale-110 transition-all duration-300" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.95, originX: 1, originY: 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, type: "spring", bounce: 0.25 }}
            className="fixed bottom-24 right-6 w-[360px] max-w-[calc(100vw-3rem)] h-[540px] max-h-[75vh] bg-[#140e07]/95 backdrop-blur-2xl rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col z-50 overflow-hidden border border-[#D4A853]/20"
          >
            
            {/* Elegant Header */}
            <div className="bg-[#0a0703] text-[#E8C99A] p-5 flex justify-between items-center relative overflow-hidden border-b border-[#D4A853]/20">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#D4A853]/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
              <div className="flex items-center space-x-3 relative z-10">
                <div className="w-10 h-10 bg-[#1A1209] rounded-full flex items-center justify-center border border-[#D4A853]/30 shadow-[0_0_15px_rgba(212,168,83,0.15)]">
                  <FiFeather size={18} className="text-[#D4A853]" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg font-display tracking-widest text-[#E8C99A]">Artisan Guide</h3>
                  <p className="text-xs text-[#D4A853]/70 font-body flex items-center mt-0.5">
                    <span className="w-1.5 h-1.5 bg-[#4ade80] rounded-full mr-2 inline-block animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.6)]"></span>
                    Online
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-[#D4A853]/60 hover:text-white transition-colors p-2 hover:bg-[#D4A853]/10 rounded-full z-10">
                <FiX size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5 font-body chat-scrollbar">
              <AnimatePresence>
                {messages.map((msg, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div 
                      className={`max-w-[82%] px-4 py-3.5 rounded-2xl text-[14.5px] leading-relaxed shadow-lg ${
                        msg.isBot 
                        ? 'bg-[#1A1209] border border-[#D4A853]/20 text-white rounded-tl-sm' 
                        : 'bg-gradient-to-br from-[#D4A853] to-[#B3883E] text-[#140e07] rounded-tr-sm font-medium'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="bg-[#1A1209] border border-[#D4A853]/20 px-4 py-5 rounded-2xl rounded-tl-sm shadow-lg flex space-x-1.5 items-center">
                    <motion.div animate={{ y: [0, -5, 0], backgroundColor: ["#D4A853", "#E8C99A", "#D4A853"] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0 }} className="w-1.5 h-1.5 rounded-full"></motion.div>
                    <motion.div animate={{ y: [0, -5, 0], backgroundColor: ["#D4A853", "#E8C99A", "#D4A853"] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.15 }} className="w-1.5 h-1.5 rounded-full"></motion.div>
                    <motion.div animate={{ y: [0, -5, 0], backgroundColor: ["#D4A853", "#E8C99A", "#D4A853"] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.3 }} className="w-1.5 h-1.5 rounded-full"></motion.div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-[#0a0703]/90 backdrop-blur-xl border-t border-[#D4A853]/20">
              <div className="flex space-x-2 items-center bg-[#140e07] border border-[#D4A853]/30 rounded-full p-1 pl-5 focus-within:ring-1 focus-within:ring-[#D4A853]/50 focus-within:border-[#D4A853] transition-all shadow-inner">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about our collection..."
                  className="flex-1 bg-transparent text-sm font-body text-white focus:outline-none placeholder:text-[#D4A853]/40 py-2.5"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="p-3 bg-gradient-to-br from-[#D4A853] to-[#B3883E] text-[#140e07] rounded-full hover:scale-105 hover:brightness-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(212,168,83,0.3)] group"
                >
                  <FiSend size={16} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
