import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Instagram, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Hero */}
      <section className="relative h-[35dvh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-primary" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-[#FDFBF7]/0" />
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <span className="bg-accent text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] mb-4 inline-block shadow-xl">
              Get in Touch
            </span>
            <h1 className="text-4xl md:text-8xl font-sans font-black text-white mb-4 tracking-tighter leading-tight">
              Let's <span className="text-accent italic uppercase">Connect</span>
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-6">
        <div className="container mx-auto max-w-6xl px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
            
            {/* Left: Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-10 md:space-y-12"
            >
              <div>
                <h2 className="text-3xl md:text-6xl font-sans font-black text-foreground mb-4 md:mb-6 leading-tight">
                  We're Here for <span className="text-accent italic">You.</span>
                </h2>
                <p className="text-foreground/60 text-base md:text-xl leading-relaxed">
                  Have questions about our traditional blends or bulk orders? Reach out and start a conversation.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:gap-6">
                {[
                  { icon: Phone, title: "Call / WhatsApp", value: "+91 99999 99999", link: "https://wa.me/919999999999", linkText: "Message us" },
                  { icon: Mail, title: "Email", value: "info@rasvedamasala.com", link: "mailto:info@rasvedamasala.com", linkText: "Send email" },
                  { icon: Instagram, title: "Instagram", value: "@rasveda.2026", link: "https://www.instagram.com/rasveda.2026", linkText: "Follow journey" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-5 md:gap-6 p-6 md:p-8 bg-white rounded-[1.5rem] md:rounded-[2rem] border border-foreground/5 shadow-sm hover:shadow-xl transition-all group">
                    <div className="bg-primary/5 p-3 md:p-4 rounded-xl md:rounded-2xl text-primary group-hover:bg-accent group-hover:text-white transition-all">
                      <item.icon size={24} className="md:w-7 md:h-7" />
                    </div>
                    <div>
                      <h4 className="font-black text-[9px] md:text-[10px] uppercase tracking-widest text-foreground/30 mb-0.5 md:mb-1">{item.title}</h4>
                      <p className="font-black text-base md:text-lg text-foreground mb-1.5 md:mb-2 leading-none">{item.value}</p>
                      <a href={item.link} target="_blank" rel="noreferrer" className="text-accent font-bold text-[10px] md:text-xs hover:underline inline-flex items-center gap-1">
                        {item.linkText} &rarr;
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 md:p-14 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl border border-foreground/5 relative"
            >
              <div className="absolute -top-6 -right-4 bg-accent p-3.5 rounded-2xl text-white shadow-xl rotate-12 hidden md:block">
                <Sparkles size={20} />
              </div>
              
              <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-6 md:mb-8">Send a Message</h3>
              <form className="space-y-5 md:space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-1.5 md:space-y-2">
                  <label htmlFor="name" className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-4">Full Name</label>
                  <Input id="name" placeholder="E.g. Rajesh Kumar" className="rounded-xl md:rounded-2xl border-foreground/5 bg-[#FDFBF7] py-6 md:py-7 px-5 md:px-6 font-bold text-sm md:text-base" />
                </div>
                
                <div className="space-y-1.5 md:space-y-2">
                  <label htmlFor="phone" className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-4">Phone Number</label>
                  <Input id="phone" type="tel" placeholder="+91 00000 00000" className="rounded-xl md:rounded-2xl border-foreground/5 bg-[#FDFBF7] py-6 md:py-7 px-5 md:px-6 font-bold text-sm md:text-base" />
                </div>
                
                <div className="space-y-1.5 md:space-y-2">
                  <label htmlFor="message" className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-4">Message</label>
                  <Textarea id="message" placeholder="How can we help you?" className="rounded-2xl md:rounded-3xl border-foreground/5 bg-[#FDFBF7] p-5 md:p-6 font-bold min-h-[120px] md:min-h-[150px] text-sm md:text-base" />
                </div>
                
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-white rounded-xl md:rounded-2xl py-6 md:py-8 text-lg md:text-xl font-black shadow-2xl transition-all active:scale-95 mt-4">
                  Send Message
                </Button>
                <p className="text-[9px] md:text-[10px] text-center font-bold text-foreground/20 italic mt-6">
                  * We typically respond within 2-4 business hours.
                </p>
              </form>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Spacing for BottomNav */}
      <div className="h-32 md:hidden" />
    </div>
  );
}
