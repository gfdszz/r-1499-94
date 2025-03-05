
import PropertyCard from "./PropertyCard";
import { useEffect, useState } from "react";

interface Property {
  id: string;
  image: string;
  title: string;
  location: string;
  price: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
}

interface PropertyGridProps {
  properties?: Property[];
  loading?: boolean;
}

const PropertyGrid = ({ properties: propProperties, loading = false }: PropertyGridProps) => {
  const [properties, setProperties] = useState<Property[]>([]);
  
  // Default properties will be used if none are passed in
  useEffect(() => {
    if (propProperties) {
      setProperties(propProperties);
    } else {
      setProperties([
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
      ]);
    }
  }, [propProperties]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="rounded-lg overflow-hidden bg-gray-200 aspect-[3/4]"></div>
            <div className="mt-4 bg-gray-200 h-5 rounded w-2/3"></div>
            <div className="mt-2 bg-gray-200 h-4 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
      {properties.map((property) => (
        <PropertyCard key={property.id} {...property} />
      ))}
    </div>
  );
};

export default PropertyGrid;
