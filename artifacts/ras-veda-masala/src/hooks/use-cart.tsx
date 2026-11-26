import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { type Product } from "./use-products";
import { useToast } from "./use-toast";
import { Button } from "@/components/ui/button";

export interface CartItem extends Product {
  quantity: number;
  selectedWeight: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, weight: string, price: number) => void;
  removeItem: (productId: number, weight: string) => void;
  updateQuantity: (productId: number, weight: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }): React.ReactElement {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("rasveda-cart");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [isOpen, setIsOpen] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem("rasveda-cart", JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product, weight: string, price: number) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.selectedWeight === weight);
      
      const config = {
        title: existing ? "Increased quantity" : "Added to cart",
        description: existing 
          ? `${product.name} (${weight}) quantity increased.`
          : `${product.name} (${weight}) added to your cart.`,
        action: (
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-xl font-bold bg-white"
            onClick={() => setIsOpen(true)}
          >
            View Cart
          </Button>
        ),
      };

      toast(config);

      if (existing) {
        return prev.map((item) =>
          (item.id === product.id && item.selectedWeight === weight)
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, price, selectedWeight: weight, quantity: 1 }];
    });
  };

  const removeItem = (productId: number, weight: string) => {
    setItems((prev) => prev.filter((item) => !(item.id === productId && item.selectedWeight === weight)));
  };

  const updateQuantity = (productId: number, weight: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(productId, weight);
      return;
    }
    setItems((prev) =>
      prev.map((item) => 
        (item.id === productId && item.selectedWeight === weight) 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ 
        items, 
        addItem, 
        removeItem, 
        updateQuantity, 
        clearCart, 
        totalItems, 
        totalPrice, 
        isOpen, 
        setIsOpen,
        closeCart: () => setIsOpen(false)
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
