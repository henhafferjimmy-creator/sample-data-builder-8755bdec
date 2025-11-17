import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const Testimonials = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: "center",
      skipSnaps: false,
    },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const testimonials = [
    {
      quote: "Jim's Dumpster Services made my cleanup project so easy! The dumpster was delivered right on time and picked up promptly. Excellent service from start to finish.",
      author: "Michael R.",
      location: "Mullica Hill, NJ",
      rating: 5,
      initials: "MR",
    },
    {
      quote: "Highly recommend Jim's Dumpster Services! Professional, reliable, and reasonably priced. They made our big cleanup job stress-free.",
      author: "Joan Tepken",
      location: "Hammonton Township, NJ",
      rating: 5,
      initials: "JT",
    },
    {
      quote: "Jim's Dumpster Services is the best! Great customer service, fair pricing, and they were so easy to work with. Will definitely use them again.",
      author: "Debbie Peterson",
      location: "Pitman, NJ",
      rating: 5,
      initials: "DP",
    },
    {
      quote: "Outstanding service! Jim's team was professional, courteous, and handled everything perfectly. Made our waste removal so much easier than expected.",
      author: "Chris Fazier",
      location: "Mullica Hill, NJ",
      rating: 5,
      initials: "CF",
    },
  ];

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
  }, [emblaApi, onSelect]);

  const TestimonialCard = ({ testimonial, isActive }: { testimonial: typeof testimonials[0]; isActive: boolean }) => {
    return (
      <div className="h-full px-2">
        <Card 
          className={`h-full bg-card border border-border transition-all duration-350 ease-out ${
            isActive 
              ? 'scale-105 opacity-100 shadow-[var(--shadow-xl)]' 
              : 'scale-96 opacity-70 shadow-[var(--shadow-md)]'
          }`}
        >
          <CardContent className="p-8 flex flex-col h-full">
            {/* Quote Icon */}
            <div className="mb-6">
              <div className="w-12 h-12 rounded-full bg-[hsl(var(--icon-badge-bg))] border-2 border-[hsl(var(--icon-badge-border))] flex items-center justify-center shadow-[var(--shadow-sm)]">
                <Quote className="w-6 h-6 text-secondary" />
              </div>
            </div>

            {/* Quote Text */}
            <p className="text-base md:text-lg mb-6 flex-grow text-foreground">
              "{testimonial.quote}"
            </p>

            {/* Rating */}
            <div className="flex gap-1 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-secondary text-secondary"
                />
              ))}
            </div>

            {/* Author Info */}
            <div className="flex items-center gap-4 pt-4 border-t border-border">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-secondary/70 border-2 border-secondary/30 flex items-center justify-center text-white font-bold shadow-[var(--shadow-sm)]">
                {testimonial.initials}
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  {testimonial.author}
                </p>
                <p className="text-sm text-muted-foreground">{testimonial.location}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <section className="py-32 px-4 bg-gradient-to-b from-[hsl(var(--testimonials-bg-start))] to-[hsl(var(--testimonials-bg-end))] relative overflow-hidden">

      <div className="container mx-auto max-w-7xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            What Our Clients Say
          </h2>
          
          {/* Decorative accent */}
          <div className="flex justify-center items-center gap-3 mb-6">
            <div className="h-1 w-12 bg-gradient-to-r from-transparent via-secondary to-secondary/50 rounded-full" />
            <div className="px-4 py-1.5 bg-secondary/10 rounded-full border border-secondary/20">
              <p className="text-sm font-medium text-secondary">Real reviews from local customers</p>
            </div>
            <div className="h-1 w-12 bg-gradient-to-l from-transparent via-secondary to-secondary/50 rounded-full" />
          </div>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-6xl mx-auto"
        >
          {/* Custom Navigation Buttons */}
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-card border border-border shadow-[var(--shadow-sm)] flex items-center justify-center hover:bg-muted hover:shadow-[var(--shadow-md)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-muted-foreground" />
          </button>

          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-card border border-border shadow-[var(--shadow-sm)] flex items-center justify-center hover:bg-muted hover:shadow-[var(--shadow-md)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-muted-foreground" />
          </button>

          {/* Embla Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_45%]"
                >
                  <TestimonialCard testimonial={testimonial} isActive={selectedIndex === index} />
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  selectedIndex === index
                    ? 'w-8 bg-secondary'
                    : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Read More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            className="border-secondary/30 hover:bg-secondary/10 hover:border-secondary/50"
          >
            Read More Reviews →
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
