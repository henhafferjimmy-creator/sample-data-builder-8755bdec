import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Testimonials = () => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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

  const TestimonialCard = ({ testimonial, isActive }: { testimonial: typeof testimonials[0]; isActive: boolean }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useTransform(mouseY, [-100, 100], [5, -5]);
    const rotateY = useTransform(mouseX, [-100, 100], [-5, 5]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || !isActive) return;
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    return (
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: isActive ? rotateX : 0,
          rotateY: isActive ? rotateY : 0,
        }}
        whileHover={isActive ? { y: -12, scale: 1.03 } : {}}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="h-full perspective-1000"
      >
        <Card className="h-full testimonial-card transition-all duration-500">
          <CardContent className="p-8 flex flex-col h-full">
            {/* Quote Icon */}
            <div className={`mb-6 transition-all duration-500 ${
              isActive ? 'opacity-100 scale-100' : 'opacity-60 scale-90'
            }`}>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary/20 to-secondary/10 flex items-center justify-center">
                <Quote className="w-6 h-6 text-secondary" />
              </div>
            </div>

            {/* Quote Text */}
            <p className={`text-base md:text-lg mb-6 flex-grow transition-all duration-500 ${
              isActive ? 'text-foreground' : 'text-muted-foreground'
            }`}>
              "{testimonial.quote}"
            </p>

            {/* Rating */}
            <div className="flex gap-1 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 fill-secondary text-secondary transition-all duration-300 ${
                    isActive ? 'scale-110' : 'scale-100'
                  }`}
                  style={{ transitionDelay: `${i * 50}ms` }}
                />
              ))}
            </div>

            {/* Author Info */}
            <div className="flex items-center gap-4 pt-4 border-t border-border/50">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-secondary/70 flex items-center justify-center text-white font-bold transition-all duration-500 ${
                isActive ? 'scale-110 shadow-lg shadow-secondary/30' : 'scale-100'
              }`}>
                {testimonial.initials}
              </div>
              <div>
                <p className={`font-semibold transition-colors duration-500 ${
                  isActive ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {testimonial.author}
                </p>
                <p className="text-sm text-muted-foreground">{testimonial.location}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <section className="py-32 px-4 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      {/* Animated Parallax Background */}
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--secondary)/0.05),transparent_70%)]"
        style={{
          x: useTransform(useMotionValue(activeIndex), [0, testimonials.length - 1], [0, -50]),
        }}
      />
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--secondary)/0.03),transparent_50%)]" />

      <div className="container mx-auto max-w-7xl relative z-10">
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
          className="relative"
        >
          {/* Custom Navigation Buttons */}
          <motion.button
            onClick={() => swiperInstance?.slidePrev()}
            whileHover={{ scale: 1.1, x: -4 }}
            whileTap={{ scale: 0.95 }}
            className="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-card/90 backdrop-blur-sm border border-border shadow-lg flex items-center justify-center hover:bg-secondary/10 hover:border-secondary/30 transition-all duration-300 group"
          >
            <ChevronLeft className="w-6 h-6 text-muted-foreground group-hover:text-secondary transition-colors" />
          </motion.button>

          <motion.button
            onClick={() => swiperInstance?.slideNext()}
            whileHover={{ scale: 1.1, x: 4 }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-card/90 backdrop-blur-sm border border-border shadow-lg flex items-center justify-center hover:bg-secondary/10 hover:border-secondary/30 transition-all duration-300 group"
          >
            <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-secondary transition-colors" />
          </motion.button>

          {/* Swiper Carousel */}
          <Swiper
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            coverflowEffect={{
              rotate: 15,
              stretch: 0,
              depth: 250,
              modifier: 1,
              slideShadows: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            modules={[EffectCoverflow, Autoplay, Navigation, Pagination]}
            onSwiper={setSwiperInstance}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="testimonials-swiper pb-16"
            breakpoints={{
              320: {
                slidesPerView: 1,
                coverflowEffect: {
                  rotate: 0,
                  depth: 100,
                },
              },
              768: {
                slidesPerView: 2,
                coverflowEffect: {
                  rotate: 10,
                  depth: 200,
                },
              },
              1024: {
                slidesPerView: 3,
                coverflowEffect: {
                  rotate: 15,
                  depth: 250,
                },
              },
            }}
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index} className="!w-full md:!w-[400px] lg:!w-[450px]">
                <TestimonialCard testimonial={testimonial} isActive={activeIndex === index} />
              </SwiperSlide>
            ))}
          </Swiper>
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
            className="group border-secondary/30 hover:bg-secondary/10 hover:border-secondary/50"
          >
            Read More Reviews
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              className="ml-2"
            >
              →
            </motion.span>
          </Button>
        </motion.div>
      </div>

      {/* Custom Swiper Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        .testimonials-swiper {
          padding: 60px 20px !important;
        }

        /* Base style for all testimonial cards - frosted/transparent */
        .testimonials-swiper .swiper-slide .testimonial-card {
          background: rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          opacity: 0.5;
          transform: scale(0.85);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* ACTIVE slide - center card is solid white and fully focused */
        .testimonials-swiper .swiper-slide-active .testimonial-card {
          background: #ffffff;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
          opacity: 1;
          transform: scale(1);
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.25), 0 0 20px hsl(var(--secondary) / 0.15);
          border: 1px solid hsl(var(--secondary) / 0.2);
          z-index: 10;
        }

        /* Next/prev slides slightly stronger than far-back slides */
        .testimonials-swiper .swiper-slide-prev .testimonial-card,
        .testimonials-swiper .swiper-slide-next .testimonial-card {
          opacity: 0.65;
          transform: scale(0.92);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .testimonials-swiper .swiper-pagination {
          bottom: 0 !important;
        }

        .testimonials-swiper .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: hsl(var(--muted-foreground));
          opacity: 0.3;
          transition: all 0.3s ease;
        }

        .testimonials-swiper .swiper-pagination-bullet-active {
          background: hsl(var(--secondary));
          opacity: 1;
          transform: scale(1.3);
          box-shadow: 0 0 12px hsl(var(--secondary) / 0.4);
        }

        .testimonials-swiper .swiper-pagination-bullet:hover {
          opacity: 0.7;
          transform: scale(1.2);
        }

        .perspective-1000 {
          perspective: 1000px;
          transform-style: preserve-3d;
        }
      `}} />
    </section>
  );
};

export default Testimonials;
