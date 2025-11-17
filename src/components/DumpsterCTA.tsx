import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const DumpsterCTA = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      value: "(856) 555-DUMP",
      subtitle: "Mon-Sat: 7AM-7PM",
    },
    {
      icon: Mail,
      title: "Email Us",
      value: "info@jimsdumpster.com",
      subtitle: "24/7 Response",
    },
    {
      icon: MapPin,
      title: "Service Area",
      value: "South Jersey",
      subtitle: "Gloucester & Salem Counties",
    },
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-primary via-primary to-primary/90 relative z-10 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.05),transparent_50%)]" />
      
      <div className="container mx-auto max-w-6xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
            Ready for Your Dumpster Rental?
          </h2>
          <p className="text-primary-foreground/90 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Get reliable, affordable dumpster service in South Jersey. Same-day delivery available for your convenience.
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8, scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20 hover:bg-primary-foreground/15 hover:border-primary-foreground/30 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] transition-all duration-500 group">
                <CardContent className="pt-8 pb-8 px-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-foreground/20 mb-4 group-hover:scale-110 group-hover:bg-primary-foreground/30 transition-all duration-500">
                    <info.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary-foreground mb-2">
                    {info.title}
                  </h3>
                  <p className="text-xl font-bold text-primary-foreground mb-1">
                    {info.value}
                  </p>
                  <p className="text-sm text-primary-foreground/80">
                    {info.subtitle}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
        >
          <Link to="/quote">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="secondary" 
                size="lg" 
                className="shadow-xl group min-w-[220px] text-base hover:shadow-2xl transition-all duration-300"
              >
                Get Free Quote
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </motion.div>
          </Link>
          <Link to="/services">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/20 hover:text-primary-foreground hover:border-primary-foreground/50 shadow-xl min-w-[220px] text-base backdrop-blur-sm transition-all duration-300"
              >
                View Our Services
              </Button>
            </motion.div>
          </Link>
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 text-primary-foreground/80 text-sm">
            <span className="w-2 h-2 rounded-full bg-primary-foreground/60"></span>
            <span className="font-medium">Family-Owned</span>
            <span className="w-1 h-1 rounded-full bg-primary-foreground/40"></span>
            <span className="font-medium">Serving South Jersey</span>
            <span className="w-1 h-1 rounded-full bg-primary-foreground/40"></span>
            <span className="font-medium">Same-Day Delivery Available</span>
            <span className="w-2 h-2 rounded-full bg-primary-foreground/60"></span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DumpsterCTA;
