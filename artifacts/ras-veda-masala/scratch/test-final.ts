import { sendOrderEmail } from "../server/mailer";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

async function runTest() {
  console.log("Starting FINAL Test using mailer.ts logic...");
  
  const testOrder = {
    id: "FINAL-TEST",
    customerName: "Nikhil",
    email: "n4nikhilkana@gmail.com",
    items: [{ name: "Red Chilli Powder", weight: "100g", quantity: 1, price: 23 }],
    total: 23,
    address: "Test Address",
    status: "verified"
  };

  try {
    const result = await sendOrderEmail(testOrder);
    console.log("✅ SUCCESS!");
    console.log(result);
  } catch (error: any) {
    console.error("❌ FAILED");
    console.error(error);
  }
}

runTest();
