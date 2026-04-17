import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Star, ArrowUpRight } from "lucide-react";
import chilliImg from "@assets/chilli-powder.png";
import corianderImg from "@assets/coriander-powder.png";
import turmericImg from "@assets/turmeric-powder.png";

const WA_LINK = "https://wa.me/919999999999";

const products = [
  {
    id: 1,
    name: "Red Chilli Powder",
    desc: "Bold, fiery, and aromatic. Made from sun-dried red chillies for authentic heat and vibrant colour.",
    price: 49,
    weight: "100g",
    image: chilliImg,
    badge: "Best Seller",
    rating: 4.9,
    highlights: ["Sun-dried", "Natural Red"]
  },
  {
    id: 2,
    name: "Coriander Powder",
    desc: "Freshly ground coriander seeds with a subtle citrus aroma. The backbone of Indian cooking.",
    price: 49,
    weight: "100g",
    image: corianderImg,
    badge: "Pure & Fresh",
    rating: 4.8,
    highlights: ["Stone-ground", "Pure"]
  },
  {
    id: 3,
    name: "Turmeric Powder",
    desc: "Pure, golden turmeric powder. Rich in curcumin, sourced from the finest farms.",
    price: 49,
    weight: "100g",
    image: turmericImg,
    badge: "100% Natural",
    rating: 5.0,
    highlights: ["High Curcumin", "Golden"]
  }
];

export default function Products() {
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
            <h1 className="text-4xl md:text-8xl font-sans font-black text-white mb-4 tracking-tighter leading-tight">
              Our <span className="text-accent italic">Heritage</span>
            </h1>
            <p className="text-base md:text-2xl text-white/80 max-w-xl mx-auto font-medium leading-relaxed">
              Every pack is a promise of purity, tradition, and uncompromising quality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 px-6 relative">
        <div className="container mx-auto px-0">
          {/* Categories/Filters */}
          <div className="flex gap-3 md:gap-4 overflow-x-auto no-scrollbar pb-10 snap-x -mx-6 px-6">
            {["All", "Masalas", "Whole", "Powders", "Organic"].map((cat, i) => (
              <button 
                key={i} 
                className={`snap-center px-6 md:px-8 py-2.5 md:py-3 rounded-xl md:rounded-2xl font-black text-[10px] md:text-[11px] uppercase tracking-widest transition-all ${
                  i === 0 
                  ? "bg-accent text-white shadow-xl shadow-accent/20 scale-105" 
                  : "bg-white border border-foreground/5 text-foreground/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {products.map((product, i) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-foreground/5 shadow-sm hover:shadow-2xl transition-all group flex flex-col"
              >
                <div className="h-[300px] md:h-[400px] relative overflow-hidden bg-[#FDFBF7]">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-contain p-10 md:p-12 group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-5 left-5 flex flex-col gap-2">
                    <span className="bg-white/90 backdrop-blur-md text-[8px] md:text-[9px] font-black uppercase tracking-widest px-3.5 py-1 rounded-full shadow-sm">
                      {product.badge}
                    </span>
                    {product.highlights.map((h, idx) => (
                      <span key={idx} className="bg-primary/95 backdrop-blur-md text-white/90 text-[7px] md:text-[8px] font-bold uppercase tracking-widest px-3 py-1 rounded-full w-fit">
                        {h}
                      </span>
                    ))}
                  </div>
                  <button className="absolute bottom-5 right-5 w-10 h-10 md:w-14 md:h-14 bg-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg hover:bg-accent hover:text-white transition-all transform hover:rotate-6">
                    <ArrowUpRight size={20} className="md:w-6 md:h-6" />
                  </button>
                </div>
                
                <div className="p-8 md:p-10 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl md:text-2xl font-black tracking-tight mb-1.5">{product.name}</h3>
                      <div className="flex items-center gap-1.5 text-accent">
                        <Star size={12} fill="currentColor" />
                        <span className="text-xs font-bold">{product.rating}</span>
                        <span className="text-foreground/20 text-[10px] ml-1 font-medium">(100+ Reviews)</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-foreground/30">{product.weight}</span>
                  </div>
                  
                  <p className="text-foreground/60 text-sm md:text-base leading-relaxed mb-8 flex-grow">
                    {product.desc}
                  </p>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-foreground/5">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-foreground/20 uppercase tracking-widest">Price</span>
                      <span className="text-2xl md:text-3xl font-black tracking-tight">₹{product.price}</span>
                    </div>
                    <a href={WA_LINK} target="_blank" rel="noreferrer">
                      <Button className="rounded-xl md:rounded-2xl bg-primary hover:bg-primary/90 text-white px-6 md:px-8 py-5 md:py-7 font-black shadow-xl transition-all active:scale-95 flex items-center gap-2 text-xs md:text-base">
                        <ShoppingBag size={18} />
                        Add to Cart
                      </Button>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Bottom Spacing */}
      <div className="h-32 md:hidden" />
    </div>
  );
}
