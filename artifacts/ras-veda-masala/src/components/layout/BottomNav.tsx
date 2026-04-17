import { Link, useLocation } from "wouter";
import { Home, ShoppingBag, BookOpen, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

export function BottomNav() {
  const [location] = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Shop", path: "/products", icon: ShoppingBag },
    { name: "Story", path: "/our-story", icon: BookOpen },
    { name: "Contact", path: "/contact", icon: MessageSquare },
  ];

  return (
    <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] w-[92%] max-w-sm">
      <div className="bg-white/80 backdrop-blur-2xl border border-white/40 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] rounded-[2rem] px-1.5 py-1.5 flex items-center justify-around relative overflow-hidden">
        {navItems.map((item) => {
          const isActive = location === item.path;
          return (
            <Link key={item.path} href={item.path} className="flex-1">
              <div className="relative group">
                <div className={`flex flex-col items-center py-1.5 transition-all duration-300 relative z-10 ${isActive ? "text-accent scale-105" : "text-foreground/30"}`}>
                  <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} className="mb-0.5" />
                  <span className={`text-[9px] font-black uppercase tracking-tight transition-all duration-300 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 h-0"}`}>
                    {item.name}
                  </span>
                </div>
                {isActive && (
                  <motion.div 
                    layoutId="nav-pill"
                    className="absolute inset-x-1 inset-y-1 bg-white/50 shadow-sm rounded-2xl -z-0"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
