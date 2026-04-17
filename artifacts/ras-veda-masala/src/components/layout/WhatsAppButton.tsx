import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919999999999"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-28 right-4 md:bottom-8 md:right-8 z-[55] bg-[#25D366] text-white p-3.5 md:p-4 rounded-full shadow-[0_10px_25px_-5px_rgba(37,211,102,0.4)] hover:scale-110 hover:shadow-xl transition-all duration-300 flex items-center justify-center font-bold group"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle size={24} className="md:w-7 md:h-7 group-hover:rotate-12 transition-transform" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-500 whitespace-nowrap text-sm hidden md:inline">
        Chat with us
      </span>
    </a>
  );
}
