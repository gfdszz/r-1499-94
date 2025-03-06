
import { Search } from "lucide-react";
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
  handleSearch: (e: React.FormEvent) => void;
  searchParams: URLSearchParams;
  setSearchParams: (searchParams: URLSearchParams) => void;
}

export const SearchForm = ({
  searchQuery,
  setSearchQuery,
  propertyType,
  setPropertyType,
  handleSearch,
  searchParams,
  setSearchParams
}: SearchFormProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-10">
      <form onSubmit={handleSearch} className="flex-grow">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search by location or property name..."
            className="pl-10 py-6 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-estate-400 w-5 h-5" />
          <Button 
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2"
          >
            Search
          </Button>
        </div>
      </form>
      
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
    </div>
  );
};
