
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "./ui/sheet";

const Navbar = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/contact");
  };

  return (
    <nav className="absolute w-full z-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between h-24">
          <Link to="/" className="text-3xl font-display text-white tracking-wide hover:opacity-90 transition-opacity">Elite Real Estate</Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <Link to="/properties" className="text-white hover:text-white/80 transition-colors font-medium">Properties</Link>
            <Link to="/about" className="text-white hover:text-white/80 transition-colors font-medium">About</Link>
            <Link to="/#testimonials" className="text-white hover:text-white/80 transition-colors font-medium">Testimonials</Link>
            <Link to="/contact" className="text-white hover:text-white/80 transition-colors font-medium">Contact</Link>
            <Button 
              variant="outline" 
              className="text-black border-white bg-white hover:bg-white/90 font-semibold shadow-md"
              onClick={handleGetStarted}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-6 mt-12">
                  <Link to="/properties" className="text-lg font-medium">Properties</Link>
                  <Link to="/about" className="text-lg font-medium">About</Link>
                  <Link to="/#testimonials" className="text-lg font-medium">Testimonials</Link>
                  <Link to="/contact" className="text-lg font-medium">Contact</Link>
                  <Button 
                    className="w-full bg-estate-800 hover:bg-estate-700 text-white font-semibold shadow-md"
                    onClick={handleGetStarted}
                  >
                    Get Started
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
