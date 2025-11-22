import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { motion, Variants } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { Testimonial } from "@/types/testimonial";
import BackgroundBlobs from "@/components/testimonial/BackgroundBlobs";
import NoiseTexture from "@/components/testimonial/NoiseTexture";
import ActiveCardSpotlight from "@/components/testimonial/ActiveCardSpotlight";
import { useMotionSettings } from "@/lib/motionConfig";

// Motion configuration for consistent, premium animations
const MOTION_CONFIG = {
  // Easing curves (cubic bezier)
  ease: {
    smooth: [0.43, 0.13, 0.23, 0.96] as [number, number, number, number],
    bounce: [0.68, -0.55, 0.265, 1.55] as [number, number, number, number],
    spring: { type: "spring" as const, stiffness: 300, damping: 30 }
  },
  // Durations
  duration: {
    fast: 0.2,
    normal: 0.4,
    slow: 0.6,
    verySlow: 0.8
  },
  // Delays
  delay: {
    stagger: 0.08,
    short: 0.15,
    medium: 0.3
  }
};

// Check for reduced motion preference
const getPrefersReducedMotion = () => 
  typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  showReadMoreButton?: boolean;
  onReadMoreClick?: () => void;
}

const TestimonialCarousel = ({ 
  testimonials, 
  showReadMoreButton = true,
  onReadMoreClick 
}: TestimonialCarouselProps) => {
  const { shouldReduceMotion } = useMotionSettings();
  const prefersReducedMotion = getPrefersReducedMotion();
  
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: "start",
      skipSnaps: false,
      dragFree: false,
      containScroll: "trimSnaps",
    },
    [Autoplay({ 
      delay: 5000,
      stopOnInteraction: true, 
      stopOnMouseEnter: true 
    })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const TestimonialCard = ({ testimonial, isActive }: { testimonial: Testimonial; isActive: boolean }) => {
    const [hasAnimated, setHasAnimated] = useState(false);
    
    // Star animation variants
    const starVariants: Variants = {
      hidden: { scale: 0.5, opacity: 0 },
      visible: (i: number) => ({
        scale: 1,
        opacity: 1,
        transition: {
          delay: i * 0.05,
          duration: MOTION_CONFIG.duration.fast,
          ease: MOTION_CONFIG.ease.bounce
        }
      })
    };

    // Card transition variants
    const cardVariants: Variants = {
      inactive: {
        opacity: prefersReducedMotion ? 1 : 0.85,
        transition: {
          duration: MOTION_CONFIG.duration.normal,
          ease: MOTION_CONFIG.ease.smooth
        }
      },
      active: {
        opacity: 1,
        transition: {
          duration: MOTION_CONFIG.duration.normal,
          ease: MOTION_CONFIG.ease.smooth
        }
      }
    };

    return (
      <motion.div
        variants={cardVariants}
        initial="inactive"
        animate={isActive ? "active" : "inactive"}
        className="h-full will-change-transform"
      >
        <Card 
          className={`
            h-full rounded-2xl transition-shadow duration-300
            bg-card border-2 
            ${isActive 
              ? 'border-border shadow-[0_10px_40px_rgba(0,0,0,0.15)]' 
              : 'border-border/60 shadow-[0_4px_20px_rgba(0,0,0,0.08)]'
            }
          `}
          role="article"
          aria-label={`Testimonial from ${testimonial.author}`}
        >
          <CardContent className="p-5 md:p-6 flex flex-col h-full">
            {/* Quote Text */}
            <motion.p 
              className="text-sm md:text-base mb-4 text-foreground leading-relaxed flex-grow"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: MOTION_CONFIG.duration.normal, delay: MOTION_CONFIG.delay.short }}
            >
              "{testimonial.quote}"
            </motion.p>

            {/* Rating */}
            <motion.div 
              className="flex gap-1 mb-4" 
              role="img" 
              aria-label={`${testimonial.rating} out of 5 stars`}
              onViewportEnter={() => !hasAnimated && setHasAnimated(true)}
            >
              {[...Array(testimonial.rating)].map((_, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={prefersReducedMotion ? {} : starVariants}
                  initial={hasAnimated ? "visible" : "hidden"}
                  animate={hasAnimated || prefersReducedMotion ? "visible" : "hidden"}
                  whileHover={prefersReducedMotion ? {} : { scale: 1.15, rotate: 5 }}
                >
                  <Star
                    className="w-4 h-4 fill-secondary text-secondary"
                    aria-hidden="true"
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Author Info */}
            <motion.div 
              className="flex items-center gap-3"
              initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: MOTION_CONFIG.duration.normal, delay: MOTION_CONFIG.delay.medium }}
            >
              <motion.div 
                className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary/20 to-secondary/10 border-2 border-secondary/30 flex items-center justify-center text-secondary font-bold text-sm flex-shrink-0"
                aria-hidden="true"
                whileHover={prefersReducedMotion ? {} : { scale: 1.1, rotate: 5 }}
                transition={MOTION_CONFIG.ease.spring}
              >
                {testimonial.initials}
              </motion.div>
              <div className="min-w-0">
                <p className="font-semibold text-foreground text-sm truncate">
                  {testimonial.author}
                </p>
                <p className="text-xs text-muted-foreground truncate">{testimonial.location}</p>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  // Staggered header animation variants
  const headerVariants: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: MOTION_CONFIG.duration.slow,
        ease: MOTION_CONFIG.ease.smooth,
        staggerChildren: MOTION_CONFIG.delay.stagger
      }
    }
  };

  const headerItemVariants: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: MOTION_CONFIG.duration.normal,
        ease: MOTION_CONFIG.ease.smooth
      }
    }
  };

  return (
    <motion.section 
      className="py-12 md:py-16 lg:py-20 px-4 bg-gradient-to-b from-[hsl(var(--testimonials-bg-start))] to-[hsl(var(--testimonials-bg-end))] relative overflow-hidden"
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={prefersReducedMotion ? {} : headerVariants}
    >
      {/* Decorative Background Elements */}
      <BackgroundBlobs prefersReducedMotion={prefersReducedMotion} />
      <NoiseTexture />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-8 md:mb-10 lg:mb-12"
          variants={prefersReducedMotion ? {} : headerItemVariants}
        >
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3 text-foreground"
            variants={prefersReducedMotion ? {} : headerItemVariants}
          >
            What Our Clients Say
          </motion.h2>
          <motion.p 
            className="text-sm md:text-base text-muted-foreground"
            variants={prefersReducedMotion ? {} : headerItemVariants}
          >
            Real reviews from local customers
          </motion.p>
        </motion.div>

        {/* Carousel Container */}
        <motion.div 
          className="relative max-w-6xl mx-auto"
          variants={prefersReducedMotion ? {} : headerItemVariants}
        >
          {/* Active Card Spotlight */}
          <ActiveCardSpotlight 
            selectedIndex={selectedIndex} 
            totalCards={testimonials.length}
            prefersReducedMotion={prefersReducedMotion}
          />
          
          {/* Carousel Viewport */}
          <div className="overflow-hidden relative z-10" ref={emblaRef}>
            <div className="flex gap-4 md:gap-6">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] sm:flex-[0_0_85%] md:flex-[0_0_48%] lg:flex-[0_0_32%] min-w-0"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${testimonials.length}`}
                >
                  <TestimonialCard 
                    testimonial={testimonial} 
                    isActive={index === selectedIndex || Math.abs(index - selectedIndex) <= 1}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons - Desktop Only */}
          <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-0 right-0 justify-between pointer-events-none px-2">
            <motion.div
              whileHover={prefersReducedMotion ? {} : { scale: 1.1, x: -2 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              transition={MOTION_CONFIG.ease.spring}
            >
              <Button
                variant="outline"
                size="icon"
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                className="pointer-events-auto rounded-full bg-background/90 backdrop-blur-sm border-2 shadow-lg disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </motion.div>
            <motion.div
              whileHover={prefersReducedMotion ? {} : { scale: 1.1, x: 2 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              transition={MOTION_CONFIG.ease.spring}
            >
              <Button
                variant="outline"
                size="icon"
                onClick={scrollNext}
                disabled={!canScrollNext}
                className="pointer-events-auto rounded-full bg-background/90 backdrop-blur-sm border-2 shadow-lg disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Dot Indicators */}
        <motion.div 
          className="flex justify-center gap-2 mt-6 md:mt-8" 
          role="tablist" 
          aria-label="Testimonial slides"
          variants={prefersReducedMotion ? {} : headerItemVariants}
        >
          {testimonials.map((_, index) => {
            const isActive = index === selectedIndex;
            return (
              <motion.button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: isActive ? 32 : 8,
                  backgroundColor: isActive ? 'hsl(142, 35%, 40%)' : 'hsl(0, 0%, 45%, 0.3)'
                }}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={isActive ? "true" : "false"}
                role="tab"
                whileHover={prefersReducedMotion ? {} : { scale: 1.2 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
                transition={{ 
                  width: { duration: MOTION_CONFIG.duration.normal, ease: MOTION_CONFIG.ease.smooth },
                  scale: MOTION_CONFIG.ease.spring
                }}
              />
            );
          })}
        </motion.div>

        {/* Read More Button */}
        {showReadMoreButton && (
          <motion.div
            className="mt-8 md:mt-10 text-center"
            variants={prefersReducedMotion ? {} : headerItemVariants}
          >
            <motion.div
              whileHover={prefersReducedMotion ? {} : { 
                scale: 1.03, 
                y: -2,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.15)"
              }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
              transition={MOTION_CONFIG.ease.spring}
            >
              <Button
                variant="outline"
                size="lg"
                onClick={onReadMoreClick}
                className="group w-full sm:w-auto rounded-full px-6 md:px-8 py-5 md:py-6 font-semibold border-2 hover:bg-secondary/10 hover:border-secondary transition-colors shadow-md hover:shadow-lg inline-flex items-center gap-2"
              >
                Read More Reviews
                <motion.div
                  initial={{ x: 0 }}
                  animate={prefersReducedMotion ? {} : { x: [0, 4, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default TestimonialCarousel;
