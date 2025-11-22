import { useEffect, useState } from 'react';
import { Variants } from 'framer-motion';

/**
 * Centralized motion configuration system
 * Detects mobile devices and reduced motion preferences
 * Provides consistent animation settings across all components
 */

export const useMotionSettings = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    // Check mobile breakpoint (md: 768px)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check prefers-reduced-motion
    const checkReducedMotion = () => {
      setShouldReduceMotion(
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      );
    };

    checkMobile();
    checkReducedMotion();

    window.addEventListener('resize', checkMobile);
    
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionQuery.addEventListener('change', checkReducedMotion);

    return () => {
      window.removeEventListener('resize', checkMobile);
      motionQuery.removeEventListener('change', checkReducedMotion);
    };
  }, []);

  // Heavy animations only enabled on desktop with full motion
  const enableHeavyMotion = !isMobile && !shouldReduceMotion;

  return {
    isMobile,
    shouldReduceMotion,
    enableHeavyMotion,
  };
};

/**
 * Shared animation variants for consistent behavior
 */

export const fadeInUp: Variants = {
  hidden: (shouldReduceMotion: boolean) => ({
    opacity: 0,
    y: shouldReduceMotion ? 0 : 20,
  }),
  visible: (shouldReduceMotion: boolean) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: shouldReduceMotion ? 0 : 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export const scaleIn: Variants = {
  hidden: (shouldReduceMotion: boolean) => ({
    opacity: 0,
    scale: shouldReduceMotion ? 1 : 0.95,
  }),
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: (shouldReduceMotion: boolean) => ({
    opacity: 1,
    transition: {
      staggerChildren: shouldReduceMotion ? 0 : 0.08,
      delayChildren: shouldReduceMotion ? 0 : 0.1,
    },
  }),
};
