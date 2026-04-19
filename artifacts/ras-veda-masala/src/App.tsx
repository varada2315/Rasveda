import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import ScrollToTop from "@/components/layout/ScrollToTop";

import Home from "@/pages/home";
import OurStory from "@/pages/our-story";
import Products from "@/pages/products";
import ProductDetail from "@/pages/product-detail";
import Contact from "@/pages/contact";
import Checkout from "@/pages/checkout";
import { PrivacyPolicy, Terms, RefundPolicy } from "@/pages/legal";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/our-story" component={OurStory} />
          <Route path="/products" component={Products} />
          <Route path="/product/:id" component={ProductDetail} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/contact" component={Contact} />
          <Route path="/privacy" component={PrivacyPolicy} />
          <Route path="/terms" component={Terms} />
          <Route path="/refund" component={RefundPolicy} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <BottomNav />
      <WhatsAppButton />
    </div>
  );
}

import { CartProvider } from "@/hooks/use-cart";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
