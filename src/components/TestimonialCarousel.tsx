import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { Testimonial } from "@/types/testimonial";

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

  const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
    return (
      <Card 
        className="bg-card border-2 border-border hover:shadow-[var(--shadow-lg)] transition-all duration-300 hover:scale-[1.02] h-full"
        role="article"
        aria-label={`Testimonial from ${testimonial.author}`}
      >
        <CardContent className="p-5 md:p-6 flex flex-col h-full">
          {/* Quote Text */}
          <p className="text-sm md:text-base mb-4 text-foreground leading-relaxed flex-grow">
            "{testimonial.quote}"
          </p>

          {/* Rating */}
          <div className="flex gap-1 mb-4" role="img" aria-label={`${testimonial.rating} out of 5 stars`}>
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-secondary text-secondary"
                aria-hidden="true"
              />
            ))}
          </div>

          {/* Author Info */}
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary/20 to-secondary/10 border-2 border-secondary/30 flex items-center justify-center text-secondary font-bold text-sm flex-shrink-0"
              aria-hidden="true"
            >
              {testimonial.initials}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-foreground text-sm truncate">
                {testimonial.author}
              </p>
              <p className="text-xs text-muted-foreground truncate">{testimonial.location}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <section 
      className="py-12 md:py-16 lg:py-20 px-4 bg-gradient-to-b from-[hsl(var(--testimonials-bg-start))] to-[hsl(var(--testimonials-bg-end))] relative overflow-hidden"
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
    >
      <div className="container mx-auto max-w-7xl relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-8 md:mb-10 lg:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3 text-foreground">
            What Our Clients Say
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Real reviews from local customers
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto">
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
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons - Desktop Only */}
          <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-0 right-0 justify-between pointer-events-none px-2">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="pointer-events-auto rounded-full bg-background/90 backdrop-blur-sm border-2 shadow-lg hover:scale-110 transition-transform disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="pointer-events-auto rounded-full bg-background/90 backdrop-blur-sm border-2 shadow-lg hover:scale-110 transition-transform disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-6 md:mt-8" role="tablist" aria-label="Testimonial slides">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === selectedIndex 
                  ? "bg-secondary w-8" 
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-current={index === selectedIndex ? "true" : "false"}
              role="tab"
            />
          ))}
        </div>

        {/* Read More Button */}
        {showReadMoreButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 md:mt-10 text-center"
          >
            <Button
              variant="outline"
              size="lg"
              onClick={onReadMoreClick}
              className="w-full sm:w-auto rounded-full px-6 md:px-8 py-5 md:py-6 font-semibold border-2 hover:bg-secondary/10 hover:border-secondary transition-all"
            >
              Read More Reviews
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default TestimonialCarousel;
