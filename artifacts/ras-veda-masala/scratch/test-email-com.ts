
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER || "info@rasvedamasala.com",
    pass: process.env.SMTP_PASS || "TnSw5E1j46Bt",
  },
});

async function testEmail() {
  console.log("Attempting to send test email via smtp.zoho.com...");
  
  const mailOptions = {
    from: `"RasVeda Test" <info@rasvedamasala.com>`,
    to: `rasvedamasala38@gmail.com`,
    subject: `Test Order Notification (zoho.com)`,
    text: "This is a test email to verify SMTP configuration on zoho.com.",
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
  } catch (error) {
    console.error("Email Error:", error);
  }
}

testEmail();
