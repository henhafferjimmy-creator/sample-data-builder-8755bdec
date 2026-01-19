import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Phone, Mail, MapPin, Clock, CheckCircle, CheckCircle2, Send, Loader2, Star, Shield, Truck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  PHONE_DISPLAY, 
  EMAIL, 
  BUSINESS_HOURS_DETAILED,
  SERVICE_AREAS 
} from "@/config/contact";

// Service type options
const serviceTypeOptions = [
  { value: "residential", label: "Residential House Cleanout" },
  { value: "landscaping", label: "Landscaping and Yardwaste" },
  { value: "construction", label: "Construction & Remodeling" },
];

// Dumpster size options
const dumpsterSizeOptions = [
  { value: "15-yard", label: "15 Yards" },
];

// Form validation schema with proper phone validation
const quoteFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string()
    .min(1, "Phone number is required")
    .regex(/^[\d\s\-\(\)\+\.]+$/, "Phone must contain only numbers and formatting characters (spaces, dashes, parentheses)")
    .refine(val => {
      const digitsOnly = val.replace(/\D/g, '');
      return digitsOnly.length >= 10;
    }, {
      message: "Phone number must contain at least 10 digits"
    })
    .refine(val => {
      const digitsOnly = val.replace(/\D/g, '');
      return digitsOnly.length <= 15;
    }, {
      message: "Phone number is too long"
    }),
  address: z.string().min(5, "Please enter your address"),
  serviceType: z.string().min(1, "Please select a service type"),
  dumpsterSize: z.string().min(1, "Please select a dumpster size"),
  projectDetails: z.string().min(10, "Please provide more details about your project"),
});

type QuoteFormData = z.infer<typeof quoteFormSchema>;

// Web3Forms access key - uses environment variable with fallback
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || "YOUR_ACCESS_KEY_HERE";

// Development warning for missing API key
if (WEB3FORMS_ACCESS_KEY === "YOUR_ACCESS_KEY_HERE" && import.meta.env.DEV) {
  console.warn("⚠️ Web3Forms API key not configured. Form submissions will fail. Set VITE_WEB3FORMS_KEY in your environment.");
}

const Quote = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const { toast } = useToast();
  const [searchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      serviceType: "",
      dumpsterSize: searchParams.get('size') 
        ? `${searchParams.get('size')}-yard` 
        : "",
      projectDetails: searchParams.get('type')
        ? `I'm interested in a ${searchParams.get('type')} project for ${searchParams.get('days') || '7'} days.`
        : "",
    },
  });

  const onSubmit = async (data: QuoteFormData) => {
    // Rate limiting check
    const now = Date.now();
    const cooldownPeriod = 5000; // 5 seconds

    if (now - lastSubmitTime < cooldownPeriod) {
      const remainingSeconds = Math.ceil((cooldownPeriod - (now - lastSubmitTime)) / 1000);
      toast({
        title: "Please wait",
        description: `You can submit again in ${remainingSeconds} second${remainingSeconds !== 1 ? 's' : ''}`,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setLastSubmitTime(now);
    
    try {
      // Build payload with exact keys for n8n webhook
      const payload = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        serviceType: serviceTypeOptions.find(s => s.value === data.serviceType)?.label || data.serviceType,
        dumpsterSize: dumpsterSizeOptions.find(s => s.value === data.dumpsterSize)?.label || data.dumpsterSize,
        projectDetails: data.projectDetails,
        submittedAt: new Date().toISOString(),
        pageUrl: window.location.href,
      };

      const response = await fetch("https://n8n.srv906725.hstgr.cloud/webhook/jims-dumpster-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast({
          title: "Thanks! We'll reach out shortly.",
          description: "Your quote request has been submitted successfully.",
        });
        reset();
      } else {
        throw new Error("Request failed");
      }
    } catch (error) {
      toast({
        title: "Something went wrong—please try again.",
        description: "Your form values have been preserved. Please try again or call us at " + PHONE_DISPLAY,
        variant: "destructive",
      });
      
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactCards = [
    {
      icon: Phone,
      title: "Phone",
      line1: PHONE_DISPLAY,
      line2: "Call us for immediate assistance",
    },
    {
      icon: Mail,
      title: "Email",
      line1: EMAIL,
      line2: "Send us a message anytime",
    },
    {
      icon: MapPin,
      title: "Service Area",
      line1: "South Jersey",
      line2: "Gloucester, Salem, Cumberland, Atlantic",
    },
    {
      icon: Clock,
      title: "Business Hours",
      line1: BUSINESS_HOURS_DETAILED,
      line2: "Sunday: Closed",
    },
  ];

  const serviceAreasList = SERVICE_AREAS.map((area, index) => ({
    name: area,
    emoji: ["🏡", "🌳", "🏘️", "🏖️"][index] || "📍",
  }));


  const benefits = [
    {
      title: "Free Consultations",
      description: "No-pressure quotes with honest recommendations for your project.",
    },
    {
      title: "Fast & Reliable Service",
      description: "Same-day delivery when available, always on schedule.",
    },
    {
      title: "Driveway Safe Dumpsters",
      description: "Protective boards and careful placement to protect your property.",
    },
    {
      title: "Transparent Pricing",
      description: "Clear, upfront pricing with no hidden fees or surprises.",
    },
  ];

  const faqs = [
    {
      question: "How long can I rent a dumpster?",
      answer:
        "Standard rental periods are typically 7-14 days. Need it longer? We offer flexible extensions to fit your project timeline.",
    },
    {
      question: "Do you provide same-day delivery?",
      answer:
        "Yes! We offer same-day delivery when available. Contact us early in the day and we'll do our best to accommodate your schedule.",
    },
    {
      question: "What size dumpster do I need?",
      answer:
        "It depends on your project scope. Our team will help you choose the right size based on your needs - from small cleanouts to major renovations.",
    },
    {
      question: "What areas do you serve?",
      answer:
        "We proudly serve South Jersey including Gloucester, Salem, Cumberland, and Atlantic Counties. Contact us to confirm service availability in your location.",
    },
    {
      question: "What can I put in the dumpster?",
      answer:
        "Most household debris, construction materials, yard waste, and furniture are acceptable. We'll provide a complete list of accepted and prohibited items with your quote.",
    },
    {
      question: "How much does it cost?",
      answer:
        "Pricing depends on dumpster size, rental duration, and debris type. Contact us for a free, no-obligation quote tailored to your specific project.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section with Animated Blobs */}
      <section className="relative pt-32 pb-20 bg-slate-900 overflow-hidden">
        {/* Animated Gradient Blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/30 rounded-full blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-20 right-0 w-80 h-80 bg-orange-500/25 rounded-full blur-3xl"
            animate={{
              x: [0, -40, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-0 left-1/3 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, -40, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Get in Touch
            </h1>
            <p className="text-lg md:text-xl text-slate-300">
              Ready for reliable dumpster service? We're here to help with your project needs in South Jersey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-gradient-to-b from-slate-100 to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {contactCards.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 18px 45px rgba(34,197,94,0.25)",
                  }}
                >
                  <Card className="border border-emerald-200/60 bg-white/80 backdrop-blur-sm h-full">
                    <CardContent className="pt-6 pb-6 text-center">
                      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
                        <Icon className="h-6 w-6 text-emerald-700" />
                      </div>
                      <h3 className="font-semibold text-lg mb-1">
                        {item.title}
                      </h3>
                      <p className="text-foreground/80 font-medium">
                        {item.line1}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.line2}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Everything You Need to Know Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Everything You Need to Know
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              From our hours of operation to the areas we serve, find all the information you need right here.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Business Hours Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0 }}
            >
              <Card className="h-full bg-slate-50 border border-slate-200 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <CardContent className="pt-8 pb-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Business Hours</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-slate-200">
                      <span className="text-slate-600">Monday - Saturday</span>
                      <span className="font-semibold text-slate-900">7:00 AM - 7:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-slate-600">Sunday</span>
                      <span className="font-semibold text-slate-500">Closed</span>
                    </div>
                    <p className="text-sm text-emerald-600 font-medium mt-4">
                      ✓ Same-day delivery available
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Service Areas Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Card className="h-full bg-slate-50 border border-slate-200 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <CardContent className="pt-8 pb-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Service Areas</h3>
                  </div>
                  <div className="space-y-2">
                    {SERVICE_AREAS.map((area, index) => (
                      <div key={index} className="flex items-center gap-2 py-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span className="text-slate-700">{area}</span>
                      </div>
                    ))}
                    <p className="text-sm text-slate-500 mt-4">
                      + Surrounding South Jersey communities
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Why Choose Us Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Card className="h-full bg-slate-50 border border-slate-200 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <CardContent className="pt-8 pb-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <Star className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Why Choose Us</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">Licensed & Fully Insured</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Truck className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">Driveway-Safe Equipment</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">Same-Day Delivery Available</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Star className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">10+ Years of Experience</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Form + Service Area Section */}
      <section className="py-20 bg-gradient-to-b from-white via-slate-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Form Panel */}
            <motion.div
              className="rounded-3xl bg-white/90 border border-emerald-200/70 shadow-[0_20px_60px_rgba(15,23,42,0.12)] p-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 mb-3">
                Step 1 — Tell us about your project
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Book Your Dumpster
              </h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and we'll get back to you within 24
                hours with a detailed estimate for your project.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name *</Label>
                    <Input
                      id="name"
                      placeholder="John Smith"
                      className={`border-emerald-200/60 focus:border-emerald-400 ${errors.name ? 'border-red-500' : ''}`}
                      {...register("name")}
                      disabled={isSubmitting}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className={`border-emerald-200/60 focus:border-emerald-400 ${errors.email ? 'border-red-500' : ''}`}
                      {...register("email")}
                      disabled={isSubmitting}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      className={`border-emerald-200/60 focus:border-emerald-400 ${errors.phone ? 'border-red-500' : ''}`}
                      {...register("phone")}
                      disabled={isSubmitting}
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-500">{errors.phone.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      placeholder="123 Main St, City, State"
                      className={`border-emerald-200/60 focus:border-emerald-400 ${errors.address ? 'border-red-500' : ''}`}
                      {...register("address")}
                      disabled={isSubmitting}
                    />
                    {errors.address && (
                      <p className="text-sm text-red-500">{errors.address.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="serviceType">Service Type *</Label>
                    <select
                      id="serviceType"
                      className={`w-full h-10 px-3 py-2 rounded-md border bg-background text-sm border-emerald-200/60 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 ${errors.serviceType ? 'border-red-500' : ''}`}
                      {...register("serviceType")}
                      disabled={isSubmitting}
                    >
                      <option value="">Select a service type</option>
                      {serviceTypeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.serviceType && (
                      <p className="text-sm text-red-500">{errors.serviceType.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dumpsterSize">Dumpster Size *</Label>
                    <select
                      id="dumpsterSize"
                      className={`w-full h-10 px-3 py-2 rounded-md border bg-background text-sm border-emerald-200/60 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 ${errors.dumpsterSize ? 'border-red-500' : ''}`}
                      {...register("dumpsterSize")}
                      disabled={isSubmitting}
                    >
                      <option value="">Select a size</option>
                      {dumpsterSizeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.dumpsterSize && (
                      <p className="text-sm text-red-500">{errors.dumpsterSize.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectDetails">Project Details *</Label>
                  <Textarea
                    id="projectDetails"
                    placeholder="Tell us about your project - what you're working on, timeline, any special requirements..."
                    className={`min-h-[120px] border-emerald-200/60 focus:border-emerald-400 ${errors.projectDetails ? 'border-red-500' : ''}`}
                    {...register("projectDetails")}
                    disabled={isSubmitting}
                  />
                  {errors.projectDetails && (
                    <p className="text-sm text-red-500">{errors.projectDetails.message}</p>
                  )}
                </div>

                <motion.div
                  whileHover={isSubmitting ? {} : { scale: 1.02 }}
                  whileTap={isSubmitting ? {} : { scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-orange-400 hover:from-emerald-500 hover:via-emerald-400 hover:to-orange-500 text-white shadow-[0_12px_35px_rgba(34,197,94,0.35)] font-semibold disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </motion.div>

                <p className="text-xs text-muted-foreground text-center">
                  By submitting, you agree to be contacted about your quote. No
                  spam, ever.
                </p>
              </form>
            </motion.div>

            {/* Service Area & Benefits Panel */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {/* Service Area Dark Card */}
              <div className="rounded-3xl bg-slate-900 text-white p-6 md:p-8 relative overflow-hidden">
                {/* Subtle glows inside */}
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute -top-10 right-0 w-40 h-40 rounded-full bg-emerald-500/25 blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-52 h-52 rounded-full bg-orange-400/20 blur-3xl" />
                </div>

                <div className="relative z-10">
                  <h3 className="text-2xl font-semibold mb-2">
                    Visit Our Service Area
                  </h3>
                  <p className="text-emerald-100/90 mb-6 text-sm md:text-base">
                    We're proudly serving homeowners and contractors across
                    South Jersey.
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    {serviceAreasList.map((area, index) => (
                      <motion.div
                        key={area.name}
                        className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-4 text-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: "rgba(255,255,255,0.15)",
                        }}
                      >
                        <div className="text-3xl mb-2">{area.emoji}</div>
                        <p className="text-sm font-medium">{area.name}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Benefits List */}
              <div className="rounded-3xl bg-white/90 border border-emerald-200/60 p-6 shadow-sm space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                  >
                    <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm md:text-base">
                        {benefit.title}
                      </h4>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section with Accordion */}
      <section className="py-20 bg-gradient-to-b from-emerald-50/40 via-white to-emerald-50/20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-emerald-600 mb-3">
              FAQs
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Quick answers to common questions about our dumpster rentals and
              service areas.
            </p>
          </motion.div>

          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={`faq-${index + 1}`}
                  value={`faq-${index + 1}`}
                  className="rounded-2xl border border-emerald-200/60 bg-white/80 px-4 backdrop-blur-sm overflow-hidden"
                >
                  <AccordionTrigger className="text-left py-5 hover:no-underline">
                    <span className="text-sm md:text-base font-semibold text-foreground pr-4">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground pb-5 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Quote;
