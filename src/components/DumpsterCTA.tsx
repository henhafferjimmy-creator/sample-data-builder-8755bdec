import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const DumpsterCTA = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      value: "info@jimsdumpster.com",
      subtitle: "24/7 Response",
      href: "mailto:info@jimsdumpster.com",
      clickable: true,
    },
    {
      icon: MapPin,
      title: "Service Area",
      value: "South Jersey",
      subtitle: "Gloucester & Salem Counties",
      href: "#services",
      clickable: false,
    },
  ];

  const scrollToServices = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="py-12 md:py-16 lg:py-24 px-4 bg-gradient-to-br from-primary via-primary to-primary/90 relative z-10 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.05),transparent_50%)]" />
      
      <div className="container mx-auto max-w-6xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-8 md:mb-12 lg:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary-foreground mb-4 md:mb-6 px-2">
            Ready for Your Dumpster Rental?
          </h2>
          <p className="text-primary-foreground/90 text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed px-4">
            Get reliable, affordable dumpster service in South Jersey. Same-day delivery available for your convenience.
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-10 lg:mb-12 max-w-2xl mx-auto"
        >
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * index, ease: 'easeOut' }}
            >
              {info.clickable ? (
                <a href={info.href} className="block h-full">
                  <motion.div whileHover={{ y: -8, scale: 1.05 }} transition={{ duration: 0.3 }}>
                    <Card className="h-full bg-primary-foreground/10 backdrop-blur-sm border-2 border-primary-foreground/30 shadow-[var(--shadow-lg)] hover:bg-primary-foreground/15 hover:border-primary-foreground/50 hover:shadow-[var(--shadow-xl)] hover:shadow-white/20 transition-all duration-500 group cursor-pointer">
                      <CardContent className="pt-8 pb-8 px-6 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-foreground/20 border-2 border-primary-foreground/30 shadow-[var(--shadow-sm)] mb-4 group-hover:scale-110 group-hover:bg-primary-foreground/30 group-hover:border-primary-foreground/50 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-500">
                          <info.icon className="h-8 w-8 text-primary-foreground group-hover:scale-110 transition-transform duration-300" />
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
                </a>
              ) : (
                <motion.div whileHover={{ y: -8, scale: 1.05 }} transition={{ duration: 0.3 }}>
                  <Card className="h-full bg-primary-foreground/10 backdrop-blur-sm border-2 border-primary-foreground/30 shadow-[var(--shadow-lg)] hover:bg-primary-foreground/15 hover:border-primary-foreground/50 hover:shadow-[var(--shadow-xl)] hover:shadow-white/20 transition-all duration-500 group">
                    <CardContent className="pt-8 pb-8 px-6 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-foreground/20 border-2 border-primary-foreground/30 shadow-[var(--shadow-sm)] mb-4 group-hover:scale-110 group-hover:bg-primary-foreground/30 group-hover:border-primary-foreground/50 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-500">
                        <info.icon className="h-8 w-8 text-primary-foreground group-hover:scale-110 transition-transform duration-300" />
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
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
        >
          <Link to="/quote">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="cta"
                size="lg" 
                className="rounded-full min-w-[220px] text-base"
              >
                Book Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </motion.div>
          </Link>
          <a href="#services" onClick={scrollToServices}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="ctaOutline"
                size="lg" 
                className="rounded-full min-w-[220px] text-base"
              >
                View Our Services
              </Button>
            </motion.div>
          </a>
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
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
