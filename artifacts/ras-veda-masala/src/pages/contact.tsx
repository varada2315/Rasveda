import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  return (
    <div className="min-h-screen pt-20 bg-background">
      {/* Hero */}
      <section className="relative h-[30vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-primary" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif text-white mb-4"
          >
            Get In Touch
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "60px" }}
            className="h-1 bg-accent mx-auto rounded-full"
          />
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Left: Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-serif mb-8 text-foreground">We'd love to hear from you</h2>
              <p className="text-muted-foreground mb-10 text-lg">
                Whether you have a question about our products, bulk orders, or just want to say hello, our team is ready to answer all your questions.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border border-border">
                  <div className="bg-primary/10 p-3 rounded-full text-primary mt-1">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-foreground mb-1">Phone / WhatsApp</h4>
                    <p className="text-muted-foreground mb-2">+91 99999 99999</p>
                    <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer" className="text-accent hover:underline text-sm font-medium">
                      Message on WhatsApp &rarr;
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border border-border">
                  <div className="bg-primary/10 p-3 rounded-full text-primary mt-1">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-foreground mb-1">Email</h4>
                    <p className="text-muted-foreground">info@rasvedamasala.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border border-border">
                  <div className="bg-primary/10 p-3 rounded-full text-primary mt-1">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-foreground mb-1">Address</h4>
                    <p className="text-muted-foreground">India</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border border-border">
                  <div className="bg-primary/10 p-3 rounded-full text-primary mt-1">
                    <Instagram size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-foreground mb-1">Instagram</h4>
                    <a href="https://www.instagram.com/rasveda.2026?igsh=MWJ5aWluczd5czUxeg%3D%3D&utm_source=qr" target="_blank" rel="noreferrer" className="text-accent hover:underline text-sm font-medium">
                      Follow @rasveda.2026 &rarr;
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white p-8 md:p-10 rounded-2xl shadow-md border border-border"
            >
              <h3 className="text-2xl font-serif mb-6 text-foreground">Send us a message</h3>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                  <Input id="name" placeholder="John Doe" className="w-full bg-background" />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                  <Input id="phone" type="tel" placeholder="+91 00000 00000" className="w-full bg-background" />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">Message</label>
                  <Textarea id="message" placeholder="How can we help you?" className="w-full bg-background min-h-[150px]" />
                </div>
                
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-white rounded-full py-6 text-lg">
                  Submit Message
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-4">
                  We'll get back to you within 24 hours.
                </p>
              </form>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}
