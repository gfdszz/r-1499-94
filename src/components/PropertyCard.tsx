
import { MapPin, Bed, Bath, Square } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Link } from "react-router-dom";

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
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PropertyCard;
