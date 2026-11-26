import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { ShoppingBag, X, Plus, Minus, Trash2 } from "lucide-react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

export function CartDrawer({ children }: { children: React.ReactNode }) {
  const { items, removeItem, updateQuantity, totalPrice, totalItems, isOpen, setIsOpen, closeCart } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0 border-l-0 sm:border-l">
        <SheetHeader className="p-6 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2 text-2xl font-black">
              <ShoppingBag className="text-accent" />
              Your Cart
              <span className="text-sm font-bold bg-accent/10 text-accent px-2.5 py-0.5 rounded-full ml-2">
                {totalItems}
              </span>
            </SheetTitle>
          </div>
        </SheetHeader>

        <div className="flex-grow overflow-y-auto p-6 scrollbar-hide">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 bg-[#FDFBF7] rounded-[2.5rem] flex items-center justify-center mb-8 shadow-premium text-foreground/5">
                <ShoppingBag size={40} />
              </div>
              <h3 className="text-2xl font-black mb-3 italic font-serif tracking-tighter">Your pantry is empty.</h3>
              <p className="text-foreground/40 text-[11px] max-w-[220px] mb-10 font-bold uppercase tracking-widest leading-loose">
                Looks like you haven't added any heritage to your kitchen yet.
              </p>
              <SheetTrigger asChild>
                <Button className="rounded-2xl px-12 py-8 bg-accent font-black shadow-premium-xl hover:shadow-accent/20 transition-all uppercase tracking-widest text-[10px]">
                  Start Exploring
                </Button>
              </SheetTrigger>
            </div>
          ) : (
            <div className="space-y-8">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={`${item.id}-${item.selectedWeight}`}
                    className="flex gap-6 p-5 rounded-[2.5rem] bg-white border border-foreground/[0.03] shadow-premium group relative"
                  >
                    <div className="w-24 h-24 shrink-0 bg-[#FDFBF7] rounded-3xl overflow-hidden p-3 border border-foreground/[0.03]">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain transition-transform group-hover:scale-110 duration-500" />
                    </div>
                    <div className="flex-grow min-w-0 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-black text-lg tracking-tight truncate pr-8 group-hover:text-accent transition-colors">{item.name}</h4>
                          <button 
                            onClick={() => removeItem(item.id, item.selectedWeight)}
                            className="absolute top-6 right-6 text-foreground/10 hover:text-red-500 transition-colors p-2"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        <p className="text-[10px] font-black text-accent uppercase tracking-[0.2em]">{item.selectedWeight}</p>
                      </div>
                      
                      <div className="flex justify-between items-end mt-4">
                        <div className="flex items-center gap-1 bg-secondary/30 rounded-2xl border border-foreground/[0.03] p-1.5 shadow-inner">
                          <button 
                            onClick={() => updateQuantity(item.id, item.selectedWeight, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-xl transition-all hover:shadow-sm"
                          >
                            <Minus size={14} className="text-foreground/40" />
                          </button>
                          <span className="w-8 text-center text-xs font-black tracking-tighter">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.selectedWeight, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-xl transition-all hover:shadow-sm"
                          >
                            <Plus size={14} className="text-foreground/40" />
                          </button>
                        </div>
                        <span className="font-serif font-black text-xl text-foreground">₹{item.price * item.quantity}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="flex-col sm:flex-col p-8 border-t border-foreground/[0.03] bg-white/60 backdrop-blur-2xl relative">
            <div className="space-y-4 w-full mb-8">
              <div className="flex justify-between items-center px-2">
                <span className="text-foreground/40 font-black text-[11px] uppercase tracking-[0.4em]">Heritage Total</span>
                <span className="text-3xl font-black tracking-tighter font-serif">₹{totalPrice}.00</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-green-600/70 bg-green-50/50 px-4 py-3 rounded-2xl border border-green-100">
                <span className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Express Shipping
                </span>
                <span>FREE INCL.</span>
              </div>
            </div>
            <Link href="/checkout" onClick={closeCart} className="w-full">
              <Button className="w-full rounded-[2rem] py-10 bg-primary hover:bg-primary/95 text-white text-xl font-black shadow-premium-xl transition-all active:scale-[0.98] relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                Review & Checkout
              </Button>
            </Link>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
