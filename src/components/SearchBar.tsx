
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app, this would navigate to search results
      console.log("Searching for:", searchQuery);
      alert(`Searching for properties in: ${searchQuery}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-2xl bg-white/95 rounded-full overflow-hidden">
      <Input
        type="text"
        placeholder="Search properties by location..."
        className="pl-12 pr-6 py-6 w-full border-none text-lg"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-estate-400 w-5 h-5" />
      <Button 
        type="submit" 
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full px-4 py-2 text-sm"
      >
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
