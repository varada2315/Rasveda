import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Heart, Shield, Star, Sparkles } from "lucide-react";
import grindingImg from "@assets/our-story-grinding.png";

export default function OurStory() {
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Hero */}
      <section className="relative h-[45dvh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] scale-110"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1600")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#FDFBF7]" />
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-accent text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] mb-4 inline-block shadow-lg">
              Our Legacy
            </span>
            <h1 className="text-4xl md:text-8xl font-sans font-black text-white mb-4 tracking-tighter leading-tight">
              A Pinch of <span className="text-accent italic">History</span>
            </h1>
            <p className="text-base md:text-2xl text-white/80 max-w-xl mx-auto font-medium leading-relaxed">
              Res Veda Masala isn't just a brand; it's a journey back to the roots of authentic Indian flavor.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-16 md:py-24 px-6 overflow-hidden">
        <div className="container mx-auto px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl opacity-50" />
              <img
                src={grindingImg}
                alt="Traditional grinding"
                className="w-full h-[350px] md:h-[700px] object-cover rounded-[2rem] md:rounded-[3rem] shadow-2xl relative z-10 border-4 border-white"
              />
              <div className="absolute -bottom-6 -right-2 md:-right-4 bg-white p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl z-20 max-w-[240px] md:max-w-[350px]">
                <Sparkles className="text-accent mb-3" size={24} />
                <p className="text-foreground/80 font-serif italic text-base md:text-xl leading-relaxed">
                  "The aroma that filled our ancestral courtyard... that's our promise."
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-start pt-8 md:pt-0"
            >
              <h2 className="text-3xl md:text-7xl font-sans font-black text-foreground mb-6 md:mb-8 leading-[1.1]">
                A Mother's <span className="text-accent italic">Devotion.</span>
              </h2>
              <div className="w-16 h-1.5 md:w-20 md:h-2 bg-accent mb-8 md:mb-10 rounded-full" />
              
              <div className="space-y-4 md:space-y-6">
                <p className="text-lg md:text-2xl text-foreground font-black opacity-90 leading-relaxed tracking-tight">
                  It started with simple afternoons, watching the women of our family select each spice seed by seed.
                </p>
                <p className="text-foreground/60 text-base md:text-xl leading-relaxed">
                  They didn't have fancy machines; they had intuition, experience, and a profound respect for nature's bounty. That's the legacy we carry in every packet.
                </p>
                <p className="text-primary font-bold text-xl md:text-2xl italic font-serif leading-relaxed border-l-4 border-accent pl-5 md:pl-6 py-2 my-6 md:my-8 bg-accent/5 rounded-r-xl">
                  "We don't just blend spices; we preserve memories of home."
                </p>
                <p className="text-foreground/60 text-base md:text-xl leading-relaxed italic">
                  Today, Ras Veda Masala brings those same high-potency, traditional blends to your kitchen, ensuring that your family experiences the same soul-stirring flavor we grew up with.
                </p>
              </div>

              <div className="pt-10 w-full md:w-auto">
                <Link href="/products">
                  <Button className="w-full md:w-auto rounded-xl md:rounded-2xl bg-primary hover:bg-primary/90 text-white px-8 md:px-10 py-6 md:py-7 text-base md:text-xl font-black shadow-xl transition-all active:scale-95">
                    Explore Our Spices
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Spacing for BottomNav */}
      <div className="h-32 md:hidden" />
    </div>
  );
}
