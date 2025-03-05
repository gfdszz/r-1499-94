import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Bed, Bath, Square, MapPin, Share, Heart, Home, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "@/hooks/use-toast";
import PaymentModal from "@/components/PaymentModal";

const properties = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
    title: "Forest Retreat",
    location: "Aspen, Colorado",
    price: "$2,450,000",
    description: "This spectacular forest retreat offers privacy and luxury in the heart of Aspen. With breathtaking mountain views and premium finishes throughout, this home represents the pinnacle of mountain living.",
    features: ["4 Bedrooms", "3 Bathrooms", "3,200 sq ft", "Built in 2018", "2-Car Garage", "Mountain View"],
    images: [
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
    ]
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1524230572899-a752b3835840",
    title: "Modern Villa",
    location: "Beverly Hills, CA",
    price: "$5,900,000",
    description: "An architectural masterpiece in the heart of Beverly Hills. This modern villa features open concept living spaces, floor-to-ceiling windows, and a stunning infinity pool overlooking the city.",
    features: ["6 Bedrooms", "7 Bathrooms", "6,500 sq ft", "Built in 2020", "3-Car Garage", "City View"],
    images: [
      "https://images.unsplash.com/photo-1524230572899-a752b3835840",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3"
    ]
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1433832597046-4f10e10ac764",
    title: "Urban Penthouse",
    location: "Manhattan, NY",
    price: "$3,750,000",
    description: "Experience luxury urban living in this stunning Manhattan penthouse. Featuring floor-to-ceiling windows, chef's kitchen with premium appliances, and a private terrace with panoramic city views.",
    features: ["3 Bedrooms", "3.5 Bathrooms", "2,800 sq ft", "Built in 2015", "Doorman Building", "City View"],
    images: [
      "https://images.unsplash.com/photo-1433832597046-4f10e10ac764",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3"
    ]
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1486718448742-163732cd1544",
    title: "Lake House",
    location: "Lake Tahoe, NV",
    price: "$4,200,000",
    description: "Nestled on the shores of Lake Tahoe, this luxury residence offers direct lake access and stunning mountain views. The open floor plan and large windows create a seamless indoor-outdoor living experience.",
    features: ["5 Bedrooms", "4 Bathrooms", "3,900 sq ft", "Built in 2017", "Private Dock", "Lake View"],
    images: [
      "https://images.unsplash.com/photo-1486718448742-163732cd1544",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3"
    ]
  }
];

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<any>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [isRental, setIsRental] = useState(false);
  
  useEffect(() => {
    const foundProperty = properties.find(p => p.id === id);
    if (foundProperty) {
      setProperty(foundProperty);
      setCurrentImage(0);
    }
  }, [id]);

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

  const numericPrice = parseInt(property.price.replace(/[^0-9]/g, ""));
  const monthlyRent = Math.round(numericPrice * 0.004);

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
            <div className="relative aspect-video overflow-hidden rounded-lg mb-4">
              <img 
                src={property.images[currentImage]} 
                alt={property.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {property.images.map((image: string, index: number) => (
                <div 
                  key={index}
                  className={`aspect-video cursor-pointer rounded-md overflow-hidden ${
                    currentImage === index ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setCurrentImage(index)}
                >
                  <img 
                    src={image} 
                    alt={`${property.title} - view ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-display text-estate-800 mb-2">{property.title}</h1>
              <div className="flex items-center text-estate-500 mb-4">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{property.location}</span>
              </div>
              <p className="text-3xl font-display text-estate-800">{property.price}</p>
              <p className="text-estate-500 mt-1">Estimated rent: ${monthlyRent.toLocaleString()}/month</p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-gray-200">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Bed className="w-5 h-5 text-estate-500" />
                </div>
                <p className="text-sm text-estate-500">4 Beds</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Bath className="w-5 h-5 text-estate-500" />
                </div>
                <p className="text-sm text-estate-500">3 Baths</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Square className="w-5 h-5 text-estate-500" />
                </div>
                <p className="text-sm text-estate-500">3,200 sq ft</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-3">Description</h3>
              <p className="text-estate-600">{property.description}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-3">Features</h3>
              <ul className="grid grid-cols-2 gap-2">
                {property.features.map((feature: string, index: number) => (
                  <li key={index} className="text-estate-600">• {feature}</li>
                ))}
              </ul>
            </div>
            
            <div className="pt-6 border-t border-gray-200">
              <h3 className="font-medium text-lg mb-3">Take Action</h3>
              <div className="space-y-3">
                <Button 
                  onClick={() => handlePayment(false)}
                  className="w-full bg-estate-800 hover:bg-estate-700 flex items-center justify-center"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Purchase Property
                </Button>
                <Button 
                  onClick={() => handlePayment(true)}
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
        </div>
      </div>
      
      <PaymentModal 
        open={paymentModalOpen}
        onOpenChange={setPaymentModalOpen}
        propertyTitle={property?.title || ""}
        price={property?.price || ""}
        isRental={isRental}
      />
      
      <Footer />
    </div>
  );
};

export default PropertyDetails;
