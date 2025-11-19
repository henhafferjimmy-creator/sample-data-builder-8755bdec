import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Home, Hammer, Leaf, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Service } from "@/types/service";

const services: Service[] = [
  {
    id: "residential",
    icon: Home,
    title: "Residential Dumpster Rentals",
    description: "Perfect for homeowners tackling renovations, garage cleanouts, or seasonal decluttering.",
    href: "/services#residential"
  },
  {
    id: "construction",
    icon: Hammer,
    title: "Construction & Remodeling Debris Dumpsters",
    description: "Ideal for contractors, builders, and remodeling projects.",
    href: "/services#construction"
  },
  {
    id: "landscaping",
    icon: Leaf,
    title: "Landscaping & Yard Waste Dumpsters",
    description: "Great for yard cleanups, brush removal, grass, soil, branches, and outdoor project waste.",
    href: "/services#landscaping"
  },
];

const ServicesShowcase = () => {
  const [selectedService, setSelectedService] = useState(services[0].id);
  const activeService = services.find(s => s.id === selectedService) || services[0];

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      id="services" 
      className="py-10 md:py-16 lg:py-24 bg-gradient-to-b from-[hsl(var(--services-bg-start))] to-[hsl(var(--services-bg-end))] relative z-10 overflow-hidden"
    >
      {/* Subtle geometric pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--secondary)) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />
      
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--secondary)/0.04),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--secondary)/0.04),transparent_50%)]" />
      
      <div className="container mx-auto px-4 md:px-6 relative max-w-6xl">
        {/* Header */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            Our Services
          </h2>
          
          {/* Decorative underline */}
          <div className="flex justify-center mb-3 md:mb-4">
            <div className="h-0.5 md:h-1 w-16 md:w-20 bg-gradient-to-r from-secondary/0 via-secondary to-secondary/0 rounded-full" />
          </div>
          
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Professional dumpster rentals for every project size and type
          </p>
        </motion.div>

        {/* Mobile: Pill Selector + Single Card */}
        <div className="md:hidden">
          {/* Pill Selector */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-6"
          >
            <div 
              className="flex gap-3 overflow-x-auto pb-4 px-1 snap-x snap-mandatory scrollbar-hide"
              style={{ 
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
              role="tablist"
              aria-label="Service options"
            >
              {services.map((service) => {
                const Icon = service.icon;
                const isActive = selectedService === service.id;
                
                return (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={`
                      flex items-center gap-2 px-4 py-2.5 rounded-full whitespace-nowrap transition-all duration-300 snap-center flex-shrink-0
                      ${isActive 
                        ? 'bg-secondary text-white shadow-md border-2 border-secondary' 
                        : 'bg-background/80 text-foreground border-2 border-border hover:border-secondary/50'
                      }
                    `}
                    role="tab"
                    aria-selected={isActive}
                    aria-pressed={isActive}
                    aria-controls={`service-panel-${service.id}`}
                  >
                    <div className={`
                      w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0
                      ${isActive ? 'bg-white/20' : 'bg-secondary/10'}
                    `}>
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-secondary'}`} />
                    </div>
                    <span className="text-sm font-semibold">{service.title.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Single Service Detail Card */}
          <motion.div
            key={selectedService}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            id={`service-panel-${activeService.id}`}
            role="tabpanel"
            aria-labelledby={`service-tab-${activeService.id}`}
            className="bg-card rounded-2xl border-2 border-border shadow-md p-5"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 border-2 border-secondary/20 flex items-center justify-center flex-shrink-0">
                {(() => {
                  const Icon = activeService.icon;
                  return <Icon className="w-5 h-5 text-secondary" />;
                })()}
              </div>
              <h3 className="text-lg font-bold text-foreground leading-tight">
                {activeService.title}
              </h3>
            </div>
            
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {activeService.description}
            </p>
            
            <Link 
              to={activeService.href}
              className="inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:text-secondary/80 transition-colors group"
            >
              Learn More
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Tablet/Desktop: Grid Layout */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Link 
                  to={service.href}
                  className="block group h-full"
                >
                  <div className="h-full bg-card rounded-2xl border-2 border-border shadow-md hover:shadow-lg hover:border-secondary/50 transition-all duration-300 p-5 lg:p-6">
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-secondary/10 border-2 border-secondary/20 mb-4 group-hover:scale-110 group-hover:bg-secondary/15 transition-all duration-300">
                      <Icon className="w-6 h-6 text-secondary" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-lg lg:text-xl font-bold mb-2 text-foreground group-hover:text-secondary transition-colors">
                      {service.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {service.description}
                    </p>
                    
                    {/* Learn More Link */}
                    <div className="flex items-center gap-2 text-secondary font-medium text-sm group-hover:gap-3 transition-all">
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesShowcase;
