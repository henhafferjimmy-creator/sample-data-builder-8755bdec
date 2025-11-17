import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/jims-logo.png";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
    <motion.nav
      className="fixed top-4 inset-x-0 z-50 pointer-events-none"
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 flex items-center justify-between gap-6 pointer-events-auto">
        <a href="/" onClick={handleLogoClick} className="flex items-center cursor-pointer">
          <img 
            src={logo} 
            alt="Jim's Dumpster Services" 
            className={`transition-all duration-300 drop-shadow-md hover:opacity-90 ${
              isScrolled ? "h-16" : "h-28 md:h-32"
            }`}
          />
        </a>

        <div className="flex flex-1 justify-end items-center">
          <div
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 shadow-lg backdrop-blur-md transition-all duration-300 border ${
              isScrolled
                ? "bg-foreground/80 border-foreground/40"
                : "bg-foreground/70 border-transparent"
            }`}
          >
            <div className="hidden md:flex items-center gap-1">
              <Link to="/" className="px-3 py-2 text-background/90 text-sm font-medium transition-colors hover:text-background/70 flex items-center">
                Home
              </Link>
              <Link to="/services" className="px-3 py-2 text-background/90 text-sm font-medium transition-colors hover:text-background/70 flex items-center">
                Services
              </Link>
              <Link to="/#about" className="px-3 py-2 text-background/90 text-sm font-medium transition-colors hover:text-background/70 flex items-center">
                About
              </Link>
              <Link to="/#contact" className="px-3 py-2 text-background/90 text-sm font-medium transition-colors hover:text-background/70 flex items-center">
                Contact
              </Link>
            </div>

            <motion.div whileHover={{ y: -1, scale: 1.02 }} whileTap={{ scale: 0.97 }} className="flex items-center">
              <Link to="/quote">
                <Button size="lg" variant="secondary" className="rounded-full px-6 py-2 font-semibold shadow-md hover:shadow-lg transition-shadow text-sm">
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
