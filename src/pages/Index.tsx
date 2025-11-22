import { lazy, Suspense } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ServicesShowcase from "@/components/ServicesShowcase";
import { Testimonial } from "@/types/testimonial";

// Lazy load below-fold components for better initial load performance
const TestimonialCarousel = lazy(() => import("@/components/TestimonialCarousel"));
const DumpsterCTA = lazy(() => import("@/components/DumpsterCTA"));
const Footer = lazy(() => import("@/components/Footer"));

const testimonials: Testimonial[] = [
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

const Index = () => {
  const handleReadMoreReviews = () => {
    // In a real app, this could navigate to a reviews page or open a modal
    window.open("https://www.google.com/search?q=jim%27s+dumpster+services+reviews", "_blank");
  };

  return (
    <div className="min-h-screen pt-0">
      <Navigation />
      <Hero />
      <ServicesShowcase />
      <Suspense fallback={<div className="h-96" />}>
        <TestimonialCarousel 
          testimonials={testimonials}
          showReadMoreButton={true}
          onReadMoreClick={handleReadMoreReviews}
        />
      </Suspense>
      <Suspense fallback={<div className="h-64" />}>
        <DumpsterCTA />
      </Suspense>
      <Suspense fallback={<div className="h-32" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
