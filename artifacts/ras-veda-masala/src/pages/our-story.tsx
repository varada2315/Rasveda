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
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1600")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#FDFBF7]" />
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-accent text-white px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.3em] mb-6 inline-block shadow-2xl border border-white/20">
              Our Legacy
            </span>
            <h1 className="text-5xl md:text-7xl font-sans font-black text-white mb-6 tracking-tighter leading-tight drop-shadow-2xl">
              A Pinch of <span className="text-accent italic drop-shadow-2xl">History</span>
            </h1>
            <p className="text-base md:text-2xl text-white/80 max-w-xl mx-auto font-medium leading-relaxed drop-shadow-lg">
              RasVeda Masala isn't just a brand; it's a journey back to the roots of authentic Indian flavor and ancestral wisdom.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-16 md:py-24 px-6 overflow-hidden bg-white/40">
        <div className="container mx-auto px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="absolute -top-20 -left-20 w-80 h-80 bg-accent/5 rounded-full blur-[100px] opacity-50" />
              <div className="relative z-10 p-4 md:p-6 bg-white rounded-[2.5rem] md:rounded-[3rem] shadow-premium border border-foreground/[0.03]">
                <img
                  src={grindingImg}
                  alt="Traditional grinding"
                  className="w-full h-[350px] md:h-[700px] object-cover rounded-[2.2rem] md:rounded-[3.2rem] shadow-sm transform group-hover:scale-[1.02] transition-transform duration-1000"
                />
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1 }}
                className="absolute -bottom-10 -right-4 md:-right-8 glass-card p-10 md:p-14 rounded-[3rem] md:rounded-[4rem] shadow-premium-xl z-20 max-w-[280px] md:max-w-[400px] border border-white/40"
              >
                <Sparkles className="text-accent mb-6 animate-pulse" size={32} />
                <p className="text-foreground/80 font-serif italic text-lg md:text-2xl leading-relaxed tracking-tight">
                  "The aroma that filled our ancestral courtyard... that is our lifelong promise to you."
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-start pt-16 lg:pt-0"
            >
              <div className="inline-flex items-center gap-3 mb-8 bg-accent/5 px-6 py-2 rounded-full border border-accent/10">
                <Heart size={14} className="text-accent" />
                <span className="text-accent font-black uppercase tracking-[0.3em] text-[9px]">Rooted in Love</span>
              </div>
              
              <h2 className="text-4xl md:text-[5.5rem] font-sans font-black text-foreground mb-10 md:mb-12 leading-[0.9] tracking-tighter">
                A Mother's <br />
                <span className="text-accent italic drop-shadow-sm">Devotion.</span>
              </h2>
              
              <div className="space-y-8 md:space-y-10 max-w-xl">
                <p className="text-xl md:text-3xl text-foreground font-black opacity-90 leading-[1.3] tracking-tight">
                  It started with simple afternoons, watching the women of our family select each spice seed by seed.
                </p>
                <p className="text-foreground/50 text-base md:text-xl leading-relaxed font-medium">
                  They didn't have heavy machinery; they had intuition, generations of experience, and a profound respect for nature's bounty. That's the essence we carry in every RasVeda packet.
                </p>
                
                <div className="relative py-10 md:py-12 px-8 bg-primary/[0.02] rounded-[2.5rem] border border-primary/5 overflow-hidden">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-accent" />
                  <p className="text-primary font-black text-xl md:text-2xl italic font-serif leading-relaxed">
                    "We don't just blend spices; we preserve the soulful memories of an Indian home."
                  </p>
                </div>
                
                <p className="text-foreground/50 text-base md:text-xl leading-relaxed font-medium italic">
                  Today, RasVeda Masala brings those same high-potency, traditional blends to your kitchen, ensuring that your family experiences the same soul-stirring flavor we grew up with.
                </p>
              </div>

              <div className="pt-16 w-full sm:w-auto">
                <Link href="/products">
                  <Button size="lg" className="magnetic-hover w-full sm:w-auto rounded-2xl bg-primary hover:bg-primary/95 text-white px-10 md:px-12 py-6 md:py-8 text-lg font-black shadow-xl transition-all active:scale-95 group overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    Explore Our Heritage
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
