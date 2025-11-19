import { motion, Variants } from "framer-motion";
import { Home, Hammer, Leaf, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Home,
    title: "Residential Dumpster Rentals",
    description: "Perfect for homeowners tackling renovations, garage cleanouts, or seasonal decluttering.",
  },
  {
    icon: Hammer,
    title: "Construction & Remodeling Debris Dumpsters",
    description: "Ideal for contractors, builders, and remodeling projects.",
  },
  {
    icon: Leaf,
    title: "Landscaping & Yard Waste Dumpsters",
    description: "Great for yard cleanups, brush removal, grass, soil, branches, and outdoor project waste.",
  },
];

const Services = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, backgroundColor: 'rgba(0, 0, 0, 0.06)' },
    visible: {
      opacity: 1,
      y: 0,
      backgroundColor: 'transparent',
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    },
  };

  return (
    <section id="services" className="py-10 md:py-20 lg:py-28 bg-gradient-to-b from-[hsl(var(--services-bg-start))] to-[hsl(var(--services-bg-end))] relative z-10 overflow-hidden">
      {/* Subtle geometric pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--secondary)) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />
      
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--secondary)/0.04),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--secondary)/0.04),transparent_50%)]" />
      
      <div className="container mx-auto px-4 md:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20, backgroundColor: 'rgba(0, 0, 0, 0.08)' }}
          whileInView={{ opacity: 1, y: 0, backgroundColor: 'transparent' }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-6 md:mb-12 lg:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            Our Services
          </h2>
          
          {/* Decorative underline */}
          <div className="flex justify-center mb-3 md:mb-5">
            <div className="h-0.5 md:h-1 w-16 md:w-20 bg-gradient-to-r from-secondary/0 via-secondary to-secondary/0 rounded-full" />
          </div>
          
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
            Professional dumpster rentals for every project size and type
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-7xl mx-auto"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Link 
                to="/services" 
                className="block group h-full"
                onClick={() => window.scrollTo(0, 0)}
              >
                <div className="relative h-full bg-card rounded-xl md:rounded-2xl border-2 border-border shadow-[var(--shadow-lg)] p-4 md:p-6 lg:p-8 transition-all duration-500 hover:shadow-[var(--shadow-xl)] hover:shadow-secondary/20 hover:border-secondary/50 hover:-translate-y-2 hover:scale-[1.02]">
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-br from-secondary/0 via-secondary/0 to-secondary/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon badge - clearly separated from white card */}
                    <div className="inline-flex items-center justify-center w-11 md:w-14 lg:w-16 h-11 md:h-14 lg:h-16 rounded-xl md:rounded-2xl bg-[hsl(var(--icon-badge-bg))] border-2 md:border-3 border-[hsl(var(--icon-badge-border))] mb-3 md:mb-4 lg:mb-6 shadow-[var(--shadow-md)] group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 group-hover:shadow-[var(--shadow-glow-secondary)] group-hover:border-secondary">
                      <service.icon className="h-5 md:h-6 lg:h-8 w-5 md:w-6 lg:w-8 text-secondary group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-base md:text-lg lg:text-xl font-bold mb-2 md:mb-3 text-card-foreground group-hover:text-secondary transition-colors duration-300">
                      {service.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-xs md:text-sm lg:text-base text-muted-foreground leading-relaxed mb-3 md:mb-5">
                      {service.description}
                    </p>
                    
                    {/* Learn More link */}
                    <div className="flex items-center gap-1.5 md:gap-2 text-secondary font-medium group-hover:gap-2 md:group-hover:gap-3 transition-all duration-300">
                      <span className="text-xs md:text-sm">Learn More</span>
                      <ArrowRight className="h-3 md:h-3.5 lg:h-4 w-3 md:w-3.5 lg:w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                  
                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-xl md:rounded-b-2xl" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
