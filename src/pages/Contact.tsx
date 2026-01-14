import { motion } from "framer-motion";
import { Phone, Mail, FileText, Clock, MapPin, Shield, Star, Truck, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PHONE_DISPLAY, PHONE_HREF, EMAIL, EMAIL_HREF, BUSINESS_HOURS_DETAILED, SERVICE_AREAS } from "@/config/contact";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section with Animated Blobs */}
      <section className="relative pt-32 pb-20 bg-slate-900 overflow-hidden">
        {/* Animated Gradient Blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/30 rounded-full blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-20 right-0 w-80 h-80 bg-orange-500/25 rounded-full blur-3xl"
            animate={{
              x: [0, -40, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-0 left-1/3 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, -40, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Get in Touch
            </h1>
            <p className="text-lg md:text-xl text-slate-300">
              Ready for reliable dumpster service? We're here to help with your project needs in South Jersey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Method Cards */}
      <section className="py-16 bg-gradient-to-b from-slate-100 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {/* Call Us Card */}
            <motion.div variants={fadeInUp}>
              <a href={PHONE_HREF} className="block h-full">
                <Card className="h-full bg-white border-2 border-emerald-100 shadow-lg hover:shadow-xl hover:border-emerald-300 hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                  <CardContent className="pt-8 pb-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 rounded-2xl flex items-center justify-center group-hover:bg-emerald-500 transition-colors duration-300">
                      <Phone className="w-8 h-8 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Call Us</h3>
                    <p className="text-emerald-600 font-semibold text-lg">{PHONE_DISPLAY}</p>
                    <p className="text-sm text-slate-500 mt-2">Speak with us directly</p>
                  </CardContent>
                </Card>
              </a>
            </motion.div>

            {/* Email Us Card */}
            <motion.div variants={fadeInUp}>
              <a href={EMAIL_HREF} className="block h-full">
                <Card className="h-full bg-white border-2 border-orange-100 shadow-lg hover:shadow-xl hover:border-orange-300 hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                  <CardContent className="pt-8 pb-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-2xl flex items-center justify-center group-hover:bg-orange-500 transition-colors duration-300">
                      <Mail className="w-8 h-8 text-orange-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Email Us</h3>
                    <p className="text-orange-600 font-semibold">{EMAIL}</p>
                    <p className="text-sm text-slate-500 mt-2">We'll respond within 24 hours</p>
                  </CardContent>
                </Card>
              </a>
            </motion.div>

            {/* Get a Quote Card */}
            <motion.div variants={fadeInUp}>
              <Link to="/quote" className="block h-full">
                <Card className="h-full bg-gradient-to-br from-emerald-500 to-emerald-600 border-0 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                  <CardContent className="pt-8 pb-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-2xl flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300 backdrop-blur-sm">
                      <FileText className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Get a Quote</h3>
                    <p className="text-emerald-100 font-semibold">Free Estimate</p>
                    <p className="text-sm text-emerald-100/80 mt-2">Detailed project pricing</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Information Cards Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Everything You Need to Know
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              From our hours of operation to the areas we serve, find all the information you need right here.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {/* Business Hours Card */}
            <motion.div variants={fadeInUp}>
              <Card className="h-full bg-slate-50 border border-slate-200 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <CardContent className="pt-8 pb-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Business Hours</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-slate-200">
                      <span className="text-slate-600">Monday - Saturday</span>
                      <span className="font-semibold text-slate-900">7:00 AM - 7:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-slate-600">Sunday</span>
                      <span className="font-semibold text-slate-500">Closed</span>
                    </div>
                    <p className="text-sm text-emerald-600 font-medium mt-4">
                      ✓ Same-day delivery available
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Service Areas Card */}
            <motion.div variants={fadeInUp}>
              <Card className="h-full bg-slate-50 border border-slate-200 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <CardContent className="pt-8 pb-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Service Areas</h3>
                  </div>
                  <div className="space-y-2">
                    {SERVICE_AREAS.map((area, index) => (
                      <div key={index} className="flex items-center gap-2 py-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span className="text-slate-700">{area}</span>
                      </div>
                    ))}
                    <p className="text-sm text-slate-500 mt-4">
                      + Surrounding South Jersey communities
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Why Choose Us Card */}
            <motion.div variants={fadeInUp}>
              <Card className="h-full bg-slate-50 border border-slate-200 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <CardContent className="pt-8 pb-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <Star className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Why Choose Us</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">Licensed & Fully Insured</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Truck className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">Driveway-Safe Equipment</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">Same-Day Delivery Available</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Star className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">10+ Years of Experience</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 via-emerald-500 to-orange-500 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px),
                              radial-gradient(circle at 80% 50%, white 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Whether you need a quick quote or want to talk through your project, we're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/quote">
                <Button 
                  size="lg" 
                  className="bg-white text-emerald-700 hover:bg-slate-100 font-semibold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get Your Free Quote
                </Button>
              </Link>
              <a href={PHONE_HREF}>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-6 text-lg rounded-xl shadow-lg backdrop-blur-sm transition-all duration-300"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call {PHONE_DISPLAY}
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
