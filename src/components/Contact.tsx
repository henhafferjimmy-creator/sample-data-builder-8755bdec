import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin } from "lucide-react";
import { PHONE_DISPLAY, EMAIL } from "@/config/contact";

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-primary text-primary-foreground relative z-10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready for Your Dumpster Rental?
          </h2>
          <p className="text-xl mb-12 opacity-90">
            Get reliable, affordable dumpster service in South Jersey. Same-day delivery available for your convenience.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-white/10 border-white/20 backdrop-blur">
              <CardContent className="pt-6 text-center">
                <Phone className="h-8 w-8 mx-auto mb-3" />
                <p className="font-semibold text-lg mb-1">Call Us</p>
                <p className="opacity-90">{PHONE_DISPLAY}</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur">
              <CardContent className="pt-6 text-center">
                <Mail className="h-8 w-8 mx-auto mb-3" />
                <p className="font-semibold text-lg mb-1">Email Us</p>
                <p className="opacity-90">{EMAIL}</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur">
              <CardContent className="pt-6 text-center">
                <MapPin className="h-8 w-8 mx-auto mb-3" />
                <p className="font-semibold text-lg mb-1">Service Area</p>
                <p className="opacity-90">Greater Metro Area</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/quote">
              <Button 
                size="lg" 
                variant="secondary" 
                className="text-lg px-8 py-6 font-semibold shadow-lg min-w-[200px]"
              >
                Get Free Quote
              </Button>
            </Link>
            <Link to="/services">
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6 font-semibold bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/20 hover:text-primary-foreground shadow-lg min-w-[200px]"
              >
                View Our Services
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
