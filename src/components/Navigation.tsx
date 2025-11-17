import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logo from "@/assets/jims-logo.png";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className="fixed top-4 left-1/2 z-50 w-[min(90vw,72rem)] -translate-x-1/2 pointer-events-none"
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between gap-6 px-4 pointer-events-auto">
        <Link to="/" className="flex items-center cursor-pointer">
          <img 
            src={logo} 
            alt="Jim's Dumpster Services" 
            className={`transition-all duration-300 drop-shadow-md hover:opacity-90 ${
              isScrolled ? "h-16" : "h-28 md:h-32"
            }`}
          />
        </Link>

        <div className="flex flex-1 justify-end">
          <div
            className={`flex items-center gap-3 rounded-full px-5 py-3 shadow-lg backdrop-blur-md transition-all duration-300 border ${
              isScrolled
                ? "bg-foreground/80 border-foreground/40"
                : "bg-foreground/70 border-transparent"
            }`}
          >
            <div className="hidden md:flex items-center gap-4">
              <Link to="/" className="px-4 py-2 text-background/90 text-sm font-medium transition-colors hover:text-background/70">
                Home
              </Link>
              <Link to="/services" className="px-4 py-2 text-background/90 text-sm font-medium transition-colors hover:text-background/70">
                Services
              </Link>
              <Link to="/#about" className="px-4 py-2 text-background/90 text-sm font-medium transition-colors hover:text-background/70">
                About
              </Link>
              <Link to="/#contact" className="px-4 py-2 text-background/90 text-sm font-medium transition-colors hover:text-background/70">
                Contact
              </Link>
            </div>

            <motion.div whileHover={{ y: -1, scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Link to="/quote">
                <Button size="lg" variant="secondary" className="rounded-full px-6 font-semibold shadow-md hover:shadow-lg transition-shadow">
                  Get A Quote
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
