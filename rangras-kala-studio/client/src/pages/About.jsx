import { motion } from "framer-motion";

const About = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="bg-background min-h-screen font-body text-text pb-16">
      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-primary/70 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2070&auto=format&fit=crop"
          alt="Fluid Resin Art Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <motion.div
          className="relative z-20 text-center px-4"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h1 className="text-4xl md:text-6xl font-display font-bold text-background mb-4">
            The Soul Behind the Resin
          </h1>
          <div className="w-24 h-1 bg-secondary mx-auto mb-4"></div>
          <p className="text-accent font-accent text-xl italic max-w-xl mx-auto drop-shadow-md">
            "Pouring liquid glass, curing timeless memories."
          </p>
        </motion.div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pt-20 space-y-32">

        {/* The Artist & Story */}
        <section className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Decorative background for image */}
            <div className="absolute -inset-4 bg-accent/20 rounded-[40px] rounded-tl-[100px] rounded-br-[100px] -z-10 transform -rotate-3 transition-transform hover:rotate-0 duration-500"></div>
            <img
              src="WhatsApp Image 2026-05-20 at 3.47.07 PM.jpeg"
              alt="Artist hands working on resin art"
              className="w-full h-auto rounded-[30px] rounded-tl-[80px] rounded-br-[80px] shadow-lg border-4 border-white object-cover aspect-[4/5]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-block px-4 py-1 bg-secondary/20 text-secondary font-bold text-xs uppercase tracking-widest rounded-full">
              Meet The Creator
            </div>
            <h3 className="text-3xl md:text-5xl font-display font-bold text-primary leading-tight">
              Capturing Magic in <br /> Liquid Glass
            </h3>
            <div className="space-y-4 text-text/80 leading-relaxed text-base md:text-lg">
              <p>
                Hello! Welcome to <span className="font-semibold text-primary">Rangras Kala Studio</span>. My journey started with a sheer fascination for epoxy resin—a medium that transforms from a fluid, unpredictable liquid into a stunning, glass-like solid.
              </p>
              <p>
                There is something deeply mesmerizing about watching mica powders swirl into clear epoxy, creating intricate oceans, geodes, and galaxies right before your eyes. I wanted to bring this glossy, luxurious finish into everyday functional art.
              </p>
              <p>
                Every piece you see here is born from precise chemistry and artistic intuition. From measuring the perfect 1:1 ratio, carefully popping micro-bubbles with a heat gun, to the agonizing 24-hour wait for it to cure—I pour my heart into every layer.
              </p>
            </div>
            <div className="pt-6 border-t border-accent/30 inline-block">
              <span className="font-accent text-3xl md:text-4xl text-primary inline-block transform -rotate-2">
                With love, Founder
              </span>
            </div>
          </motion.div>
        </section>

        {/* Why Handmade */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="bg-primary text-background rounded-[40px] p-8 md:p-16 relative overflow-hidden shadow-2xl"
        >
          {/* Abstract blobs */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-secondary opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent opacity-10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>

          <div className="text-center mb-12 relative z-10">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">The Beauty of Resin Art</h2>
            <p className="text-accent/90 max-w-2xl mx-auto">
              Resin has a mind of its own. Here is why handcrafted epoxy pieces are so incredibly special.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 relative z-10">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full border border-secondary/30 flex items-center justify-center text-secondary text-xl font-display italic">
                01
              </div>
              <h4 className="text-xl font-semibold text-secondary font-display tracking-wide">Impossible to Replicate</h4>
              <p className="text-background/70 text-sm leading-relaxed">
                Because it is a fluid medium, the way pigments blend, interlace, and form "cells" can never be duplicated. Your piece is 100% one-of-a-kind.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full border border-secondary/30 flex items-center justify-center text-secondary text-xl font-display italic">
                02
              </div>
              <h4 className="text-xl font-semibold text-secondary font-display tracking-wide">Patience & Precision</h4>
              <p className="text-background/70 text-sm leading-relaxed">
                Resin requires strict temperature control, exact mixing ratios, and a dust-free environment. It teaches patience, as each layer takes 24 hours to cure.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full border border-secondary/30 flex items-center justify-center text-secondary text-xl font-display italic">
                03
              </div>
              <h4 className="text-xl font-semibold text-secondary font-display tracking-wide">Glass-Like Durability</h4>
              <p className="text-background/70 text-sm leading-relaxed">
                Once fully cured, high-quality epoxy resin forms a hard, incredibly glossy, and durable surface that protects the art trapped inside forever.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Process Gallery */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-4">Behind the Pours</h2>
            <p className="text-text/70 max-w-xl mx-auto">
              A glimpse into the messy, magical process of creating fluid art in the studio.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-2xl shadow-sm"
            >
              <img
                src="https://images.unsplash.com/photo-1629949009765-433eaaca8be4?q=80&w=2000&auto=format&fit=crop"
                alt="Mixing resin colors"
                className="w-full h-full object-cover aspect-square md:aspect-auto group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-secondary text-sm font-bold uppercase tracking-wider mb-1">Step 1</span>
                <span className="text-white font-medium text-lg">Measuring and mixing the epoxy</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative group overflow-hidden rounded-2xl shadow-sm"
            >
              <img
                src="https://images.unsplash.com/photo-1571556018151-5464119859f7?q=80&w=800&auto=format&fit=crop"
                alt="Pigments"
                className="w-full h-full object-cover aspect-square group-hover:scale-105 transition-transform duration-700"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative group overflow-hidden rounded-2xl shadow-sm"
            >
              <img
                src="https://images.unsplash.com/photo-1618172193763-c511deb635ca?q=80&w=800&auto=format&fit=crop"
                alt="Fluid art macro"
                className="w-full h-full object-cover aspect-square group-hover:scale-105 transition-transform duration-700"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="md:col-span-2 relative group overflow-hidden rounded-2xl shadow-sm"
            >
              <img
                src="https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=1600&auto=format&fit=crop"
                alt="Finished glossy piece"
                className="w-full h-full object-cover aspect-[2/1] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-secondary text-sm font-bold uppercase tracking-wider mb-1">Step 2</span>
                <span className="text-white font-medium text-lg">The 24-hour cure for a glass-like finish</span>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;
