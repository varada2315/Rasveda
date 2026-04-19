import { type Product, type InsertOrder, type Order } from "./types";

export interface IStorage {
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
}

export class MemStorage implements IStorage {
  private products: Map<number, Product>;
  private orders: Map<number, Order>;
  private orderId: number = 1;

  constructor() {
    this.products = new Map();
    this.orders = new Map();
    
    // Initial products matching reference site categories
    const initialProducts: Product[] = [
      {
        id: 1,
        name: "Red Chilli Powder",
        desc: "Bold, fiery, and aromatic. Made from sun-dried red chillies for authentic heat and vibrant colour.",
        fullDesc: "Our RasVeda Red Chilli Powder is crafted from carefully selected chillies, freshly dried and finely ground to deliver the perfect heat, vibrant color, and authentic Indian flavor in every dish.",
        price: 59,
        weight: "100g",
        category: "Powders",
        image: "/images/products/red-chilli.png",
        badge: "Best Seller",
        rating: 4.9,
        highlights: ["Lab Tested", "Pure & Natural", "No Artificial Colors", "Finely Ground"],
        ingredients: ["Red Chilli"],
        nutritionFacts: {
          "Calories": "435 kcal",
          "Total Fat": "19.33 g",
          "Saturated Fat": "2.86 g",
          "Polyunsaturated Fat": "9.36 g",
          "Monounsaturated Fat": "2.30 g",
          "Trans Fat": "0.0 g",
          "Cholesterol": "0.0 mg",
          "Sodium": "401 mg",
          "Total Carbohydrates": "51.14 g",
          "Dietary Fibre": "31.07 g",
          "Sugar": "6.86 g",
          "Protein": "14.12 g",
          "Vitamin A": "128 μg",
          "Vitamin C": "46.6 mg",
          "Calcium": "170 mg"
        },
        storageInstructions: "Store in a cool, dry place away from direct sunlight and moisture. Once opened, transfer to an airtight container to retain freshness."
      },
      {
        id: 2,
        name: "Turmeric Powder",
        desc: "Pure, golden turmeric powder. Rich in curcumin, sourced from the finest farms.",
        fullDesc: "Our RasVeda Turmeric Powder is made from premium turmeric roots, finely ground to enrich your food with vibrant color and natural goodness.",
        price: 59,
        weight: "100g",
        category: "Powders",
        image: "/images/products/turmeric.png",
        badge: "Pure & Fresh",
        rating: 5.0,
        highlights: ["High Curcumin", "Lab Tested", "Pure & Natural", "Finely Ground"],
        ingredients: ["Turmeric Powder"],
        nutritionFacts: {
          "Calories": "352 kcal",
          "Total Fat": "3.33 g",
          "Saturated Fat": "1.49 g",
          "Polyunsaturated Fat": "0.24 g",
          "Monounsaturated Fat": "0.73 g",
          "Trans Fat": "0.0 g",
          "Cholesterol": "0.0 mg",
          "Sodium": "85 mg",
          "Total Carbohydrates": "72.82 g",
          "Dietary Fibre": "19.32 g",
          "Sugar": "0.0 g",
          "Protein": "6.89 g",
          "Vitamin A": "2.70 μg",
          "Vitamin C": "14.12 mg",
          "Calcium": "146 mg"
        },
        storageInstructions: "Store in a cool, dry place away from direct sunlight and moisture. Once opened, transfer to an airtight container to retain freshness."
      },
      {
        id: 3,
        name: "Coriander Powder",
        desc: "Freshly ground coriander seeds with a subtle citrus aroma. The backbone of Indian cooking.",
        fullDesc: "Our RasVeda Coriander Powder is made from handpicked coriander seeds, roasted and ground to give your dishes a fresh, aromatic taste.",
        price: 59,
        weight: "100g",
        category: "Powders",
        image: "/images/products/coriander.png",
        badge: "Aromatic",
        rating: 4.8,
        highlights: ["Stone-ground", "Lab Tested", "Pure & Natural", "Finely Ground"],
        ingredients: ["Coriander Powder"],
        nutritionFacts: {
          "Calories": "209 kcal",
          "Total Fat": "13.0 g",
          "Saturated Fat": "1.0 g",
          "Polyunsaturated Fat": "4.0 g",
          "Monounsaturated Fat": "8.0 g",
          "Trans Fat": "0.0 g",
          "Cholesterol": "0.0 mg",
          "Sodium": "29 mg",
          "Total Carbohydrates": "35.0 g",
          "Dietary Fibre": "24.0 g",
          "Sugar": "0.0 g",
          "Protein": "13.0 g",
          "Vitamin A": "1.0 μg",
          "Vitamin C": "7.0 mg",
          "Calcium": "74 mg"
        },
        storageInstructions: "Store in a cool, dry place away from direct sunlight and moisture. Once opened, transfer to an airtight container to retain freshness."
      }
    ];


    initialProducts.forEach(p => this.products.set(p.id, p));
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.orderId++;
    const order: Order = { ...insertOrder, id, status: "pending", createdAt: new Date() };
    this.orders.set(id, order);
    return order;
  }
}

export const storage = new MemStorage();
