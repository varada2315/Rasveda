import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ShoppingBag, Star, Truck, BadgeCheck, ShieldCheck, Leaf, ArrowUpRight, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useProducts } from "@/hooks/use-products";
import { QuickAdd } from "@/components/products/QuickAdd";


export default function Home() {
  const { addItem } = useCart();
  const { data: allProducts, isLoading } = useProducts();
  const [, setLocation] = useLocation();

  // Pick top 3 for featured
  const featuredProducts = allProducts?.slice(0, 3) || [];


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
          style={{ backgroundImage: `url('/vibrant-colors-spices-row-generated-by-ai.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#FDFBF7]" />
        
        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <h1 className="text-5xl md:text-9xl font-sans font-black text-white mb-6 leading-[0.9] tracking-tighter drop-shadow-2xl px-4 uppercase">
              Asli Swad, <br />
              <span className="text-gradient-spice italic drop-shadow-2xl">Asli Pehchaan.</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/90 mb-10 max-w-3xl font-medium leading-relaxed drop-shadow-lg">
              Crafted from family-guarded traditional recipes, delivering the true soul of Indian heritage to your kitchen.
            </p>
            <div className="flex flex-col md:flex-row gap-6 w-full max-w-xl items-center justify-center">
              <Link href="/products">
                <Button size="lg" className="magnetic-hover w-full md:w-auto bg-accent hover:bg-accent/95 text-white rounded-2xl px-12 py-8 text-xl font-black shadow-2xl transition-all flex items-center justify-center gap-3">
                  <ShoppingBag size={24} />
                  Shop Range
                </Button>
              </Link>
              <Link href="/our-story">
                <Button size="lg" variant="outline" className="magnetic-hover w-full md:w-auto border-white/40 text-white hover:bg-white hover:text-foreground rounded-2xl px-12 py-8 text-xl font-black backdrop-blur-md">
                  Heritage Story
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
                          <QuickAdd product={product} />
                          <QuickAdd product={product} variant="buyNow" />
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



      {/* WhatsApp Community Section */}
      <section className="py-20 md:py-32 bg-[#25D366] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
        
        <div className="container mx-auto px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 md:gap-24">
            <div className="flex-1 text-white text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/30 mb-8">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Join the movement</span>
                </div>
                <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-none">
                  Our WhatsApp <br />
                  <span className="italic font-serif opacity-90">Community.</span>
                </h2>
                <p className="text-white/80 text-xl md:text-2xl font-medium leading-relaxed max-w-xl mb-12">
                  Scan the QR code to join the RasVeda Masala WhatsApp group. Get early access to new blends, secret recipes, and exclusive community discounts.
                </p>
                <div className="flex flex-col md:flex-row gap-6 items-center lg:items-start">
                  <div className="flex items-center gap-4 text-white/60 text-sm font-bold">
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">1</div>
                    <span>Open WhatsApp camera</span>
                  </div>
                  <div className="flex items-center gap-4 text-white/60 text-sm font-bold">
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">2</div>
                    <span>Scan the code</span>
                  </div>
                  <div className="flex items-center gap-4 text-white/60 text-sm font-bold">
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">3</div>
                    <span>Join & Jam!</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-4 md:p-8 bg-white rounded-[3rem] md:rounded-[4rem] shadow-2xl group"
            >
              <div className="absolute -inset-4 bg-white/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="relative w-80 h-80 md:w-[450px] md:h-[450px] overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] bg-white flex items-center justify-center">
                <img 
                  src="/whatsapp-qr.png" 
                  alt="RasVeda WhatsApp Group QR Code" 
                  className="w-[200%] h-[200%] max-w-none object-contain absolute scale-[1.1]"
                  style={{ top: '-28%' }}
                />
              </div>
              <div className="mt-8 text-center text-black/40 font-black text-[9px] uppercase tracking-[0.4em]">
                Scan to join instantly
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 md:py-32 px-6 bg-[#FDFBF7]">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto rounded-[3rem] overflow-hidden relative bg-primary p-12 md:p-24 text-center shadow-2xl"
        >
          <div className="absolute inset-0 bg-mandala-overlay opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10" />
          
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-4xl md:text-7xl font-sans font-black text-white mb-8 md:mb-12 leading-[1.1] tracking-tight">
              The Purest <span className="text-accent">Choice</span> <br /> for your family.
            </h2>
            <p className="text-white/80 text-lg md:text-xl mb-10 md:mb-16 max-w-2xl font-medium leading-relaxed">
              No fillers. No artificial colors. No nonsense. <br className="hidden md:block" /> 
              Just pure, lab-tested spices delivered to your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full">
              <Link href="/products">
                <Button size="lg" className="magnetic-hover w-full sm:w-auto bg-accent hover:bg-accent/95 text-white rounded-xl px-10 py-7 text-lg font-black shadow-lg transition-all active:scale-95">
                  Shop Spices
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="magnetic-hover w-full sm:w-auto text-white border-white/30 hover:bg-white hover:text-primary rounded-xl px-10 py-7 text-lg font-black transition-colors">
                  Contact Us
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
