import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HERO_BG_IMAGE = "/pexels-thirdman-7256192.jpg";
const sectionReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const cardContainerReveal = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
    },
  },
};

const cardReveal = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const Home = () => {
  const categories = [
    {
      name: "Resin Art",
      image:
        "https://images.unsplash.com/photo-1656725035727-7779ed46eb1e?auto=format&fit=crop&w=800&q=80",
      link: "/shop?category=resin-art",
    },
    {
      name: "Warli Painting",
      image:
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      link: "/shop?category=warli",
    },
    {
      name: "Name Plates",
      image:
        "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      link: "/shop?category=name-plates",
    },
    {
      name: "Coasters",
      image:
        "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      link: "/shop?category=coasters",
    },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Ocean Blue Resin Coaster",
      price: 499,
      image:
        "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 2,
      name: "Traditional Warli Canvas",
      price: 1299,
      image:
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 3,
      name: "Custom Wooden Nameplate",
      price: 899,
      image:
        "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 4,
      name: "Emerald Resin Wall Art",
      price: 2499,
      image:
        "https://images.unsplash.com/photo-1629851603525-46ffcf688b1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <motion.img
            src={HERO_BG_IMAGE}
            alt="Resin art background"
            initial={{ scale: 1.08, filter: "blur(18px) saturate(70%)", opacity: 0.45 }}
            animate={{ scale: 1, filter: "blur(0px) saturate(100%)", opacity: 0.75 }}
            transition={{ duration: 1.6, ease: "easeOut" }}
            className="absolute inset-0 h-full w-full object-cover object-center pointer-events-none"
          />
          <motion.div
            initial={{ opacity: 0.55 }}
            animate={{ opacity: 0.28 }}
            transition={{ duration: 1.6, ease: "easeOut" }}
            className="absolute inset-0 bg-primary z-0"
          />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-display font-bold text-background mb-4 drop-shadow-lg"
          >
            Rangras Kala Studio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-3xl md:text-4xl font-accent text-accent mb-8"
          >
            "Made with Rang-Ras-Kala"
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Link
              to="/shop"
              className="inline-block bg-secondary text-primary font-bold px-8 py-4 rounded-md hover:bg-accent transition-colors shadow-lg transform hover:-translate-y-1"
            >
              Shop Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Snippet */}
      <motion.section
        className="py-20 px-4 bg-background"
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.22 }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-display font-bold text-primary mb-6">
            Our Story
          </h2>
          <p className="text-lg text-text mb-6">
            We bring the vibrant soul of traditional Indian art and the elegant
            fluidity of modern resin crafts into your home. Each piece is
            meticulously handcrafted, ensuring that your decor is as unique as
            your story.
          </p>
          <Link
            to="/about"
            className="text-secondary font-bold hover:text-primary transition-colors inline-flex items-center"
          >
            Know More <span className="ml-2">→</span>
          </Link>
        </div>
      </motion.section>

      {/* Featured Categories */}
      <motion.section
        className="py-16 px-4 bg-white"
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
      >
        <motion.div
          className="max-w-7xl mx-auto"
          variants={cardContainerReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.16 }}
        >
          <h2 className="text-4xl font-display font-bold text-center text-primary mb-12">
            Explore Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat, index) => (
              <motion.div key={index} variants={cardReveal}>
                <Link
                  to={cat.link}
                  className="group relative rounded-lg overflow-hidden shadow-md block h-80"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-2xl font-display font-bold text-white tracking-wide">
                      {cat.name}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* How it Works */}
      <motion.section
        className="py-20 px-4 bg-accent/20"
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          className="max-w-7xl mx-auto text-center"
          variants={cardContainerReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
        >
          <h2 className="text-4xl font-display font-bold text-primary mb-12">
            How Custom Orders Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <motion.div variants={cardReveal} className="flex flex-col items-center">
              <div className="w-20 h-20 bg-primary text-secondary rounded-full flex items-center justify-center text-3xl font-bold mb-6 shadow-lg">
                1
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                Choose Your Design
              </h3>
              <p className="text-text">
                Select from our range of products or share your own vision with
                us.
              </p>
            </motion.div>
            <motion.div variants={cardReveal} className="flex flex-col items-center">
              <div className="w-20 h-20 bg-primary text-secondary rounded-full flex items-center justify-center text-3xl font-bold mb-6 shadow-lg">
                2
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                Customize Details
              </h3>
              <p className="text-text">
                Add custom names, pick your favorite colors, and specify sizes.
              </p>
            </motion.div>
            <motion.div variants={cardReveal} className="flex flex-col items-center">
              <div className="w-20 h-20 bg-primary text-secondary rounded-full flex items-center justify-center text-3xl font-bold mb-6 shadow-lg">
                3
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                Delivered to You
              </h3>
              <p className="text-text">
                We handcraft your piece and deliver it safely to your doorstep.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* Featured Products */}
      <motion.section
        className="py-20 px-4 bg-background"
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          className="max-w-7xl mx-auto"
          variants={cardContainerReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <h2 className="text-4xl font-display font-bold text-center text-primary mb-12">
            Featured Creations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={cardReveal}
                className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-shadow"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-primary mb-2 line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-lg text-secondary font-bold">
                      <span className="font-sans text-secondary/80 mr-0.5">₹</span>{product.price}
                    </span>
                    <button className="text-sm bg-primary text-white px-3 py-1 rounded hover:bg-secondary hover:text-primary transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              to="/shop"
              className="inline-block border-2 border-primary text-primary font-bold px-8 py-3 rounded-md hover:bg-primary hover:text-white transition-colors"
            >
              View All Products
            </Link>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default Home;
