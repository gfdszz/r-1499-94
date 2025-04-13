
import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Card, 
  CardContent 
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { toast } from '@/hooks/use-toast';
import { ChevronRight, UploadCloud, X, Check } from 'lucide-react';

const FurnitureForm = () => {
  const [furnitureType, setFurnitureType] = useState('');
  const [condition, setCondition] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      const newImages = [...images, ...selectedFiles].slice(0, 5); // Limit to 5 images
      setImages(newImages);
      
      // Create previews
      const newPreviews = newImages.map(file => URL.createObjectURL(file));
      setImagePreviews(newPreviews);
      
      if (newImages.length >= 5) {
        toast({
          title: "Maximum images reached",
          description: "You can upload a maximum of 5 images",
        });
      }
    }
  };
  
  const handleClickUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const removeImage = (index: number) => {
    const newImages = [...images];
    const newPreviews = [...imagePreviews];
    
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(newPreviews[index]);
    
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setImages(newImages);
    setImagePreviews(newPreviews);
  };
  
  const nextStep = () => {
    setFormStep(formStep + 1);
  };
  
  const prevStep = () => {
    setFormStep(formStep - 1);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Furniture listed successfully",
        description: "Your furniture has been added to the marketplace",
      });
      
      // Reset form
      setFurnitureType('');
      setCondition('');
      setImages([]);
      setImagePreviews([]);
      setFormStep(1);
    }, 1500);
  };
  
  useEffect(() => {
    // Cleanup previews when component unmounts
    return () => {
      imagePreviews.forEach(preview => URL.revokeObjectURL(preview));
    };
  }, []);
  
  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto py-8 px-4 space-y-6">
      <h2 className="text-2xl font-display text-estate-800 mb-4">List Furniture for Sale</h2>
      
      {formStep === 1 && (
        <div className="space-y-6 animate-in fade-in">
          <div className="space-y-2">
            <Label htmlFor="furnitureType">Furniture Type</Label>
            <Select value={furnitureType} onValueChange={setFurnitureType} required>
              <SelectTrigger id="furnitureType">
                <SelectValue placeholder="Select furniture type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sofa">Sofa/Couch</SelectItem>
                <SelectItem value="chair">Chair</SelectItem>
                <SelectItem value="table">Table</SelectItem>
                <SelectItem value="bed">Bed/Mattress</SelectItem>
                <SelectItem value="storage">Storage/Shelving</SelectItem>
                <SelectItem value="desk">Desk</SelectItem>
                <SelectItem value="lighting">Lighting</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="e.g. Modern Leather Sofa" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              placeholder="Describe your furniture - include dimensions, material, age, etc." 
              rows={4}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="condition">Condition</Label>
            <Select value={condition} onValueChange={setCondition} required>
              <SelectTrigger id="condition">
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="like-new">Like New</SelectItem>
                <SelectItem value="good">Good</SelectItem>
                <SelectItem value="fair">Fair</SelectItem>
                <SelectItem value="poor">Poor</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="price">Price ($)</Label>
            <Input id="price" type="number" min="0" step="0.01" placeholder="0.00" required />
          </div>
          
          <div className="flex justify-end">
            <Button 
              type="button" 
              onClick={nextStep}
              className="bg-estate-800 hover:bg-estate-700"
            >
              Next Step <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      
      {formStep === 2 && (
        <div className="space-y-6 animate-in fade-in">
          <div className="space-y-2">
            <Label>Upload Images (max 5)</Label>
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={handleClickUpload}
            >
              <UploadCloud className="h-10 w-10 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500 mb-1">Drag and drop or click to upload</p>
              <p className="text-xs text-gray-400">JPG, PNG or GIF (max 5MB each)</p>
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange} 
                className="hidden" 
                multiple 
                accept="image/*"
              />
            </div>
            
            {imagePreviews.length > 0 && (
              <div className="mt-4">
                <Label className="mb-2 block">Uploaded Images</Label>
                <div className="grid grid-cols-3 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative rounded-md overflow-hidden h-24">
                      <img 
                        src={preview} 
                        alt={`Preview ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" placeholder="e.g. Los Angeles, CA" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contact">Contact Information</Label>
            <Input id="contact" placeholder="Phone number or email" required />
          </div>
          
          <div className="flex justify-between">
            <Button 
              type="button" 
              variant="outline" 
              onClick={prevStep}
            >
              Back
            </Button>
            <Button 
              type="submit" 
              className="bg-estate-800 hover:bg-estate-700"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'List Furniture'}
            </Button>
          </div>
        </div>
      )}
    </form>
  );
};

const FurnitureGrid = () => {
  const furnitureItems = [
    {
      id: 1,
      title: "Modern Leather Sofa",
      price: "$899",
      location: "Los Angeles, CA",
      condition: "Like New",
      images: [
        "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e",
        "https://images.unsplash.com/photo-1558211583-d26f610c1eb1",
      ]
    },
    {
      id: 2,
      title: "Wooden Dining Table",
      price: "$350",
      location: "San Francisco, CA",
      condition: "Good",
      images: [
        "https://images.unsplash.com/photo-1577140917170-285929fb55b7",
        "https://images.unsplash.com/photo-1592078615290-033ee584e267",
      ]
    },
    {
      id: 3,
      title: "Office Desk Chair",
      price: "$120",
      location: "Seattle, WA",
      condition: "Fair",
      images: [
        "https://images.unsplash.com/photo-1505843513577-22bb7d21e455",
        "https://images.unsplash.com/photo-1580480055273-228ff5388ef8",
      ]
    },
    {
      id: 4,
      title: "Queen Size Bed Frame",
      price: "$450",
      location: "Portland, OR",
      condition: "Like New",
      images: [
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af",
      ]
    },
  ];
  
  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-display text-estate-800 mb-6">Furniture Marketplace</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {furnitureItems.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <Carousel className="w-full">
              <CarouselContent>
                {item.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-[4/3] relative">
                      <img 
                        src={image} 
                        alt={`${item.title} - view ${index + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
            <CardContent className="p-4">
              <h3 className="font-medium text-lg mb-1">{item.title}</h3>
              <p className="text-estate-800 font-semibold text-lg mb-2">{item.price}</p>
              <div className="flex justify-between text-sm text-estate-500">
                <span>{item.location}</span>
                <span>Condition: {item.condition}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const Furniture = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-estate-50 pt-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-display text-estate-800 mb-6 text-center">
            Furniture Exchange
          </h1>
          <p className="text-estate-600 max-w-3xl mx-auto text-center mb-12">
            Buy, sell or trade furniture with other property owners and renters. 
            Find quality pieces for your home or list your own furniture for sale.
          </p>
          
          <div className="bg-white rounded-xl shadow-sm p-6 mb-12">
            <FurnitureForm />
          </div>
          
          <FurnitureGrid />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Furniture;
