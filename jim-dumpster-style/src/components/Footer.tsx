import logo from "@/assets/jims-logo.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12 relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center">
            <img src={logo} alt="Jim's Dumpster Services" className="h-16 w-auto" />
          </div>

          <div className="text-center md:text-left">
            <p className="text-sm opacity-80">
              © {new Date().getFullYear()} Jim's Dumpster Services. All rights reserved.
            </p>
            <p className="text-sm opacity-80 mt-1">Professional dumpster rentals you can trust.</p>
          </div>

          <div className="flex gap-4">
            <a href="#" className="text-sm hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
