import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const Testimonials = () => {
  const [emblaRef] = useEmblaCarousel(
    { 
      loop: true,
      align: "start",
      skipSnaps: true,
      dragFree: true,
      duration: 60, // Very slow scroll duration (in frames)
    },
    [Autoplay({ 
      delay: 3000, // Pause 3 seconds on each slide before continuing
      stopOnInteraction: false, 
      stopOnMouseEnter: true 
    })]
  );

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

  const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => {
    return (
      <Card 
        className="bg-card border-2 border-border hover:shadow-[var(--shadow-lg)] transition-all duration-300 hover:scale-[1.02] w-[280px] sm:w-[340px] md:w-[380px] lg:w-[420px] flex-shrink-0"
      >
        <CardContent className="p-4 md:p-6">
          {/* Quote Text */}
          <p className="text-sm md:text-base mb-4 text-foreground leading-relaxed line-clamp-3">
            "{testimonial.quote}"
          </p>

          {/* Rating */}
          <div className="flex gap-1 mb-4">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-secondary text-secondary"
              />
            ))}
          </div>

          {/* Author Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary/20 to-secondary/10 border-2 border-secondary/30 flex items-center justify-center text-secondary font-bold text-sm">
              {testimonial.initials}
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">
                {testimonial.author}
              </p>
              <p className="text-xs text-muted-foreground">{testimonial.location}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 px-4 bg-gradient-to-b from-[hsl(var(--testimonials-bg-start))] to-[hsl(var(--testimonials-bg-end))] relative overflow-hidden">
      <div className="container mx-auto max-w-7xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20, backgroundColor: 'rgba(0, 0, 0, 0.08)' }}
          whileInView={{ opacity: 1, y: 0, backgroundColor: 'transparent' }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-8 md:mb-10 lg:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3 text-foreground">
            What Our Clients Say
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Real reviews from local customers
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, backgroundColor: 'rgba(0, 0, 0, 0.06)' }}
          whileInView={{ opacity: 1, backgroundColor: 'transparent' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="relative"
        >
          {/* Embla Carousel - Continuous Scroll */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6" style={{ animationDuration: '60s' }}>
              {/* Duplicate testimonials for seamless loop */}
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <TestimonialCard key={index} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Read More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20, backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
          whileInView={{ opacity: 1, y: 0, backgroundColor: 'transparent' }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
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
