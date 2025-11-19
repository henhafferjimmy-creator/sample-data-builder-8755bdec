import { useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Home, Hammer, Leaf, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Service } from "@/types/service";
import { useMotionSettings, fadeInUp, staggerContainer, scaleIn, DURATION, EASING } from "@/lib/motionConfig";

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
  const { isMobile, shouldReduceMotion, enableHeavyMotion } = useMotionSettings();

  const containerVariants = staggerContainer(isMobile, shouldReduceMotion);
  const itemVariants = fadeInUp(isMobile, shouldReduceMotion);
  const cardVariants = scaleIn(isMobile, shouldReduceMotion);

  return (
    <motion.section 
      id="services" 
      className="py-10 md:py-16 lg:py-24 bg-gradient-to-b from-[hsl(var(--services-bg-start))] to-[hsl(var(--services-bg-end))] relative z-10 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
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
          variants={itemVariants}
          className="text-center mb-8 md:mb-12"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text"
          >
            Our Services
          </motion.h2>
          
          {/* Decorative underline */}
          <motion.div 
            variants={itemVariants}
            className="flex justify-center mb-3 md:mb-4"
          >
            <div className="h-0.5 md:h-1 w-16 md:w-20 bg-gradient-to-r from-secondary/0 via-secondary to-secondary/0 rounded-full" />
          </motion.div>
          
          <motion.p 
            variants={itemVariants}
            className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Professional dumpster rentals for every project size and type
          </motion.p>
        </motion.div>

        {/* Mobile: Pill Selector + Single Card */}
        <div className="md:hidden">
          {/* Pill Selector */}
          <motion.div
            variants={itemVariants}
            className="mb-6 relative"
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
                  <motion.button
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={`
                      flex items-center gap-2 px-4 py-2.5 rounded-full whitespace-nowrap snap-center flex-shrink-0 transition-colors duration-200
                      ${isActive 
                        ? 'bg-secondary text-white shadow-md border-2 border-secondary' 
                        : 'bg-background/80 text-foreground border-2 border-border'
                      }
                    `}
                    initial={{ scale: 0.97, opacity: 0.8 }}
                    animate={isActive ? { 
                      scale: 1, 
                      opacity: 1,
                      y: enableHeavyMotion ? -2 : 0
                    } : { 
                      scale: 1, 
                      opacity: 0.8,
                      y: 0
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      duration: DURATION.normal,
                      ease: EASING.smooth
                    }}
                    role="tab"
                    aria-selected={isActive}
                    aria-pressed={isActive}
                    aria-controls={`service-panel-${service.id}`}
                  >
                    <div 
                      className={`
                        w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0
                        ${isActive ? 'bg-white/20' : 'bg-secondary/10'}
                      `}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-secondary'}`} />
                    </div>
                    <span className="text-sm font-semibold">{service.title.split(' ')[0]}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Single Service Detail Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedService}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={cardVariants}
              id={`service-panel-${activeService.id}`}
              role="tabpanel"
              aria-labelledby={`service-tab-${activeService.id}`}
              className="bg-card rounded-2xl border-2 border-border shadow-md p-5"
            >
              <div className="flex items-start gap-3 mb-3">
                <div 
                  className="w-10 h-10 rounded-xl bg-secondary/10 border-2 border-secondary/20 flex items-center justify-center flex-shrink-0"
                >
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
          </AnimatePresence>
        </div>

        {/* Tablet/Desktop: Grid Layout */}
        <motion.div
          variants={itemVariants}
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: isMobile ? 0.3 : 0.6, 
                  delay: index * (isMobile ? 0.06 : 0.08),
                  ease: EASING.smooth
                }}
                whileHover={enableHeavyMotion ? { y: -6, scale: 1.02 } : {}}
              >
                <Link 
                  to={service.href}
                  className="block group h-full"
                >
                  <div 
                    className="h-full bg-card rounded-2xl border-2 border-border shadow-md p-5 lg:p-6 overflow-hidden relative group-hover:border-secondary/50 transition-colors"
                  >
                    <div className="relative z-10">
                      {/* Icon */}
                      <div 
                        className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-secondary/10 border-2 border-secondary/20 mb-4"
                      >
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
                      <div className="flex items-center gap-2 text-secondary font-medium text-sm">
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ServicesShowcase;
