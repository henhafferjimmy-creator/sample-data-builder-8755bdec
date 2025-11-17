import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Truck, 
  Sparkles, 
  Leaf, 
  MapPin, 
  Users, 
  Clock, 
  CheckCircle2,
  ArrowRight,
  Recycle,
  Shield,
  Zap,
  Home as HomeIcon
} from "lucide-react";
import { useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  const stats = [
    { value: "10+", label: "Years of Experience" },
    { value: "500+", label: "Projects Completed" },
    { value: "100%", label: "Customer Satisfaction" },
    { value: "24/7", label: "Support Available" }
  ];

  const benefits = [
    "Family-owned and operated",
    "Same-day delivery when available",
    "Transparent pricing",
    "Professional, courteous service",
    "Eco-friendly disposal practices",
    "Fully licensed and insured"
  ];

  const timeline = [
    { year: "2013", title: "Founded", description: "Started with one truck and a vision to serve South Jersey", icon: Sparkles },
    { year: "2015", title: "Fleet Expansion", description: "Added more trucks to meet growing demand", icon: Truck },
    { year: "2018", title: "Service Area Growth", description: "Expanded to serve all of South Jersey", icon: MapPin },
    { year: "2023", title: "Digital Transformation", description: "Launched online booking and modern systems", icon: Zap }
  ];

  const process = [
    { 
      step: "01", 
      title: "Request a Quote", 
      description: "Tell us about your project and get instant pricing",
      icon: Clock
    },
    { 
      step: "02", 
      title: "Schedule Delivery", 
      description: "Choose a delivery time that works for you",
      icon: Truck
    },
    { 
      step: "03", 
      title: "Fill the Dumpster", 
      description: "Load at your pace with our flexible rental periods",
      icon: Recycle
    },
    { 
      step: "04", 
      title: "Pickup & Clean Finish", 
      description: "We haul it away and leave your site spotless",
      icon: CheckCircle2
    }
  ];

  return (
    <>
      <Navigation />
      <main className="bg-background text-foreground">
        {/* Hero Section */}
        <section 
          ref={heroRef}
          className="relative overflow-hidden rounded-b-[36px] bg-gradient-to-br from-[#14532d] via-[#22c55e] to-[#ea580c] text-white"
        >
          {/* Animated glowing blobs */}
          <motion.div 
            className="pointer-events-none absolute inset-0"
            style={{ opacity: heroOpacity }}
          >
            <motion.div 
              className="absolute -top-24 left-10 w-96 h-96 rounded-full bg-emerald-200/30 blur-3xl"
              animate={{ 
                scale: [1, 1.1, 1],
                x: [0, 20, 0],
                y: [0, 30, 0]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute top-20 right-10 w-[500px] h-[500px] rounded-full bg-orange-300/25 blur-3xl"
              animate={{ 
                scale: [1, 1.15, 1],
                x: [0, -30, 0],
                y: [0, 20, 0]
              }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute bottom-10 left-1/3 w-80 h-80 rounded-full bg-lime-200/20 blur-3xl"
              animate={{ 
                scale: [1, 1.2, 1],
                x: [0, 15, 0]
              }}
              transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          <motion.div 
            className="relative z-10 max-w-6xl mx-auto px-4 pt-36 pb-24"
            style={{ y: heroY }}
          >
            <div className="flex flex-col md:flex-row items-center gap-10">
              {/* Left: text */}
              <motion.div
                className="flex-1 text-center md:text-left"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <motion.h1 
                  className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-[0_3px_8px_rgba(0,0,0,0.4)]"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                >
                  About Jim's Dumpster Services
                </motion.h1>
                <motion.p 
                  className="text-lg md:text-xl text-emerald-50/90 mb-8 max-w-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  A family-owned business delivering reliable, tech-forward dumpster rentals across South Jersey. 
                  We combine local expertise with modern service to make your cleanup effortless.
                </motion.p>
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      size="lg" 
                      className="bg-white text-emerald-700 hover:bg-emerald-50 shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                      onClick={() => {
                        window.scrollTo({ top: document.body.scrollHeight * 0.7, behavior: "smooth" });
                      }}
                    >
                      Get to Know Us
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-white/80 bg-white/90 text-[#1B3F2F] hover:bg-white hover:text-[#163525] backdrop-blur-sm font-semibold"
                      onClick={() => navigate("/services")}
                    >
                      View Our Services
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Right: glass stats card */}
              <motion.div
                className="flex-1 w-full max-w-md"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <div className="rounded-3xl bg-white/10 border border-white/20 backdrop-blur-md p-6 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-orange-300" />
                    Why Choose Us
                  </h3>
                  <div className="space-y-3">
                    {["Local Family Business", "Same-Day Service", "Transparent Pricing", "Eco-Friendly"].map((item, i) => (
                      <motion.div
                        key={item}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                      >
                        <CheckCircle2 className="h-5 w-5 text-emerald-300 flex-shrink-0" />
                        <span className="text-white/90">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Bottom glow divider */}
          <div className="absolute -bottom-1 left-0 right-0 h-12 bg-gradient-to-b from-white/20 via-white/40 to-white pointer-events-none" />
        </section>

        {/* Stats Strip */}
        <section className="py-16 bg-gradient-to-b from-emerald-50/50 via-white to-emerald-50/30">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid gap-4 md:grid-cols-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="rounded-2xl border border-emerald-300/60 bg-white/80 shadow-sm backdrop-blur-sm px-4 py-6 flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(34, 197, 94, 0.2)" }}
                >
                  <p className="text-4xl font-bold text-emerald-700 mb-1">{stat.value}</p>
                  <p className="text-sm text-slate-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Who We Are Section */}
        <section className="py-20 bg-gradient-to-b from-emerald-50/30 via-white to-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left: text */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Who We Are
                </h2>
                <p className="text-muted-foreground text-lg mb-4">
                  Jim's Dumpster Services is a family-owned business rooted in South Jersey. 
                  For over a decade, we've been helping homeowners, contractors, and businesses 
                  manage their waste with reliable, affordable dumpster rentals.
                </p>
                <p className="text-muted-foreground text-lg mb-6">
                  We pride ourselves on same-day delivery when possible, clean professional drivers, 
                  and safe, careful placement of every dumpster. Our mission is simple: make your 
                  cleanup project stress-free from start to finish.
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    size="lg"
                    onClick={() => navigate("/quote")}
                  >
                    Get Your Free Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </motion.div>

              {/* Right: glass card with benefits */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="rounded-3xl bg-white/70 border border-emerald-200/50 shadow-[0_18px_55px_rgba(15,23,42,0.15)] backdrop-blur-md p-8">
                  <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                    <Shield className="h-6 w-6 text-emerald-600" />
                    What Sets Us Apart
                  </h3>
                  <div className="space-y-4">
                    {benefits.map((benefit, i) => (
                      <motion.div
                        key={benefit}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.08 }}
                      >
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 bg-gradient-to-b from-white via-emerald-50/20 to-white">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Journey
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                From a single truck to a full-service operation, we've grown alongside our community.
              </p>
            </motion.div>

            <div className="relative">
              {/* Vertical line */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-emerald-200 -translate-x-1/2" />

              <div className="space-y-12">
                {timeline.map((item, index) => {
                  const Icon = item.icon;
                  const isEven = index % 2 === 0;

                  return (
                    <motion.div
                      key={item.year}
                      className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col gap-8`}
                      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      {/* Card */}
                      <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'} text-center`}>
                        <motion.div
                          className="inline-block rounded-2xl bg-white border border-emerald-200 shadow-lg p-6"
                          whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(34, 197, 94, 0.15)" }}
                        >
                          <div className="text-2xl font-bold text-emerald-600 mb-2">{item.year}</div>
                          <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                          <p className="text-muted-foreground">{item.description}</p>
                        </motion.div>
                      </div>

                      {/* Center node */}
                      <div className="relative flex items-center justify-center">
                        <motion.div
                          className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.4)] border-4 border-white"
                          whileHover={{ scale: 1.15, rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Icon className="h-6 w-6 text-white" />
                        </motion.div>
                      </div>

                      {/* Spacer */}
                      <div className="flex-1 hidden md:block" />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* How We Work Section */}
        <section className="py-20 bg-gradient-to-b from-white via-slate-50 to-white">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                How It Works
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Our simple 4-step process makes dumpster rental effortless.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {process.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.step}
                    className="relative rounded-2xl bg-white border-2 border-emerald-200/60 p-6 shadow-lg"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ 
                      scale: 1.05, 
                      borderColor: "rgba(34, 197, 94, 0.8)",
                      boxShadow: "0 20px 40px rgba(34, 197, 94, 0.2)"
                    }}
                  >
                    {/* Step number badge */}
                    <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold shadow-lg border-4 border-white">
                      {step.step}
                    </div>

                    {/* Icon */}
                    <div className="mb-4 mt-2">
                      <div className="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center">
                        <Icon className="h-7 w-7 text-emerald-600" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {step.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Service Area Section */}
        <section className="py-20 bg-gradient-to-br from-slate-800 via-slate-700 to-emerald-900 text-white relative overflow-hidden">
          {/* Background glow */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-orange-500/15 blur-3xl" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Proudly Serving South Jersey
              </h2>
              <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
                Local roots, regional reach. We're your neighbors in Gloucester & Salem Counties.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left: map illustration */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 p-8 flex items-center justify-center min-h-[300px] relative overflow-hidden">
                  {/* Decorative map pins */}
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        top: `${20 + i * 15}%`,
                        left: `${15 + i * 18}%`,
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                      whileHover={{ scale: 1.3 }}
                    >
                      <MapPin className="h-8 w-8 text-orange-400 drop-shadow-[0_0_10px_rgba(251,146,60,0.6)]" />
                    </motion.div>
                  ))}
                  
                  <div className="text-center">
                    <MapPin className="h-20 w-20 text-emerald-400 mx-auto mb-4 drop-shadow-[0_0_20px_rgba(52,211,153,0.6)]" />
                    <p className="text-xl font-semibold">South Jersey Coverage</p>
                  </div>
                </div>
              </motion.div>

              {/* Right: areas list */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="space-y-4">
                  {[
                    "Gloucester County",
                    "Salem County",
                    "Deptford Township",
                    "Washington Township",
                    "Woodbury",
                    "Mullica Hill",
                    "And surrounding areas"
                  ].map((area, i) => (
                    <motion.div
                      key={area}
                      className="flex items-center gap-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 px-5 py-3"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                      whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.15)", x: 5 }}
                    >
                      <MapPin className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                      <span className="text-white/90">{area}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mini Testimonial */}
        <section className="py-16 bg-gradient-to-b from-white via-emerald-50/30 to-white">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              className="rounded-3xl bg-gradient-to-br from-emerald-500 to-emerald-600 p-8 md:p-12 text-white shadow-[0_20px_60px_rgba(34,197,94,0.3)] border-2 border-emerald-400/50 relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.02, rotate: 0.5 }}
            >
              {/* Background glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-400/20 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <div className="text-6xl text-emerald-200/40 mb-4">"</div>
                <p className="text-xl md:text-2xl mb-6 italic">
                  Jim's team was professional, punctual, and made our home renovation cleanup a breeze. 
                  Highly recommend for anyone in South Jersey!
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-xl font-bold border-2 border-white/30">
                    MR
                  </div>
                  <div>
                    <p className="font-semibold">Michael R.</p>
                    <p className="text-emerald-100 text-sm">Mullica Hill, NJ</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative overflow-hidden rounded-t-[32px] bg-gradient-to-br from-orange-500 via-orange-400 to-emerald-500">
          {/* Glowing background */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-10 left-10 w-80 h-80 rounded-full bg-white/20 blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-emerald-300/30 blur-3xl" />
          </div>

          <motion.div
            className="relative z-10 max-w-4xl mx-auto px-4 py-20 text-center text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-[0_3px_10px_rgba(0,0,0,0.3)]">
              Ready to Get Started?
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Tell us about your project and we'll handle the rest. Same-day delivery available.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div 
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(255, 255, 255, 0.6)" }} 
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  size="lg" 
                  className="bg-white text-orange-600 hover:bg-white/90 shadow-[0_10px_40px_rgba(0,0,0,0.3)] text-lg px-8"
                  onClick={() => navigate("/quote")}
                >
                  Get a Free Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white/80 bg-white/90 text-[#1B3F2F] hover:bg-white hover:text-[#163525] backdrop-blur-sm text-lg px-8 font-semibold"
                  onClick={() => navigate("/services")}
                >
                  View Services
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
