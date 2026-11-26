
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.in",
  port: 587,
  secure: false, // Use STARTTLS
  auth: {
    user: process.env.SMTP_USER || "info@rasvedamasala.com",
    pass: process.env.SMTP_PASS || "TnSw5E1j46Bt",
  },
});

async function testEmail() {
  console.log("Attempting to send test email via Port 587...");
  
  const mailOptions = {
    from: `"RasVeda Test" <info@rasvedamasala.com>`,
    to: `rasvedamasala38@gmail.com`,
    subject: `Test Order Notification (Port 587)`,
    text: "This is a test email to verify SMTP configuration on port 587.",
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
  } catch (error) {
    console.error("Email Error:", error);
  }
}

testEmail();
