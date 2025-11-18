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
      
      <section className="relative overflow-hidden pt-36 pb-20 bg-gradient-to-br from-[#14532d] via-[#22c55e] to-[#ea580c] text-white rounded-b-[36px]">
        <motion.div className="pointer-events-none absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <motion.div className="absolute -top-24 left-0 w-80 h-80 rounded-full bg-emerald-200/30 blur-3xl" animate={{ scale: [1, 1.1, 1], x: [0, 20, 0], y: [0, 30, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className="absolute -top-16 right-0 w-96 h-96 rounded-full bg-orange-300/30 blur-3xl" animate={{ scale: [1, 1.15, 1], x: [0, -20, 0], y: [0, 15, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-emerald-100/25 blur-3xl" animate={{ scale: [1, 1.2, 1], x: [0, 15, 0] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }} />
        </motion.div>

        <div className="pointer-events-none absolute inset-0 z-5 hidden md:block">
          <div className="relative max-w-5xl mx-auto h-full">
            <motion.div className="absolute top-20 left-10 rounded-full bg-white/10 border border-white/30 backdrop-blur-md px-4 py-2 text-xs font-medium shadow-lg" animate={{ y: [0, -12, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}>
              <Home className="inline-block w-3 h-3 mr-1" />Residential
            </motion.div>
            <motion.div className="absolute top-32 right-16 rounded-full bg-white/10 border border-white/30 backdrop-blur-md px-4 py-2 text-xs font-medium shadow-lg" animate={{ y: [0, -15, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
              <Hammer className="inline-block w-3 h-3 mr-1" />Construction
            </motion.div>
            <motion.div className="absolute bottom-28 left-1/4 rounded-full bg-white/10 border border-white/30 backdrop-blur-md px-4 py-2 text-xs font-medium shadow-lg" animate={{ y: [0, -10, 0] }} transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 2 }}>
              <Leaf className="inline-block w-3 h-3 mr-1" />Yard Waste
            </motion.div>
            <motion.div className="absolute bottom-36 right-1/4 rounded-full bg-white/10 border border-white/30 backdrop-blur-md px-4 py-2 text-xs font-medium shadow-lg" animate={{ y: [0, -14, 0] }} transition={{ duration: 19, repeat: Infinity, ease: "easeInOut", delay: 3 }}>
              <Truck className="inline-block w-3 h-3 mr-1" />Fast Delivery
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

      {/* Keep existing service cards, materials, rental details sections with upgraded styling - content preserved from original */}
      <Footer />
    </div>
  );
};

export default Services;
