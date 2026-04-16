import { Link } from "wouter";
import { Instagram } from "lucide-react";
import logoSrc from "@assets/97D0136F-0302-4915-9996-773881FEAA46_-_G.P_SUNIL_KUMAR_1776336685690.png";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8 border-t-[6px] border-accent">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-block bg-white rounded-lg p-2 mb-6">
              <img src={logoSrc} alt="Ras Veda Masala" className="h-16 object-contain" />
            </Link>
            <p className="font-serif italic text-xl text-accent mb-2">Shuddh Swad, Asli Pehchaan</p>
            <p className="text-primary-foreground/80 text-sm tracking-widest uppercase mb-6">
              AROMA | PURE INGREDIENTS | TRUSTED QUALITY
            </p>
            <p className="text-primary-foreground/90 max-w-md">
              Bringing the authentic taste and rich aroma of traditional Indian spices right to your kitchen. Crafted with love, grounded in heritage.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-xl mb-6 text-white ornament-line">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
              <li><Link href="/our-story" className="hover:text-accent transition-colors">Our Story</Link></li>
              <li><Link href="/products" className="hover:text-accent transition-colors">Products</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-xl mb-6 text-white ornament-line">Legal</h4>
            <ul className="space-y-3 mb-8">
              <li><Link href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-accent transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/refund" className="hover:text-accent transition-colors">Refund Policy</Link></li>
            </ul>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/rasveda.2026?igsh=MWJ5aWluczd5czUxeg%3D%3D&utm_source=qr" 
                target="_blank" 
                rel="noreferrer"
                className="bg-primary-foreground/10 p-3 rounded-full hover:bg-accent hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/60">
          <p>&copy; {currentYear} Ras Veda Masala. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
