
import { MapPin } from "lucide-react";
import SearchBar from "./SearchBar";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const Hero = () => {
  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 h-screen flex flex-col justify-center items-center">
        <div className="max-w-4xl mx-auto text-center animate-fadeIn">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6">
            <MapPin className="w-4 h-4 text-white" />
            <span className="text-white/90 text-sm font-medium">Luxury Real Estate Solutions</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display text-white mb-6 leading-tight tracking-tight">
            Find Your Dream <br />
            <span className="text-gradient bg-gradient-to-r from-white via-white/90 to-white/80">Luxury Home</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Discover exceptional properties and sustainable living spaces curated for modern lifestyles.
          </p>
          
          <div className="max-w-2xl mx-auto backdrop-blur-md bg-white/5 p-2 rounded-2xl border border-white/10">
            <SearchBar />
          </div>
        </div>

        <div className="absolute bottom-12 left-0 right-0 flex justify-center">
          <div className="grid grid-cols-3 gap-8 px-4">
            {[
              { label: "Properties", value: "1,500+" },
              { label: "Happy Clients", value: "800+" },
              { label: "Cities", value: "50+" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl font-display text-white mb-1">{stat.value}</p>
                <p className="text-sm text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
