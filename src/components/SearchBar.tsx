
import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/properties?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <div className="relative flex-grow">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-estate-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Search by location..."
          className="pl-10 pr-4 py-6 w-full bg-white/10 border-white/20 text-white placeholder:text-white/60"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Button 
        type="submit" 
        size="lg"
        className="px-8 bg-estate-800 hover:bg-estate-700 transition-colors"
      >
        <Search className="w-5 h-5" />
      </Button>
    </form>
  );
};

export default SearchBar;
