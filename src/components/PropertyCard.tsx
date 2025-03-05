
import { MapPin, Bed, Bath, Square, Home, CreditCard } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

interface PropertyCardProps {
  image: string;
  title: string;
  location: string;
  price: string;
  id?: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
}

const PropertyCard = ({ 
  image, 
  title, 
  location, 
  price, 
  id = "1",
  bedrooms,
  bathrooms,
  area
}: PropertyCardProps) => {
  const handleClick = (e: React.MouseEvent, action: string) => {
    e.preventDefault(); // Prevent navigating to property details
    e.stopPropagation();
    
    // In a real app, this would navigate to a payment flow with the correct action
    console.log(`${action} property: ${id}`);
  };

  return (
    <Link to={`/property/${id}`}>
      <Card className="overflow-hidden group cursor-pointer hover:shadow-xl transition-shadow duration-300 border border-gray-100">
        <CardContent className="p-0">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={image}
              alt={title}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 right-3 bg-estate-800/90 backdrop-blur-sm text-white px-3 py-1.5 text-sm font-medium rounded-md">
              {price}
            </div>
          </div>
          <div className="p-5">
            <h3 className="text-lg font-medium text-estate-800 line-clamp-1">{title}</h3>
            <div className="flex items-center mt-2 text-estate-500">
              <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
              <span className="text-sm line-clamp-1">{location}</span>
            </div>
            
            {(bedrooms !== undefined || bathrooms !== undefined || area !== undefined) && (
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 text-estate-600">
                {bedrooms !== undefined && (
                  <div className="flex items-center">
                    <Bed className="w-4 h-4 mr-1" />
                    <span className="text-xs">{bedrooms} {bedrooms === 1 ? 'Bed' : 'Beds'}</span>
                  </div>
                )}
                
                {bathrooms !== undefined && (
                  <div className="flex items-center">
                    <Bath className="w-4 h-4 mr-1" />
                    <span className="text-xs">{bathrooms} {bathrooms === 1 ? 'Bath' : 'Baths'}</span>
                  </div>
                )}
                
                {area !== undefined && (
                  <div className="flex items-center">
                    <Square className="w-4 h-4 mr-1" />
                    <span className="text-xs">{area.toLocaleString()} sq ft</span>
                  </div>
                )}
              </div>
            )}
            
            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
              <Button
                size="sm"
                variant="default"
                className="flex-1 bg-estate-800 hover:bg-estate-700 py-1 h-auto"
                onClick={(e) => handleClick(e, "buy")}
              >
                <CreditCard className="w-3 h-3 mr-1" />
                Buy
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1 border-estate-800 text-estate-800 hover:bg-estate-50 py-1 h-auto"
                onClick={(e) => handleClick(e, "rent")}
              >
                <Home className="w-3 h-3 mr-1" />
                Rent
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PropertyCard;
