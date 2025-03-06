import { MapPin, Bed, Bath, Square, Home, Tag } from "lucide-react";
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
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(`${type === 'sale' ? 'Purchase' : 'Rent'} property: ${id}`);
  };

  const displayPrice = type === 'rent' ? `${price}/month` : price;

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
              {displayPrice}
            </div>
            <div className={`absolute top-3 left-3 ${type === 'sale' ? 'bg-blue-500' : 'bg-green-500'} text-white px-3 py-1.5 text-sm font-medium rounded-md flex items-center gap-1`}>
              {type === 'sale' ? <Tag className="w-4 h-4" /> : <Home className="w-4 h-4" />}
              {type === 'sale' ? 'For Sale' : 'For Rent'}
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
                className={`flex-1 ${type === 'sale' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'} py-1 h-auto`}
                onClick={handleClick}
              >
                {type === 'sale' ? (
                  <>
                    <Tag className="w-3 h-3 mr-1" />
                    Purchase
                  </>
                ) : (
                  <>
                    <Home className="w-3 h-3 mr-1" />
                    Rent Now
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PropertyCard;
