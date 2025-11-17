import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Jim's Dumpster Services made my cleanup project so easy! The dumpster was delivered right on time and picked up promptly. Excellent service from start to finish.",
      author: "Michael R.",
      location: "Mullica Hill, NJ",
      rating: 5,
    },
    {
      quote: "Highly recommend Jim's Dumpster Services! Professional, reliable, and reasonably priced. They made our big cleanup job stress-free.",
      author: "Joan Tepken",
      location: "Hammonton Township, NJ",
      rating: 5,
    },
    {
      quote: "Jim's Dumpster Services is the best! Great customer service, fair pricing, and they were so easy to work with. Will definitely use them again.",
      author: "Debbie Peterson",
      location: "Pitman, NJ",
      rating: 5,
    },
    {
      quote: "Outstanding service! Jim's team was professional, courteous, and handled everything perfectly. Made our waste removal so much easier than expected.",
      author: "Chris Fazier",
      location: "Mullica Hill, NJ",
      rating: 5,
    },
  ];

  // Duplicate testimonials for infinite scroll effect
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-20 px-4 bg-background relative z-10 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-3">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground text-lg">
            Don't just take our word for it
          </p>
        </div>

        <div className="relative mb-10 overflow-hidden">
          <div className="flex animate-scroll-left">
            {duplicatedTestimonials.map((testimonial, index) => (
              <div key={index} className="flex-shrink-0 w-[calc(25%-1.5rem)] min-w-[240px] px-3">
                <Card className="hover:shadow-lg transition-shadow h-full">
                  <CardContent className="pt-5 px-4">
                    <div className="mb-3">
                      <Quote className="h-8 w-8 text-primary" />
                    </div>
                    <p className="text-foreground/90 mb-5 text-sm leading-relaxed min-h-[100px]">
                      {testimonial.quote}
                    </p>
                    <div className="flex gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{testimonial.author}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button variant="default" size="lg" className="shadow-lg">
            Read More Reviews
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
