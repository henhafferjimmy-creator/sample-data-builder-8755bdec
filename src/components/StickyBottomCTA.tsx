import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const StickyBottomCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past 500px (roughly past hero)
      const shouldShow = window.scrollY > 500;
      setIsVisible(shouldShow && !isDismissed);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg pb-safe"
        >
          <div className="container mx-auto px-4 py-3 md:py-4">
            <div className="flex items-center justify-between gap-3">
              {/* Left: Text */}
              <p className="hidden sm:block text-sm md:text-base font-medium text-foreground">
                Need a dumpster? We deliver same-day!
              </p>
              <p className="sm:hidden text-sm font-medium text-foreground">
                Same-day delivery!
              </p>

              {/* Right: Buttons */}
              <div className="flex items-center gap-2 md:gap-3">
                <Button
                  asChild
                  size="sm"
                  className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white shadow-md"
                >
                  <Link to="/quote">Get Free Quote</Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-emerald-600 text-emerald-700 hover:bg-emerald-50"
                >
                  <a href="tel:856-237-3222" className="flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5" />
                    <span className="hidden md:inline">(856) 237-3222</span>
                    <span className="md:hidden">Call</span>
                  </a>
                </Button>

                {/* Dismiss Button */}
                <button
                  onClick={handleDismiss}
                  className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-gray-100 transition-colors"
                  aria-label="Dismiss"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyBottomCTA;
