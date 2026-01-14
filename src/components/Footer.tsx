import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Mail, Clock, Facebook } from "lucide-react";
import logo from "@/assets/jims-logo.png";
import { fadeInUp, staggerContainer } from "@/lib/motionConfig";
import { EMAIL, EMAIL_HREF, BUSINESS_HOURS, SERVICE_AREAS } from "@/config/contact";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "About", path: "/about" },
  { name: "Get a Quote", path: "/quote" },
];

// Combine centralized service areas with specific cities
const serviceAreas = [
  ...SERVICE_AREAS,
  "Mullica Hill",
  "Woodbury",
];

// Social media links - empty strings will not render (conditional rendering)
// Replace with actual URLs when available
const socialLinks = {
  facebook: "", // e.g., "https://facebook.com/jimsdumpsterservices"
  google: "",   // e.g., "https://g.page/jimsdumpsterservices"
  yelp: "",     // e.g., "https://yelp.com/biz/jims-dumpster-services"
};

const Footer = () => {
  return (
    <footer className="relative z-10 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {/* Column 1: Logo & Tagline */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <Link to="/" className="inline-block">
              <img
                src={logo}
                alt="Jim's Dumpster Services"
                className="h-16 w-auto"
              />
            </Link>
            <p className="text-emerald-100/80 text-sm leading-relaxed">
              Driveway-safe dumpster rentals in South Jersey. Professional service
              you can trust for all your cleanup needs.
            </p>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h3 className="text-lg font-semibold text-emerald-400">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-emerald-50/70 transition-colors duration-200 hover:text-emerald-400 text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* Column 3: Service Areas */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h3 className="text-lg font-semibold text-emerald-400">Service Areas</h3>
            <ul className="flex flex-col space-y-2">
              {serviceAreas.map((area) => (
                <li
                  key={area}
                  className="flex items-center gap-2 text-emerald-50/70 text-sm"
                >
                  <MapPin className="h-3 w-3 text-emerald-500 flex-shrink-0" />
                  {area}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Contact Info */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h3 className="text-lg font-semibold text-emerald-400">Contact Us</h3>
            <ul className="flex flex-col space-y-3">
              <li>
                <a
                  href={EMAIL_HREF}
                  className="flex items-center gap-3 text-emerald-50/70 transition-colors duration-200 hover:text-emerald-400 text-sm"
                >
                  <Mail className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                  {EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-3 text-emerald-50/70 text-sm">
                <Clock className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                {BUSINESS_HOURS}
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-emerald-900/50 bg-slate-900/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
            {/* Left: Copyright */}
            <p className="text-emerald-50/60 text-xs">
              © {new Date().getFullYear()} Jim's Dumpster Services. All rights reserved.
            </p>

            {/* Center: Trust Badges */}
            <p className="text-emerald-100/70 text-xs text-center">
              Licensed & Insured • Family Owned • Same-Day Available
            </p>

            {/* Right: Social Icons - Only render if URLs are configured */}
            {(socialLinks.facebook || socialLinks.google || socialLinks.yelp) && (
              <div className="flex items-center gap-4">
                {socialLinks.facebook && (
                  <a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="text-emerald-50/60 transition-colors duration-200 hover:text-emerald-400"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                )}
                {socialLinks.google && (
                  <a
                    href={socialLinks.google}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Google Reviews"
                    className="text-emerald-50/60 transition-colors duration-200 hover:text-emerald-400"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                  </a>
                )}
                {socialLinks.yelp && (
                  <a
                    href={socialLinks.yelp}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Yelp"
                    className="text-emerald-50/60 transition-colors duration-200 hover:text-emerald-400"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.16 12.73l-4.19-.74a.42.42 0 00-.37.67l2.79 3.69a.42.42 0 00.68-.05l1.23-3.03a.42.42 0 00-.14-.54zm-7.37-1.23l3.02-3.2a.42.42 0 00-.14-.67l-3.41-1.33a.42.42 0 00-.55.44l.24 4.43a.42.42 0 00.84.33zM8.51 17.53l2.14-3.85a.42.42 0 00-.38-.63l-4.49.05a.42.42 0 00-.33.65l2.35 3.87a.42.42 0 00.71-.09zm-.32-5.74l-4.07-1.4a.42.42 0 00-.54.42l.11 3.54a.42.42 0 00.65.34l3.74-2.27a.42.42 0 00.11-.63zm3.84-7.22v5.55a.42.42 0 00.78.22l2.87-4.38a.42.42 0 00-.21-.63l-2.87-.98a.42.42 0 00-.57.22z" />
                    </svg>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
