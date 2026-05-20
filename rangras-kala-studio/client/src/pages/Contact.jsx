import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaClock, FaPaperPlane, FaWhatsapp, FaUser, FaRegCommentDots } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/messages", {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        message: formData.message
      });
      toast.success("Message sent successfully!");
      setFormData({ firstName: "", lastName: "", email: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden font-body text-text">
      {/* Decorative Background Element */}
      <div className="absolute top-0 left-0 w-full h-[30rem] bg-accent/10 -z-10 rounded-b-[20%] sm:rounded-b-[40%]" />

      <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl font-display font-bold text-primary mb-4 mt-8">
            Get In Touch
          </motion.h1>
          <motion.div variants={fadeIn} className="w-24 h-1.5 bg-secondary mx-auto mb-6 rounded-full" />
          <motion.p variants={fadeIn} className="text-lg text-text/80 max-w-2xl mx-auto">
            Whether you have a custom order in mind, a question about our collections, or just want to say hello, we would love to hear from you.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

          {/* Contact Information */}
          <motion.div
            className="lg:col-span-1 space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn} className="bg-white rounded-2xl shadow-xl shadow-accent/5 p-8 border border-accent/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full -z-0 transition-transform group-hover:scale-110 duration-500" />

              <h3 className="text-2xl font-display font-semibold text-primary mb-6 relative z-10">
                Contact Details
              </h3>

              <div className="space-y-6 text-base relative z-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                    <FaEnvelope className="text-secondary text-lg" />
                  </div>
                  <div>
                    <p className="font-medium text-primary mb-1">Email Us</p>
                    <a href="mailto:hello@rangraskala.com" className="text-text/70 hover:text-secondary transition-colors">hello@rangraskala.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                    <FaPhoneAlt className="text-secondary text-lg" />
                  </div>
                  <div>
                    <p className="font-medium text-primary mb-1">Call</p>
                    <a href="tel:+919876543210" className="text-text/70 hover:text-secondary transition-colors">+91 98765 43210</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                    <FaClock className="text-secondary text-lg" />
                  </div>
                  <div>
                    <p className="font-medium text-primary mb-1">Hours</p>
                    <p className="text-text/70">Mon - Sat, 10 AM - 7 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                    <FaMapMarkerAlt className="text-secondary text-lg" />
                  </div>
                  <div>
                    <p className="font-medium text-primary mb-1">Location</p>
                    <p className="text-text/70 leading-relaxed">Ahmedabad, Gujarat, India</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-primary text-background rounded-2xl p-8 shadow-xl shadow-primary/10 flex flex-col items-start relative overflow-hidden group">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>

              <h3 className="text-xl font-display font-semibold mb-3 relative z-10 text-secondary">Custom Orders</h3>
              <p className="text-base text-background/90 mb-6 leading-relaxed relative z-10">
                Looking for personalized name plates, wedding favors, or bespoke resin decor? Let's bring your vision to life!
              </p>
              <a
                href="https://wa.me/919023239808"
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#20bd5a] transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-[#25D366]/30 w-full justify-center"
              >
                <FaWhatsapp className="text-2xl animate-pulse" />
                <span className="text-lg">Chat on WhatsApp</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:col-span-2 bg-white rounded-2xl shadow-xl shadow-accent/5 border border-accent/10 p-8 sm:p-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeIn} className="text-2xl md:text-3xl font-display font-semibold text-primary mb-8">
              Send us a message
            </motion.h2>

            <motion.form variants={fadeIn} onSubmit={handleSubmit} className="space-y-6 text-base">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block font-medium text-primary ml-1 text-sm tracking-wide">First Name *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text/40">
                      <FaUser className="text-sm" />
                    </div>
                    <input
                      required
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Jane"
                      className="w-full rounded-xl bg-[#FDFBF7] border border-accent/20 px-4 py-3.5 pl-11 text-primary outline-none focus:bg-white focus:ring-4 focus:ring-secondary/10 focus:border-secondary/50 transition-all placeholder:text-text/30 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block font-medium text-primary ml-1 text-sm tracking-wide">Last Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text/40">
                      <FaUser className="text-sm" />
                    </div>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      className="w-full rounded-xl bg-[#FDFBF7] border border-accent/20 px-4 py-3.5 pl-11 text-primary outline-none focus:bg-white focus:ring-4 focus:ring-secondary/10 focus:border-secondary/50 transition-all placeholder:text-text/30 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block font-medium text-primary ml-1 text-sm tracking-wide">Email Address *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text/40">
                    <FaEnvelope className="text-sm" />
                  </div>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jane@example.com"
                    className="w-full rounded-xl bg-[#FDFBF7] border border-accent/20 px-4 py-3.5 pl-11 text-primary outline-none focus:bg-white focus:ring-4 focus:ring-secondary/10 focus:border-secondary/50 transition-all placeholder:text-text/30 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block font-medium text-primary ml-1 text-sm tracking-wide">Message *</label>
                <div className="relative">
                  <div className="absolute top-4 left-0 pl-4 pointer-events-none text-text/40">
                    <FaRegCommentDots className="text-sm" />
                  </div>
                  <textarea
                    required
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell us about your project or inquiry..."
                    className="w-full rounded-xl bg-[#FDFBF7] border border-accent/20 px-4 py-3.5 pl-11 text-primary outline-none resize-none focus:bg-white focus:ring-4 focus:ring-secondary/10 focus:border-secondary/50 transition-all placeholder:text-text/30 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto rounded-xl bg-primary text-secondary font-medium px-8 py-3.5 flex items-center justify-center gap-3 hover:bg-primary/90 transition-colors mt-4 text-lg shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span>{loading ? "Sending..." : "Send Message"}</span>
                <FaPaperPlane className="text-sm" />
              </motion.button>
            </motion.form>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
