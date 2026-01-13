import { motion } from "framer-motion";
import { Star, Award, Shield, CheckCircle2 } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/motionConfig";

interface TrustBadge {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  iconBg: string;
  iconColor: string;
}

const badges: TrustBadge[] = [
  {
    icon: <Star className="h-6 w-6" />,
    title: "5.0 ★★★★★",
    subtitle: "Google Reviews",
    iconBg: "bg-gradient-to-br from-yellow-100 to-orange-100",
    iconColor: "text-yellow-500",
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: "10+ Years",
    subtitle: "Experience",
    iconBg: "bg-gradient-to-br from-emerald-100 to-green-100",
    iconColor: "text-emerald-600",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Licensed & Insured",
    subtitle: "Full Coverage",
    iconBg: "bg-gradient-to-br from-blue-100 to-indigo-100",
    iconColor: "text-blue-600",
  },
  {
    icon: <CheckCircle2 className="h-6 w-6" />,
    title: "500+ Projects",
    subtitle: "Completed",
    iconBg: "bg-gradient-to-br from-emerald-100 to-teal-100",
    iconColor: "text-emerald-600",
  },
];

const TrustBadges = () => {
  return (
    <section className="relative py-12 lg:py-16 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 via-emerald-50/30 to-white" />

      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-xl md:text-2xl font-semibold text-foreground">
            Trusted by South Jersey Homeowners & Contractors
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6"
        >
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="group relative bg-white rounded-xl border border-gray-100 p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div
                  className={`${badge.iconBg} ${badge.iconColor} p-3 rounded-full`}
                >
                  {badge.icon}
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm md:text-base">
                    {badge.title}
                  </p>
                  <p className="text-muted-foreground text-xs md:text-sm">
                    {badge.subtitle}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBadges;
