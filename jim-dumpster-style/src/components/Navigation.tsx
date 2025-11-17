import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logo from "@/assets/jims-logo.png";

const Navigation = () => {
  return (
    <nav className="absolute top-13 left-1/2 z-50 w-[min(90vw,72rem)] -translate-x-1/2">
      <div className="flex items-center justify-between gap-6 px-4">
        <Link to="/" className="flex items-center cursor-pointer">
          <img src={logo} alt="Jim's Dumpster Services" className="h-40 w-auto drop-shadow-md hover:opacity-90 transition-opacity" />
        </Link>

        <div className="flex flex-1 justify-end">
          <div className="flex items-center gap-3 rounded-full bg-foreground/70 px-5 py-3 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-foreground/60">
            <div className="hidden md:flex items-center gap-4">
              <Link to="/" className="px-4 py-2 text-background transition-colors hover:text-background/80">
                Home
              </Link>
              <Link to="/services" className="px-4 py-2 text-background transition-colors hover:text-background/80">
                Services
              </Link>
              <Link to="/#about" className="px-4 py-2 text-background transition-colors hover:text-background/80">
                About
              </Link>
              <Link to="/#contact" className="px-4 py-2 text-background transition-colors hover:text-background/80">
                Contact
              </Link>
            </div>

            <Link to="/quote">
              <Button size="lg" variant="secondary" className="rounded-full px-6 font-semibold">
                Get A Quote
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
