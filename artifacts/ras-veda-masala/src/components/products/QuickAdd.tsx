import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, ShoppingBag, ChevronDown } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useLocation } from "wouter";
import { type Product } from "@/hooks/use-products";

interface QuickAddProps {
  product: Product;
  variant?: "default" | "buyNow";
}

export function QuickAdd({ product, variant = "default" }: QuickAddProps) {
  const { addItem } = useCart();
  const [, setLocation] = useLocation();

  const isSample = product.price === 1;

  const weightOptions = [
    { label: "50g", weight: 50 },
    { label: "100g", weight: 100 },
    { label: "200g", weight: 200 },
    { label: "500g", weight: 500 },
    { label: "1kg", weight: 1000 },
  ];

  const getPrice = (weight: number) => isSample ? 1 : Math.round(weight * (product.pricePerGram || 0.225));

  const handleSelect = (option: { label: string; weight: number }) => {
    const price = getPrice(option.weight);
    addItem(product, isSample ? "1g" : option.label, price);
    if (variant === "buyNow") {
      setLocation("/checkout");
    }
  };

  // Direct Add for Samples (No Dropdown)
  if (isSample) {
    return (
      <Button 
        onClick={() => handleSelect({ label: "1g", weight: 1 })}
        className="magnetic-hover rounded-2xl bg-primary hover:bg-primary/95 text-white px-6 md:px-8 p-4 md:p-5 font-black shadow-lg transition-all active:scale-95 flex items-center gap-2 text-xs md:text-sm group"
      >
        <ShoppingBag size={16} />
        {variant === "buyNow" ? "Buy Sample" : "Get Sample"}
      </Button>
    );
  }

  if (variant === "buyNow") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            className="magnetic-hover rounded-2xl bg-primary hover:bg-primary/95 text-white px-6 md:px-8 p-4 md:p-5 font-black shadow-lg transition-all active:scale-95 flex items-center gap-2 text-xs md:text-sm group"
          >
            <ShoppingBag size={16} />
            Buy Now
            <ChevronDown size={14} className="opacity-40 group-hover:opacity-100 transition-opacity" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="rounded-2xl p-2 min-w-[160px] shadow-2xl border-foreground/5 bg-white/95 backdrop-blur-xl">
          <p className="text-[9px] font-black uppercase tracking-widest text-foreground/30 px-3 py-2">Select Weight</p>
          {weightOptions.map((option) => (
            <DropdownMenuItem 
              key={option.label}
              onClick={() => handleSelect(option)}
              className="rounded-xl px-4 py-3 cursor-pointer hover:bg-accent hover:text-white transition-colors flex justify-between items-center group/item"
            >
              <span className="font-black">{option.label}</span>
              <span className="text-xs opacity-40 group-hover/item:opacity-100">₹{getPrice(option.weight)}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline"
          className="magnetic-hover rounded-2xl border-primary/20 hover:bg-primary/5 text-primary p-4 md:p-5 font-black transition-all active:scale-95 flex items-center gap-1 group"
          title="Add to Cart"
        >
          <Plus size={18} />
          <ChevronDown size={12} className="opacity-0 group-hover:opacity-40 transition-all -ml-1 group-hover:ml-0.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-2xl p-2 min-w-[160px] shadow-2xl border-foreground/5 bg-white/95 backdrop-blur-xl">
        <p className="text-[9px] font-black uppercase tracking-widest text-foreground/30 px-3 py-2">Add to Cart</p>
        {weightOptions.map((option) => (
          <DropdownMenuItem 
            key={option.label}
            onClick={() => handleSelect(option)}
            className="rounded-xl px-4 py-3 cursor-pointer hover:bg-accent hover:text-white transition-colors flex justify-between items-center group/item"
          >
            <span className="font-black">{option.label}</span>
            <span className="text-xs opacity-40 group-hover/item:opacity-100">₹{getPrice(option.weight)}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
