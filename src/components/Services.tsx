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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section id="services" className="py-32 bg-gradient-to-b from-background via-muted/30 to-background relative z-10 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--secondary)/0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--secondary)/0.05),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            Our Services
          </h2>
          
          {/* Decorative underline */}
          <div className="flex justify-center mb-6">
            <div className="h-1 w-24 bg-gradient-to-r from-secondary/0 via-secondary to-secondary/0 rounded-full" />
          </div>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Professional dumpster rentals for every project size and type
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Link 
                to="/services" 
                className="block group h-full"
                onClick={() => window.scrollTo(0, 0)}
              >
                <div className="relative h-full bg-card rounded-2xl border border-border/50 p-8 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] hover:border-secondary/30 hover:-translate-y-2 hover:scale-[1.02]">
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-secondary/0 via-secondary/0 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon badge */}
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary/10 to-secondary/20 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(66,138,87,0.3)]">
                      <service.icon className="h-8 w-8 text-secondary group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold mb-4 text-card-foreground group-hover:text-secondary transition-colors duration-300">
                      {service.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed mb-6 min-h-[4rem]">
                      {service.description}
                    </p>
                    
                    {/* Learn More link */}
                    <div className="flex items-center gap-2 text-secondary font-medium group-hover:gap-3 transition-all duration-300">
                      <span className="text-sm">Learn More</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                  
                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl" />
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
