import { useRoute } from "wouter";
import { useProducts } from "@/hooks/use-products";
import { useCart } from "@/hooks/use-cart";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Star, Plus, Minus, ArrowLeft, ShieldCheck, Leaf, FlaskConical, DropletOff } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function ProductDetail() {
  const [, params] = useRoute("/product/:id");
  const { data: products, isLoading } = useProducts();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const id = params?.id ? parseInt(params.id) : null;
  const product = products?.find((p) => p.id === id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-black mb-4">Product Not Found</h1>
        <p className="mb-8 opacity-60">The product you're looking for doesn't exist or has been moved.</p>
        <Link href="/products">
          <Button className="bg-primary text-white px-8 py-6 rounded-2xl font-black">
            Back to Products
          </Button>
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-24 pb-20 overflow-x-hidden">
      <div className="container mx-auto px-6">
        {/* Breadcrumb / Back */}
        <Link href="/products" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-foreground/40 hover:text-accent transition-colors mb-12 group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Sticky Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:sticky lg:top-32 h-fit"
          >
            <div className="relative aspect-square bg-white rounded-[3rem] overflow-hidden border border-foreground/5 shadow-2xl shadow-black/5 group">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-contain p-12 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-8 left-8 flex flex-col gap-3">
                <span className="bg-accent text-white text-[10px] font-black uppercase tracking-widest px-5 py-2 rounded-full shadow-lg">
                  {product.badge}
                </span>
              </div>
            </div>
            
            {/* Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {[
                { icon: ShieldCheck, label: "Lab Tested" },
                { icon: Leaf, label: "100% Natural" },
                { icon: DropletOff, label: "No Additives" },
                { icon: FlaskConical, label: "Finely Ground" }
              ].map((item, idx) => (
                <div key={idx} className="bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-foreground/5 flex flex-col items-center justify-center text-center gap-2">
                  <item.icon size={18} className="text-accent" />
                  <span className="text-[9px] font-black uppercase tracking-tighter opacity-60">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="mb-10">
              <div className="flex items-center gap-2 text-accent mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} stroke="currentColor" />
                  ))}
                </div>
                <span className="text-xs font-black tracking-widest uppercase">{product.rating} / 5.0</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-sans font-black tracking-tight mb-4 leading-none">
                {product.name}
              </h1>
              
              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-4xl md:text-5xl font-black text-primary">₹{product.price}</span>
                <span className="text-lg font-bold text-foreground/40 line-through">₹{Math.round(product.price * 1.5)}</span>
                <span className="bg-green-500/10 text-green-600 px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest">Save 33%</span>
              </div>

              <p className="text-lg md:text-xl text-foreground/60 leading-relaxed font-medium">
                {product.fullDesc || product.desc}
              </p>
            </div>

            {/* Selection */}
            <div className="space-y-8 mb-12">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-foreground/30 mb-4 block">Select Quantity</span>
                <div className="flex items-center gap-6">
                  <div className="flex items-center bg-white border border-foreground/10 rounded-2xl p-2 h-16 w-44 justify-between">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 rounded-xl flex items-center justify-center hover:bg-black/5 transition-colors disabled:opacity-30"
                      disabled={quantity <= 1}
                    >
                      <Minus size={18} />
                    </button>
                    <span className="text-xl font-black min-w-[2ch] text-center">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 rounded-xl flex items-center justify-center hover:bg-black/5 transition-colors"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                  <span className="text-foreground/40 font-bold">{product.weight} per pack</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleAddToCart}
                  className="flex-grow bg-primary hover:bg-primary/90 text-white h-20 rounded-[1.5rem] font-black text-xl shadow-2xl shadow-primary/20 transition-all active:scale-95 flex items-center justify-center gap-3"
                >
                  <ShoppingBag size={24} />
                  Add to Cart
                </Button>
              </div>
            </div>

            {/* Info Tabs / Accordions */}
            <div className="space-y-1">
              <div className="border border-foreground/5 bg-white rounded-3xl overflow-hidden mb-4">
                <div className="p-8">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-accent mb-6">Nutrition Facts</h3>
                  {product.nutritionFacts ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
                      {Object.entries(product.nutritionFacts).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center py-2 border-b border-foreground/5">
                          <span className="text-sm font-bold opacity-60">{key}</span>
                          <span className="text-sm font-black">{value}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="opacity-40 text-sm italic">Standard nutrition details apply.</p>
                  )}
                  <p className="mt-8 text-[9px] font-medium opacity-40 leading-relaxed">
                    *Nutrition values are approximate, based on 100g serving.
                    PRODUCT OF INDIA.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-foreground/5 bg-white rounded-3xl p-8">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-accent mb-4">Ingredients</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.ingredients?.map((ing, i) => (
                      <span key={i} className="bg-foreground/5 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-tight">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="border border-foreground/5 bg-white rounded-3xl p-8">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-accent mb-4">Storage</h3>
                  <p className="text-sm font-medium leading-relaxed opacity-70">
                    {product.storageInstructions || "Store in a cool, dry place. Keep away from direct sunlight."}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Footer Disclaimer */}
      <div className="container mx-auto px-6 mt-20 pt-10 border-t border-foreground/5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 opacity-40">
          <div className="flex items-center gap-4">
            <img src="/favicon.svg" alt="FSSAI" className="h-10 grayscale opacity-50" />
            <p className="text-[9px] font-bold uppercase tracking-widest max-w-[200px]">
              FSSAI Lic No. 22226078000287 <br />
              Rasveda Masala
            </p>
          </div>
          <p className="text-[9px] font-bold uppercase tracking-widest text-center md:text-right">
            Manufactured By: Northern Spices <br />
            A-73/ A-74 Dadu Nagar, Phulera, Jaipur-303338
          </p>
        </div>
      </div>
    </div>
  );
}
