import { Link } from "wouter";
import { motion } from "framer-motion";
import { Leaf, HeartHandshake, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[100dvh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1600")' }}
        />
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-4 drop-shadow-lg">
              Ras Veda Masala
            </h1>
            <p className="text-2xl md:text-4xl font-serif italic text-accent mb-6 drop-shadow-md">
              Shuddh Swad, Asli Pehchaan
            </p>
            <p className="text-sm md:text-base tracking-[0.2em] text-white/90 uppercase mb-10 drop-shadow">
              Aroma | Pure Ingredients | Trusted Quality
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white rounded-full px-8 py-6 text-lg">
                Contact Us
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Ras Veda? */}
      <section className="py-20 md:py-32 bg-background relative">
        {/* Subtle decorative dot pattern could go here */}
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-6 ornament-line inline-block">
              Why Ras Veda?
            </h2>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { icon: Leaf, title: "Pure Ingredients", desc: "Hand-selected from the finest farms to ensure uncompromising quality." },
              { icon: HeartHandshake, title: "Rooted in Tradition", desc: "Authentic recipes passed down through generations of our family." },
              { icon: ShieldCheck, title: "Affordable Quality", desc: "Premium spices that bring rich flavor without the premium price tag." }
            ].map((feature, i) => (
              <motion.div key={i} variants={fadeIn} className="bg-white p-8 rounded-2xl border border-border shadow-sm text-center hover-elevate">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                  <feature.icon size={32} />
                </div>
                <h3 className="text-xl font-serif font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-6 ornament-line inline-block">
              Featured Products
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: "Red Chilli Powder", image: "https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?w=600" },
              { name: "Coriander Powder", image: "https://images.unsplash.com/photo-1601050690293-8b64bc4b5a2c?w=600" },
              { name: "Turmeric Powder", image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=600" }
            ].map((product, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
                className="group rounded-2xl overflow-hidden bg-background border border-border shadow-md hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-serif font-semibold mb-2">{product.name}</h3>
                  <p className="text-secondary font-bold text-lg mb-6">₹49 <span className="text-sm font-normal text-muted-foreground">/ 100g</span></p>
                  <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer">
                    <Button variant="outline" className="w-full rounded-full border-accent text-accent hover:bg-accent hover:text-white">
                      Enquire Now
                    </Button>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/products">
              <Button variant="link" className="text-secondary hover:text-secondary/80 text-lg group">
                View All Products <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Story Teaser */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full md:w-1/2">
              <motion.img 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                src="https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=800" 
                alt="Traditional Indian Spices" 
                className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
              />
            </div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full md:w-1/2"
            >
              <h2 className="text-3xl md:text-4xl font-serif mb-6 text-foreground">Born from Love & Tradition</h2>
              <div className="w-16 h-1 bg-accent mb-6 rounded-full"></div>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                It all started with the memory of a mother and Taijji sitting together, carefully hand-selecting spices from the market, roasting them slowly, and grinding them by hand with love and patience.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                The aroma filling the entire home, making every meal feel magical. That memory is the foundation of Ras Veda Masala.
              </p>
              <Link href="/our-story">
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8">
                  Read Our Story
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Banner */}
      <section className="py-24 bg-secondary text-white text-center px-4 relative overflow-hidden">
        {/* Background texture/overlay could be added here */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-serif italic mb-6 leading-tight">
            "To reach every home with the finest masala"
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
        </motion.div>
      </section>
    </div>
  );
}
