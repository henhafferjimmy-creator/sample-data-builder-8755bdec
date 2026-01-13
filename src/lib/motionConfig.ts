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
 * Unified Motion Configuration
 * Single source of truth for all animation settings
 */
export const MOTION_CONFIG = {
  // Easing curves (cubic bezier)
  ease: {
    smooth: [0.43, 0.13, 0.23, 0.96] as [number, number, number, number],
    bounce: [0.68, -0.55, 0.265, 1.55] as [number, number, number, number],
    default: [0.4, 0, 0.2, 1] as const,
    spring: { type: "spring" as const, stiffness: 400, damping: 30 },
    springBouncy: { type: "spring" as const, stiffness: 300, damping: 30 },
  },
  // Durations
  duration: {
    fast: 0.18,
    normal: 0.25,
    medium: 0.4,
    slow: 0.6,
    verySlow: 0.8,
    reveal: 0.6,
    button: 0.2,
  },
  // Delays
  delay: {
    stagger: 0.08,
    short: 0.15,
    medium: 0.3,
  },
  // Stagger settings
  stagger: {
    container: 0.12,
    delay: 0.2,
  },
  // Parallax settings
  parallax: {
    range: [-30, 30] as [number, number],
    scrollRange: [0, 600] as [number, number],
  },
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
      duration: shouldReduceMotion ? 0 : MOTION_CONFIG.duration.slow,
      ease: MOTION_CONFIG.ease.default,
    },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: MOTION_CONFIG.duration.slow,
      ease: MOTION_CONFIG.ease.default,
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
      duration: MOTION_CONFIG.duration.medium,
      ease: MOTION_CONFIG.ease.default,
    },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: (shouldReduceMotion: boolean) => ({
    opacity: 1,
    transition: {
      staggerChildren: shouldReduceMotion ? 0 : MOTION_CONFIG.delay.stagger,
      delayChildren: shouldReduceMotion ? 0 : 0.1,
    },
  }),
};

/**
 * Helper to check reduced motion preference (for SSR-safe initial render)
 */
export const getPrefersReducedMotion = () => 
  typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;
