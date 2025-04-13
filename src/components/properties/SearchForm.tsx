
import { Search, MapPin, SlidersHorizontal, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface SearchFormProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  propertyType: "sale" | "rent" | "all";
  setPropertyType: React.Dispatch<React.SetStateAction<"sale" | "rent" | "all">>;
  sortBy: string;
  setSortBy: (value: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  searchParams: URLSearchParams;
  setSearchParams: (searchParams: URLSearchParams) => void;
  toggleMobileFilters?: () => void;
  loading?: boolean;
}

export const SearchForm = ({
  searchQuery,
  setSearchQuery,
  propertyType,
  setPropertyType,
  sortBy,
  setSortBy,
  handleSearch,
  searchParams,
  setSearchParams,
  toggleMobileFilters,
  loading = false
}: SearchFormProps) => {
  return (
    <form onSubmit={handleSearch} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow relative group">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-estate-400 group-hover:text-estate-600 w-5 h-5 transition-colors" />
          <Input
            type="text"
            placeholder="Search by location or property name..."
            className="pl-10 py-6 w-full border-estate-200 focus:border-estate-300 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-3">
          <Select 
            value={propertyType} 
            onValueChange={(value: "sale" | "rent" | "all") => {
              setPropertyType(value);
              if (value === "all") {
                searchParams.delete("type");
              } else {
                searchParams.set("type", value);
              }
              setSearchParams(searchParams);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Properties</SelectItem>
              <SelectItem value="sale">For Sale</SelectItem>
              <SelectItem value="rent">For Rent</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            type="submit" 
            size="lg" 
            className="bg-estate-800 hover:bg-estate-700 transition-colors"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            ) : (
              <Search className="w-5 h-5 mr-2" />
            )}
            Search
          </Button>
          
          {toggleMobileFilters && (
            <Button 
              type="button" 
              variant="outline" 
              size="icon"
              className="md:hidden" 
              onClick={toggleMobileFilters}
            >
              <SlidersHorizontal className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </form>
  );
};
