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
    <section className="relative min-h-screen flex items-center pt-20" id="home">
      <motion.div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          opacity,
          scale,
          y,
        }}
      />
      
      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Driveway Safe Dumpster Rentals
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
            Professional dumpster rental service that respects your time, your property, and your peace of mind.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/quote">
              <Button size="lg" className="text-lg px-8 py-6 font-semibold">
                Book Your Dumpster
              </Button>
            </Link>
            <a href="tel:856-237-3222">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6 font-semibold">
                <Phone className="mr-2 h-5 w-5" />
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
