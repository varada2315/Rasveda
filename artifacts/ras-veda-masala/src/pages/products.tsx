import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Red Chilli Powder",
    desc: "Bold, fiery, and aromatic. Made from sun-dried red chillies for authentic heat and vibrant colour.",
    price: 49,
    weight: "100g",
    image: "https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?w=600"
  },
  {
    id: 2,
    name: "Coriander Powder",
    desc: "Freshly ground coriander seeds with a subtle citrus aroma. The backbone of Indian cooking.",
    price: 49,
    weight: "100g",
    image: "https://images.unsplash.com/photo-1601050690293-8b64bc4b5a2c?w=600"
  },
  {
    id: 3,
    name: "Turmeric Powder",
    desc: "Pure, golden turmeric powder. Rich in curcumin, sourced from the finest farms.",
    price: 49,
    weight: "100g",
    image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=600"
  }
];

export default function Products() {
  return (
    <div className="min-h-screen pt-20 bg-background">
      {/* Hero */}
      <section className="relative h-[30vh] md:h-[40vh] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1600")' }}
        />
        <div className="absolute inset-0 bg-secondary/90 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/30" />
        
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif text-white mb-4"
          >
            Our Products
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "60px" }}
            className="h-1 bg-accent mx-auto rounded-full"
          />
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 text-center px-4 max-w-3xl mx-auto">
        <p className="text-xl md:text-2xl font-serif italic text-foreground/80 leading-relaxed">
          "Crafted with care, blended with love — each masala is a tribute to authentic Indian cooking."
        </p>
      </section>

      {/* Products Grid */}
      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border hover:-translate-y-2 transition-all duration-300 flex flex-col group"
              >
                <div className="h-64 overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10"></div>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                
                <div className="p-8 flex flex-col flex-grow text-center">
                  <h3 className="text-2xl font-serif font-bold mb-3 text-foreground">{product.name}</h3>
                  <p className="text-muted-foreground mb-6 flex-grow">{product.desc}</p>
                  
                  <div className="mb-6">
                    <span className="text-3xl font-bold text-secondary">₹{product.price}</span>
                    <span className="text-muted-foreground ml-2">/ {product.weight}</span>
                  </div>
                  
                  <a 
                    href="https://wa.me/919999999999" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full"
                  >
                    <Button className="w-full rounded-full bg-accent hover:bg-accent/90 text-white flex items-center justify-center gap-2 py-6 text-lg">
                      <MessageCircle size={20} />
                      Enquire on WhatsApp
                    </Button>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center p-12 bg-primary/5 rounded-2xl border border-primary/10">
            <h4 className="text-2xl font-serif text-primary mb-4">Looking for bulk orders?</h4>
            <p className="text-foreground/70 mb-6 max-w-lg mx-auto">
              We supply premium spices for restaurants, caterers, and wholesale distributors at special rates.
            </p>
            <Button variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-white px-8">
              Contact us for wholesale pricing
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
