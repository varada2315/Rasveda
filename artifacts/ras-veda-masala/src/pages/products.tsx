import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Star, ArrowUpRight, Loader2, Plus } from "lucide-react";
import { useProducts } from "@/hooks/use-products";
import { useCart } from "@/hooks/use-cart";
import { QuickAdd } from "@/components/products/QuickAdd";
import { Link, useLocation } from "wouter";

export default function Products() {
  const { data: products, isLoading, error } = useProducts();
  const [, setLocation] = useLocation();
  const { addItem } = useCart();


  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-accent animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <p className="text-red-500 font-bold">Failed to load products. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Hero */}
      <section className="relative h-[45dvh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] scale-110"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1600")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#FDFBF7]" />
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <span className="bg-accent text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] mb-4 inline-block shadow-lg">
              Premium Spices
            </span>
            <h1 className="text-5xl md:text-7xl font-sans font-black text-white mb-6 tracking-tighter leading-tight drop-shadow-2xl">
              Our <span className="text-accent italic">Heritage</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/80 max-w-xl mx-auto font-medium leading-relaxed drop-shadow-lg">
              Every pack is a promise of purity, tradition, and uncompromising quality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 px-6 relative">
        <div className="container mx-auto px-0">

          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          >
            <AnimatePresence mode="popLayout">
              {products?.map((product) => (
                <motion.div 
                  layout
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="bg-white rounded-[3rem] overflow-hidden border border-foreground/[0.03] shadow-premium hover:shadow-premium-xl transition-all duration-500 hover:-translate-y-2 group flex flex-col"
                >
                  <div className="h-[280px] md:h-[350px] relative overflow-hidden product-card-shine">
                    <Link href={`/product/${product.id}`} className="block w-full h-full p-6 group-hover:p-4 transition-all duration-700">
                      <div className="w-full h-full rounded-[2.5rem] overflow-hidden shadow-sm border border-black/5">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                        />
                      </div>
                    </Link>
                    
                    {/* Primary Badge Overlay */}
                    <div className="absolute top-10 left-10 pointer-events-none">
                       <span className="bg-white/90 backdrop-blur-xl text-[9px] font-black uppercase tracking-[0.2em] px-5 py-2 rounded-2xl shadow-sm border border-white/40">
                        {product.badge}
                      </span>
                    </div>

                    <Link href={`/product/${product.id}`} className="absolute bottom-10 right-10 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-premium-xl hover:bg-accent hover:text-white transition-all transform hover:rotate-12 hover:scale-110">
                      <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                  
                  <div className="p-10 md:p-12 pt-2 md:pt-4 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex flex-col gap-3">
                        <Link href={`/product/${product.id}`} className="hover:text-accent transition-colors block">
                          <h3 className="text-2xl md:text-3xl font-black tracking-tight leading-none">{product.name}</h3>
                        </Link>
                        
                        {/* Highlights moved from image to here for better clarity */}
                        <div className="flex flex-wrap gap-2">
                          {product.highlights.map((h, idx) => (
                            <span key={idx} className="bg-secondary/5 text-secondary/70 text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border border-secondary/10">
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="text-[10px] font-black text-foreground/20 uppercase tracking-[0.2em] pt-2">{product.weight}</span>
                    </div>
                    
                    <p className="text-foreground/50 text-base md:text-lg leading-relaxed mb-8 flex-grow font-medium line-clamp-2">
                      {product.desc}
                    </p>
                    
                    <div className="flex items-center justify-between pt-8 border-t border-foreground/[0.03]">
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
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
      
      {/* Bottom Spacing */}
      <div className="h-32 md:hidden" />
    </div>
  );
}
