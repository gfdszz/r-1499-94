
import { Share, Heart, Home, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface PropertyActionsProps {
  title: string;
  onPayment: (rental: boolean) => void;
}

const PropertyActions = ({ title, onPayment }: PropertyActionsProps) => {
  const handleContactAgent = () => {
    toast({
      title: "Request Sent",
      description: "A real estate agent will contact you shortly about this property.",
    });
  };

  const handleScheduleViewing = () => {
    toast({
      title: "Viewing Scheduled",
      description: "Check your email for confirmation details.",
    });
  };

  const handleSaveProperty = () => {
    toast({
      title: "Property Saved",
      description: "This property has been added to your favorites.",
    });
  };

  const handleShareProperty = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied",
      description: "Property link has been copied to clipboard.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="pt-6 border-t border-gray-200">
        <h3 className="font-medium text-lg mb-3">Take Action</h3>
        <div className="space-y-3">
          <Button 
            onClick={() => onPayment(false)}
            className="w-full bg-estate-800 hover:bg-estate-700 flex items-center justify-center"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Purchase Property
          </Button>
          <Button 
            onClick={() => onPayment(true)}
            variant="outline" 
            className="w-full border-estate-800 text-estate-800 hover:bg-estate-50 flex items-center justify-center"
          >
            <Home className="w-4 h-4 mr-2" />
            Rent Property
          </Button>
        </div>
      </div>
      
      <div className="space-y-3 pt-4">
        <Button 
          onClick={handleContactAgent}
          className="w-full bg-estate-800 hover:bg-estate-700"
        >
          Contact Agent
        </Button>
        <Button 
          onClick={handleScheduleViewing}
          variant="outline" 
          className="w-full border-estate-800 text-estate-800 hover:bg-estate-50"
        >
          Schedule Viewing
        </Button>
        <div className="flex space-x-3">
          <Button
            onClick={handleSaveProperty}
            variant="outline"
            className="flex-1 border-estate-300 text-estate-600 hover:bg-estate-50"
          >
            <Heart className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button
            onClick={handleShareProperty}
            variant="outline"
            className="flex-1 border-estate-300 text-estate-600 hover:bg-estate-50"
          >
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyActions;
