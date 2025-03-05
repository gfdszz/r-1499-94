
import SearchBar from "./SearchBar";

const Hero = () => {
  return (
    <div className="relative h-screen min-h-[700px] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c')",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="relative z-10 container mx-auto px-8 text-center">
        <div className="animate-fadeIn">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-display text-white mb-8 leading-tight max-w-4xl mx-auto tracking-tight">
            Experience Elevated Living
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            Discover exceptional properties and sustainable living spaces designed for modern lifestyles.
          </p>
          <div className="max-w-2xl mx-auto">
            <SearchBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
