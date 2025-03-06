
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyGrid from "@/components/PropertyGrid";
import { SearchForm } from "@/components/properties/SearchForm";
import { FilterSidebar } from "@/components/properties/FilterSidebar";
import { usePropertyFilters } from "@/hooks/usePropertyFilters";
import { PropertyType } from "@/types/property";

const Properties = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const initialType = (searchParams.get("type") as PropertyType) || "all";
  
  const {
    searchQuery,
    setSearchQuery,
    propertyType,
    setPropertyType,
    priceRange,
    setPriceRange,
    bedrooms,
    setBedrooms,
    filteredProperties,
    resetFilters,
  } = usePropertyFilters(initialSearch, initialType);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      searchParams.set("search", searchQuery);
    } else {
      searchParams.delete("search");
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-display text-estate-800 mb-2">Find Your Dream Home</h1>
          <p className="text-estate-500 mb-8">Browse our collection of premium properties</p>
          
          <SearchForm 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            propertyType={propertyType}
            setPropertyType={setPropertyType}
            handleSearch={handleSearch}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
          
          <div className="flex justify-between items-center mb-6">
            <p className="text-estate-500">
              {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
            </p>
            
            <FilterSidebar 
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              bedrooms={bedrooms}
              setBedrooms={setBedrooms}
              propertyType={propertyType}
              setPropertyType={setPropertyType}
              resetFilters={resetFilters}
            />
          </div>
          
          {filteredProperties.length > 0 ? (
            <PropertyGrid 
              properties={filteredProperties} 
              filterType={propertyType === "all" ? undefined : propertyType}
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
