import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Search, User, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CartDrawer } from "./CartDrawer";
import { useCart } from "@/hooks/use-cart";
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
  const { totalItems } = useCart();

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
          ? "glass-navbar py-2 shadow-premium" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 z-50 group">
            <div className="relative">
              <img 
                src={logoSrc} 
                alt="Ras Veda Masala" 
                className={`transition-all duration-700 object-contain ${
                  isScrolled ? "h-12 md:h-18" : "h-20 md:h-32"
                } group-hover:scale-110 drop-shadow-2xl`} 
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`font-black uppercase tracking-[0.15em] text-[11px] transition-all hover:text-accent relative group ${
                  location === link.path 
                    ? "text-accent" 
                    : isScrolled ? "text-foreground/80" : "text-white"
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-2 left-0 h-0.5 bg-accent transition-all duration-500 ${location === link.path ? "w-full" : "w-0 group-hover:w-full"}`}></span>
              </Link>
            ))}
            <div className="flex items-center gap-8 ml-4 border-l pl-12 border-foreground/10">
              <button className={`magnetic-hover transition-colors h-6 w-6 ${isScrolled ? "text-foreground" : "text-white"} hover:text-accent`}>
                <Search size={22} strokeWidth={2.5} />
              </button>
              <button className={`magnetic-hover transition-colors h-6 w-6 ${isScrolled ? "text-foreground" : "text-white"} hover:text-accent`}>
                <User size={22} strokeWidth={2.5} />
              </button>
              <CartDrawer>
                <button className={`magnetic-hover transition-colors h-6 w-6 relative ${isScrolled ? "text-foreground" : "text-white"} hover:text-accent`}>
                  <ShoppingBag size={22} strokeWidth={2.5} />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-accent text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in duration-300 shadow-lg">
                      {totalItems}
                    </span>
                  )}
                </button>
              </CartDrawer>
              <Link href="/products">
                <Button size="sm" className="magnetic-hover bg-accent hover:bg-accent/90 text-white rounded-full px-8 py-6 font-black uppercase tracking-widest text-[10px] shadow-xl shadow-accent/20 border-b-4 border-accent-border active:border-b-0 active:translate-y-1 transition-all">
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
            <CartDrawer>
              <button className={`p-2 transition-colors relative ${mobileMenuOpen ? "text-foreground" : isScrolled ? "text-foreground" : "text-white"}`}>
                <ShoppingBag size={22} />
                {totalItems > 0 && (
                  <span className="absolute top-1 right-1 bg-accent text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white">
                    {totalItems}
                  </span>
                )}
              </button>
            </CartDrawer>
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
                <CartDrawer>
                  <button className="relative">
                    <ShoppingBag size={24} className="text-foreground/60" />
                    {totalItems > 0 && (
                      <span className="absolute -top-1 -right-1 bg-accent text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                        {totalItems}
                      </span>
                    )}
                  </button>
                </CartDrawer>
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
