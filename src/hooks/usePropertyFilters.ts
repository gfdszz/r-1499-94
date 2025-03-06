
import { useState, useEffect } from "react";
import { Property, PropertyType } from "@/types/property";
import { allProperties } from "@/data/properties";

export const usePropertyFilters = (initialSearch: string, initialType: PropertyType) => {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [propertyType, setPropertyType] = useState<PropertyType>(initialType);
  const [priceRange, setPriceRange] = useState<[number, number]>([1000000, 8000000]);
  const [bedrooms, setBedrooms] = useState<string>("");
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(allProperties);

  useEffect(() => {
    let filtered = allProperties;
    
    if (searchQuery) {
      filtered = filtered.filter(property => 
        property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    filtered = filtered.filter(property => {
      const numericPrice = parseInt(property.price.replace(/[^0-9]/g, ''));
      return numericPrice >= priceRange[0] && numericPrice <= priceRange[1];
    });
    
    if (bedrooms) {
      filtered = filtered.filter(property => 
        bedrooms === "5+" 
          ? property.bedrooms >= 5
          : property.bedrooms === parseInt(bedrooms)
      );
    }
    
    if (propertyType !== "all") {
      filtered = filtered.filter(property => property.type === propertyType);
    }
    
    setFilteredProperties(filtered);
  }, [searchQuery, priceRange, bedrooms, propertyType]);

  const resetFilters = () => {
    setSearchQuery("");
    setPriceRange([1000000, 8000000]);
    setBedrooms("");
    setPropertyType("all");
  };

  return {
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
  };
};
