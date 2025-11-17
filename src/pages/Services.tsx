import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Hammer, Leaf, Truck, CheckCircle2, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

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
  },
  {
    icon: Truck,
    title: "Fast Delivery & Pickup",
    description: "Scheduled around your project timeline",
  },
  {
    icon: CheckCircle2,
    title: "Transparent Pricing",
    description: "No hidden fees, simple and honest rates",
  },
];

const Services = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Header Section - Green Background */}
      <motion.div 
        className="pt-40 pb-20 bg-secondary"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-secondary-foreground">Our Services</h1>
          <p className="text-xl text-secondary-foreground/90 max-w-2xl mx-auto">
            Dumpster Rental Services
          </p>
        </div>
      </motion.div>

      {/* Services Cards Section - White Background */}
      <motion.section 
        className="py-24 bg-background"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
                whileHover={{ y: -6, scale: 1.02 }}
              >
                <Card 
                  className={`relative border-2 rounded-2xl bg-background/90 backdrop-blur-sm transition-all duration-300 hover:border-secondary hover:shadow-[0_24px_60px_rgba(15,23,42,0.18)] flex flex-col ${
                    service.popular ? 'border-secondary shadow-md' : 'border-border/70'
                  }`}
                >
                  {service.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-secondary text-secondary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                        MOST POPULAR
                      </span>
                    </div>
                  )}
                  <CardHeader className="flex-grow">
                    <div className="w-12 h-12 mb-4 rounded-xl bg-secondary/10 border border-secondary/40 flex items-center justify-center shadow-sm">
                      <service.icon className="h-6 w-6 text-secondary" />
                    </div>
                    <CardTitle className="text-2xl mb-4">{service.title}</CardTitle>
                    <p className="text-muted-foreground mb-6">{service.description}</p>
                    <div className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardHeader>
                  <div className="p-6 pt-0">
                    <Link to="/quote">
                      <motion.div
                        whileHover={{ y: -2, scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="relative group"
                      >
                        <Button 
                          className="w-full relative overflow-hidden text-sm font-semibold" 
                          variant={service.popular ? "default" : "outline"}
                        >
                          <span className="relative z-10">Get Quote</span>
                          <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-secondary/20 to-transparent group-hover:translate-x-[120%] transition-transform duration-600" />
                        </Button>
                      </motion.div>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Accepted Materials Section - Light Gray Background */}
      <motion.section 
        className="py-24 bg-muted/30"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Accepted Materials</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Jim's Dumpsters can handle nearly all non-hazardous waste, including:
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-secondary/25 rounded-3xl bg-background/90 shadow-[0_18px_55px_rgba(15,23,42,0.08)] backdrop-blur-sm">
              <CardHeader className="py-10">
                <div className="grid md:grid-cols-2 gap-8">
                  {acceptedMaterialGroups.map((group, index) => (
                    <motion.div
                      key={group.title}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                          <group.icon className="h-5 w-5 text-secondary" />
                        </div>
                        <h3 className="text-base font-semibold">{group.title}</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {group.items.map((item) => (
                          <span
                            key={item}
                            className="px-3 py-1 rounded-full bg-secondary/8 text-xs font-medium text-foreground/90 border border-secondary/20"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Not accepted callout */}
                <div className="mt-10 pt-6 border-t border-border/60">
                  <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-2xl bg-destructive/5 border border-destructive/30">
                    <span className="text-sm font-semibold text-destructive">
                      Not accepted:
                    </span>
                    <p className="text-sm text-foreground/80">
                      Hazardous materials, chemicals, paints, oils, or batteries. Contact us if you're unsure about a specific item.
                    </p>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </motion.section>

      {/* Rental Details Section - White Background */}
      <motion.section 
        className="py-24 bg-background"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Rental Details</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {rentalDetails.map((detail, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <Card className="border-2 border-border/70 rounded-2xl bg-background/95 backdrop-blur-sm hover:border-secondary hover:shadow-[0_20px_55px_rgba(15,23,42,0.16)] transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                      <detail.icon className="h-6 w-6 text-secondary" />
                    </div>
                    <CardTitle className="text-lg">{detail.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-2">
                      {detail.description}
                    </p>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      
      <Footer />
    </div>
  );
};

export default Services;
