import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Hammer, Leaf, Truck, CheckCircle2, Clock, AlertTriangle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState } from "react";

const services = [
  {
    icon: Leaf,
    title: "Landscaping & Yard Waste",
    description: "Great for yard cleanups, brush removal, and outdoor project waste.",
    features: [
      "Yard debris and organic waste",
      "Grass, soil, and branches",
      "Keeps property clean during landscape work",
      "Driveway-safe delivery included",
    ],
    badge: "Contractor Favorite",
  },
  {
    icon: Home,
    title: "Residential Dumpster Rentals",
    description: "Perfect for homeowners tackling renovations, garage cleanouts, or seasonal decluttering.",
    features: [
      "Household trash and general waste",
      "Furniture and light appliances",
      "Driveway-safe placement",
      "Convenient drop-off and pickup",
    ],
    popular: true,
    badge: "Best for Homeowners",
  },
  {
    icon: Hammer,
    title: "Construction & Remodeling",
    description: "Ideal for contractors, builders, and remodeling projects.",
    features: [
      "Drywall, wood, roofing, flooring",
      "General construction debris",
      "Short-term or project-based rental",
      "Handles heavy materials",
    ],
    badge: "Popular Choice",
  },
];

const acceptedMaterialGroups = [
  {
    icon: Home,
    title: "Household & General Waste",
    items: [
      "Household trash",
      "General non-hazardous waste",
      "Furniture & light appliances",
    ],
  },
  {
    icon: Hammer,
    title: "Construction Debris",
    items: [
      "Wood, drywall, and flooring",
      "Roofing materials and shingles",
      "Mixed remodeling debris",
    ],
  },
  {
    icon: Leaf,
    title: "Yard & Outdoor Waste",
    items: [
      "Grass, soil, and branches",
      "Brush and small trees",
      "Seasonal cleanup debris",
    ],
  },
  {
    icon: Truck,
    title: "Project Cleanup",
    items: [
      "Garage and attic cleanouts",
      "Move-out and estate cleanups",
      "Small business renovation projects",
    ],
  },
];

const rentalDetails = [
  {
    icon: Clock,
    title: "Flexible Rental Durations",
    description: "Short-term and extended options available",
    step: "Step 1",
  },
  {
    icon: Truck,
    title: "Fast Delivery & Pickup",
    description: "Scheduled around your project timeline",
    step: "Step 2",
  },
  {
    icon: CheckCircle2,
    title: "Transparent Pricing",
    description: "No hidden fees, simple and honest rates",
    step: "Step 3",
  },
];

const sectionLinks = [
  { id: "service-types", label: "Service Types" },
  { id: "accepted-materials", label: "Accepted Materials" },
  { id: "rental-details", label: "Rental Details" },
];

const Services = () => {
  const [activeSection, setActiveSection] = useState("service-types");

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="relative overflow-hidden pt-36 pb-20 bg-gradient-to-br from-emerald-800 via-emerald-600 to-orange-500 text-white">
        <motion.div className="pointer-events-none absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <motion.div className="absolute -top-24 left-0 w-80 h-80 rounded-full bg-emerald-400/20 blur-3xl" animate={{ scale: [1, 1.1, 1], x: [0, 20, 0], y: [0, 30, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className="absolute -top-16 right-0 w-96 h-96 rounded-full bg-orange-300/30 blur-3xl" animate={{ scale: [1, 1.15, 1], x: [0, -20, 0], y: [0, 15, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-emerald-300/20 blur-3xl" animate={{ scale: [1, 1.2, 1], x: [0, 15, 0] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }} />
        </motion.div>

        <div className="pointer-events-none absolute inset-0 z-5 hidden md:block">
          <div className="relative max-w-5xl mx-auto h-full">
            <motion.div className="absolute top-20 left-10 rounded-full bg-white/90 border border-emerald-200 backdrop-blur-md px-4 py-2 text-xs font-medium text-slate-700 shadow-lg" animate={{ y: [0, -12, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}>
              <Home className="inline-block w-3 h-3 mr-1 text-emerald-600" />Residential
            </motion.div>
            <motion.div className="absolute top-32 right-16 rounded-full bg-white/90 border border-emerald-200 backdrop-blur-md px-4 py-2 text-xs font-medium text-slate-700 shadow-lg" animate={{ y: [0, -15, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
              <Hammer className="inline-block w-3 h-3 mr-1 text-emerald-600" />Construction
            </motion.div>
            <motion.div className="absolute bottom-28 left-1/4 rounded-full bg-white/90 border border-emerald-200 backdrop-blur-md px-4 py-2 text-xs font-medium text-slate-700 shadow-lg" animate={{ y: [0, -10, 0] }} transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 2 }}>
              <Leaf className="inline-block w-3 h-3 mr-1 text-emerald-600" />Yard Waste
            </motion.div>
            <motion.div className="absolute bottom-36 right-1/4 rounded-full bg-white/90 border border-emerald-200 backdrop-blur-md px-4 py-2 text-xs font-medium text-slate-700 shadow-lg" animate={{ y: [0, -14, 0] }} transition={{ duration: 19, repeat: Infinity, ease: "easeInOut", delay: 3 }}>
              <Truck className="inline-block w-3 h-3 mr-1 text-emerald-600" />Fast Delivery
            </motion.div>
          </div>
        </div>

        <motion.div className="relative z-10 container mx-auto px-4 max-w-4xl text-center" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
          <p className="inline-flex items-center gap-2 rounded-full bg-black/15 px-4 py-1 text-sm font-medium uppercase tracking-wide mb-4 backdrop-blur-sm border border-white/20">
            <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />Professional Dumpster Services
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-[0_3px_8px_rgba(0,0,0,0.4)]">Dumpster Rentals for Every Project</h1>
          <p className="text-lg md:text-xl text-emerald-50/90 mb-6 max-w-2xl mx-auto">From home cleanouts to major construction projects, we've got the right dumpster for you.</p>
          <p className="text-sm uppercase tracking-wide text-emerald-50/80">Fast Delivery • Transparent Pricing • Driveway-Safe Placement</p>
        </motion.div>

        <div className="absolute -bottom-1 left-0 right-0 h-10 bg-gradient-to-b from-white/20 via-white/60 to-white pointer-events-none" />
      </section>

      <section className="sticky top-[72px] z-30 bg-background/90 backdrop-blur-lg border-b border-border/60 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-2 md:gap-4 py-3 flex-wrap">
            {sectionLinks.map((link) => (
              <motion.button key={link.id} onClick={() => scrollToSection(link.id)} className={`px-4 md:px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeSection === link.id ? "bg-emerald-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]" : "bg-background border border-border/60 text-foreground/80 hover:border-emerald-300 hover:bg-emerald-50/50"}`} whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>{link.label}</motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Service Types Section */}
      <section id="service-types" className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <p className="text-xs font-semibold tracking-[0.28em] uppercase text-emerald-600 mb-3">
              Dumpster Rental Services
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Pick the Right Dumpster for Your Project
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From quick cleanouts to major renovations, choose the service that fits your project best.
            </p>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                >
                  <Card className={`relative h-full rounded-3xl border bg-white/90 shadow-[0_18px_50px_rgba(15,23,42,0.12)] backdrop-blur-md overflow-hidden transition-shadow duration-300 ${service.popular ? "ring-2 ring-emerald-400/80 border-emerald-200/70" : "border-emerald-100/70"}`}>
                    {service.popular && (
                      <motion.div 
                        className="absolute top-4 right-4 rounded-full bg-emerald-500 text-xs font-semibold px-3 py-1 text-white shadow-md"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      >
                        MOST POPULAR
                      </motion.div>
                    )}
                    {service.badge && (
                      <div className="absolute top-4 left-4 rounded-full bg-emerald-100/90 text-[11px] font-semibold px-3 py-1 text-emerald-700 border border-emerald-200">
                        {service.badge}
                      </div>
                    )}

                    <CardHeader className="pb-2 pt-8 px-6 flex flex-col items-start gap-4">
                      <div>
                        <CardTitle className="text-xl font-semibold mb-1">
                          {service.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {service.description}
                        </p>
                      </div>
                    </CardHeader>

                    <CardContent className="px-6 pb-6 pt-2 flex flex-col gap-4">
                      <ul className="space-y-2 text-sm text-foreground/80">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="pt-3">
                        <Button
                          asChild
                          className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-orange-400 text-white font-semibold shadow-[0_12px_30px_rgba(34,197,94,0.45)] hover:shadow-[0_16px_40px_rgba(34,197,94,0.6)] hover:scale-[1.03] hover:-translate-y-0.5 transition-all duration-300"
                        >
                          <Link to="/quote">
                            Get a Free Quote
                            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Accepted Materials Section */}
      <section id="accepted-materials" className="py-20 bg-gradient-to-b from-emerald-50/40 via-white to-emerald-50/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-10"
          >
            <p className="text-xs font-semibold tracking-[0.28em] uppercase text-emerald-600 mb-3">
              Accepted Materials
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              What You Can Put in Our Dumpsters
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We handle most non-hazardous debris from household, construction, and outdoor projects.
            </p>
          </motion.div>

          <Card className="rounded-3xl border border-emerald-200/70 bg-white/95 shadow-[0_18px_50px_rgba(15,23,42,0.10)] backdrop-blur-sm">
            <CardContent className="p-6 md:p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {acceptedMaterialGroups.map((group, index) => {
                  const Icon = group.icon;
                  return (
                    <motion.div
                      key={group.title}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.06 }}
                      className="space-y-3"
                    >
                      <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100/80 border border-emerald-200 px-3 py-1">
                        <Icon className="w-4 h-4 text-emerald-700" />
                        <span className="text-xs font-semibold text-emerald-800">
                          {group.title}
                        </span>
                      </div>
                      <ul className="space-y-1.5 text-sm text-foreground/80">
                        {group.items.map((item) => (
                          <motion.li
                            key={item}
                            className="rounded-full bg-emerald-50 px-3 py-1 hover:bg-emerald-100 transition-colors cursor-default"
                            whileHover={{ scale: 1.04, y: -1 }}
                          >
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
                className="grid gap-3 md:grid-cols-[auto,1fr] items-start rounded-2xl bg-red-50 border border-red-200 shadow-[0_12px_30px_rgba(248,113,113,0.2)] px-4 py-4 md:px-6 md:py-5"
              >
                <div className="flex items-center gap-2 text-red-700">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                  <span className="font-semibold text-sm">
                    Items That Cannot Go in the Dumpster
                  </span>
                </div>
                <p className="text-xs md:text-sm text-red-800/90">
                  Hazardous materials, chemicals, paint, liquids, batteries, tires, and other restricted items are not allowed. If you're unsure about a specific item, contact us before placing it in the dumpster.
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Rental Details Section */}
      <section id="rental-details" className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-10"
          >
            <p className="text-xs font-semibold tracking-[0.28em] uppercase text-emerald-600 mb-3">
              How It Works
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Simple, Flexible, and Transparent
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our rental process is designed to be straightforward from start to finish.
            </p>
          </motion.div>

          <div className="relative max-w-5xl mx-auto">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-200/80 to-transparent -translate-y-1/2" />
            <div className="grid md:grid-cols-3 gap-6 relative">
              {rentalDetails.map((detail, index) => {
                const Icon = detail.icon;
                return (
                  <motion.div
                    key={detail.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
                    whileHover={{ y: -4, scale: 1.03, boxShadow: "0 20px 55px rgba(15,23,42,0.18)" }}
                  >
                    <Card className="h-full rounded-3xl border border-emerald-100/80 bg-white/95 shadow-[0_16px_45px_rgba(15,23,42,0.12)] transition-shadow duration-300">
                      <CardContent className="p-6 flex flex-col gap-3 items-start">
                        <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">
                          {detail.step}
                        </span>
                        <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 mb-1">
                          <Icon className="w-5 h-5 text-emerald-600" />
                        </div>
                        <h3 className="text-base font-semibold">
                          {detail.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {detail.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
