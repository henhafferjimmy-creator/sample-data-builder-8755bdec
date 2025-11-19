import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, Variants } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState, useRef } from "react";
import { Testimonial } from "@/types/testimonial";

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
const prefersReducedMotion = typeof window !== 'undefined' 
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
    const cardRef = useRef<HTMLDivElement>(null);
    const [hasAnimated, setHasAnimated] = useState(false);
    
    // 3D tilt effect on hover (desktop only)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), MOTION_CONFIG.ease.spring);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), MOTION_CONFIG.ease.spring);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || window.innerWidth < 768) return;
      
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      mouseX.set((e.clientX - centerX) / rect.width);
      mouseY.set((e.clientY - centerY) / rect.height);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

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
        scale: prefersReducedMotion ? 1 : 0.96,
        opacity: prefersReducedMotion ? 1 : 0.7,
        transition: {
          duration: MOTION_CONFIG.duration.normal,
          ease: MOTION_CONFIG.ease.smooth
        }
      },
      active: {
        scale: 1,
        opacity: 1,
        transition: {
          duration: MOTION_CONFIG.duration.normal,
          ease: MOTION_CONFIG.ease.smooth
        }
      }
    };

    return (
      <motion.div
        ref={cardRef}
        variants={cardVariants}
        initial="inactive"
        animate={isActive ? "active" : "inactive"}
        style={prefersReducedMotion ? {} : { rotateX, rotateY, transformPerspective: 1000 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="h-full"
      >
        <Card 
          className="bg-card border-2 border-border shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-shadow duration-300 h-full"
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
      <div className="container mx-auto max-w-7xl relative">
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
          {/* Carousel Viewport */}
          <div className="overflow-hidden" ref={emblaRef}>
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
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === selectedIndex 
                  ? "bg-secondary w-8" 
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50 w-2"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-current={index === selectedIndex ? "true" : "false"}
              role="tab"
              whileHover={prefersReducedMotion ? {} : { scale: 1.2 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
              animate={prefersReducedMotion ? {} : {
                width: index === selectedIndex ? 32 : 8,
                backgroundColor: index === selectedIndex 
                  ? "hsl(var(--secondary))" 
                  : "hsl(var(--muted-foreground) / 0.3)"
              }}
              transition={{ duration: MOTION_CONFIG.duration.normal, ease: MOTION_CONFIG.ease.smooth }}
            />
          ))}
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
