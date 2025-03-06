
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyGrid from "@/components/PropertyGrid";
import { SearchForm } from "@/components/properties/SearchForm";
import { FilterSidebar } from "@/components/properties/FilterSidebar";
import { usePropertyFilters } from "@/hooks/usePropertyFilters";
import { useSearchParams } from "react-router-dom";
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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 lg:pt-32 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-3 mb-8">
            <h1 className="text-4xl md:text-5xl font-display text-estate-800 mb-2">
              Discover Your Perfect Property
            </h1>
            <p className="text-estate-500 text-lg max-w-2xl">
              Browse our exclusive collection of premium properties, carefully curated to match your lifestyle.
            </p>
          </div>
          
          <SearchForm 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            propertyType={propertyType}
            setPropertyType={setPropertyType}
            handleSearch={handleSearch}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
          
          <div className="flex flex-col lg:flex-row gap-8 mt-8">
            <div className="lg:w-64 flex-shrink-0">
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
            
            <div className="flex-1">
              <div className="bg-white rounded-lg p-4 mb-6 shadow-sm border border-gray-100">
                <div className="flex justify-between items-center">
                  <p className="text-estate-600 font-medium">
                    {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
                  </p>
                  <div className="flex items-center gap-2">
                    {/* Add sorting options here if needed */}
                  </div>
                </div>
              </div>

              {filteredProperties.length > 0 ? (
                <PropertyGrid 
                  properties={filteredProperties} 
                  filterType={propertyType === "all" ? undefined : propertyType}
                />
              ) : (
                <div className="text-center py-16 bg-white rounded-lg border border-gray-100">
                  <h3 className="text-xl font-medium text-estate-800 mb-2">No properties found</h3>
                  <p className="text-estate-500">Try adjusting your search criteria</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Properties;
