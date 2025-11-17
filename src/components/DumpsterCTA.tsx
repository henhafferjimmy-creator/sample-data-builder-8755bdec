import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const DumpsterCTA = () => {
  return (
    <section className="py-12 px-4 bg-primary relative z-10">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
          Ready for Your Dumpster Rental?
        </h2>
        <p className="text-primary-foreground/90 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Get reliable, affordable dumpster service in South Jersey. Same-day delivery available for your convenience.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/quote">
            <Button 
              variant="secondary" 
              size="lg" 
              className="shadow-lg group min-w-[200px]"
            >
              Get Free Quote
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="lg" 
            className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/20 hover:text-primary-foreground shadow-lg min-w-[200px]"
          >
            View Our Services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DumpsterCTA;
