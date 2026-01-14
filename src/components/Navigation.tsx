import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/jims-logo.png";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        className="fixed top-2 md:top-4 inset-x-0 z-50 pointer-events-none"
        initial={{ y: shouldReduceMotion ? 0 : -16, opacity: shouldReduceMotion ? 1 : 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: "easeOut", delay: shouldReduceMotion ? 0 : 0.1 }}
      >
        <div className="container mx-auto px-3 md:px-4 flex items-center justify-between gap-2 md:gap-6 pointer-events-auto">
          <a href="/" onClick={handleLogoClick} className="flex items-center cursor-pointer flex-shrink-0">
            <img 
              src={logo} 
              alt="Jim's Dumpster Services" 
              className={`transition-all duration-300 drop-shadow-md hover:opacity-90 ${
                isScrolled ? "h-12 md:h-16" : "h-16 md:h-28 lg:h-32"
              }`}
            />
          </a>

          <div className="flex flex-1 justify-end items-center">
            <div
              className={`flex items-center gap-1 md:gap-2 rounded-full px-2 md:px-5 py-2 md:py-2.5 backdrop-blur-md transition-all duration-300 border ${
                isScrolled
                  ? "bg-foreground/90 border-foreground/50 shadow-xl"
                  : "bg-foreground/70 border-transparent shadow-lg"
              }`}
            >
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-1">
                <Link to="/" className="px-3 py-2 text-background/90 text-sm font-medium transition-colors hover:text-background/70 flex items-center">
                  Home
                </Link>
                <Link to="/services" className="px-3 py-2 text-background/90 text-sm font-medium transition-colors hover:text-background/70 flex items-center">
                  Services
                </Link>
                <Link to="/about" className="px-3 py-2 text-background/90 text-sm font-medium transition-colors hover:text-background/70 flex items-center">
                  About
                </Link>
              </div>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-background hover:text-background/70 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              {/* Quote Button */}
              <motion.div 
                whileHover={shouldReduceMotion ? {} : { y: -1, scale: 1.02 }} 
                whileTap={shouldReduceMotion ? {} : { scale: 0.97 }} 
                className="flex items-center"
              >
                <Link to="/quote">
                  <Button size="sm" variant="secondary" className="rounded-full px-4 md:px-6 py-1.5 md:py-2 font-semibold shadow-md hover:shadow-lg transition-shadow text-xs md:text-sm">
                    Quote
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: shouldReduceMotion ? 1 : 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            className="fixed inset-0 bg-background/95 backdrop-blur-lg z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ y: shouldReduceMotion ? 0 : -20, opacity: shouldReduceMotion ? 1 : 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: shouldReduceMotion ? 0 : -20, opacity: shouldReduceMotion ? 1 : 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: "easeOut" }}
              className="container mx-auto px-4 pt-24 pb-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col gap-2">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-6 py-4 text-foreground text-lg font-medium transition-colors hover:bg-muted rounded-2xl"
                >
                  Home
                </Link>
                <Link
                  to="/services"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-6 py-4 text-foreground text-lg font-medium transition-colors hover:bg-muted rounded-2xl"
                >
                  Services
                </Link>
                <Link
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-6 py-4 text-foreground text-lg font-medium transition-colors hover:bg-muted rounded-2xl"
                >
                  About
                </Link>
                <div className="mt-4">
                  <Link to="/quote" onClick={() => setMobileMenuOpen(false)}>
                    <Button size="lg" variant="cta" className="w-full rounded-2xl text-lg py-6">
                      Get A Free Quote
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
