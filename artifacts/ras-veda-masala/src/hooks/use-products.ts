import { useQuery } from "@tanstack/react-query";

export interface Product {
  id: number;
  name: string;
  desc: string;
  fullDesc?: string;
  price: number;
  pricePerGram: number;
  weight: string;
  category: string;
  image: string;
  badge: string;
  rating: number;
  highlights: string[];
  ingredients?: string[];
  nutritionFacts?: Record<string, string>;
  storageInstructions?: string;
}


export function useProducts() {
  return useQuery<Product[]>({
    queryKey: ["/api/products"],
  });
}

export function useProduct(id: number) {
  return useQuery<Product>({
    queryKey: [`/api/products/${id}`],
  });
}
