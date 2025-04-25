
import Hero from "@/components/Hero";
import PropertyGrid from "@/components/PropertyGrid";
import AboutUs from "@/components/AboutUs";
import OurVision from "@/components/OurVision";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import HomeServices from "@/components/HomeServices";
import { Link } from "react-router-dom";
import { Armchair, ArrowRight, ChevronDown, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

const Index = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const propertiesRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const blogRef = useRef<HTMLDivElement>(null);
  
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
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Set page as loaded after a small delay for animations
    const timer = setTimeout(() => setPageLoaded(true), 100);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);
  
  // Smooth scroll to properties section
  const scrollToProperties = () => {
    propertiesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Smooth scroll to services section
  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-estate-50">
      <Navbar />
      <Hero />
      
      <div className="flex justify-center -mt-16 relative z-20">
        <Button 
          onClick={scrollToProperties}
          className={cn(
            "rounded-full w-12 h-12 flex items-center justify-center shadow-lg",
            "bg-white hover:bg-estate-50 text-estate-800",
            "border border-amber-100/30 hover:border-amber-200/50",
            "transition-all duration-500 ease-out transform hover:scale-110",
            scrolled ? "opacity-0 pointer-events-none" : "opacity-100"
          )}
          variant="outline"
          size="icon"
        >
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </Button>
      </div>
      
      <section 
        id="properties" 
        ref={propertiesRef} 
        className="py-32 bg-gradient-to-b from-estate-50/80 via-white to-white"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div 
            className="text-center max-w-2xl mx-auto mb-16 opacity-0 animate-fadeIn"
            style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
          >
            <h2 className="text-4xl md:text-5xl font-display text-estate-800 mb-4 relative">
              <span className="inline-block transform transition-transform duration-700 ease-out">
                Featured Properties
              </span>
              <div className="w-20 h-1 bg-gradient-to-r from-amber-300 to-amber-400 mx-auto mt-4 rounded-full"></div>
            </h2>
            <p className="text-estate-600 text-lg">
              Browse our exclusive selection of premium properties that represent the finest in luxury real estate.
            </p>
          </div>
          <PropertyGrid />
        </div>
      </section>

      {/* Home Services Section */}
      <section id="services" ref={servicesRef}>
        <HomeServices />
      </section>

      <section 
        id="furniture" 
        className="py-24 overflow-hidden"
        style={{
          background: 'linear-gradient(to right, rgba(248,247,246,0.8) 0%, rgba(255,255,255,0.9) 100%)',
        }}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div 
            className="bg-gradient-to-tr from-estate-50 to-white rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between shadow-sm border border-estate-100 hover:shadow-md transition-all duration-300 transform hover:translate-y-[-4px]"
          >
            <div className="mb-8 md:mb-0 md:mr-8 max-w-lg">
              <div className="inline-flex items-center justify-center p-2 bg-amber-100 rounded-full mb-4">
                <Armchair className="h-6 w-6 text-amber-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-display text-estate-800 mb-4">
                Home Furniture Collection
              </h2>
              <p className="text-estate-600 mb-8">
                Explore our curated selection of premium furniture to transform your living space. From elegant sofas to functional dining sets, we have everything you need for your perfect home.
              </p>
              <Link to="/furniture">
                <Button className="bg-estate-800 hover:bg-amber-800 inline-flex items-center transition-all duration-300 group">
                  Browse Furniture
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
              {[
                { bg: "bg-gradient-to-br from-amber-50 to-amber-100", delay: 0 },
                { bg: "bg-gradient-to-bl from-estate-100 to-estate-200", delay: 100 },
                { bg: "bg-gradient-to-tr from-estate-100 to-estate-200", delay: 200 },
                { bg: "bg-gradient-to-tl from-amber-50 to-amber-100", delay: 300 }
              ].map((item, index) => (
                <div 
                  key={index}
                  className={`aspect-square ${item.bg} rounded-lg flex items-center justify-center p-4 transform transition-all duration-500 hover:scale-[1.05] hover:shadow-md opacity-0 animate-fadeIn`}
                  style={{ 
                    transitionDelay: `${item.delay}ms`,
                    animationDelay: `${500 + item.delay}ms`,
                    animationFillMode: 'forwards'
                  }}
                >
                  <img src="/placeholder.svg" alt={`Furniture item ${index + 1}`} className="max-h-full animate-float" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section Preview */}
      <section className="py-24 bg-white" ref={blogRef}>
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-display text-estate-800 mb-4 relative">
              <span>Latest Articles & Tips</span>
              <div className="w-20 h-1 bg-gradient-to-r from-amber-300 to-amber-400 mx-auto mt-4 rounded-full"></div>
            </h2>
            <p className="text-estate-600 text-lg">
              Explore expert advice and insights on real estate, home improvement, and property management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                title: "10 Tips for First-Time Home Buyers",
                excerpt: "Buying your first home can be overwhelming. Here are essential tips to make the process smoother.",
                image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&h=500",
                date: "April 18, 2025",
              },
              {
                title: "Essential Home Maintenance Tasks for Every Season",
                excerpt: "Keep your home in top condition year-round with this seasonal maintenance checklist.",
                image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&h=500",
                date: "April 10, 2025",
              },
              {
                title: "Smart Home Technology Worth Investing In",
                excerpt: "Guide to the best smart home technologies that offer convenience, security, and energy efficiency.",
                image: "https://images.unsplash.com/photo-1558002038-2f6f809ad5fb?auto=format&fit=crop&w=800&h=500",
                date: "April 1, 2025",
              }
            ].map((post, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                style={{ 
                  opacity: 0,
                  animation: 'fadeIn 0.8s ease-out forwards',
                  animationDelay: `${index * 200}ms`,
                }}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <p className="text-estate-500 text-sm mb-2">{post.date}</p>
                  <h3 className="text-xl font-semibold text-estate-800 mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-estate-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  <Link to="/blog" className="inline-flex items-center text-estate-800 font-medium group">
                    Read Article
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/blog">
              <Button className="bg-estate-800 hover:bg-estate-700 inline-flex items-center group">
                <FileText className="mr-2 h-4 w-4" />
                View All Articles
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
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
