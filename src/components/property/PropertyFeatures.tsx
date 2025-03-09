
import { Bed, Bath, Square } from "lucide-react";

interface PropertyFeaturesProps {
  bedrooms?: number;
  bathrooms?: number;
  sqft?: number | string;
}

const PropertyFeatures = ({ bedrooms, bathrooms, sqft }: PropertyFeaturesProps) => {
  // Format sqft as a string with commas if it's a number
  const formattedSqft = typeof sqft === 'number' 
    ? `${sqft.toLocaleString()} sq ft` 
    : sqft || "N/A";

  return (
    <div className="grid grid-cols-3 gap-4 py-6 border-y border-gray-200">
      <div className="text-center">
        <div className="flex justify-center mb-2">
          <Bed className="w-5 h-5 text-estate-500" />
        </div>
        <p className="text-sm text-estate-500">{bedrooms || "N/A"} Beds</p>
      </div>
      <div className="text-center">
        <div className="flex justify-center mb-2">
          <Bath className="w-5 h-5 text-estate-500" />
        </div>
        <p className="text-sm text-estate-500">{bathrooms || "N/A"} Baths</p>
      </div>
      <div className="text-center">
        <div className="flex justify-center mb-2">
          <Square className="w-5 h-5 text-estate-500" />
        </div>
        <p className="text-sm text-estate-500">{formattedSqft}</p>
      </div>
    </div>
  );
};

export default PropertyFeatures;
