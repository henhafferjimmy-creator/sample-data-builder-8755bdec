import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, CheckCircle, Send } from "lucide-react";

const Quote = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 bg-gradient-to-br from-secondary to-secondary/80">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Let's Talk About Your Project
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              Ready to clear that clutter? Get in touch for a free consultation and estimate.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <Phone className="h-10 w-10 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold text-lg mb-2">Phone</h3>
                <p className="text-foreground/80 font-medium">(555) 123-4567</p>
                <p className="text-sm text-muted-foreground mt-1">Call us for immediate assistance</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <Mail className="h-10 w-10 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold text-lg mb-2">Email</h3>
                <p className="text-foreground/80 font-medium">info@jimsdumpster.com</p>
                <p className="text-sm text-muted-foreground mt-1">Send us a message anytime</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <MapPin className="h-10 w-10 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold text-lg mb-2">Service Area</h3>
                <p className="text-foreground/80 font-medium">Greater Metro Area</p>
                <p className="text-sm text-muted-foreground mt-1">Proudly serving your community</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <Clock className="h-10 w-10 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold text-lg mb-2">Business Hours</h3>
                <p className="text-foreground/80 font-medium">Mon - Fri: 7:00 AM - 6:00 PM</p>
                <p className="text-sm text-muted-foreground mt-1">Saturday & Sunday: Closed</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Form and Map Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Form */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Your Free Estimate</h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and we'll get back to you within 24 hours with a detailed estimate 
                for your project. All consultations are completely free with no obligation.
              </p>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input id="name" placeholder="Your full name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" placeholder="your.email@example.com" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" type="tel" placeholder="(555) 123-4567" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dumpster-size">Dumpster Size</Label>
                    <select 
                      id="dumpster-size"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="">Select a size</option>
                      <option value="10-yard">10 Yard Dumpster</option>
                      <option value="15-yard">15 Yard Dumpster</option>
                      <option value="20-yard">20 Yard Dumpster</option>
                      <option value="30-yard">30 Yard Dumpster</option>
                      <option value="not-sure">Not Sure - Need Help</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="project-details">Project Details *</Label>
                  <Textarea 
                    id="project-details" 
                    placeholder="Tell us about your project: what are you working on, when do you need the dumpster, how long will you need it, and any specific requirements..."
                    className="min-h-32"
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full bg-secondary hover:bg-secondary/90">
                  <Send className="mr-2 h-5 w-5" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Map and Benefits */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Visit Our Service Area</h3>
                <div className="grid grid-cols-2 gap-6">
                  <Card className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border-2 hover:border-primary/50">
                    <CardContent className="pt-8 pb-8 text-center h-full flex flex-col justify-center">
                      <div className="text-5xl mb-4">🏠</div>
                      <h4 className="font-semibold text-xl mb-3">Camden County</h4>
                      <p className="text-sm text-muted-foreground">Residential & Commercial Services</p>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border-2 hover:border-primary/50">
                    <CardContent className="pt-8 pb-8 text-center h-full flex flex-col justify-center">
                      <div className="text-5xl mb-4">🏢</div>
                      <h4 className="font-semibold text-xl mb-3">Gloucester County</h4>
                      <p className="text-sm text-muted-foreground">Business & Industrial Solutions</p>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border-2 hover:border-primary/50">
                    <CardContent className="pt-8 pb-8 text-center h-full flex flex-col justify-center">
                      <div className="text-5xl mb-4">🚚</div>
                      <h4 className="font-semibold text-xl mb-3">Burlington County</h4>
                      <p className="text-sm text-muted-foreground">Fast Delivery & Pickup</p>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border-2 hover:border-primary/50">
                    <CardContent className="pt-8 pb-8 text-center h-full flex flex-col justify-center">
                      <div className="text-5xl mb-4">♻️</div>
                      <h4 className="font-semibold text-xl mb-3">Salem County</h4>
                      <p className="text-sm text-muted-foreground">Eco-Friendly Waste Management</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Free Consultations</h4>
                    <p className="text-sm text-muted-foreground">No obligation estimates and project planning</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Fast & Reliable Service</h4>
                    <p className="text-sm text-muted-foreground">Quick delivery and pickup on your schedule</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Driveway Safe Dumpsters</h4>
                    <p className="text-sm text-muted-foreground">Protective boards to prevent damage</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Transparent Pricing</h4>
                    <p className="text-sm text-muted-foreground">All work backed by our satisfaction guarantee</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Frequently Asked Questions</h2>
            <p className="text-center text-muted-foreground mb-12">Quick answers to common questions about our services</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-2">How long can I rent a dumpster?</h3>
                <p className="text-muted-foreground">
                  Standard rental periods are typically 7-14 days. Need it longer? We offer flexible extensions to fit your project timeline.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Do you provide same-day delivery?</h3>
                <p className="text-muted-foreground">
                  Yes! We offer same-day delivery when available. Contact us early in the day and we'll do our best to accommodate your schedule.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">What size dumpster do I need?</h3>
                <p className="text-muted-foreground">
                  It depends on your project scope. Our team will help you choose the right size based on your needs - from small cleanouts to major renovations.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">What areas do you serve?</h3>
                <p className="text-muted-foreground">
                  We proudly serve the Greater Metro Area and surrounding communities. Contact us to confirm service availability in your location.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Quote;
