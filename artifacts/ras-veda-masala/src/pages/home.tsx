import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ShoppingBag, Star, Truck, BadgeCheck, ShieldCheck, Leaf, ArrowUpRight, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useProducts } from "@/hooks/use-products";
import heroImg from "@assets/hero_spices.png";


export default function Home() {
  const { addItem } = useCart();
  const { data: allProducts, isLoading } = useProducts();
  const [, setLocation] = useLocation();

  // Pick top 3 for featured
  const featuredProducts = allProducts?.slice(0, 3) || [];

  const handleBuyNow = (product: any) => {
    addItem(product);
    setLocation("/checkout");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-accent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Hero Section */}
      <section className="relative h-[90dvh] md:h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#FDFBF7]" />
        
        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <h1 className="text-5xl md:text-[8.5rem] font-sans font-black text-white mb-6 leading-[0.9] tracking-tighter drop-shadow-2xl px-4">
              Asli Swad, <br />
              <span className="text-gradient-spice italic drop-shadow-2xl">Asli Pehchaan.</span>
            </h1>
            <p className="text-lg md:text-3xl text-white/90 mb-10 max-w-2xl font-medium leading-relaxed drop-shadow-lg">
              Crafted from family-guarded traditional recipes, delivering the true soul of Indian heritage to your kitchen.
            </p>
            <div className="flex flex-col md:flex-row gap-6 w-full max-w-lg items-center justify-center">
              <Link href="/products">
                <Button size="lg" className="magnetic-hover w-full md:w-auto bg-accent hover:bg-accent/90 text-white rounded-2xl px-10 py-6 text-lg font-black shadow-xl transition-all flex items-center justify-center gap-3">
                  <ShoppingBag size={20} />
                  Explore Collection
                </Button>
              </Link>
              <Link href="/our-story">
                <Button size="lg" variant="outline" className="magnetic-hover w-full md:w-auto border-white/40 text-white hover:bg-white hover:text-foreground rounded-2xl px-10 py-6 text-lg font-black backdrop-blur-md">
                  Our Story
                </Button>
              </Link>
            </div>

          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 flex flex-col items-center gap-4 hidden md:flex"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] font-black">Discover</span>
          <div className="w-px h-16 bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      </section>

      {/* Trust Ribbon (High-End) */}
      <section className="py-12 bg-white/40 backdrop-blur-2xl border-y border-foreground/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-spice-pattern opacity-[0.03]" />
        <div className="container mx-auto px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center">
            {[
              { icon: Truck, label: "Express Delivery", sub: "Pan India Shipping" },
              { icon: BadgeCheck, label: "FSSAI Certified", sub: "100% Secure Process" },
              { icon: Leaf, label: "100% Natural", sub: "Zero Added Colors" },
              { icon: ShieldCheck, label: "Lab Tested", sub: "Certified Quality" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4 group">
                <div className="w-14 h-14 bg-white rounded-3xl flex items-center justify-center shadow-premium group-hover:shadow-accent/20 group-hover:bg-accent group-hover:text-white transition-all duration-500 border border-foreground/5">
                  <item.icon size={22} className="transition-transform group-hover:rotate-12 group-hover:scale-110" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[12px] font-black uppercase tracking-[0.1em] text-foreground group-hover:text-accent transition-colors">{item.label}</span>
                  <span className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest">{item.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Best Sellers */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
        
        <div className="container mx-auto px-8 relative z-10">
          <div className="flex flex-col items-center text-center mb-20 md:mb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-4 mb-4 bg-muted/50 px-6 py-2 rounded-full border border-foreground/5 overflow-hidden group">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <p className="text-secondary font-black uppercase tracking-[0.4em] text-[10px]">Curated Selection</p>
              </div>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-6">
                Most <span className="text-accent italic font-serif text-6xl md:text-[7rem]">Loved</span>
              </h2>
              <p className="text-foreground/50 max-w-xl mx-auto font-medium text-lg leading-relaxed mb-10">
                The essentials of every Indian kitchen, perfected through generations and delivered with uncompromising purity.
              </p>
              <Link href="/products">
                <Button variant="outline" className="rounded-full border-foreground/10 hover:border-accent hover:text-accent font-black tracking-widest text-[10px] px-10 py-6 uppercase transition-all duration-500 hover:shadow-2xl">
                  View Full Catalog
                </Button>
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
            {featuredProducts.map((product, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                className="group relative"
              >
                <Link href={`/product/${product.id}`} className="block">
                  <div className="bg-white rounded-[3.5rem] overflow-hidden border border-foreground/[0.03] shadow-premium hover:shadow-premium-xl transition-all duration-700 hover:-translate-y-4 flex flex-col h-full">
                    {/* Integrated Photography Container */}
                    <div className="h-[260px] md:h-[320px] relative overflow-hidden product-card-shine">
                      <div className="w-full h-full p-6 group-hover:p-4 transition-all duration-700">
                        <div className="w-full h-full rounded-[2.5rem] overflow-hidden shadow-sm border border-black/5">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                          />
                        </div>
                      </div>
                      
                      {/* Floating Badge */}
                      <div className="absolute top-10 left-10 pointer-events-none">
                        <div className="bg-white/90 backdrop-blur-xl px-5 py-2 rounded-2xl shadow-sm border border-white/40">
                          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-foreground/80">
                            {product.badge}
                          </span>
                        </div>
                      </div>

                      {/* Detail Icon */}
                      <div className="absolute bottom-10 right-10 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-premium-xl text-foreground/80 group-hover:bg-accent group-hover:text-white transition-all duration-500 transform group-hover:scale-110">
                        <ArrowUpRight size={20} className="group-hover:rotate-12 transition-transform" />
                      </div>
                    </div>

                    <div className="p-10 md:p-12 pt-2 md:pt-4 flex flex-col flex-grow">
                      <div className="flex flex-col gap-3 mb-6">
                        <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-0 group-hover:text-accent transition-colors leading-none">{product.name}</h3>
                        
                        {/* Integrated Highlights below Title */}
                        <div className="flex flex-wrap gap-2">
                          {product.highlights.map((h, idx) => (
                            <span key={idx} className="bg-secondary/5 text-secondary/70 text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border border-secondary/10">
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <p className="text-foreground/50 text-[10px] font-black tracking-[0.2em] uppercase mb-8">Pure Essence • Lab Tested</p>
                      
                      <p className="text-foreground/40 text-sm md:text-base leading-relaxed mb-10 flex-grow font-medium line-clamp-2">
                        {product.desc}
                      </p>

                      <div className="flex items-center justify-between gap-6 border-t border-foreground/[0.03] pt-8">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1.5 text-accent mb-2">
                            <Star size={12} fill="currentColor" />
                            <span className="text-[11px] font-black tracking-widest">{product.rating}</span>
                          </div>
                          <span className="text-3xl font-black tracking-tighter text-foreground font-serif">₹{product.price}</span>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            onClick={(e) => {
                              e.preventDefault();
                              addItem(product);
                            }}
                            variant="outline"
                            className="magnetic-hover rounded-2xl border-primary/20 hover:bg-primary/5 text-primary p-4 md:p-5 font-black transition-all active:scale-95"
                            title="Add to Cart"
                          >
                            <Plus size={18} />
                          </Button>
                          <Button 
                            onClick={(e) => {
                              e.preventDefault();
                              handleBuyNow(product);
                            }}
                            className="magnetic-hover rounded-2xl bg-primary hover:bg-primary/95 text-white p-4 md:p-5 font-black shadow-lg transition-all active:scale-95 group/btn"
                          >
                            <ShoppingBag size={16} />
                            Get Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Ras Veda Secret (Premium Interaction) */}
      <section className="py-16 md:py-24 bg-[#FDFBF7] relative overflow-hidden">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row items-end justify-between gap-12 mb-20 md:mb-32">
            <div className="max-w-3xl">
              <p className="text-secondary font-black uppercase tracking-[0.4em] text-[10px] mb-4">Our Philosophy</p>
              <h2 className="text-5xl md:text-[7rem] font-black tracking-tighter leading-[0.85] mb-8">
                The <span className="text-accent italic font-serif">Ras Veda</span> <br /> Secret.
              </h2>
            </div>
            <p className="text-foreground/60 text-lg md:text-2xl font-medium leading-relaxed max-w-md">
              Beyond the flavor lies a promise. Ancestral wisdom meets modern laboratory precision to deliver uncompromising purity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
            {[
              { 
                icon: Leaf, 
                title: "Zero Fillers", 
                desc: "100% pure spice. No starch, no artificial colors, and absolutely no added preservatives.",
                color: "bg-green-50 text-green-600"
              },
              { 
                icon: ShieldCheck, 
                title: "Lab Verified", 
                desc: "Every batch undergoes rigorous ISO-certified lab testing to ensure zero contamination.",
                color: "bg-blue-50 text-blue-600"
              },
              { 
                icon: BadgeCheck, 
                title: "Slow Ground", 
                desc: "Traditional low-temperature grinding that preserves volatile oils and the soul of the spice.",
                color: "bg-orange-50 text-orange-600"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-10 md:p-12 bg-white rounded-[3rem] border border-foreground/5 shadow-premium hover:shadow-premium-xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className={`w-20 h-20 rounded-3xl ${feature.color} flex items-center justify-center mb-10 shadow-sm group-hover:scale-110 transition-transform duration-500`}>
                  <feature.icon size={32} />
                </div>
                <h3 className="text-3xl font-black mb-6 tracking-tight">{feature.title}</h3>
                <p className="text-foreground/50 font-medium leading-relaxed text-lg">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Voices of Flavor (High-End Testimonials) */}
      <section className="py-16 md:py-24 bg-white relative">
        <div className="container mx-auto px-8">
          <div className="flex flex-col items-center text-center mb-20 md:mb-32">
            <p className="text-secondary font-black uppercase tracking-[0.4em] text-[10px] mb-4">Community Voices</p>
            <h2 className="text-5xl md:text-[8rem] font-black tracking-tighter mb-8 leading-none">Voices of <span className="text-accent italic font-serif text-6xl md:text-[7rem]">Flavor.</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            {[
              { text: "The aroma takes me back to my grandmother's kitchen. You can actually taste the purity in their Red Chilli powder.", author: "Priya Sharma", role: "Professional Chef" },
              { text: "Potent flavor without any artificial colors. Ras Veda is now a permanent staple in my specialty pantry.", author: "Rahul Verma", role: "Restaurateur" },
              { text: "Finally a brand that cares about lab-testing. I feel confident serving this to my family daily.", author: "Meera Iyer", role: "Wellness Coach" }
            ].map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 md:p-12 bg-[#FDFBF7] rounded-[3rem] border border-foreground/5 relative group hover:bg-white hover:shadow-premium transition-all duration-500"
              >
                <div className="absolute top-10 right-10 text-accent/10 group-hover:text-accent/30 transition-all duration-500">
                  <Star size={60} fill="currentColor" />
                </div>
                <p className="text-xl md:text-2xl font-medium leading-relaxed mb-12 italic text-foreground/80 relative z-10 font-serif">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center font-black text-accent uppercase text-xl">
                    {review.author[0]}
                  </div>
                  <div>
                    <h4 className="font-black text-lg mb-0.5">{review.author}</h4>
                    <p className="text-[10px] uppercase tracking-[0.2em] font-black text-foreground/30">{review.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-16 md:py-24 px-8 bg-[#FDFBF7]">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto rounded-[4rem] md:rounded-[6rem] overflow-hidden relative bg-primary p-16 md:p-40 text-center shadow-premium-xl"
        >
          <div className="absolute inset-0 bg-mandala-overlay" />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-white/10" />
          
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-5xl md:text-[9rem] font-sans font-black text-white mb-10 md:mb-16 leading-[0.85] tracking-tighter">
              The Purest <span className="text-accent underline decoration-white/20 underline-offset-[20px]">Choice</span> <br /> for your family.
            </h2>
            <p className="text-white/70 text-lg md:text-3xl mb-12 md:mb-20 max-w-3xl font-medium leading-relaxed">
              No fillers. No artificial colors. No nonsense. Just pure, lab-tested spices delivered to your doorstep.
            </p>
            <div className="flex flex-col md:flex-row gap-8 items-center justify-center w-full">
              <Link href="/products">
                <Button size="lg" className="magnetic-hover w-full md:w-auto bg-accent hover:bg-accent/90 text-white rounded-2xl px-12 py-8 text-xl font-black shadow-xl transition-all">
                  Shop Now
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="magnetic-hover w-full md:w-auto text-white border-white/20 hover:bg-white hover:text-primary rounded-2xl px-12 py-8 text-xl font-black">
                  Inquire Now
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Spacing for BottomNav */}
      <div className="h-32 md:hidden" />
    </div>
  );
}
