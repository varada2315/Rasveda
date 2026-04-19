import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { ShoppingBag, CreditCard, CheckCircle2, Loader2, ArrowLeft, BadgeCheck, User, ChevronDown } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { Link } from "wouter";

const formSchema = z.object({
  customerName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  address: z.string().min(10, "Full address is required"),
  phone: z.string().min(10, "Valid phone number is required"),
});

// Razorpay key from provided credentials
const RA_KEY_ID = "rzp_test_SetXaPlwZRBFpv";

export default function Checkout() {
  const { toast } = useToast();
  const { items, totalPrice, clearCart } = useCart();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showMobileSummary, setShowMobileSummary] = useState(false);
  const [paymentId, setPaymentId] = useState<string | null>(null);

  // Load Razorpay Script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const nextStep = async () => {
    const fields = currentStep === 1 
      ? ["customerName", "email", "phone"] 
      : ["address"];
    
    //@ts-ignore
    const isValid = await form.trigger(fields);
    if (isValid) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      email: "",
      address: "",
      phone: "",
    },
  });

  async function handlePayment(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      // 1. Create Razorpay Order
      const res = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalPrice }),
      });

      if (!res.ok) throw new Error("Failed to initialize payment");
      const orderData = await res.json();

      // 2. Open Razorpay Modal
      const options = {
        key: RA_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "RasVeda Masala",
        description: "Heritage Spice Collection",
        order_id: orderData.id,
        handler: async (response: any) => {
          setPaymentId(response.razorpay_payment_id);
          // 3. Complete the order in our database
          await submitFinalOrder(values, response.razorpay_payment_id);
        },
        prefill: {
          name: values.customerName,
          email: values.email,
          contact: values.phone,
        },
        theme: {
          color: "#19662D", // Primary green
        },
        modal: {
          ondismiss: () => setIsSubmitting(false),
        }
      };

      const rzp1 = new (window as any).Razorpay(options);
      rzp1.open();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Payment Error",
        description: error.message || "Failed to initialize payment flow.",
      });
      setIsSubmitting(false);
    }
  }

  async function submitFinalOrder(values: z.infer<typeof formSchema>, rzpPaymentId: string) {
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          items: items.map(item => ({ productId: item.id, quantity: item.quantity })),
          total: totalPrice,
          paymentId: rzpPaymentId, // Storing for reference
        }),
      });

      if (!response.ok) throw new Error("Failed to place order record");

      clearCart();
      setIsComplete(true);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Order Record Failed",
        description: "Payment was successful, but we failed to record the order. Please contact support.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (items.length === 0) {
      toast({
        variant: "destructive",
        title: "Cart is empty",
        description: "Please add products to your cart before checking out.",
      });
      return;
    }

    await handlePayment(values);
  }

  const steps = [
    { title: "Identity", icon: User },
    { title: "Shipping", icon: ShoppingBag },
    { title: "Payment", icon: CreditCard },
  ];

  if (isComplete) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-spice-pattern opacity-[0.03] pointer-events-none" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-10 md:p-16 rounded-[4rem] shadow-2xl text-center max-w-xl w-full relative z-10 border border-foreground/5"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 12, delay: 0.2 }}
            className="w-28 h-28 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-10"
          >
            <CheckCircle2 size={56} className="text-green-600" />
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter">Order Placed!</h2>
          <p className="text-foreground/60 text-lg mb-12 leading-relaxed font-medium">
            Your heritage spice collection is being carefully curated. A confirmation receipt has been dispatched to your email.
          </p>
          <div className="bg-secondary/20 p-8 rounded-3xl mb-12 text-left border border-foreground/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-150 duration-700" />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent mb-3">Order Status</p>
            <p className="text-sm font-bold text-foreground/80 leading-relaxed truncate">Payment ID: {paymentId}</p>
            <p className="text-sm font-bold text-foreground/80 leading-relaxed mt-2">Our master blenders are now hand-packing your selection for immediate dispatch.</p>
          </div>
          <Link href="/">
            <Button className="w-full rounded-2xl bg-primary hover:bg-primary/95 h-20 text-xl font-black shadow-2xl shadow-primary/20 transition-all active:scale-95 group">
              Return to Gallery
              <ArrowLeft className="ml-2 rotate-180 group-hover:translate-x-1 transition-transform" size={20} />
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] pt-40 pb-16 px-6 flex flex-col items-center justify-center text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="max-w-md"
        >
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl border border-foreground/5">
            <ShoppingBag size={40} className="text-foreground/10" />
          </div>
          <h1 className="text-4xl font-black mb-4 tracking-tight">Your Cart is Empty</h1>
          <p className="text-foreground/40 text-lg mb-10 font-medium">
            Discover our collection of handcrafted masalas and start your culinary heritage today.
          </p>
          <Link href="/products">
            <Button className="rounded-2xl px-10 py-8 bg-primary text-xl font-black shadow-2xl shadow-primary/20 hover:scale-105 transition-all">
              Discover Products
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  const OrderReviewContent = () => (
    <>
      <h3 className="text-3xl font-black mb-12 flex items-center justify-between relative z-10">
        Gallery Bag
        <span className="text-[11px] bg-accent text-white py-2 px-5 rounded-full uppercase tracking-widest font-black shadow-lg shadow-accent/20">
          {items.length} Pack{items.length !== 1 ? 's' : ''}
        </span>
      </h3>
      
      <div className="space-y-8 mb-12 max-h-[450px] overflow-y-auto no-scrollbar pr-2 relative z-10">
        {items.map((item) => (
          <div key={item.id} className="flex gap-6 items-center group/item">
            <div className="w-18 h-18 md:w-24 md:h-24 bg-[#FDFBF7] rounded-3xl overflow-hidden p-4 border border-foreground/5 relative shrink-0 transition-transform group-hover/item:scale-105 duration-500">
              <img src={item.image} alt={item.name} className="w-full h-full object-contain group-hover/item:rotate-3 transition-transform duration-500" />
              <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] w-6 h-6 rounded-full flex items-center justify-center font-black shadow-lg border-2 border-white">
                {item.quantity}
              </span>
            </div>
            <div className="flex flex-col flex-grow min-w-0">
              <span className="font-black text-base md:text-lg truncate mb-1">{item.name}</span>
              <span className="text-[11px] text-foreground/30 font-black uppercase tracking-widest">{item.weight}</span>
              <span className="font-black text-accent text-lg mt-2 tracking-tight">₹{item.price * item.quantity}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-6 mb-12 pt-8 border-t border-foreground/5 relative z-10">
        <div className="flex justify-between items-center text-sm md:text-base">
          <span className="text-foreground/30 font-black uppercase tracking-widest text-[11px]">Subtotal</span>
          <span className="font-black text-foreground/60">₹{totalPrice}.00</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-foreground/30 font-black uppercase tracking-widest text-[11px]">Logistics</span>
          <span className="text-green-600 font-black uppercase tracking-[0.2em] text-[10px] bg-green-50 px-4 py-1.5 rounded-full border border-green-100">Complementary</span>
        </div>
        <div className="pt-10 border-t-2 border-dashed border-foreground/10 flex justify-between items-end">
          <div className="flex flex-col">
            <span className="text-[11px] font-black text-foreground/20 uppercase tracking-[0.4em] mb-2">Total Investment</span>
            <span className="text-4xl md:text-5xl font-black text-accent tracking-tighter leading-none">₹{totalPrice}.00</span>
          </div>
        </div>
      </div>

      <div className="bg-[#FDFBF7] p-8 rounded-[2.5rem] flex flex-col gap-6 border border-foreground/5 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-foreground/5">
            <CreditCard size={18} className="text-accent" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/50">Encrypted Transaction</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-foreground/5">
            <BadgeCheck size={18} className="text-green-600" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/50">Heritage Quality Control</span>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-24 md:pt-32 pb-32 md:pb-16 px-4 md:px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/[0.03] rounded-full blur-[120px] -mr-96 -mt-96 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-[100px] -ml-64 -mb-64 pointer-events-none" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="mb-12 flex items-center justify-between">
          <Link href="/products" className="inline-flex items-center gap-2 text-foreground/30 hover:text-accent font-bold transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Continue Browsing
          </Link>
          
          <button 
            onClick={() => setShowMobileSummary(!showMobileSummary)}
            className="lg:hidden flex items-center gap-2 bg-white px-5 py-3 rounded-full border border-foreground/5 shadow-sm font-black text-[10px] uppercase tracking-widest text-accent"
          >
            Review Bag
            <ChevronDown size={14} className={`transition-transform duration-300 ${showMobileSummary ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* Mobile Summary Accordion */}
        <AnimatePresence>
          {showMobileSummary && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden mb-12 bg-white rounded-[3.5rem] border border-foreground/5 shadow-xl p-8"
            >
              <OrderReviewContent />
            </motion.div>
          )}
        </AnimatePresence>

        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <span className="bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] mb-4 inline-block">
              Secure Procurement
            </span>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-4">
              The <span className="text-accent italic">Checkout</span>
            </h1>
            <p className="text-foreground/40 font-bold text-lg md:text-xl">Step {currentStep} of 3: {steps[currentStep-1].title}</p>
          </div>

          <div className="flex items-center gap-4 md:gap-8 bg-white/50 backdrop-blur-sm p-4 rounded-[2.5rem] border border-foreground/5 shadow-sm overflow-x-auto no-scrollbar">
            {steps.map((step, idx) => {
              const stepNum = idx + 1;
              const isActive = currentStep === stepNum;
              const isCompleted = currentStep > stepNum;
              const StepIcon = step.icon;

              return (
                <div key={idx} className="flex items-center gap-3 shrink-0">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 border-2
                    ${isActive ? "bg-accent border-accent text-white scale-110 shadow-lg shadow-accent/20" : 
                      isCompleted ? "bg-green-500 border-green-500 text-white" : 
                      "bg-white border-foreground/10 text-foreground/20"}
                  `}>
                    {isCompleted ? <CheckCircle2 size={24} /> : <StepIcon size={20} />}
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="w-8 md:w-12 h-0.5 bg-foreground/10" />
                  )}
                </div>
              );
            })}
          </div>
        </header>
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          <div className="flex-grow">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
                <AnimatePresence mode="wait">
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="bg-white p-8 md:p-14 rounded-[3.5rem] border border-foreground/5 shadow-xl shadow-foreground/[0.02] space-y-10"
                    >
                      <div className="space-y-2">
                        <h2 className="text-3xl font-black tracking-tight">Your Identity</h2>
                        <p className="text-foreground/40 text-sm font-medium">We'll use these details to keep you updated on your heritage collection.</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <FormField
                          control={form.control}
                          name="customerName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[10px] font-black uppercase tracking-widest text-foreground/30">Legal Name</FormLabel>
                              <FormControl>
                                <div className="relative group">
                                  <User size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-accent transition-colors" />
                                  <Input placeholder="Enter full name" {...field} className="rounded-2xl border-foreground/10 bg-[#FDFBF7] h-16 md:h-20 pl-14 pr-8 font-bold focus:ring-accent transition-all" />
                                </div>
                              </FormControl>
                              <FormMessage className="text-[10px] font-bold" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[10px] font-black uppercase tracking-widest text-foreground/30">Email Contact</FormLabel>
                              <FormControl>
                                <div className="relative group">
                                  <BadgeCheck size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-accent transition-colors" />
                                  <Input placeholder="your@email.com" {...field} className="rounded-2xl border-foreground/10 bg-[#FDFBF7] h-16 md:h-20 pl-14 pr-8 font-bold focus:ring-accent transition-all" />
                                </div>
                              </FormControl>
                              <FormMessage className="text-[10px] font-bold" />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[10px] font-black uppercase tracking-widest text-foreground/30">Mobile Number</FormLabel>
                            <FormControl>
                              <Input placeholder="+91 00000 00000" {...field} className="rounded-2xl border-foreground/10 bg-[#FDFBF7] h-16 md:h-20 px-8 font-bold focus:ring-accent transition-all" />
                            </FormControl>
                            <FormMessage className="text-[10px] font-bold" />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="button" 
                        onClick={nextStep}
                        className="w-full rounded-[2rem] bg-accent hover:bg-accent/95 py-10 md:py-12 text-2xl font-black shadow-2xl shadow-accent/20 hover:scale-[1.01] transition-all active:scale-95 group text-white"
                      >
                        Continue to Shipping
                        <ArrowLeft className="ml-3 rotate-180 group-hover:translate-x-1 transition-transform" size={24} />
                      </Button>
                    </motion.div>
                  )}

                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="bg-white p-8 md:p-14 rounded-[3.5rem] border border-foreground/5 shadow-xl shadow-foreground/[0.02] space-y-10"
                    >
                      <div className="space-y-2 flex items-center justify-between">
                        <div>
                          <h2 className="text-3xl font-black tracking-tight">Delivery Hub</h2>
                          <p className="text-foreground/40 text-sm font-medium">Where should we dispatch your selection?</p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={prevStep} className="text-[10px] font-black uppercase tracking-widest text-foreground/30 hover:text-accent">
                          Go Back
                        </Button>
                      </div>

                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[10px] font-black uppercase tracking-widest text-foreground/30">Complete Shipping Address</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="House/Flat No., Street, Landmark, Pincode..." 
                                className="rounded-[2rem] min-h-[220px] border-foreground/10 bg-[#FDFBF7] p-8 font-bold resize-none focus:ring-accent transition-all text-lg leading-relaxed" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage className="text-[10px] font-bold" />
                          </FormItem>
                        )}
                      />

                      <div className="bg-green-50/50 p-6 rounded-3xl border border-green-100 flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                          <BadgeCheck className="text-green-600" size={24} />
                        </div>
                        <p className="text-xs font-bold text-green-800 leading-tight">Your delivery address will be verified for express shipping by our logistics partners.</p>
                      </div>

                      <Button 
                        type="button" 
                        onClick={nextStep}
                        className="w-full rounded-[2rem] bg-accent hover:bg-accent/95 py-10 md:py-12 text-2xl font-black shadow-2xl shadow-accent/20 hover:scale-[1.01] transition-all active:scale-95 group text-white"
                      >
                        Finalize & Pay
                        <ArrowLeft className="ml-3 rotate-180 group-hover:translate-x-1 transition-transform" size={24} />
                      </Button>
                    </motion.div>
                  )}

                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="bg-white p-8 md:p-14 rounded-[3.5rem] border border-foreground/5 shadow-xl shadow-foreground/[0.02] space-y-12"
                    >
                      <div className="space-y-2 flex items-center justify-between">
                        <div>
                          <h2 className="text-3xl font-black tracking-tight">Review & Pay</h2>
                          <p className="text-foreground/40 text-sm font-medium">Confirm your details before we prepare your dispatch.</p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={prevStep} className="text-[10px] font-black uppercase tracking-widest text-foreground/30 hover:text-accent">
                          Edit Shipment
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-[#FDFBF7] p-8 rounded-3xl border border-foreground/5">
                          <p className="text-[9px] font-black uppercase tracking-widest text-foreground/30 mb-4">Recipient</p>
                          <p className="font-black text-lg">{form.getValues("customerName")}</p>
                          <p className="font-medium text-foreground/60">{form.getValues("email")}</p>
                          <p className="font-medium text-foreground/60">{form.getValues("phone")}</p>
                        </div>
                        <div className="bg-[#FDFBF7] p-8 rounded-3xl border border-foreground/5">
                          <p className="text-[9px] font-black uppercase tracking-widest text-foreground/30 mb-4">Destination</p>
                          <p className="font-black text-sm leading-relaxed">{form.getValues("address")}</p>
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full rounded-[2.5rem] bg-primary hover:bg-primary/95 py-12 md:py-14 text-3xl font-black shadow-2xl shadow-primary/20 hover:scale-[1.01] transition-all active:scale-95 disabled:opacity-50 relative overflow-hidden group text-white"
                      >
                        <span className="flex items-center justify-center gap-4 relative z-10 transition-transform group-hover:translate-x-1 duration-300">
                          {isSubmitting ? (
                            <>
                              <Loader2 className="animate-spin" size={32} />
                              Processing Heritage...
                            </>
                          ) : (
                            <>
                              Place Your Order
                              <ArrowLeft className="rotate-180" size={32} />
                            </>
                          )}
                        </span>
                      </Button>
                      
                      <p className="text-[10px] text-center font-black uppercase tracking-[0.4em] text-foreground/20 italic">
                        Heritage quality guaranteed & secured by industry leaders.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </Form>
          </div>

          <div className="hidden lg:block w-[450px] shrink-0">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-10 md:p-12 rounded-[4rem] border border-foreground/5 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] sticky top-32 overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 rounded-full -mr-24 -mt-24 transition-transform group-hover:scale-110 duration-700" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full -ml-16 -mb-16" />
              
              <OrderReviewContent />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
