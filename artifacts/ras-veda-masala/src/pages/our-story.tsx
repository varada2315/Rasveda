import { motion } from "framer-motion";
import { Check, Heart, Shield, Star } from "lucide-react";
import grindingImg from "@assets/our-story-grinding.png";

export default function OurStory() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1600")' }}
        />
        <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif text-white mb-4"
          >
            Our Story
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "60px" }}
            className="h-1 bg-accent mx-auto rounded-full"
          />
        </div>
      </section>

      {/* Long-form story */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">

          {/* Story Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16 relative"
          >
            <img
              src={grindingImg}
              alt="Grandmother and mother grinding masala the traditional way"
              className="w-full h-[420px] md:h-[520px] object-cover rounded-2xl shadow-xl"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-white font-serif italic text-lg md:text-xl drop-shadow-md">
                "Like our mother and Taijji before us — grinding with love, one season at a time."
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-lg md:prose-xl prose-stone mx-auto max-w-3xl"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-center mb-12 text-foreground">Born from Love & Tradition</h2>
            
            <p className="lead text-xl text-muted-foreground font-serif italic mb-8 text-center">
              A journey that began not in a factory, but in the heart of a home kitchen.
            </p>

            <p className="mb-6 text-foreground/80 leading-relaxed">
              It all started with the memory of a mother and Taijji sitting together in the courtyard, the warm afternoon sun pouring over them. They would carefully hand-select whole spices brought fresh from the local market, their experienced hands intuitively knowing which pods and seeds held the richest oils.
            </p>

            <p className="mb-6 text-foreground/80 leading-relaxed">
              They roasted these spices slowly, never rushing the process. The rhythmic sound of grinding them by hand with love and patience became the heartbeat of the home. The rich, earthy aroma would fill every corner of the house, signaling that something magical was about to happen in the kitchen. Those meals weren't just food; they were expressions of pure devotion.
            </p>

            <p className="mb-6 text-foreground/80 leading-relaxed">
              That profound memory became the foundation of Ras Veda Masala. We realized that the secret to truly spectacular Indian food isn't a complex technique—it's the purity of the ingredients and the intention behind the blend. 
            </p>

            <p className="text-foreground/80 leading-relaxed">
              Today, Ras Veda Masala exists to bring that same love, purity, and authenticity to your kitchen. We honor the methods of our mothers and grandmothers, ensuring that every packet we seal carries the authentic flavor and true identity of traditional Indian cooking.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Block */}
      <section className="py-20 bg-primary text-white relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto text-center md:text-left">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 border border-white/20 rounded-2xl bg-white/5 backdrop-blur-sm"
            >
              <h3 className="text-2xl font-serif mb-4 text-accent">Our Mission</h3>
              <p className="text-2xl font-serif italic leading-relaxed">
                "To reach every home with the finest masala."
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 border border-white/20 rounded-2xl bg-white/5 backdrop-blur-sm"
            >
              <h3 className="text-2xl font-serif mb-4 text-accent">Our Vision</h3>
              <p className="text-2xl font-serif italic leading-relaxed">
                "To be the most trusted masala brand in every kitchen across India."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-16 text-foreground ornament-line inline-block">Our Core Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Shield, title: "Purity", desc: "No artificial colors, no fillers. Just 100% pure, natural spices." },
              { icon: Heart, title: "Tradition", desc: "Recipes and methods that honor generations of Indian culinary wisdom." },
              { icon: Star, title: "Affordability", desc: "Because everyone deserves access to premium, authentic flavors." }
            ].map((value, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-white p-10 rounded-2xl shadow-sm border border-border flex flex-col items-center hover:-translate-y-1 transition-transform"
              >
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center text-secondary mb-6">
                  <value.icon size={32} />
                </div>
                <h3 className="text-xl font-serif font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
