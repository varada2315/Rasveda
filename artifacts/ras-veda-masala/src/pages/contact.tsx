import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Instagram, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Hero */}
      <section className="relative h-[45dvh] flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 bg-primary"
        />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-[#FDFBF7]/0" />
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-accent text-white px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.3em] mb-6 inline-block shadow-2xl border border-white/20">
              Get in Touch
            </span>
            <h1 className="text-5xl md:text-[8rem] font-sans font-black text-white mb-6 tracking-tighter leading-tight drop-shadow-2xl">
              Let's <span className="text-accent italic drop-shadow-2xl uppercase">Connect.</span>
            </h1>
            <p className="text-base md:text-2xl text-white/80 max-w-xl mx-auto font-medium leading-relaxed drop-shadow-lg">
              Whether you have questions about our traditions or a bulk inquiry, our family is here to assist yours.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-6 bg-white/40 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none" />
        
        <div className="container mx-auto max-w-7xl px-0 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32">
            
            {/* Left: Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-12 md:space-y-16"
            >
              <div>
                <div className="inline-flex items-center gap-3 mb-8 bg-accent/5 px-6 py-2 rounded-full border border-accent/10">
                  <Sparkles size={14} className="text-accent" />
                  <span className="text-accent font-black uppercase tracking-[0.3em] text-[8px]">Client Relations</span>
                </div>
                <h2 className="text-4xl md:text-[5.5rem] font-sans font-black text-foreground mb-8 leading-[0.9] tracking-tighter">
                  We're Here <br />
                  <span className="text-accent italic drop-shadow-sm">for You.</span>
                </h2>
                <p className="text-foreground/50 text-base md:text-2xl leading-relaxed max-w-md font-medium">
                  Experience the soul of Indian heritage. Reach out for bespoke orders or technical flavor inquiries.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:gap-8">
                {[
                  { icon: Phone, title: "Direct Contact", value: "+91 86909 95060", link: "https://wa.me/918690995060", linkText: "Message on WhatsApp" },
                  { icon: Mail, title: "Our Registry", value: "info@rasvedamasala.com", link: "mailto:info@rasvedamasala.com", linkText: "Send Official Mail" },
                  { icon: Instagram, title: "Visual Journey", value: "@rasveda.2026", link: "https://www.instagram.com/rasveda.2026", linkText: "Follow the Esthetics" }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -5 }}
                    className="flex items-center gap-6 md:gap-8 p-8 md:p-10 bg-white rounded-[2.5rem] md:rounded-[3rem] border border-foreground/[0.03] shadow-premium group transition-all duration-500"
                  >
                    <div className="bg-primary/5 p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] text-primary group-hover:bg-accent group-hover:text-white transition-all duration-500">
                      <item.icon size={28} className="md:w-8 md:h-8" />
                    </div>
                    <div>
                      <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-foreground/20 mb-2">{item.title}</h4>
                      <p className="font-black text-lg md:text-2xl text-foreground mb-3 leading-none tracking-tight">{item.value}</p>
                      <a href={item.link} target="_blank" rel="noreferrer" className="text-accent font-black text-[11px] uppercase tracking-widest hover:opacity-70 transition-opacity inline-flex items-center gap-2">
                        {item.linkText} <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white p-10 md:p-20 rounded-[4rem] md:rounded-[5rem] shadow-premium-xl border border-foreground/[0.03] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 rounded-full -mr-24 -mt-24" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full -ml-16 -mb-16" />
              
              <div className="relative z-10">
                <h3 className="text-3xl md:text-5xl font-black tracking-tighter mb-10 md:mb-12">Inquiry Form</h3>
                <form className="space-y-8 md:space-y-10" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-3">
                    <label htmlFor="name" className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/30 ml-6">Your Legacy Name</label>
                    <Input id="name" placeholder="E.g. Rajesh Kumar" className="rounded-2xl border-foreground/[0.08] bg-[#FDFBF7] h-14 md:h-16 px-8 md:px-10 font-bold text-lg md:text-xl shadow-sm focus:ring-accent transition-all" />
                  </div>
                  
                  <div className="space-y-3">
                    <label htmlFor="phone" className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/30 ml-6">Digital Contact</label>
                    <Input id="phone" type="tel" placeholder="+91 86909 95060" className="rounded-2xl border-foreground/[0.08] bg-[#FDFBF7] h-14 md:h-16 px-8 md:px-10 font-bold text-lg md:text-xl shadow-sm focus:ring-accent transition-all" />
                  </div>
                  
                  <div className="space-y-3">
                    <label htmlFor="message" className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/30 ml-6">The Nature of Inquiry</label>
                    <Textarea id="message" placeholder="How can our heritage serve yours?" className="rounded-2xl md:rounded-3xl border-foreground/[0.08] bg-[#FDFBF7] p-8 md:p-10 font-bold min-h-[140px] md:min-h-[160px] text-lg md:text-xl shadow-sm focus:ring-accent transition-all resize-none" />
                  </div>
                  
                  <Button type="submit" size="lg" className="magnetic-hover w-full rounded-2xl bg-accent hover:bg-accent/95 text-white py-8 md:py-10 text-xl font-black shadow-xl transition-all active:scale-95 mt-10 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    Transmit Inquiry
                  </Button>
                  
                  <p className="text-[10px] text-center font-black uppercase tracking-[0.4em] text-foreground/20 italic mt-8">
                    * Our family typically responds within 4 business hours.
                  </p>
                </form>
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
