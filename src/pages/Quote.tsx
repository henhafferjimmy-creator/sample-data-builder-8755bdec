import { motion } from "framer-motion";
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
import { Phone, Mail, MapPin, Clock, CheckCircle, Send } from "lucide-react";

const Quote = () => {
  const contactCards = [
    {
      icon: Phone,
      title: "Phone",
      line1: "(555) 123-4567",
      line2: "Call us for immediate assistance",
    },
    {
      icon: Mail,
      title: "Email",
      line1: "info@jimsdumpster.com",
      line2: "Send us a message anytime",
    },
    {
      icon: MapPin,
      title: "Service Area",
      line1: "Greater Metro Area",
      line2: "Proudly serving your community",
    },
    {
      icon: Clock,
      title: "Business Hours",
      line1: "Mon - Fri: 7:00 AM - 6:00 PM",
      line2: "Saturday & Sunday: Closed",
    },
  ];

  const serviceAreas = [
    { name: "Gloucester County", emoji: "🏡" },
    { name: "Salem County", emoji: "🌳" },
    { name: "Cumberland County", emoji: "🏘️" },
    { name: "Atlantic County", emoji: "🏖️" },
  ];

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

      {/* Hero Section with Glowing Blobs */}
      <section className="relative overflow-hidden pt-40 pb-24 bg-gradient-to-br from-[#14532d] via-[#22c55e] to-[#ea580c] text-white rounded-b-[36px]">
        {/* Animated Glowing Blobs Background */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* top-left emerald glow */}
          <motion.div
            className="absolute -top-24 left-0 w-80 h-80 rounded-full bg-emerald-200/25 blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              x: [0, 20, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          {/* top-right orange glow */}
          <motion.div
            className="absolute -top-16 right-0 w-96 h-96 rounded-full bg-orange-300/25 blur-3xl"
            animate={{
              scale: [1, 1.15, 1],
              x: [0, -20, 0],
              y: [0, 15, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          {/* bottom glow */}
          <motion.div
            className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-emerald-100/20 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 15, 0],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Hero Content */}
        <motion.div
          className="relative z-10 container mx-auto px-4 max-w-4xl text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="inline-flex items-center gap-2 rounded-full bg-black/15 px-4 py-1 text-sm font-medium uppercase tracking-wide mb-4 backdrop-blur-sm border border-white/20">
            <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
            Contact & Free Quote
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-[0_3px_8px_rgba(0,0,0,0.4)]">
            Let's Talk About Your Project
          </h1>
          <p className="text-lg md:text-xl text-emerald-50/90 mb-6 max-w-2xl mx-auto">
            Ready to clear that clutter? Send us a few details and we'll respond
            within 24 hours with a clear, honest estimate.
          </p>
          <p className="text-sm uppercase tracking-wide text-emerald-50/80">
            Family-owned • Fast delivery • Transparent pricing
          </p>
        </motion.div>

        {/* Soft White Glow Divider */}
        <div className="absolute -bottom-1 left-0 right-0 h-10 bg-gradient-to-b from-white/20 via-white/60 to-white pointer-events-none" />
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-gradient-to-b from-emerald-50/40 via-white to-emerald-50/30">
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
                Get Your Free Estimate
              </h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and we'll get back to you within 24
                hours with a detailed estimate for your project.
              </p>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      placeholder="John Smith"
                      className="border-emerald-200/60 focus:border-emerald-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="border-emerald-200/60 focus:border-emerald-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      className="border-emerald-200/60 focus:border-emerald-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dumpster-size">Dumpster Size</Label>
                    <Input
                      id="dumpster-size"
                      placeholder="e.g., 10-yard, 20-yard"
                      className="border-emerald-200/60 focus:border-emerald-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="project-details">Project Details</Label>
                  <Textarea
                    id="project-details"
                    placeholder="Tell us about your project - what you're working on, timeline, any special requirements..."
                    className="min-h-[120px] border-emerald-200/60 focus:border-emerald-400"
                  />
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-orange-400 hover:from-emerald-500 hover:via-emerald-400 hover:to-orange-500 text-white shadow-[0_12px_35px_rgba(34,197,94,0.35)] font-semibold"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
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
                    {serviceAreas.map((area, index) => (
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
                  className="border border-emerald-200/60 rounded-lg bg-white/80 backdrop-blur-sm px-6 overflow-hidden"
                >
                  <AccordionTrigger className="hover:no-underline py-5 text-left font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">
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
