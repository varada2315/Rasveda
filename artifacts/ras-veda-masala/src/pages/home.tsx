import { Link } from "wouter";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight, Star, Truck, BadgeCheck, ShieldCheck, Leaf, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@assets/hero_spices.png";
import chilliImg from "@assets/chilli-powder.png";
import corianderImg from "@assets/coriander-powder.png";
import turmericImg from "@assets/turmeric-powder.png";

const WA_LINK = "https://wa.me/919999999999";

const featuredProducts = [
  { name: "Red Chilli Powder", image: chilliImg, price: 95, badge: "Best Seller", rating: 4.9 },
  { name: "Turmeric Powder", image: turmericImg, price: 120, badge: "100% Pure", rating: 5.0 },
  { name: "Coriander Powder", image: corianderImg, price: 110, badge: "Aromatic", rating: 4.8 }
];

const categories = [
  { name: "Masalas", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400" },
  { name: "Whole Spices", image: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=400" },
  { name: "Powders", image: "https://images.squarespace-cdn.com/content/v1/56885362a2bab83c66f7f071/1460305886737-F2ZREOM4C5NCD5N89498/spices.jpg?format=1000w" },
  { name: "Combos", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400" },
  { name: "New Arrivals", image: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=400" }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Hero Section */}
      <section className="relative h-[85dvh] md:h-[90dvh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] scale-105 hover:scale-100"
          style={{ backgroundImage: `url(${heroImg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-[#FDFBF7]" />
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <span className="bg-accent/90 backdrop-blur-md text-white px-5 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] mb-4 shadow-lg">
              Authentic Heritage
            </span>
            <h1 className="text-4xl md:text-8xl font-sans font-black text-white mb-4 leading-tight tracking-tight">
              Pure Spice. <br />
              <span className="text-accent italic drop-shadow-sm">Bold Flavor.</span>
            </h1>
            <p className="text-base md:text-2xl text-white/90 mb-8 max-w-lg font-medium leading-relaxed">
              Experience the true essence of Indian heritage with our family-guarded traditional recipes.
            </p>
            <div className="w-full max-w-xs">
              <Link href="/products">
                <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-white rounded-2xl py-6 md:py-8 text-base md:text-lg font-black shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-2">
                  <ShoppingBag size={18} />
                  Shop Masalas
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Circles (Cookdtv Style) */}
      <section className="py-12 -mt-16 md:-mt-24 relative z-20">
        <div className="container mx-auto">
          <div className="flex gap-5 md:gap-8 overflow-x-auto no-scrollbar px-6 pb-6 snap-x">
            {categories.map((cat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center gap-3 snap-center min-w-[85px] md:min-w-[100px] group cursor-pointer"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full p-1 border-2 border-white/50 shadow-2xl overflow-hidden bg-white/80 backdrop-blur-md group-hover:scale-110 group-hover:border-accent transition-all duration-500">
                  <img src={cat.image} className="w-full h-full object-cover rounded-full" alt={cat.name} />
                </div>
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground/60 group-hover:text-accent transition-colors">{cat.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Ribbon */}
      <section className="py-8 bg-[#FDFBF7]/80 backdrop-blur-xl border-y border-foreground/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-spice-pattern opacity-5" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex gap-6 md:gap-12 overflow-x-auto no-scrollbar scroll-smooth snap-x items-center justify-between">
            {[
              { icon: Truck, label: "Express Delivery", sub: "Pan India" },
              { icon: BadgeCheck, label: "FSSAI Certified", sub: "100% Secure" },
              { icon: Leaf, label: "Natural Ingredients", sub: "No Colors" },
              { icon: ShieldCheck, label: "Lab Tested", sub: "Quality Assured" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 shrink-0 snap-center px-4 py-2 group">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-accent group-hover:text-white transition-all duration-300 border border-foreground/5">
                  <item.icon size={18} className="transition-transform group-hover:scale-110" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.1em] text-foreground">{item.label}</span>
                  <span className="text-[9px] font-bold text-foreground/40 uppercase tracking-widest">{item.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Horizontal Bestsellers */}
      <section className="py-20 md:py-32 bg-white relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="h-px w-8 bg-accent/40" />
                <p className="text-secondary font-black uppercase tracking-[0.3em] text-[10px]">Our Pride</p>
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none">
                Best <span className="text-accent italic font-serif">Sellers</span>
              </h2>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Link href="/products" className="group flex items-center gap-2 text-foreground/60 hover:text-accent transition-colors font-bold text-sm bg-muted/30 px-6 py-3 rounded-full border border-foreground/5 backdrop-blur-sm">
                View All Collection <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          <div className="flex gap-6 md:gap-8 overflow-x-auto no-scrollbar snap-x pb-12 -mx-6 px-6">
            {featuredProducts.map((product, i) => (
              <motion.div 
                key={i} 
                className="min-w-[85vw] md:min-w-[400px] snap-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="group relative bg-[#FDFBF7] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border border-foreground/5 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] hover:-translate-y-3">
                  {/* Image Container */}
                  <div className="aspect-[4/5] md:aspect-square relative overflow-hidden bg-gradient-to-br from-white to-transparent">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-contain p-12 md:p-14 transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1) group-hover:scale-110 group-hover:rotate-2" 
                    />
                    
                    {/* Floating Badge */}
                    <div className="absolute top-6 left-6">
                      <div className="bg-white/95 backdrop-blur-xl px-4 py-2 rounded-2xl shadow-[0_8px_20px_-5px_rgba(0,0,0,0.1)] border border-white/40">
                        <span className="text-[10px] font-black uppercase tracking-[0.15em] text-foreground/80">
                          {product.badge}
                        </span>
                      </div>
                    </div>

                    {/* Quick View / Detail Icon */}
                    <button className="absolute bottom-6 right-6 w-12 h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center shadow-xl text-foreground/80 hover:bg-accent hover:text-white transition-all duration-300 group/btn transform hover:scale-110 active:scale-95">
                      <ArrowUpRight size={22} className="group-hover/btn:rotate-12 transition-transform" />
                    </button>
                    
                    {/* Rating Overlay */}
                    <div className="absolute bottom-6 left-6 glass-card px-3 py-1.5 rounded-xl flex items-center gap-1.5 border-white/50">
                      <Star size={12} fill="currentColor" className="text-accent" />
                      <span className="text-[11px] font-black tracking-wider">{product.rating}</span>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-8 md:p-10 pt-4 md:pt-6">
                    <div className="mb-6">
                      <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-2 group-hover:text-accent transition-colors">{product.name}</h3>
                      <p className="text-foreground/40 text-xs font-medium tracking-wide uppercase">Hand-Picked & Lab Tested</p>
                    </div>
                    
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-black tracking-widest text-foreground/30 mb-0.5">Price</span>
                        <span className="text-2xl md:text-3xl font-black tracking-tighter text-foreground">₹{product.price}</span>
                      </div>
                      
                      <div className="flex-1 max-w-[180px]">
                        <a href={WA_LINK} target="_blank" rel="noreferrer" className="block">
                          <Button className="w-full h-14 md:h-16 bg-primary hover:bg-primary/95 text-white rounded-[1.25rem] font-black text-sm md:text-base shadow-[0_15px_30px_-10px_rgba(var(--primary-rgb),0.3)] hover:shadow-[0_20px_40px_-10px_rgba(var(--primary-rgb),0.4)] transition-all active:scale-95 group/buy flex items-center justify-center gap-2">
                            <span>Add to Cart</span>
                            <ShoppingBag size={18} className="translate-y-[-1px] group-hover:animate-bounce" />
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Ras Veda Secret (Quality Sections) */}
      <section className="py-20 md:py-32 bg-[#FDFBF7] relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-16 md:mb-24">
            <p className="text-secondary font-black uppercase tracking-[0.3em] text-[10px] mb-3">Our Philosophy</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none mb-6">
              The <span className="text-accent italic font-serif">Ras Veda</span> Secret
            </h2>
            <p className="text-foreground/60 text-lg md:text-xl font-medium leading-relaxed">
              We believe in the power of purity. Behind every pack of Ras Veda is a promise of uncompromising quality and ancestral wisdom.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { 
                icon: Leaf, 
                title: "Zero Fillers", 
                desc: "100% pure spice. No starch, no artificial colors, and absolutely no added preservatives.",
                color: "bg-green-50 text-green-600"
              },
              { 
                icon: ShieldCheck, 
                title: "Laboratory Verified", 
                desc: "Every batch undergoes rigorous lab testing to ensure zero contamination and peak potency.",
                color: "bg-blue-50 text-blue-600"
              },
              { 
                icon: BadgeCheck, 
                title: "Ancestral Guarded", 
                desc: "Traditional slow-grinding methods that preserve essential oils and the soul of the spice.",
                color: "bg-orange-50 text-orange-600"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group p-10 md:p-12 bg-white rounded-[2.5rem] md:rounded-[3rem] border border-foreground/5 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform`}>
                  <feature.icon size={28} />
                </div>
                <h3 className="text-2xl font-black mb-4">{feature.title}</h3>
                <p className="text-foreground/60 font-medium leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Voices of Flavor (Testimonials) */}
      <section className="py-24 md:py-40 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-16 md:mb-24">
            <p className="text-secondary font-black uppercase tracking-[0.3em] text-[10px] mb-3">Customer Love</p>
            <h2 className="text-4xl md:text-7xl font-black tracking-tight mb-8">Voices of <span className="text-accent italic font-serif">Flavor</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { text: "The aroma takes me back to my grandmother's kitchen. You can actually taste the purity in their Red Chilli powder.", author: "Priya Sharma", role: "Home Chef" },
              { text: "Never seen such vibrant color and potent flavor without artificial colors. Ras Veda is now a staple in my pantry.", author: "Rahul Verma", role: "Food Enthusiast" },
              { text: "Finally a brand that cares about lab-testing. I feel safe serving this to my children. Pure and honest.", author: "Meera Iyer", role: "Parent" }
            ].map((tweet, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 md:p-12 bg-[#FDFBF7] rounded-[2.5rem] md:rounded-[3rem] border border-foreground/5 relative group"
              >
                <div className="absolute top-8 right-8 text-accent/20 group-hover:text-accent/40 transition-colors">
                  <Star size={40} fill="currentColor" />
                </div>
                <p className="text-lg md:text-xl font-medium leading-relaxed mb-8 italic text-foreground/80 relative z-10">
                  "{tweet.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center font-black text-accent uppercase">
                    {tweet.author[0]}
                  </div>
                  <div>
                    <h4 className="font-black text-sm">{tweet.author}</h4>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-foreground/40">{tweet.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 px-6 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto rounded-[3rem] md:rounded-[4.5rem] overflow-hidden relative bg-primary p-12 md:p-28 text-center shadow-[0_40px_100px_-20px_rgba(var(--primary-rgb),0.3)]">
          {/* Decorative background effects */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10" />
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-4xl md:text-8xl font-sans font-black text-white mb-8 md:mb-10 leading-[1.1] tracking-tight">
              Experience the <span className="text-accent underline decoration-white/20 underline-offset-[12px]">Ras Veda</span> Difference.
            </h2>
            <p className="text-white/70 text-base md:text-2xl mb-10 md:mb-12 max-w-2xl font-medium leading-relaxed">
              We never compromise. No fillers, no colors, no nonsense. Just pure, honest spices for your family.
            </p>
            <Link href="/our-story">
              <Button size="lg" variant="outline" className="text-white border-white/20 hover:bg-white hover:text-primary rounded-2xl px-10 py-6 text-base font-black shadow-2xl">
                Read Our Story
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Spacing for BottomNav */}
      <div className="h-32 md:hidden" />
    </div>
  );
}
