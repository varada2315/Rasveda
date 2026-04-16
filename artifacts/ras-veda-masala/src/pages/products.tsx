import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Star, CheckCircle2, Truck, BadgeCheck } from "lucide-react";
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
    reviews: 128,
    highlights: ["Sun-dried chillies", "Deep red colour", "No artificial colour"]
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
    reviews: 94,
    highlights: ["Freshly ground", "Citrus aroma", "Stone-ground texture"]
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
    reviews: 76,
    highlights: ["High curcumin content", "Vivid golden colour", "No fillers"]
  }
];

function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {[1,2,3,4,5].map(s => (
        <Star key={s} size={15} className={s <= Math.round(rating) ? "fill-accent text-accent" : "text-muted-foreground"} />
      ))}
      <span className="text-sm font-semibold text-foreground ml-1">{rating}</span>
      <span className="text-xs text-muted-foreground">({reviews} reviews)</span>
    </div>
  );
}

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
            className="h-1 bg-accent mx-auto rounded-full mb-6"
          />
          <motion.a
            href={WA_LINK}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-white rounded-full px-8 flex items-center gap-2 mx-auto">
              <ShoppingBag size={18} />
              Shop Now on WhatsApp
            </Button>
          </motion.a>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="bg-primary/5 border-y border-primary/10 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-sm text-foreground/70">
            {[
              { icon: Truck, label: "Quick Delivery Available" },
              { icon: BadgeCheck, label: "100% Pure & Natural" },
              { icon: CheckCircle2, label: "No Artificial Additives" },
              { icon: ShoppingBag, label: "Order via WhatsApp" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <item.icon size={16} className="text-primary" />
                <span className="font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Intro */}
      <section className="py-12 text-center px-4 max-w-3xl mx-auto">
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
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col group"
              >
                {/* Image */}
                <div className="h-64 overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10"></div>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <span className="absolute top-3 left-3 z-20 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    {product.badge}
                  </span>
                  <span className="absolute top-3 right-3 z-20 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                    In Stock
                  </span>
                </div>
                
                {/* Content */}
                <div className="p-7 flex flex-col flex-grow">
                  <h3 className="text-2xl font-serif font-bold mb-2 text-foreground">{product.name}</h3>
                  <StarRating rating={product.rating} reviews={product.reviews} />
                  <p className="text-muted-foreground mt-3 mb-4 text-sm leading-relaxed">{product.desc}</p>

                  {/* Highlights */}
                  <ul className="space-y-1 mb-5">
                    {product.highlights.map((h, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-foreground/70">
                        <CheckCircle2 size={14} className="text-primary shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  
                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-5 mt-auto">
                    <span className="text-3xl font-bold text-secondary">₹{product.price}</span>
                    <span className="text-muted-foreground text-sm">/ {product.weight}</span>
                  </div>
                  
                  {/* CTA */}
                  <a 
                    href={WA_LINK}
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full"
                  >
                    <Button className="w-full rounded-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2 py-6 text-base font-semibold shadow hover:shadow-primary/30 transition-all">
                      <ShoppingBag size={18} />
                      Shop Now
                    </Button>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bulk Order Banner */}
          <div className="mt-20 text-center p-12 bg-primary/5 rounded-2xl border border-primary/10">
            <h4 className="text-2xl font-serif text-primary mb-3">Looking for bulk orders?</h4>
            <p className="text-foreground/70 mb-6 max-w-lg mx-auto">
              We supply premium spices for restaurants, caterers, and wholesale distributors at special rates.
            </p>
            <a href={WA_LINK} target="_blank" rel="noreferrer">
              <Button className="rounded-full bg-primary hover:bg-primary/90 text-white px-10 py-6 text-base flex items-center gap-2 mx-auto">
                <ShoppingBag size={18} />
                Enquire on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
