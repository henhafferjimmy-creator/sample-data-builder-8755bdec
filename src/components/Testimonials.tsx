import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Quote, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const Testimonials = () => {
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

  return (
    <section className="py-32 px-4 bg-gradient-to-b from-background via-muted/20 to-background relative z-10 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--secondary)/0.03),transparent_70%)]" />
      
      <div className="container mx-auto max-w-7xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
                stopOnInteraction: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    <Card className="h-full border-border/50 hover:border-secondary/30 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] transition-all duration-500 group">
                      <CardContent className="pt-8 px-6 pb-6 flex flex-col h-full">
                        {/* Quote icon with gradient background */}
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/20 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                          <Quote className="h-7 w-7 text-secondary" />
                        </div>
                        
                        {/* Quote text */}
                        <p className="text-card-foreground/90 mb-6 text-base leading-relaxed flex-grow">
                          "{testimonial.quote}"
                        </p>
                        
                        {/* Rating */}
                        <div className="flex gap-1 mb-5">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-secondary text-secondary" />
                          ))}
                        </div>
                        
                        {/* Author info with avatar */}
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary/20 to-secondary/30 flex items-center justify-center">
                            <span className="text-secondary font-bold text-sm">{testimonial.initials}</span>
                          </div>
                          <div>
                            <p className="font-semibold text-card-foreground">{testimonial.author}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-8">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </Carousel>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Button 
            variant="default" 
            size="lg" 
            className="shadow-lg group hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
          >
            Read More Reviews
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
