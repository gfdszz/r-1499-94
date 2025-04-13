
import PropertyCard from "./PropertyCard";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Property as SupabaseProperty } from "@/lib/supabase";
import { Property } from "@/types/property";

// Function to convert Supabase property to frontend property
export const mapSupabasePropertyToProperty = (property: SupabaseProperty): Property => {
  return {
    id: property.id,
    image: property.images && property.images.length > 0 
      ? property.images[0] 
      : "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    title: property.title,
    location: property.location,
    price: `$${property.price.toLocaleString()}`,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    area: property.area,
    type: property.type,
  };
};

interface PropertyGridProps {
  properties?: Property[] | SupabaseProperty[];
  loading?: boolean;
  filterType?: 'sale' | 'rent' | 'all';
  fromSupabase?: boolean;
}

const PropertyGrid = ({ 
  properties: propProperties, 
  loading = false, 
  filterType = 'all',
  fromSupabase = false
}: PropertyGridProps) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(loading);
  const [hasRendered, setHasRendered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    setIsLoading(true);
    
    // Use requestAnimationFrame for smoother loading
    const loadProperties = () => {
      if (propProperties) {
        if (fromSupabase) {
          // Convert Supabase properties to frontend properties
          const convertedProperties = (propProperties as SupabaseProperty[]).map(
            mapSupabasePropertyToProperty
          );
          setProperties(convertedProperties);
        } else {
          setProperties(propProperties as Property[]);
        }
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
      setTimeout(() => setHasRendered(true), 100);
    };

    // Simulate network delay but make it shorter (250ms)
    const timer = setTimeout(() => {
      requestAnimationFrame(loadProperties);
    }, 250);
    
    // Set up intersection observer for animation
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );
    
    const element = document.getElementById("properties");
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [propProperties, fromSupabase]);

  const filteredProperties = filterType === 'all' 
    ? properties 
    : properties.filter(property => property.type === filterType);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="animate-pulse" style={{ animationDelay: `${i * 100}ms` }}>
            <Skeleton className="h-[400px] w-full rounded-lg bg-gradient-to-b from-estate-100 to-estate-50" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto px-4">
      {filteredProperties.map((property, index) => (
        <div 
          key={property.id}
          className="opacity-0 animate-fadeIn transform transition-all duration-500"
          style={{ 
            animationDelay: `${(hasRendered || !isInView) ? 0 : index * 150 + 300}ms`,
            animationFillMode: 'forwards',
            animationPlayState: isInView ? 'running' : 'paused'
          }}
        >
          <PropertyCard {...property} type={property.type} />
        </div>
      ))}
    </div>
  );
};

export default PropertyGrid;
