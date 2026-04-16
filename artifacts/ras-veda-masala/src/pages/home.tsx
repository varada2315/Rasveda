import { Link } from "wouter";
import { motion } from "framer-motion";
import { Leaf, HeartHandshake, ShieldCheck, ArrowRight, ShoppingBag, Star, Truck, BadgeCheck, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import chilliImg from "@assets/chilli-powder.png";
import corianderImg from "@assets/coriander-powder.png";
import turmericImg from "@assets/turmeric-powder.png";
import kitchenImg from "@assets/indian-kitchen.png";

const WA_LINK = "https://wa.me/919999999999";

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

const featuredProducts = [
  { name: "Red Chilli Powder", image: chilliImg, price: 49, badge: "Best Seller", rating: 4.9, reviews: 128 },
  { name: "Coriander Powder", image: corianderImg, price: 49, badge: "Pure & Fresh", rating: 4.8, reviews: 94 },
  { name: "Turmeric Powder", image: turmericImg, price: 49, badge: "100% Natural", rating: 5.0, reviews: 76 }
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1 justify-center">
      {[1,2,3,4,5].map(s => (
        <Star key={s} size={14} className={s <= Math.round(rating) ? "fill-accent text-accent" : "text-muted-foreground"} />
      ))}
      <span className="text-xs text-muted-foreground ml-1">{rating}</span>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[100dvh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1600")' }}
        />
        <div className="absolute inset-0 bg-black/55" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-accent text-sm md:text-base tracking-[0.25em] uppercase mb-4 font-medium"
            >
              Authentic Family Recipe · Since Generations
            </motion.p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-4 drop-shadow-lg">
              Ras Veda Masala
            </h1>
            <p className="text-2xl md:text-4xl font-serif italic text-accent mb-6 drop-shadow-md">
              Shuddh Swad, Asli Pehchaan
            </p>
            <p className="text-sm md:text-base tracking-[0.2em] text-white/90 uppercase mb-10 drop-shadow">
              Aroma | Pure Ingredients | Trusted Quality
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href={WA_LINK} target="_blank" rel="noreferrer">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-white rounded-full px-10 py-6 text-lg flex items-center gap-2 shadow-lg shadow-accent/30">
                  <ShoppingBag size={20} />
                  Shop Now
                </Button>
              </a>
              <Link href="/products">
                <Button size="lg" variant="outline" className="rounded-full px-10 py-6 text-lg border-white/60 text-white hover:bg-white/10 backdrop-blur-sm">
                  Explore Products
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Trust Badges */}
      <section className="bg-primary py-5">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-16">
            {[
              { icon: Truck, label: "Free Delivery Available" },
              { icon: BadgeCheck, label: "100% Pure Spices" },
              { icon: Leaf, label: "No Additives or Colours" },
              { icon: PhoneCall, label: "Order via WhatsApp" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-white/90">
                <item.icon size={18} className="text-accent" />
                <span className="text-sm font-medium tracking-wide">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Ras Veda? */}
      <section className="py-20 md:py-32 bg-background relative">
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
          <div className="text-center mb-4">
            <p className="text-sm text-accent uppercase tracking-[0.2em] font-medium mb-3">Our Collection</p>
            <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-4 ornament-line inline-block">
              Featured Products
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mt-4">
              Handcrafted in small batches for maximum freshness and flavour. Order directly on WhatsApp.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-12">
            {featuredProducts.map((product, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="group rounded-2xl overflow-hidden bg-background border border-border shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col"
              >
                <div className="h-56 overflow-hidden relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                    {product.badge}
                  </span>
                  <span className="absolute top-3 right-3 bg-white/90 text-primary text-xs font-bold px-3 py-1 rounded-full shadow">
                    In Stock
                  </span>
                </div>
                <div className="p-6 text-center flex flex-col flex-grow">
                  <h3 className="text-xl font-serif font-semibold mb-2">{product.name}</h3>
                  <StarRating rating={product.rating} />
                  <p className="text-xs text-muted-foreground mt-1 mb-3">{product.reviews} reviews</p>
                  <div className="flex items-center justify-center gap-2 mb-5 mt-auto">
                    <span className="text-2xl font-bold text-secondary">₹{product.price}</span>
                    <span className="text-sm text-muted-foreground">/ 100g</span>
                  </div>
                  <a href={WA_LINK} target="_blank" rel="noreferrer">
                    <Button className="w-full rounded-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2 py-5">
                      <ShoppingBag size={16} />
                      Shop Now
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
                src={kitchenImg}
                alt="Authentic Indian kitchen where masala is prepared" 
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
              <div className="flex flex-wrap gap-4">
                <Link href="/our-story">
                  <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8">
                    Read Our Story
                  </Button>
                </Link>
                <a href={WA_LINK} target="_blank" rel="noreferrer">
                  <Button variant="outline" className="rounded-full px-8 border-accent text-accent hover:bg-accent hover:text-white">
                    <ShoppingBag size={16} className="mr-2" />
                    Shop Now
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Shop Now Banner */}
      <section className="py-24 bg-secondary text-white text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-serif italic mb-4 leading-tight">
            "To reach every home with the finest masala"
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full mb-8"></div>
          <p className="text-white/80 mb-8 text-lg">
            Order now on WhatsApp and get fresh masala delivered to your door.
          </p>
          <a href={WA_LINK} target="_blank" rel="noreferrer">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-white rounded-full px-12 py-6 text-lg shadow-lg shadow-black/20 flex items-center gap-2 mx-auto">
              <ShoppingBag size={20} />
              Shop Now on WhatsApp
            </Button>
          </a>
        </motion.div>
      </section>
    </div>
  );
}
