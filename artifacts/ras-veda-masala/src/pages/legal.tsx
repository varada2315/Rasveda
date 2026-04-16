import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-background">
      <div className="container mx-auto px-4 max-w-3xl bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-border">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-accent mb-8 transition-colors">
          <ArrowLeft size={16} className="mr-2" /> Back to Home
        </Link>
        <h1 className="text-3xl md:text-4xl font-serif mb-8 text-foreground">Privacy Policy</h1>
        
        <div className="prose prose-stone max-w-none text-foreground/80">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h3>1. Information We Collect</h3>
          <p>We collect information you provide directly to us when you fill out a form, communicate with us via third-party platforms, or make a purchase. This may include your name, email address, phone number, shipping address, and payment information.</p>
          
          <h3>2. How We Use Your Information</h3>
          <p>We use the information we collect to process transactions, communicate with you about orders, provide customer support, and send promotional communications if you have opted in to receive them.</p>
          
          <h3>3. Information Sharing</h3>
          <p>We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties except trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.</p>
          
          <h3>4. Data Security</h3>
          <p>We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information.</p>
          
          <h3>5. Contact Us</h3>
          <p>If you have questions about this Privacy Policy, please contact us at info@rasvedamasala.com.</p>
        </div>
      </div>
    </div>
  );
}

export function Terms() {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-background">
      <div className="container mx-auto px-4 max-w-3xl bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-border">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-accent mb-8 transition-colors">
          <ArrowLeft size={16} className="mr-2" /> Back to Home
        </Link>
        <h1 className="text-3xl md:text-4xl font-serif mb-8 text-foreground">Terms & Conditions</h1>
        
        <div className="prose prose-stone max-w-none text-foreground/80">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h3>1. Agreement to Terms</h3>
          <p>By accessing or using our website, you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, then you may not access the website.</p>
          
          <h3>2. Products and Pricing</h3>
          <p>All products are subject to availability, and we reserve the right to impose quantity limits on any order, to reject all or part of an order, and to discontinue products without notice. Prices for our products are subject to change without notice.</p>
          
          <h3>3. Accuracy of Information</h3>
          <p>We attempt to be as accurate as possible when describing our products on the website; however, we do not warrant that the product descriptions, colors, information or other content available on the website are accurate, complete, reliable, current, or error-free.</p>
          
          <h3>4. Liability</h3>
          <p>Ras Veda Masala shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our products.</p>
          
          <h3>5. Governing Law</h3>
          <p>These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
        </div>
      </div>
    </div>
  );
}

export function RefundPolicy() {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-background">
      <div className="container mx-auto px-4 max-w-3xl bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-border">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-accent mb-8 transition-colors">
          <ArrowLeft size={16} className="mr-2" /> Back to Home
        </Link>
        <h1 className="text-3xl md:text-4xl font-serif mb-8 text-foreground">Refund Policy</h1>
        
        <div className="prose prose-stone max-w-none text-foreground/80">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h3>1. Return Window</h3>
          <p>We offer a 7-day return window for products that are damaged, defective, or incorrect. If 7 days have gone by since your purchase delivery, unfortunately, we cannot offer you a refund or exchange.</p>
          
          <h3>2. Eligibility for Returns</h3>
          <p>To be eligible for a return, your item must be unused, in the original packaging, and in the same condition that you received it. Due to the nature of our food products, we cannot accept returns for opened packets.</p>
          
          <h3>3. Process for Returns</h3>
          <p>To initiate a return or refund, please contact us via WhatsApp at +91 99999 99999 or email us at info@rasvedamasala.com with your order details and photos of the defective/damaged product.</p>
          
          <h3>4. Refunds</h3>
          <p>Once your return is received and inspected, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within 5-7 business days.</p>
        </div>
      </div>
    </div>
  );
}
