import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, MessageCircle, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import {
  PHONE_DISPLAY,
  PHONE_HREF,
  EMAIL,
  BUSINESS_HOURS_DETAILED,
  SERVICE_AREAS,
} from "@/config/contact";

const Contact = () => {
  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak with our team directly",
      detail: PHONE_DISPLAY,
      action: "Call Now",
      link: PHONE_HREF,
      color: "emerald",
    },
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us a message anytime",
      detail: EMAIL,
      action: "Send Email",
      link: `mailto:${EMAIL}`,
      color: "orange",
    },
    {
      icon: MessageCircle,
      title: "Get a Quote",
      description: "Request a detailed estimate",
      detail: "Free, no-obligation quotes",
      action: "Request Quote",
      link: "/quote",
      color: "emerald",
    },
  ];

  const infoCards = [
    {
      icon: Clock,
      title: "Business Hours",
      details: [
        "Monday - Saturday",
        BUSINESS_HOURS_DETAILED,
        "Sunday: Closed",
        "",
        "Same-day delivery available",
      ],
    },
    {
      icon: MapPin,
      title: "Service Areas",
      details: SERVICE_AREAS.concat([
        "",
        "Serving all of South Jersey",
        "Call to confirm your area",
      ]),
    },
    {
      icon: Truck,
      title: "Why Choose Us",
      details: [
        "Family-owned & operated",
        "Fast, reliable service",
        "Driveway-safe placement",
        "Transparent pricing",
        "No hidden fees",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-40 pb-24 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] text-white rounded-b-[36px]">
        {/* Animated Background Elements */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-orange-400/20 blur-3xl"
            animate={{
              scale: [1, 1.15, 1],
              x: [0, -30, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Hero Content */}
        <motion.div
          className="relative z-10 container mx-auto px-4 max-w-4xl text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-sm font-medium uppercase tracking-wide mb-4 backdrop-blur-sm border border-white/20">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Contact Information
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-[0_3px_8px_rgba(0,0,0,0.4)]">
            Get In Touch With Us
          </h1>
          <p className="text-lg md:text-xl text-slate-200 mb-6 max-w-2xl mx-auto">
            Have questions about our services? Need help choosing the right
            dumpster size? We're here to help!
          </p>
          <p className="text-sm uppercase tracking-wide text-slate-300">
            Fast Response • Friendly Service • South Jersey Local
          </p>
        </motion.div>

        <div className="absolute -bottom-1 left-0 right-0 h-10 bg-gradient-to-b from-white/20 via-white/60 to-white pointer-events-none" />
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-gradient-to-b from-slate-50 via-white to-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card
                    className={`h-full border-2 ${
                      method.color === "emerald"
                        ? "border-emerald-200 hover:border-emerald-300"
                        : "border-orange-200 hover:border-orange-300"
                    } bg-white transition-all hover:shadow-xl`}
                  >
                    <CardContent className="pt-8 pb-8 text-center">
                      <div
                        className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${
                          method.color === "emerald"
                            ? "bg-emerald-100"
                            : "bg-orange-100"
                        }`}
                      >
                        <Icon
                          className={`h-8 w-8 ${
                            method.color === "emerald"
                              ? "text-emerald-600"
                              : "text-orange-600"
                          }`}
                        />
                      </div>
                      <h3 className="font-bold text-xl mb-2">{method.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {method.description}
                      </p>
                      <p className="font-semibold text-foreground mb-4">
                        {method.detail}
                      </p>
                      {method.link.startsWith("/") ? (
                        <Link to={method.link}>
                          <Button
                            className={`w-full ${
                              method.color === "emerald"
                                ? "bg-emerald-600 hover:bg-emerald-700"
                                : "bg-orange-500 hover:bg-orange-600"
                            }`}
                          >
                            {method.action}
                          </Button>
                        </Link>
                      ) : (
                        <a href={method.link}>
                          <Button
                            className={`w-full ${
                              method.color === "emerald"
                                ? "bg-emerald-600 hover:bg-emerald-700"
                                : "bg-orange-500 hover:bg-orange-600"
                            }`}
                          >
                            {method.action}
                          </Button>
                        </a>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Information Cards */}
      <section className="py-20 bg-gradient-to-b from-white via-emerald-50/30 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              What You Need to Know
            </h2>
            <p className="text-muted-foreground">
              Everything you need to know about reaching us and our service
              capabilities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {infoCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full border border-slate-200 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all">
                    <CardContent className="pt-8 pb-8">
                      <div className="flex flex-col items-center text-center mb-4">
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                          <Icon className="h-7 w-7 text-slate-700" />
                        </div>
                        <h3 className="font-bold text-lg mb-4">
                          {card.title}
                        </h3>
                      </div>
                      <div className="space-y-2 text-center">
                        {card.details.map((detail, idx) => (
                          <p
                            key={idx}
                            className={`${
                              detail === "" ? "h-2" : "text-sm text-slate-600"
                            }`}
                          >
                            {detail}
                          </p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 via-emerald-500 to-orange-500 text-white relative overflow-hidden rounded-t-[36px]">
        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-orange-300/20 blur-3xl" />
        </motion.div>

        <motion.div
          className="relative z-10 container mx-auto px-4 text-center max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg md:text-xl text-emerald-50 mb-8">
            Request your free quote today and experience the Jim's Dumpster
            Services difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/quote">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-6 font-semibold shadow-xl hover:shadow-2xl transition-all"
              >
                Get Free Quote
              </Button>
            </Link>
            <a href={PHONE_HREF}>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 font-semibold bg-white/10 text-white border-white/30 hover:bg-white/20 shadow-xl"
              >
                Call {PHONE_DISPLAY}
              </Button>
            </a>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
