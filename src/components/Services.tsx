import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Hammer, Leaf } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Home,
    title: "Residential Dumpster Rentals",
    description: "Perfect for homeowners tackling renovations, garage cleanouts, or seasonal decluttering.",
  },
  {
    icon: Hammer,
    title: "Construction & Remodeling Debris Dumpsters",
    description: "Ideal for contractors, builders, and remodeling projects.",
  },
  {
    icon: Leaf,
    title: "Landscaping & Yard Waste Dumpsters",
    description: "Great for yard cleanups, brush removal, grass, soil, branches, and outdoor project waste.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-muted relative z-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional dumpster rentals for every project size and type
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <Link 
              key={index} 
              to="/services" 
              className="block"
              onClick={() => window.scrollTo(0, 0)}
            >
              <Card className="border-2 hover:border-secondary transition-all hover:shadow-lg cursor-pointer h-full">
                <CardHeader>
                  <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center mb-4">
                    <service.icon className="h-8 w-8 text-secondary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
