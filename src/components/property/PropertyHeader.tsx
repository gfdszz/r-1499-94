
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PropertyHeaderProps {
  title: string;
  location: string;
  price: string;
  monthlyRent: number;
}

const PropertyHeader = ({ title, location, price, monthlyRent }: PropertyHeaderProps) => {
  return (
    <div className="bg-white p-5 border border-gray-200 rounded-lg shadow-sm">
      <h1 className="text-2xl md:text-3xl font-display text-estate-800 mb-2">{title}</h1>
      <div className="flex items-center text-estate-500 mb-4">
        <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
        <span className="text-sm">{location}</span>
      </div>
      <div className="border-t border-gray-100 pt-4 mt-2">
        <p className="text-3xl font-display text-estate-800">{price}</p>
        <div className="flex items-center mt-1">
          <p className="text-estate-500 text-sm">Est. Monthly: ${monthlyRent.toLocaleString()}</p>
          <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 hover:bg-blue-100">
            Get Pre-Approved
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default PropertyHeader;
