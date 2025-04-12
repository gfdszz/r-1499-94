
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PaymentModal from "@/components/PaymentModal";
import PropertyGallery from "@/components/property/PropertyGallery";
import PropertyHeader from "@/components/property/PropertyHeader";
import PropertyFeatures from "@/components/property/PropertyFeatures";
import PropertyDescription from "@/components/property/PropertyDescription";
import PropertyActions from "@/components/property/PropertyActions";
import PropertyMap from "@/components/property/PropertyMap";
import { properties } from "@/data/propertyDetails";
import { useProperties } from "@/hooks/useProperties";

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<any>(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [isRental, setIsRental] = useState(false);
  const { getPropertyById } = useProperties();
  
  useEffect(() => {
    const fetchProperty = async () => {
      // Try to fetch from Supabase first
      if (id) {
        const supabaseProperty = await getPropertyById(id);
        if (supabaseProperty) {
          setProperty(supabaseProperty);
          return;
        }
      }

      // Fallback to demo data
      const foundProperty = properties.find(p => p.id === id);
      if (foundProperty) {
        setProperty(foundProperty);
      }
    };
    
    fetchProperty();
  }, [id, getPropertyById]);

  const handlePayment = (rental: boolean) => {
    setIsRental(rental);
    setPaymentModalOpen(true);
  };

  if (!property) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-32 text-center">
          <h2 className="text-3xl font-display">Property not found</h2>
          <Link to="/properties" className="mt-6 inline-block text-blue-600 hover:underline">
            Return to all properties
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Handle both Supabase and demo property formats
  const price = property.price?.toString ? property.price.toString() : property.price;
  const numericPrice = parseInt(price?.replace(/[^0-9]/g, "") || "0");
  const monthlyRent = Math.round(numericPrice * 0.004);
  const propertyId = property.id || id || "1";

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-28 pb-16">
        <Link to="/properties" className="flex items-center text-estate-500 hover:text-estate-700 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to all properties
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <PropertyGallery 
              images={property.images || [property.image]} 
              title={property.title} 
            />
            
            <PropertyMap
              location={property.location}
              coordinates={property.coordinates}
            />
          </div>
          
          <div className="space-y-6">
            <PropertyHeader 
              title={property.title}
              location={property.location}
              price={price}
              monthlyRent={monthlyRent}
            />
            
            <PropertyFeatures 
              bedrooms={property.bedrooms} 
              bathrooms={property.bathrooms} 
              sqft={property.area || property.sqft}
            />
            
            <PropertyDescription 
              description={property.description}
              features={property.features}
            />
            
            <PropertyActions 
              title={property.title}
              propertyId={propertyId}
              onPayment={handlePayment}
            />
          </div>
        </div>
      </div>
      
      <PaymentModal 
        open={paymentModalOpen}
        onOpenChange={setPaymentModalOpen}
        propertyTitle={property?.title || ""}
        price={price || ""}
        isRental={isRental}
      />
      
      <Footer />
    </div>
  );
};

export default PropertyDetails;
