
import PropertyCard from "./PropertyCard";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface Property {
  id: string;
  image: string;
  title: string;
  location: string;
  price: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  type: 'sale' | 'rent';
}

interface PropertyGridProps {
  properties?: Property[];
  loading?: boolean;
  filterType?: 'sale' | 'rent' | 'all';
}

const PropertyGrid = ({ properties: propProperties, loading = false, filterType = 'all' }: PropertyGridProps) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(loading);
  
  useEffect(() => {
    setIsLoading(true);
    
    // Use requestAnimationFrame for smoother loading
    const loadProperties = () => {
      if (propProperties) {
        setProperties(propProperties);
      } else {
        setProperties([
          {
            id: "1",
            image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&q=75&fit=crop&w=800",
            title: "Forest Retreat",
            location: "Aspen, Colorado",
            price: "$2,450,000",
            bedrooms: 4,
            bathrooms: 3,
            area: 3200,
            type: 'sale'
          },
          {
            id: "2",
            image: "https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&q=75&fit=crop&w=800",
            title: "Modern Villa",
            location: "Beverly Hills, CA",
            price: "$5,900,000",
            bedrooms: 6,
            bathrooms: 7,
            area: 6500,
            type: 'sale'
          },
          {
            id: "3",
            image: "https://images.unsplash.com/photo-1433832597046-4f10e10ac764?auto=format&q=75&fit=crop&w=800",
            title: "Urban Penthouse for Rent",
            location: "Manhattan, NY",
            price: "$15,000",
            bedrooms: 3,
            bathrooms: 3.5,
            area: 2800,
            type: 'rent'
          },
          {
            id: "4",
            image: "https://images.unsplash.com/photo-1486718448742-163732cd1544?auto=format&q=75&fit=crop&w=800",
            title: "Lake House",
            location: "Lake Tahoe, NV",
            price: "$4,200,000",
            bedrooms: 5,
            bathrooms: 4,
            area: 3900,
            type: 'sale'
          },
        ]);
      }
      setIsLoading(false);
    };

    // Simulate network delay but make it shorter (250ms)
    const timer = setTimeout(() => {
      requestAnimationFrame(loadProperties);
    }, 250);
    
    return () => clearTimeout(timer);
  }, [propProperties]);

  const filteredProperties = filterType === 'all' 
    ? properties 
    : properties.filter(property => property.type === filterType);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="animate-in fade-in duration-300" style={{ animationDelay: `${i * 100}ms` }}>
            <Skeleton className="h-[400px] w-full rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
      {filteredProperties.map((property, index) => (
        <div 
          key={property.id} 
          className="animate-in fade-in duration-300" 
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <PropertyCard {...property} type={property.type} />
        </div>
      ))}
    </div>
  );
};

export default PropertyGrid;
