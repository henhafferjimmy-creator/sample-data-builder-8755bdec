import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Phone, Star, Shield } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";
import { motion, useReducedMotion, Variants } from "framer-motion";

const Hero = () => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.5 },
    },
  };

  return (
    <section
      className="relative min-h-screen md:min-h-[85vh] flex items-center pt-32 pb-16 md:pt-40 md:pb-20 rounded-b-3xl md:rounded-b-[40px] overflow-hidden"
      id="home"
      aria-labelledby="hero-heading"
    >
      {/* Background Image with Gradient Overlays and Vignette */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        />
        {/* Dark gradient overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/40" />
        {/* Subtle vignette for premium feel */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 z-10 relative">
        <motion.div
          className="max-w-3xl mx-auto md:mx-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow */}
          <motion.p
            variants={itemVariants}
            className="text-emerald-400 font-semibold text-sm md:text-base mb-3 md:mb-4 tracking-wide uppercase"
          >
            South Jersey's Trusted Dumpster Pros
          </motion.p>

          {/* Main Headline */}
          <motion.h1
            id="hero-heading"
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight"
          >
            Driveway Safe Dumpster Rentals
          </motion.h1>

          {/* Supporting Paragraph */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-white/90 mb-6 md:mb-8 leading-relaxed max-w-2xl"
          >
            Professional dumpster rental service that respects your time, your
            property, and your peace of mind.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 md:mb-8"
          >
            <Link to="/quote" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-full px-6 md:px-8 py-5 md:py-6 text-sm md:text-base shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-300"
              >
                Book Your Dumpster
              </Button>
            </Link>
            <a href="tel:856-237-3222" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold rounded-full px-6 md:px-8 py-5 md:py-6 text-sm md:text-base border-2 border-white/40 hover:border-white/60 transition-all duration-300 shadow-lg"
              >
                <Phone className="mr-2 h-4 md:h-5 w-4 md:w-5" />
                Call Now
              </Button>
            </a>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-white/80 text-xs md:text-sm"
          >
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              </div>
              <span className="font-medium">5.0 from local homeowners</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-emerald-400" />
              <span className="font-medium">Fully licensed & insured</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
