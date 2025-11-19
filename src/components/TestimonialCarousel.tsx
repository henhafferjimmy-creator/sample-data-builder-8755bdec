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
import { useMotionSettings, fadeInUp, staggerContainer, fadeIn, DURATION, EASING } from "@/lib/motionConfig";

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
  const { isMobile, shouldReduceMotion, enableHeavyMotion } = useMotionSettings();
  
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
    
    // Star animation variants - simplified for mobile
    const starVariants: Variants = {
      hidden: { scale: shouldReduceMotion ? 1 : 0.5, opacity: shouldReduceMotion ? 1 : 0 },
      visible: (i: number) => ({
        scale: 1,
        opacity: 1,
        transition: {
          delay: shouldReduceMotion ? 0 : i * 0.05,
          duration: DURATION.fast,
          ease: EASING.smooth
        }
      })
    };

    // Card transition - opacity only on mobile
    const cardVariants: Variants = {
      inactive: {
        opacity: isMobile ? 1 : 0.85,
        transition: {
          duration: DURATION.normal,
          ease: EASING.smooth
        }
      },
      active: {
        opacity: 1,
        transition: {
          duration: DURATION.normal,
          ease: EASING.smooth
        }
      }
    };

    useEffect(() => {
      if (isActive && !hasAnimated) {
        setHasAnimated(true);
      }
    }, [isActive, hasAnimated]);

    return (
      <motion.div
        variants={cardVariants}
        animate={isActive ? "active" : "inactive"}
        className="flex-[0_0_100%] md:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] min-w-0 px-2"
      >
        <Card className="h-full bg-card border-2 border-border shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-5 md:p-6 flex flex-col h-full">
            {/* Stars */}
            <motion.div 
              className="flex gap-1 mb-3"
              initial="hidden"
              animate={hasAnimated ? "visible" : "hidden"}
            >
              {[...Array(testimonial.rating)].map((_, i) => (
                <motion.div key={i} custom={i} variants={starVariants}>
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                </motion.div>
              ))}
            </motion.div>

            {/* Quote */}
            <blockquote className="text-sm md:text-base text-foreground leading-relaxed mb-4 flex-grow">
              "{testimonial.quote}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-3 pt-3 border-t border-border/50">
              <div className="w-10 h-10 rounded-full bg-secondary/10 border-2 border-secondary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold text-secondary">
                  {testimonial.author.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-sm text-foreground truncate">
                  {testimonial.author}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {testimonial.location}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  // Header animation variants
  const containerVariants = staggerContainer(isMobile, shouldReduceMotion);
  const itemVariants = fadeInUp(isMobile, shouldReduceMotion);

  return (
    <section 
      className="py-12 md:py-16 lg:py-24 bg-gradient-to-b from-[hsl(var(--testimonial-bg-start))] to-[hsl(var(--testimonial-bg-end))] relative overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      {/* Background decorations - disabled on mobile */}
      {!isMobile && (
        <>
          <BackgroundBlobs />
          <NoiseTexture />
          <ActiveCardSpotlight selectedIndex={selectedIndex} totalCards={testimonials.length} prefersReducedMotion={shouldReduceMotion} />
        </>
      )}

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-8 md:mb-12"
        >
          <motion.h2 
            id="testimonials-heading"
            variants={itemVariants}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3"
          >
            What Our Clients Say
          </motion.h2>

          <motion.div 
            variants={itemVariants}
            className="flex justify-center mb-3 md:mb-4"
          >
            <div className="h-0.5 md:h-1 w-16 md:w-20 bg-gradient-to-r from-secondary/0 via-secondary to-secondary/0 rounded-full" />
          </motion.div>

          <motion.p 
            variants={itemVariants}
            className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Real feedback from satisfied customers across South Jersey
          </motion.p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn(shouldReduceMotion)}
          className="relative"
        >
          {/* Viewport */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -mx-2">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  testimonial={testimonial}
                  isActive={index === selectedIndex}
                />
              ))}
            </div>
          </div>

          {/* Navigation buttons - hidden on mobile */}
          <div className="hidden md:flex justify-center items-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="rounded-full w-10 h-10 border-2"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Dot indicators */}
            <div className="flex gap-2" role="tablist" aria-label="Testimonial slides">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === selectedIndex 
                      ? 'bg-secondary w-8' 
                      : 'bg-border hover:bg-border/80'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                  aria-selected={index === selectedIndex}
                  role="tab"
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="rounded-full w-10 h-10 border-2"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Mobile dot indicators */}
          <div className="flex md:hidden justify-center gap-2 mt-6" role="tablist" aria-label="Testimonial slides">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === selectedIndex 
                    ? 'bg-secondary w-8' 
                    : 'bg-border'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-selected={index === selectedIndex}
                role="tab"
              />
            ))}
          </div>
        </motion.div>

        {/* Read More button */}
        {showReadMoreButton && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn(shouldReduceMotion)}
            className="flex justify-center mt-8 md:mt-12"
          >
            <Button
              variant="outline"
              size="lg"
              onClick={onReadMoreClick}
              className="rounded-full px-6 md:px-8 border-2 group"
            >
              <span>Read More Reviews</span>
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default TestimonialCarousel;
