import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Phone, Star, Shield, Check } from "lucide-react";
import heroImage from "@/assets/hero-bg-optimized.jpg";
import { motion, Variants, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { useMotionSettings } from "@/lib/motionConfig";

// Centralized animation configuration
const heroMotionConfig = {
  stagger: {
    container: 0.12,
    delay: 0.2,
  },
  duration: {
    reveal: 0.6,
    button: 0.2,
  },
  easing: [0.4, 0, 0.2, 1] as const,
  parallax: {
    range: [-30, 30],
    scrollRange: [0, 600],
  },
};

// Subtle noise texture SVG
const NoiseTexture = () => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.015] pointer-events-none z-10">
    <filter id="noiseFilter">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
  </svg>
);

const Hero = () => {
  const { isMobile, shouldReduceMotion, enableHeavyMotion } = useMotionSettings();
  const [showQuickActions, setShowQuickActions] = useState(false);
  
  // Parallax effect for background - disabled on mobile for performance
  const { scrollY } = useScroll();
  const backgroundY = useTransform(
    scrollY,
    heroMotionConfig.parallax.scrollRange,
    enableHeavyMotion ? heroMotionConfig.parallax.range : [0, 0]
  );

  // Show/hide mobile quick-action bar based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.4; // Show after scrolling 40% of viewport
      setShowQuickActions(window.scrollY > heroHeight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : heroMotionConfig.stagger.container,
        delayChildren: shouldReduceMotion ? 0 : heroMotionConfig.stagger.delay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: shouldReduceMotion ? 0 : heroMotionConfig.duration.reveal,
        ease: heroMotionConfig.easing,
      },
    },
  };

  return (
    <>
      <section
        className="relative min-h-screen md:min-h-[85vh] flex items-center pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden"
        id="home"
        aria-labelledby="hero-heading"
      >
        {/* Full glass card container - no blur on mobile for performance */}
        <div className={`absolute inset-0 bg-gradient-to-br from-black/60 via-black/70 to-black/80 ${isMobile ? '' : 'backdrop-blur-xl'}`} />
        
        {/* Background Image - more subtle, cropped within glass effect */}
        <motion.div 
          className="absolute inset-0 -z-10 opacity-40"
          style={{ y: isMobile ? 0 : backgroundY }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center scale-110"
            style={{
              backgroundImage: `url(${heroImage})`,
            }}
          />
        </motion.div>

        {/* Subtle noise texture overlay - lighter on mobile */}
        {!isMobile && <NoiseTexture />}

        <div className="container mx-auto px-4 md:px-6 z-10 relative">
          <motion.div
            className="max-w-3xl mx-auto md:mx-0"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Exclusive badge */}
            <motion.div
              variants={itemVariants}
              className={`inline-flex items-center gap-2 px-4 py-2 mb-4 md:mb-5 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs md:text-sm font-medium ${isMobile ? '' : 'backdrop-blur-md'}`}
            >
              <Shield className="h-3.5 w-3.5 md:h-4 md:w-4 text-emerald-400" />
              <span>Family-owned • Driveway Safe • Same-Day Available</span>
            </motion.div>

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
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                  transition={{ duration: heroMotionConfig.duration.button }}
                >
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-full px-6 md:px-8 py-5 md:py-6 text-sm md:text-base shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-shadow duration-200"
                  >
                    Book Your Dumpster
                  </Button>
                </motion.div>
              </Link>
              <a href="tel:856-237-3222" className="w-full sm:w-auto">
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                  transition={{ duration: heroMotionConfig.duration.button }}
                >
                  <Button
                    size="lg"
                    className={`w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full px-6 md:px-8 py-5 md:py-6 text-sm md:text-base border-2 border-white/40 hover:border-white/60 transition-all duration-200 shadow-lg group ${isMobile ? '' : 'backdrop-blur-md'}`}
                  >
                    <motion.div
                      className="inline-flex items-center"
                      whileHover={shouldReduceMotion ? {} : { x: 2 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Phone className="mr-2 h-4 md:h-5 w-4 md:w-5" />
                      Call Now
                    </motion.div>
                  </Button>
                </motion.div>
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
                <Check className="h-4 w-4 text-emerald-400" />
                <span className="font-medium">Fully licensed & insured</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mobile Quick-Action Bar */}
      <motion.div
        initial={false}
        animate={{ 
          y: showQuickActions ? 0 : 100,
          opacity: showQuickActions ? 1 : 0,
        }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: "easeOut" }}
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden pb-safe pointer-events-none"
        style={{ 
          paddingBottom: 'max(env(safe-area-inset-bottom), 1rem)',
        }}
      >
        <div className={`bg-background/95 ${isMobile ? '' : 'backdrop-blur-md'} border-t border-border shadow-2xl px-4 py-3 pointer-events-auto`}>
          <div className="flex gap-3 max-w-md mx-auto">
            <Link to="/quote" className="flex-1">
              <Button
                size="sm"
                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-full px-6 py-5 text-sm shadow-lg shadow-emerald-500/30"
              >
                Book Now
              </Button>
            </Link>
            <a href="tel:856-237-3222" className="flex-1">
              <Button
                size="sm"
                variant="outline"
                className="w-full rounded-full px-6 py-5 text-sm font-semibold border-2"
              >
                <Phone className="mr-2 h-4 w-4" />
                Call
              </Button>
            </a>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Hero;
