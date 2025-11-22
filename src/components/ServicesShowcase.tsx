import { useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Home, Hammer, Leaf, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Service } from "@/types/service";
import { useMotionSettings } from "@/lib/motionConfig";

// Motion configuration for consistent, premium animations
const MOTION_CONFIG = {
  ease: {
    smooth: [0.43, 0.13, 0.23, 0.96] as [number, number, number, number],
    spring: { type: "spring" as const, stiffness: 400, damping: 30 }
  },
  duration: {
    fast: 0.18,
    normal: 0.25,
    slow: 0.6
  },
  stagger: 0.08
};

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
  const { shouldReduceMotion } = useMotionSettings();

  // Container animation with stagger
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : MOTION_CONFIG.stagger,
        delayChildren: shouldReduceMotion ? 0 : 0.1
      }
    }
  };

  // Item animations for stagger effect
  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 32 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : MOTION_CONFIG.duration.slow,
        ease: MOTION_CONFIG.ease.smooth
      }
    }
  };

  // Detail card transition variants
  const cardVariants: Variants = {
    initial: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.97,
      y: shouldReduceMotion ? 0 : 8
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: MOTION_CONFIG.duration.fast,
        ease: MOTION_CONFIG.ease.smooth
      }
    },
    exit: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.97,
      y: shouldReduceMotion ? 0 : -8,
      transition: {
        duration: MOTION_CONFIG.duration.fast,
        ease: MOTION_CONFIG.ease.smooth
      }
    }
  };

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
                      y: shouldReduceMotion ? 0 : -2
                    } : { 
                      scale: 1, 
                      opacity: 0.8,
                      y: 0
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      duration: MOTION_CONFIG.duration.normal,
                      ease: MOTION_CONFIG.ease.smooth
                    }}
                    role="tab"
                    aria-selected={isActive}
                    aria-pressed={isActive}
                    aria-controls={`service-panel-${service.id}`}
                  >
                    <motion.div 
                      className={`
                        w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0
                        ${isActive ? 'bg-white/20' : 'bg-secondary/10'}
                      `}
                      animate={isActive && !shouldReduceMotion ? {
                        boxShadow: '0 0 12px rgba(66, 138, 87, 0.4)'
                      } : {
                        boxShadow: '0 0 0px rgba(66, 138, 87, 0)'
                      }}
                      transition={{ duration: MOTION_CONFIG.duration.normal }}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-secondary'}`} />
                    </motion.div>
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
              variants={cardVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              id={`service-panel-${activeService.id}`}
              role="tabpanel"
              aria-labelledby={`service-tab-${activeService.id}`}
              className="bg-card rounded-2xl border-2 border-border shadow-md p-5"
            >
              <div className="flex items-start gap-3 mb-3">
                <motion.div 
                  className="w-10 h-10 rounded-xl bg-secondary/10 border-2 border-secondary/20 flex items-center justify-center flex-shrink-0"
                  animate={!shouldReduceMotion ? {
                    boxShadow: ['0 0 0px rgba(66, 138, 87, 0)', '0 0 16px rgba(66, 138, 87, 0.3)', '0 0 0px rgba(66, 138, 87, 0)']
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  {(() => {
                    const Icon = activeService.icon;
                    return <Icon className="w-5 h-5 text-secondary" />;
                  })()}
                </motion.div>
                <h3 className="text-lg font-bold text-foreground leading-tight">
                  {activeService.title}
                </h3>
              </div>
              
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {activeService.description}
              </p>
              
              <motion.div whileHover={{ x: shouldReduceMotion ? 0 : 4 }} whileTap={{ scale: 0.98 }}>
                <Link 
                  to={activeService.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:text-secondary/80 transition-colors group"
                >
                  Learn More
                  <motion.div
                    animate={!shouldReduceMotion ? { x: [0, 3, 0] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.div>
                </Link>
              </motion.div>
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: MOTION_CONFIG.duration.slow, 
                  delay: index * MOTION_CONFIG.stagger,
                  ease: MOTION_CONFIG.ease.smooth
                }}
                whileHover={shouldReduceMotion ? {} : { y: -6, scale: 1.02 }}
              >
                <Link 
                  to={service.href}
                  className="block group h-full"
                >
                  <motion.div 
                    className="h-full bg-card rounded-2xl border-2 border-border shadow-md transition-all duration-300 p-5 lg:p-6 overflow-hidden relative"
                    whileHover={{ 
                      borderColor: 'hsl(142, 35%, 40%, 0.5)',
                      boxShadow: '0 12px 32px rgba(0,0,0,0.12)'
                    }}
                  >
                    {/* Subtle gradient overlay on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-secondary/0 via-secondary/0 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      aria-hidden="true"
                    />
                    
                    <div className="relative z-10">
                      {/* Icon */}
                      <motion.div 
                        className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-secondary/10 border-2 border-secondary/20 mb-4"
                        whileHover={shouldReduceMotion ? {} : { 
                          scale: 1.1, 
                          rotate: 5,
                          boxShadow: '0 0 16px rgba(66, 138, 87, 0.3)'
                        }}
                        transition={MOTION_CONFIG.ease.spring}
                      >
                        <Icon className="w-6 h-6 text-secondary" />
                      </motion.div>
                      
                      {/* Title */}
                      <h3 className="text-lg lg:text-xl font-bold mb-2 text-foreground group-hover:text-secondary transition-colors">
                        {service.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {service.description}
                      </p>
                      
                      {/* Learn More Link */}
                      <motion.div 
                        className="flex items-center gap-2 text-secondary font-medium text-sm"
                        whileHover={{ gap: 12 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span>Learn More</span>
                        <motion.div
                          animate={!shouldReduceMotion ? { x: [0, 3, 0] } : {}}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>
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
