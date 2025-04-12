
import { MapPin, Bed, Bath, Square, Home, Tag } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";

interface PropertyCardProps {
  image: string;
  title: string;
  location: string;
  price: string;
  id?: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  type?: 'sale' | 'rent';
}

const PropertyCard = ({ 
  image, 
  title, 
  location, 
  price, 
  id = "1",
  bedrooms,
  bathrooms,
  area,
  type = 'sale'
}: PropertyCardProps) => {
  const displayPrice = type === 'rent' ? `${price}/month` : price;

  return (
    <Link to={`/property/${id}`}>
      <Card className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 border-0 bg-white">
        <CardContent className="p-0">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={image}
              alt={title}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-estate-800 px-3 py-1.5 text-sm font-medium rounded-md">
              {displayPrice}
            </div>
            <div className={`absolute top-3 left-3 ${type === 'sale' ? 'bg-blue-500/90' : 'bg-green-500/90'} backdrop-blur-sm text-white px-3 py-1.5 text-sm font-medium rounded-md flex items-center gap-1`}>
              {type === 'sale' ? <Tag className="w-4 h-4" /> : <Home className="w-4 h-4" />}
              {type === 'sale' ? 'For Sale' : 'For Rent'}
            </div>
            
            {/* Add favorite button */}
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <FavoriteButton 
                propertyId={id} 
                variant="outline" 
                size="sm"
                className="bg-white/90 backdrop-blur-sm hover:bg-white"
                showText={false}
              />
            </div>
          </div>
          <div className="p-5">
            <h3 className="text-lg font-medium text-estate-800 line-clamp-1 group-hover:text-estate-600 transition-colors">
              {title}
            </h3>
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
