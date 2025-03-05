
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "./ui/sheet";

const Navbar = () => {
  const handleGetStarted = () => {
    // In a real app, this would navigate to a signup or contact page
    console.log("Get Started button clicked");
    alert("Thanks for your interest! Our agent will contact you shortly.");
  };

  return (
    <nav className="absolute w-full z-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between h-24">
          <a href="/" className="text-3xl font-display text-white tracking-wide hover:opacity-90 transition-opacity">Elite Real Estate</a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <a href="#properties" className="text-white hover:text-white/80 transition-colors font-medium">Properties</a>
            <a href="#about" className="text-white hover:text-white/80 transition-colors font-medium">About</a>
            <a href="#testimonials" className="text-white hover:text-white/80 transition-colors font-medium">Testimonials</a>
            <a href="#contact" className="text-white hover:text-white/80 transition-colors font-medium">Contact</a>
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
                  <a href="#properties" className="text-lg font-medium">Properties</a>
                  <a href="#about" className="text-lg font-medium">About</a>
                  <a href="#testimonials" className="text-lg font-medium">Testimonials</a>
                  <a href="#contact" className="text-lg font-medium">Contact</a>
                  <Button 
                    className="w-full text-black bg-white hover:bg-white/90 font-semibold shadow-md"
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
