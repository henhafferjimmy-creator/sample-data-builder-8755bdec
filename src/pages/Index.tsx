import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import DumpsterCTA from "@/components/DumpsterCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen pt-0">
      <Navigation />
      <Hero />
      <Services />
      <Testimonials />
      <DumpsterCTA />
      <Footer />
    </div>
  );
};

export default Index;
