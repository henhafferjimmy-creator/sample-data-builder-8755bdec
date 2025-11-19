import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Variants } from "framer-motion";

/**
 * Central motion configuration system
 * Automatically reduces/disables heavy effects on mobile and for reduced-motion preferences
 */

// Detect mobile breakpoint (matches Tailwind's md: 768px)
const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(max-width: 768px)');
    
    const handleChange = () => setIsMobile(mediaQuery.matches);
    handleChange(); // Set initial value
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return isMobile;
};

/**
 * Main motion settings hook
 * Returns motion configuration based on device and user preferences
 */
export const useMotionSettings = () => {
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useMobile();
  const enableHeavyMotion = !isMobile && !shouldReduceMotion;

  return {
    isMobile,
    shouldReduceMotion,
    enableHeavyMotion,
  };
};

/**
 * Shared animation variants
 * Automatically adapt to mobile/reduced-motion preferences
 */

interface VariantConfig {
  mobile: {
    y?: number;
    scale?: number;
    opacity?: number;
  };
  desktop: {
    y?: number;
    scale?: number;
    opacity?: number;
  };
}

const createResponsiveVariant = (
  config: VariantConfig,
  isMobile: boolean,
  shouldReduceMotion: boolean
): Variants => {
  const settings = isMobile || shouldReduceMotion ? config.mobile : config.desktop;
  
  return {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : settings.y,
      scale: shouldReduceMotion ? 1 : settings.scale,
    },
    visible: {
      opacity: settings.opacity ?? 1,
      y: 0,
      scale: 1,
      transition: {
        duration: isMobile || shouldReduceMotion ? 0.3 : 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };
};

// Fade in with subtle upward movement
export const fadeInUp = (isMobile: boolean, shouldReduceMotion: boolean): Variants =>
  createResponsiveVariant(
    {
      mobile: { y: 10, opacity: 0 },
      desktop: { y: 30, opacity: 0 },
    },
    isMobile,
    shouldReduceMotion
  );

// Simple fade in (no movement)
export const fadeIn = (shouldReduceMotion: boolean): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: shouldReduceMotion ? 0.2 : 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
});

// Scale in with fade
export const scaleIn = (isMobile: boolean, shouldReduceMotion: boolean): Variants => ({
  hidden: {
    opacity: 0,
    scale: shouldReduceMotion ? 1 : isMobile ? 0.97 : 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: isMobile || shouldReduceMotion ? 0.25 : 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
});

// Container with staggered children
export const staggerContainer = (isMobile: boolean, shouldReduceMotion: boolean): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: shouldReduceMotion ? 0 : isMobile ? 0.06 : 0.12,
      delayChildren: shouldReduceMotion ? 0 : isMobile ? 0.1 : 0.2,
    },
  },
});

/**
 * Easing curves for consistent animations
 */
export const EASING = {
  smooth: [0.4, 0, 0.2, 1] as [number, number, number, number],
  spring: { type: "spring" as const, stiffness: 400, damping: 30 },
} as const;

/**
 * Duration presets
 */
export const DURATION = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
} as const;
