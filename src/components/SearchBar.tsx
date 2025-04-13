
import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/properties?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <form 
      onSubmit={handleSearch} 
      className={cn(
        "flex gap-2 transition-all duration-300",
        isFocused ? "scale-[1.02]" : "scale-100"
      )}
    >
      <div className="relative flex-grow group">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-200/70 w-5 h-5 transition-all duration-300 group-hover:text-amber-200" />
        <Input
          type="text"
          placeholder="Search by location..."
          className="pl-10 pr-4 py-6 w-full bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-amber-200/50 focus:ring-amber-200/20 transition-all duration-300"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
      <Button 
        type="submit" 
        size="lg"
        className="px-8 bg-estate-800 hover:bg-amber-800 transition-colors duration-300 border border-amber-700/30 hover:border-amber-700"
      >
        <Search className="w-5 h-5" />
      </Button>
    </form>
  );
};

export default SearchBar;
