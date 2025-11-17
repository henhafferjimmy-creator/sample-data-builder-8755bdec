import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Hammer, Leaf, Truck, CheckCircle2, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const services = [
  {
    icon: Leaf,
    title: "Landscaping & Yard Waste",
    description: "Great for yard cleanups, brush removal, and outdoor project waste.",
    features: [
      "Yard debris and organic waste",
      "Grass, soil, and branches",
      "Keeps property clean during landscape work",
      "Driveway-safe delivery included",
    ],
  },
  {
    icon: Home,
    title: "Residential Dumpster Rentals",
    description: "Perfect for homeowners tackling renovations, garage cleanouts, or seasonal decluttering.",
    features: [
      "Household trash and general waste",
      "Furniture and light appliances",
      "Driveway-safe placement",
      "Convenient drop-off and pickup",
    ],
    popular: true,
  },
  {
    icon: Hammer,
    title: "Construction & Remodeling",
    description: "Ideal for contractors, builders, and remodeling projects.",
    features: [
      "Drywall, wood, roofing, flooring",
      "General construction debris",
      "Short-term or project-based rental",
      "Handles heavy materials",
    ],
  },
];

const acceptedMaterials = [
  "Household trash and general waste",
  "Construction debris (wood, drywall, flooring, shingles)",
  "Furniture and light appliances",
  "Yard waste and organic debris",
];

const rentalDetails = [
  {
    icon: Clock,
    title: "Flexible Rental Durations",
    description: "Short-term and extended options available",
  },
  {
    icon: Truck,
    title: "Fast Delivery & Pickup",
    description: "Scheduled around your project timeline",
  },
  {
    icon: CheckCircle2,
    title: "Transparent Pricing",
    description: "No hidden fees, simple and honest rates",
  },
];

const Services = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Header Section - Green Background */}
      <div className="pt-40 pb-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-secondary-foreground">Our Services</h1>
          <p className="text-xl text-secondary-foreground/90 max-w-2xl mx-auto">
            Dumpster Rental Services
          </p>
        </div>
      </div>

      {/* Services Cards Section - White Background */}
      <div className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className={`relative border-2 transition-all duration-300 hover:border-secondary hover:shadow-xl hover:scale-105 flex flex-col ${
                  service.popular ? 'border-secondary shadow-lg' : ''
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-secondary text-secondary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                <CardHeader className="flex-grow">
                  <CardTitle className="text-2xl mb-4">{service.title}</CardTitle>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <div className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardHeader>
                <div className="p-6 pt-0">
                  <Link to="/quote">
                    <Button 
                      className="w-full" 
                      variant={service.popular ? "default" : "outline"}
                    >
                      Get Quote
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Accepted Materials Section - Light Gray Background */}
      <div className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Accepted Materials</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Jim's Dumpsters can handle nearly all non-hazardous waste, including:
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-secondary/30 shadow-md">
              <CardHeader className="py-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {acceptedMaterials.map((material, index) => (
                    <div key={index} className="flex items-center gap-4 p-5 rounded-lg bg-secondary/5 hover:bg-secondary/10 transition-colors min-h-[80px]">
                      <CheckCircle2 className="h-7 w-7 text-secondary flex-shrink-0" />
                      <span className="text-foreground text-base font-medium leading-relaxed">{material}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t-2 border-border">
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/5">
                    <span className="text-destructive font-bold text-base">Not Accepted:</span>
                    <span className="text-foreground text-base">hazardous materials, chemicals, paints, oils, or batteries.</span>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>

      {/* Rental Details Section - White Background */}
      <div className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Rental Details</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {rentalDetails.map((detail, index) => (
              <Card key={index} className="border-2 hover:border-secondary transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                    <detail.icon className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle className="text-lg">{detail.title}</CardTitle>
                  <p className="text-base text-muted-foreground mt-2">
                    {detail.description}
                  </p>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Services;
