import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";
import { motion, useScroll, useTransform } from "framer-motion";

const Hero = () => {
  const { scrollY } = useScroll();
  
  // Transform values based on scroll position
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.15]);
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section className="relative min-h-[70vh] md:min-h-[90vh] flex items-center pt-20 md:pt-20 pb-8 md:pb-0" id="home">
      <motion.div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: window.innerWidth > 768 ? 'fixed' : 'scroll',
          opacity,
          scale,
          y,
        }}
      />
      
      <div className="container mx-auto px-4 md:px-6 z-10 relative">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-3 md:mb-6 leading-tight">
            Driveway Safe Dumpster Rentals
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-5 md:mb-8 leading-relaxed">
            Professional dumpster rental service that respects your time, your property, and your peace of mind.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-2.5 md:gap-4">
            <Link to="/quote" className="w-full sm:w-auto">
              <Button size="lg" variant="cta" className="w-full sm:w-auto text-sm md:text-base lg:text-lg px-5 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6 font-semibold rounded-full">
                Book Your Dumpster
              </Button>
            </Link>
            <a href="tel:856-237-3222" className="w-full sm:w-auto">
              <Button size="lg" variant="ctaOutline" className="w-full sm:w-auto text-sm md:text-base lg:text-lg px-5 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6 font-semibold rounded-full">
                <Phone className="mr-2 h-4 md:h-5 w-4 md:w-5" />
                Call Now
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
