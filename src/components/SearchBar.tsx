
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
    <form onSubmit={handleSearch} className="relative w-full max-w-2xl bg-white/95 rounded-full overflow-hidden shadow-xl">
      <Input
        type="text"
        placeholder="Search properties by location..."
        className="pl-14 pr-28 py-7 w-full border-none text-lg font-medium"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-estate-500 w-5 h-5" />
      <Button 
        type="submit" 
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full px-6 py-2.5 text-sm font-semibold bg-estate-800 hover:bg-estate-700 transition-colors"
      >
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
