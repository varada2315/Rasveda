import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Search, User, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import logoSrc from "@assets/97D0136F-0302-4915-9996-773881FEAA46_-_G.P_SUNIL_KUMAR-removeb_1776337046889.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Our Story", path: "/our-story" },
  { name: "Products", path: "/products" },
  { name: "Contact Us", path: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20 py-2" 
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 z-50 group">
            <div className="relative">
              <img 
                src={logoSrc} 
                alt="Ras Veda Masala" 
                className={`transition-all duration-500 object-contain ${
                  isScrolled ? "h-10 md:h-14" : "h-13 md:h-20"
                } group-hover:scale-105`} 
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`font-bold tracking-tight text-sm transition-all hover:text-accent relative group ${
                  location === link.path 
                    ? "text-accent" 
                    : isScrolled ? "text-foreground/80" : "text-white"
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-2 left-0 h-0.5 bg-accent transition-all duration-300 ${location === link.path ? "w-full" : "w-0 group-hover:w-full"}`}></span>
              </Link>
            ))}
            <div className="flex items-center gap-6 ml-4 border-l pl-10 border-foreground/10">
              <button className={`transition-colors h-6 w-6 ${isScrolled ? "text-foreground" : "text-white"} hover:text-accent`}>
                <Search size={22} strokeWidth={2.5} />
              </button>
              <button className={`transition-colors h-6 w-6 ${isScrolled ? "text-foreground" : "text-white"} hover:text-accent`}>
                <User size={22} strokeWidth={2.5} />
              </button>
              <Link href="/products">
                <Button size="sm" className="bg-accent hover:bg-accent/90 text-white rounded-full px-6 py-5 font-bold shadow-lg shadow-accent/20">
                  Shop Now
                </Button>
              </Link>
            </div>
          </nav>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 md:hidden z-50">
            <button className={`p-2 transition-colors ${mobileMenuOpen ? "text-foreground" : isScrolled ? "text-foreground" : "text-white"}`}>
              <Search size={22} />
            </button>
            <button 
              className={`p-2 transition-colors ${mobileMenuOpen ? "text-foreground" : isScrolled ? "text-foreground" : "text-white"}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-40 flex flex-col p-8 pt-24"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-4xl font-black transition-all ${
                      location === link.path ? "text-accent" : "text-foreground/40"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto flex flex-col gap-6">
              <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="w-full">
                <Button size="lg" className="w-full bg-accent text-white rounded-2xl py-8 text-xl font-black shadow-xl">
                  Start Shopping
                </Button>
              </Link>
              <div className="flex justify-center gap-10 py-6 border-t border-muted">
                <Search size={24} className="text-foreground/60" />
                <User size={24} className="text-foreground/60" />
                <ShoppingBag size={24} className="text-foreground/60" />
              </div>
            </div>
            
            <div className="absolute top-10 left-10 opacity-[0.03] pointer-events-none">
              <img src={logoSrc} alt="" className="h-60" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
