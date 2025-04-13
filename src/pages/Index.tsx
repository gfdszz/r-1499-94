
import Hero from "@/components/Hero";
import PropertyGrid from "@/components/PropertyGrid";
import AboutUs from "@/components/AboutUs";
import OurVision from "@/components/OurVision";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
import { Armchair, ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";

const Index = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const propertiesRef = useRef<HTMLElement>(null);
  
  // Observer for section visibility
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.3 });
    
    document.querySelectorAll('section[id]').forEach(section => {
      observer.observe(section);
    });
    
    return () => observer.disconnect();
  }, []);
  
  // Smooth scroll to properties section
  const scrollToProperties = () => {
    propertiesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      
      <div className="flex justify-center -mt-16 relative z-20">
        <Button 
          onClick={scrollToProperties}
          className="rounded-full w-12 h-12 flex items-center justify-center shadow-lg bg-white hover:bg-estate-50 text-estate-800"
          variant="outline"
          size="icon"
        >
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </Button>
      </div>
      
      <section id="properties" ref={propertiesRef} className="py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-display text-estate-800 mb-4 relative overflow-hidden">
              <span className="inline-block transform transition-transform duration-700 ease-out translate-y-0 opacity-100">
                Featured Properties
              </span>
            </h2>
            <p className="text-estate-600 text-lg">
              Browse our exclusive selection of premium properties that represent the finest in luxury real estate.
            </p>
          </div>
          <PropertyGrid />
        </div>
      </section>

      <section id="furniture" className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-gradient-to-tr from-estate-50 to-white rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between shadow-sm border border-estate-100">
            <div className="mb-8 md:mb-0 md:mr-8 max-w-lg">
              <div className="inline-flex items-center justify-center p-2 bg-estate-100 rounded-full mb-4">
                <Armchair className="h-6 w-6 text-estate-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-display text-estate-800 mb-4">
                Home Furniture Collection
              </h2>
              <p className="text-estate-600 mb-8">
                Explore our curated selection of premium furniture to transform your living space. From elegant sofas to functional dining sets, we have everything you need for your perfect home.
              </p>
              <Link to="/furniture">
                <Button className="bg-estate-800 hover:bg-estate-700 inline-flex items-center transform transition-transform hover:translate-x-1">
                  Browse Furniture
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
              <div className="aspect-square bg-estate-100 rounded-lg flex items-center justify-center p-4 transform transition-all hover:scale-[1.03] hover:shadow-md">
                <img src="/placeholder.svg" alt="Modern sofa" className="max-h-full"/>
              </div>
              <div className="aspect-square bg-estate-200 rounded-lg flex items-center justify-center p-4 transform transition-all hover:scale-[1.03] hover:shadow-md">
                <img src="/placeholder.svg" alt="Dining table" className="max-h-full"/>
              </div>
              <div className="aspect-square bg-estate-200 rounded-lg flex items-center justify-center p-4 transform transition-all hover:scale-[1.03] hover:shadow-md">
                <img src="/placeholder.svg" alt="Office desk" className="max-h-full"/>
              </div>
              <div className="aspect-square bg-estate-100 rounded-lg flex items-center justify-center p-4 transform transition-all hover:scale-[1.03] hover:shadow-md">
                <img src="/placeholder.svg" alt="Bedroom set" className="max-h-full"/>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AboutUs />
      <OurVision />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
