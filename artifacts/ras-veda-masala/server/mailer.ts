import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.in",
  port: 465,
  secure: true, // SSL recommended
  auth: {
    user: process.env.SMTP_USER || "info@rasvedamasala.com",
    pass: process.env.SMTP_PASS || "TnSw5E1j46Bt",
  },
});

// Admin Email Notification
export async function sendAdminNotification(orderDetails: any) {
  const { customerName, email, phone, items, total, address, id, paymentId } = orderDetails;

  const itemsHtml = items.map((item: any) => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name || 'Product'} (${item.weight})</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">₹${item.price * item.quantity}</td>
    </tr>
  `).join("");

  const adminEmail = process.env.ADMIN_EMAIL || "rasvedamasala38@gmail.com";

  const mailOptions = {
    from: `"RasVeda Masala" <info@rasvedamasala.com>`,
    to: adminEmail,
    subject: `New Order Received: #${id} - ${customerName}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #25D366; border-radius: 12px;">
        <h1 style="color: #25D366; margin-top: 0;">New Order for Delivery</h1>
        <p>A new order has been paid and verified. Please prepare for dispatch.</p>
        
        <div style="background: #fdfbf7; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #eee;">
          <h3 style="margin-top: 0; color: #333;">Customer Details:</h3>
          <p><strong>Name:</strong> ${customerName}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Payment ID:</strong> ${paymentId || 'Verified'}</p>
        </div>

        <div style="background: #fdfbf7; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #eee;">
          <h3 style="margin-top: 0; color: #333;">Shipping Address:</h3>
          <p style="white-space: pre-line; font-size: 16px;">${address}</p>
        </div>
        
        <h3>Items to Pack:</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="background: #eee;">
            <th style="padding: 10px; text-align: left;">Item</th>
            <th style="padding: 10px; text-align: center;">Qty</th>
            <th style="padding: 10px; text-align: right;">Subtotal</th>
          </tr>
          ${itemsHtml}
          <tr>
            <td colspan="2" style="padding: 10px; font-weight: bold; text-align: right;">Grand Total:</td>
            <td style="padding: 10px; font-weight: bold; text-align: right; color: #25D366; font-size: 18px;">₹${total}</td>
          </tr>
        </table>
      </div>
    `,
  };

  try {
    console.log(`Sending Admin Notification to: ${adminEmail} for Order #${id}`);
    const info = await transporter.sendMail(mailOptions);
    console.log("Admin Notification Sent:", info.messageId);
  } catch (error) {
    console.error("Admin Email Error:", error);
  }
}

// Customer Confirmation Email
export async function sendCustomerConfirmation(orderDetails: any) {
  const { customerName, email, items, total, id } = orderDetails;

  const mailOptions = {
    from: `"RasVeda Masala" <info@rasvedamasala.com>`,
    to: email,
    subject: `Order Confirmed! Your Heritage Spices are on the way 🌿`,
    html: `
      <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #f0f0f0; border-radius: 16px; background: #fff;">
        <div style="text-align: center; margin-bottom: 40px;">
          <h1 style="color: #25D366; font-size: 32px; margin: 0;">Namaste, ${customerName}</h1>
          <p style="color: #666; font-size: 18px; margin-top: 10px;">Your payment of <strong>₹${total}</strong> was successful.</p>
        </div>
        
        <div style="text-align: center; margin-bottom: 40px;">
          <p style="font-size: 18px; line-height: 1.6; color: #333;">
            Thank you for bringing <strong>RasVeda</strong> into your kitchen. Your selection of heritage spices is now being hand-packed by our master blenders.
          </p>
        </div>

        <div style="background: #FDFBF7; padding: 25px; border-radius: 12px; border: 1px dashed #25D366; margin: 30px 0;">
          <h4 style="margin: 0 0 15px 0; text-transform: uppercase; letter-spacing: 2px; font-size: 11px; color: #25D366;">What happens next?</h4>
          <ul style="padding-left: 20px; color: #555; line-height: 1.8;">
            <li>Your spices go through a final purity check.</li>
            <li>We hand-seal your heritage packets for maximum aroma.</li>
            <li>You'll receive a tracking ID as soon as they leave our heritage facility.</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin-top: 40px; border-top: 1px solid #eee; padding-top: 30px;">
          <p style="color: #999; font-size: 14px;">Order Reference: #${id}</p>
          <p style="color: #25D366; font-weight: bold; margin-top: 20px;">Join our Community</p>
          <p style="font-size: 12px; color: #aaa;">Scan the QR code on our website to share your recipes!</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Customer Confirmation Sent");
  } catch (error) {
    console.error("Customer Email Error:", error);
  }
}
