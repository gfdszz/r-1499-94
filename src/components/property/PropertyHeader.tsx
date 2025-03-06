
import { MapPin } from "lucide-react";

interface PropertyHeaderProps {
  title: string;
  location: string;
  price: string;
  monthlyRent: number;
}

const PropertyHeader = ({ title, location, price, monthlyRent }: PropertyHeaderProps) => {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-display text-estate-800 mb-2">{title}</h1>
      <div className="flex items-center text-estate-500 mb-4">
        <MapPin className="w-4 h-4 mr-1" />
        <span>{location}</span>
      </div>
      <p className="text-3xl font-display text-estate-800">{price}</p>
      <p className="text-estate-500 mt-1">Estimated rent: ${monthlyRent.toLocaleString()}/month</p>
    </div>
  );
};

export default PropertyHeader;
