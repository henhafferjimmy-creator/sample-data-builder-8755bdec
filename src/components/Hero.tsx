import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Phone, Star, Shield, Check } from "lucide-react";
import jdMascot from "@/assets/jd-mascot.png";
import { motion, Variants, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { useMotionSettings, MOTION_CONFIG } from "@/lib/motionConfig";
import { PHONE_HREF } from "@/config/contact";

const Hero = () => {
  const { isMobile, shouldReduceMotion, enableHeavyMotion } = useMotionSettings();
  const [showQuickActions, setShowQuickActions] = useState(false);
  
  // Parallax effect for mascot - disabled on mobile for performance
  const { scrollY } = useScroll();
  const mascotY = useTransform(
    scrollY,
    [0, 300],
    enableHeavyMotion ? [0, 30] : [0, 0]
  );

  // Show/hide mobile quick-action bar based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.4;
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
        staggerChildren: shouldReduceMotion ? 0 : MOTION_CONFIG.stagger.container,
        delayChildren: shouldReduceMotion ? 0 : MOTION_CONFIG.stagger.delay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: shouldReduceMotion ? 0 : MOTION_CONFIG.duration.reveal,
        ease: MOTION_CONFIG.ease.default,
      },
    },
  };

  const mascotVariants: Variants = {
    hidden: { opacity: 0, x: -50, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { 
        duration: shouldReduceMotion ? 0 : 0.8,
        ease: "easeOut",
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
        {/* Dark green gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a2818] via-[#0d3520] to-[#061a0f]" />
        
        {/* Subtle radial gradient overlay for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent" />

        {/* Main Content Container - Centered Layout */}
        <div className="container mx-auto px-4 md:px-6 z-10 relative">
          {/* Business Name Header - Centered */}
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: 0.2 }}
            className="text-center mb-8 md:mb-12"
            style={{
              textShadow: "0 4px 30px rgba(0, 0, 0, 0.5), 0 2px 10px rgba(0, 0, 0, 0.3)",
            }}
          >
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold tracking-tight text-[#FF6B1A]">
              JIM'S
            </span>
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-white mt-1 md:mt-2">
              Dumpster Services
            </span>
          </motion.h2>

          {/* Two Column Layout - Mascot Left, Content Right */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16">
            {/* Mascot Section - Left Side with Glow */}
            <motion.div 
              className="relative flex items-center justify-center pointer-events-none md:w-[40%]"
              style={{ y: isMobile ? 0 : mascotY }}
              variants={mascotVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Glow effect behind mascot */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px]">
                {/* Primary emerald glow */}
                <div className="absolute inset-0 bg-gradient-radial from-emerald-500/30 via-emerald-600/15 to-transparent rounded-full blur-3xl" />
                {/* Secondary deeper glow for blend effect */}
                <div className="absolute inset-8 bg-gradient-radial from-emerald-400/20 via-emerald-500/10 to-transparent rounded-full blur-2xl" />
                {/* Subtle yellow/orange accent glow */}
                <div className="absolute inset-16 bg-gradient-radial from-yellow-500/10 via-transparent to-transparent rounded-full blur-2xl" />
              </div>
              
              {/* Mascot image */}
              <motion.img
                src={jdMascot}
                alt="Jim's Dumpster Services Mascot"
                className="relative z-10 h-[35vh] md:h-[45vh] lg:h-[55vh] w-auto object-contain"
                style={{
                  filter: "drop-shadow(0 0 60px rgba(16, 185, 129, 0.4)) drop-shadow(0 0 100px rgba(16, 185, 129, 0.2))",
                }}
              />
            </motion.div>

            {/* Content Section - Right Side */}
            <motion.div
              className="max-w-xl text-center md:text-left md:w-[50%]"
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
              Driveway Safe{" "}
              <span className="block">Dumpster Rentals</span>
            </motion.h1>

            {/* Supporting Paragraph */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-white/90 mb-6 md:mb-8 leading-relaxed max-w-xl md:max-w-lg"
            >
              Professional dumpster rental service that respects your time, your
              property, and your peace of mind.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 md:mb-8 justify-center md:justify-start"
            >
              <Link to="/quote" className="w-full sm:w-auto">
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                  transition={{ duration: MOTION_CONFIG.duration.button }}
                >
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-full px-6 md:px-8 py-5 md:py-6 text-sm md:text-base shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-shadow duration-200"
                  >
                    Book Your Dumpster
                  </Button>
                </motion.div>
              </Link>
              <a href={PHONE_HREF} className="w-full sm:w-auto">
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                  transition={{ duration: MOTION_CONFIG.duration.button }}
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
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-white/80 text-xs md:text-sm justify-center md:justify-start"
            >
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                </div>
                <span className="font-medium">5.0 from local homeowners</span>
              </div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Check className="h-4 w-4 text-emerald-400" />
                <span className="font-medium">Fully licensed & insured</span>
              </div>
            </motion.div>
          </motion.div>
          </div>
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
            <a href={PHONE_HREF} className="flex-1">
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
