import { z } from "zod";

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


export const insertOrderSchema = z.object({
  customerName: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  address: z.string().min(1, "Address is required"),
  paymentId: z.string().optional(),
  items: z.array(z.object({
    productId: z.number(),
    quantity: z.number().min(1),
    weight: z.string()
  })),
  total: z.number()
});

export type InsertOrder = z.infer<typeof insertOrderSchema>;

export interface Order extends InsertOrder {
  id: number;
  status: string;
  createdAt: Date;
}
