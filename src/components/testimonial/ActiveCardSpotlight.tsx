import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ActiveCardSpotlightProps {
  selectedIndex: number;
  totalCards: number;
  prefersReducedMotion?: boolean;
}

const ActiveCardSpotlight = ({ 
  selectedIndex, 
  totalCards, 
  prefersReducedMotion = false 
}: ActiveCardSpotlightProps) => {
  const [spotlightPosition, setSpotlightPosition] = useState(0);

  useEffect(() => {
    // Calculate position as percentage based on selected index
    // For mobile: center, for larger screens: calculate based on card position
    const calculatePosition = () => {
      if (typeof window === 'undefined') return 50;
      
      if (window.innerWidth < 640) {
        // Mobile: always center
        return 50;
      } else if (window.innerWidth < 768) {
        // Small tablet: slight offset
        return 50 + (selectedIndex * 5);
      } else if (window.innerWidth < 1024) {
        // Tablet: show two cards, alternate between left and right
        return selectedIndex % 2 === 0 ? 35 : 65;
      } else {
        // Desktop: three cards visible, position based on thirds
        const cardWidth = 33.33;
        return (selectedIndex % 3) * cardWidth + cardWidth / 2;
      }
    };

    setSpotlightPosition(calculatePosition());
  }, [selectedIndex, totalCards]);

  return (
    <motion.div
      className="absolute top-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 rounded-full pointer-events-none"
      style={{
        background: 'radial-gradient(circle, rgba(var(--secondary-rgb, 34, 197, 94), 0.15) 0%, rgba(var(--secondary-rgb, 34, 197, 94), 0.05) 40%, transparent 70%)',
        filter: 'blur(60px)',
      }}
      animate={prefersReducedMotion ? {
        left: `${spotlightPosition}%`,
        x: '-50%'
      } : {
        left: `${spotlightPosition}%`,
        x: '-50%',
        scale: [1, 1.1, 1],
      }}
      transition={{
        left: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] },
        x: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] },
        scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
      }}
      aria-hidden="true"
    />
  );
};

export default ActiveCardSpotlight;
