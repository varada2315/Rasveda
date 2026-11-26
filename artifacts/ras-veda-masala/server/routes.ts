import type { Express } from "express";
import { storage } from "./storage";
import { insertOrderSchema } from "./types";
import { sendCustomerConfirmation, sendAdminNotification } from "./mailer";
import Razorpay from "razorpay";
import crypto from "crypto";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});

async function triggerOrderEmails(order: any) {
  try {
    const allProducts = await storage.getProducts();
    const detailedOrder = {
      ...order,
      items: order.items.map((item: any) => {
        const product = allProducts.find(p => p.id === item.productId);
        const weightVal = item.weight.toLowerCase().includes('kg') ? 1000 : parseInt(item.weight);
        return {
          ...item,
          name: product?.name || "Premium Spice",
          price: Math.round(weightVal * 0.225)
        };
      })
    };
    
    console.log(`Triggering emails for Order #${order.id}. Customer: ${order.email}, Admin: ${process.env.ADMIN_EMAIL || "rasvedamasala38@gmail.com"}`);
    await Promise.all([
      sendCustomerConfirmation(detailedOrder),
      sendAdminNotification(detailedOrder)
    ]);
    console.log(`Emails completed for Order #${order.id}`);
  } catch (error) {
    console.error("Email Trigger Error:", error);
  }
}

export function registerRoutes(app: Express) {
  app.get("/api/products", async (_req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const product = await storage.getProduct(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  // Razorpay Order Creation
  app.post("/api/payment/create-order", async (req, res) => {
    try {
      const { amount, orderDetails } = req.body;
      if (!amount) {
        return res.status(400).json({ message: "Amount is required" });
      }

      let internalOrderId: number | undefined;
      // If orderDetails are provided, create a pending order record
      if (orderDetails) {
        const result = insertOrderSchema.safeParse(orderDetails);
        if (result.success) {
          const order = await storage.createOrder(result.data);
          internalOrderId = order.id;
        }
      }

      const options = {
        amount: Math.round(amount * 100), // Amount in paise
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
        notes: {
          internalOrderId: internalOrderId?.toString() || ""
        }
      };

      const order = await razorpay.orders.create(options);
      res.json({ id: order.id, amount: order.amount, currency: order.currency, internalOrderId });
    } catch (error: any) {
      console.error("Razorpay Error:", error);
      res.status(500).json({ message: "Failed to create Razorpay order", error: error.message });
    }
  });

  app.post("/api/orders", async (req, res) => {
    try {
      const result = insertOrderSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid order data", errors: result.error.errors });
      }
      
      // Check if order already exists (paymentId check)
      if (req.body.paymentId) {
        const existingOrder = await storage.getOrderByPaymentId(req.body.paymentId);
        if (existingOrder) {
          return res.json(existingOrder);
        }
      }
      
      const order = await storage.createOrder(result.data);
      // We don't trigger emails here anymore, webhook handles it after capture
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  // Razorpay Webhook
  app.post("/api/webhooks/razorpay", async (req, res) => {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET || "rasveda_secret_123";
    const signature = req.headers["x-razorpay-signature"] as string;

    try {
      // Verify signature
      const shasum = crypto.createHmac("sha256", secret);
      shasum.update(JSON.stringify(req.body));
      const digest = shasum.digest("hex");

      if (signature !== digest) {
        console.error("Webhook Signature Verification Failed");
        return res.status(400).json({ message: "Invalid signature" });
      }

      const event = req.body.event;
      const payload = req.body.payload;

      console.log(`Webhook Received: ${event}`);

      if (event === "payment.captured") {
        const payment = payload.payment.entity;
        const internalOrderId = payment.notes?.internalOrderId || payment.description?.split('#').pop();
        
        if (internalOrderId) {
          const orderIdNum = parseInt(internalOrderId);
          if (!isNaN(orderIdNum)) {
             const updatedOrder = await storage.updateOrderStatus(orderIdNum, "paid", payment.id);
             if (updatedOrder) {
               console.log(`Payment captured for Order #${orderIdNum}. Triggering emails.`);
               await triggerOrderEmails(updatedOrder);
             }
          }
        } else {
          // Fallback: try to find by payment ID if notes missing
          const existingOrder = await storage.getOrderByPaymentId(payment.id);
          if (existingOrder && existingOrder.status !== "paid") {
            const updatedOrder = await storage.updateOrderStatus(existingOrder.id, "paid");
            if (updatedOrder) await triggerOrderEmails(updatedOrder);
          }
        }
      } else if (event === "payment.failed") {
        const payment = payload.payment.entity;
        const internalOrderId = payment.notes?.internalOrderId;
        if (internalOrderId) {
          const orderIdNum = parseInt(internalOrderId);
          if (!isNaN(orderIdNum)) {
            await storage.updateOrderStatus(orderIdNum, "failed", payment.id);
            console.log(`Payment failed for Order #${orderIdNum}`);
          }
        }
      }

      res.status(200).json({ status: "ok" });
    } catch (error) {
      console.error("Webhook Error:", error);
      res.status(500).json({ status: "error" });
    }
  });
}
