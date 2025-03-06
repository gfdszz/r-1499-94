import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import PropertyGrid from "@/components/PropertyGrid";

// Mock property data (in a real app, this would come from an API)
const allProperties = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
    title: "Forest Retreat",
    location: "Aspen, Colorado",
    price: "$2,450,000",
    bedrooms: 4,
    bathrooms: 3,
    area: 3200,
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1524230572899-a752b3835840",
    title: "Modern Villa",
    location: "Beverly Hills, CA",
    price: "$5,900,000",
    bedrooms: 6,
    bathrooms: 7,
    area: 6500,
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1433832597046-4f10e10ac764",
    title: "Urban Penthouse",
    location: "Manhattan, NY",
    price: "$3,750,000",
    bedrooms: 3,
    bathrooms: 3.5,
    area: 2800,
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1486718448742-163732cd1544",
    title: "Lake House",
    location: "Lake Tahoe, NV",
    price: "$4,200,000",
    bedrooms: 5,
    bathrooms: 4,
    area: 3900,
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    title: "Luxury Condo",
    location: "Miami, FL",
    price: "$1,850,000",
    bedrooms: 2,
    bathrooms: 2.5,
    area: 1900,
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    title: "Beachfront Paradise",
    location: "Malibu, CA",
    price: "$7,300,000",
    bedrooms: 4,
    bathrooms: 5,
    area: 4200,
  },
  {
    id: "7",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
    title: "Mountain Chalet",
    location: "Vail, CO",
    price: "$3,100,000",
    bedrooms: 4,
    bathrooms: 3,
    area: 2900,
  },
  {
    id: "8",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
    title: "Country Estate",
    location: "Sonoma, CA",
    price: "$4,750,000",
    bedrooms: 5,
    bathrooms: 4.5,
    area: 5200,
  },
];

const Properties = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const initialType = (searchParams.get("type") as "sale" | "rent" | "all") || "all";
  
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [propertyType, setPropertyType] = useState(initialType);
  const [priceRange, setPriceRange] = useState([1000000, 8000000]);
  const [bedrooms, setBedrooms] = useState<string>("");
  const [filteredProperties, setFilteredProperties] = useState(allProperties);
  
  // Update the property type in all properties data
  const propertiesWithType = allProperties.map(property => ({
    ...property,
    type: property.price.includes('/month') ? 'rent' : 'sale' as 'sale' | 'rent'
  }));
  
  // Apply filters whenever filter state changes
  useEffect(() => {
    let filtered = propertiesWithType;
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(property => 
        property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply price filter
    filtered = filtered.filter(property => {
      const numericPrice = parseInt(property.price.replace(/[^0-9]/g, ''));
      return numericPrice >= priceRange[0] && numericPrice <= priceRange[1];
    });
    
    // Apply bedroom filter
    if (bedrooms) {
      filtered = filtered.filter(property => 
        bedrooms === "5+" 
          ? property.bedrooms >= 5
          : property.bedrooms === parseInt(bedrooms)
      );
    }
    
    // Apply property type filter (in a real app, properties would have a type field)
    if (propertyType && propertyType !== "all") {
        filtered = filtered.filter(property => property.type === propertyType);
    }
    
    setFilteredProperties(filtered);
  }, [searchQuery, priceRange, bedrooms, propertyType]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL search params
    if (searchQuery) {
      searchParams.set("search", searchQuery);
    } else {
      searchParams.delete("search");
    }
    setSearchParams(searchParams);
  };
  
  const formatPrice = (value: number) => {
    return `$${(value / 1000000).toFixed(1)}M`;
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-display text-estate-800 mb-2">Find Your Dream Home</h1>
          <p className="text-estate-500 mb-8">Browse our collection of premium properties</p>
          
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
            
            {/* Property Type Filter */}
            <Select value={propertyType} onValueChange={(value) => {
              setPropertyType(value as "sale" | "rent" | "all");
              if (value === "all") {
                searchParams.delete("type");
              } else {
                searchParams.set("type", value);
              }
              setSearchParams(searchParams);
            }}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Properties</SelectItem>
                <SelectItem value="sale">For Sale</SelectItem>
                <SelectItem value="rent">For Rent</SelectItem>
              </SelectContent>
            </Select>
            
            {/* Filters */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Properties</SheetTitle>
                </SheetHeader>
                <div className="space-y-6 py-6">
                  <div>
                    <h3 className="text-sm font-medium mb-3">Price Range</h3>
                    <div className="px-2">
                      <Slider 
                        defaultValue={[1000000, 8000000]} 
                        max={10000000} 
                        step={100000} 
                        onValueChange={setPriceRange}
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-sm text-estate-500">
                      <span>{formatPrice(priceRange[0])}</span>
                      <span>{formatPrice(priceRange[1])}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-3">Bedrooms</h3>
                    <Select value={bedrooms} onValueChange={setBedrooms}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any</SelectItem>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5+">5+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-3">Property Type</h3>
                    <Select value={propertyType} onValueChange={setPropertyType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any</SelectItem>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="condo">Condo</SelectItem>
                        <SelectItem value="villa">Villa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button 
                    className="w-full mt-6"
                    onClick={() => {
                      // Reset filters
                      setSearchQuery("");
                      setPriceRange([1000000, 8000000]);
                      setBedrooms("");
                      setPropertyType("");
                    }}
                    variant="outline"
                  >
                    Reset Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          {/* Results Count */}
          <div className="mb-6">
            <p className="text-estate-500">
              {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
            </p>
          </div>
          
          {/* Property Grid */}
          {filteredProperties.length > 0 ? (
            <PropertyGrid 
              properties={filteredProperties} 
              filterType={propertyType === "all" ? undefined : propertyType as "sale" | "rent"}
            />
          ) : (
            <div className="text-center py-10">
              <h3 className="text-xl font-medium text-estate-800 mb-2">No properties found</h3>
              <p className="text-estate-500">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Properties;
