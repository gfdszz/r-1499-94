
import { Bed, Bath, Square } from "lucide-react";

interface PropertyFeaturesProps {
  bedrooms?: number;
  bathrooms?: number;
  sqft?: string;
}

const PropertyFeatures = ({ bedrooms = 4, bathrooms = 3, sqft = "3,200 sq ft" }: PropertyFeaturesProps) => {
  return (
    <div className="grid grid-cols-3 gap-4 py-6 border-y border-gray-200">
      <div className="text-center">
        <div className="flex justify-center mb-2">
          <Bed className="w-5 h-5 text-estate-500" />
        </div>
        <p className="text-sm text-estate-500">{bedrooms} Beds</p>
      </div>
      <div className="text-center">
        <div className="flex justify-center mb-2">
          <Bath className="w-5 h-5 text-estate-500" />
        </div>
        <p className="text-sm text-estate-500">{bathrooms} Baths</p>
      </div>
      <div className="text-center">
        <div className="flex justify-center mb-2">
          <Square className="w-5 h-5 text-estate-500" />
        </div>
        <p className="text-sm text-estate-500">{sqft}</p>
      </div>
    </div>
  );
};

export default PropertyFeatures;
