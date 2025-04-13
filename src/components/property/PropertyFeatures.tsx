
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
    <div className="grid grid-cols-3 gap-4 p-5 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="text-center">
        <div className="flex justify-center mb-2">
          <Bed className="w-5 h-5 text-estate-500" />
        </div>
        <p className="text-lg font-medium text-estate-800">{bedrooms || "N/A"}</p>
        <p className="text-xs text-estate-500">Bedrooms</p>
      </div>
      <div className="text-center border-x border-gray-100 px-2">
        <div className="flex justify-center mb-2">
          <Bath className="w-5 h-5 text-estate-500" />
        </div>
        <p className="text-lg font-medium text-estate-800">{bathrooms || "N/A"}</p>
        <p className="text-xs text-estate-500">Bathrooms</p>
      </div>
      <div className="text-center">
        <div className="flex justify-center mb-2">
          <Square className="w-5 h-5 text-estate-500" />
        </div>
        <p className="text-lg font-medium text-estate-800">
          {typeof sqft === 'number' ? sqft.toLocaleString() : sqft || "N/A"}
        </p>
        <p className="text-xs text-estate-500">Square Feet</p>
      </div>
    </div>
  );
};

export default PropertyFeatures;
