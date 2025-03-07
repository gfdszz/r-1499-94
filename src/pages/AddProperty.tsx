
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useProperties } from "@/hooks/useProperties";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AddProperty = () => {
  const { user, isLoading: authLoading } = useAuth();
  const { addProperty, uploadPropertyImage } = useProperties();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    type: "sale" as "sale" | "rent",
  });
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (value: "sale" | "rent") => {
    setFormData(prev => ({ ...prev, type: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setImages(prev => [...prev, ...selectedFiles]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setIsSubmitting(true);

      // Convert numeric fields
      const propertyData = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        location: formData.location,
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseFloat(formData.bathrooms),
        area: parseFloat(formData.area),
        type: formData.type,
        user_id: user.id,
      };

      // Add property to database
      const newProperty = await addProperty(propertyData);
      
      if (newProperty && images.length > 0) {
        // Upload images and add URLs to property
        const imageUrls = [];
        for (const image of images) {
          const imageUrl = await uploadPropertyImage(image, newProperty.id);
          if (imageUrl) imageUrls.push(imageUrl);
        }
        
        if (imageUrls.length > 0) {
          // Update property with image URLs
          // This would normally be handled by a server function or trigger
          console.log("Uploaded images:", imageUrls);
        }
      }

      toast({
        title: "Success",
        description: "Property added successfully",
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Error adding property:", error);
      toast({
        title: "Error",
        description: "Failed to add property",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-estate-800"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-28 pb-16">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-display">Add New Property</CardTitle>
              <CardDescription>
                Enter the details of your property listing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Property Title</Label>
                    <Input 
                      id="title" 
                      name="title" 
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Modern Villa with Ocean View"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      name="description" 
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe your property in detail..."
                      className="min-h-[120px]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Price ($)</Label>
                      <Input 
                        id="price" 
                        name="price" 
                        type="number" 
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="1000000"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input 
                        id="location" 
                        name="location" 
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Beverly Hills, CA"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="bedrooms">Bedrooms</Label>
                      <Input 
                        id="bedrooms" 
                        name="bedrooms" 
                        type="number" 
                        value={formData.bedrooms}
                        onChange={handleChange}
                        placeholder="3"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="bathrooms">Bathrooms</Label>
                      <Input 
                        id="bathrooms" 
                        name="bathrooms" 
                        type="number" 
                        value={formData.bathrooms}
                        onChange={handleChange}
                        placeholder="2.5"
                        step="0.5"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="area">Area (sq ft)</Label>
                      <Input 
                        id="area" 
                        name="area" 
                        type="number" 
                        value={formData.area}
                        onChange={handleChange}
                        placeholder="2500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Property Type</Label>
                    <RadioGroup value={formData.type} onValueChange={handleTypeChange} className="flex gap-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sale" id="sale" />
                        <Label htmlFor="sale" className="cursor-pointer">For Sale</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="rent" id="rent" />
                        <Label htmlFor="rent" className="cursor-pointer">For Rent</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label htmlFor="images">Property Images</Label>
                    <div className="mt-2">
                      <Input 
                        id="images" 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange}
                        multiple
                        className="mb-2"
                      />
                      <p className="text-sm text-gray-500 mb-2">Upload multiple images of your property</p>
                      
                      {images.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                          {images.map((file, index) => (
                            <div key={index} className="relative group">
                              <img 
                                src={URL.createObjectURL(file)} 
                                alt={`Property preview ${index}`}
                                className="w-full h-24 object-cover rounded-md"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate("/dashboard")}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-estate-800 hover:bg-estate-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Adding Property..." : "Add Property"}
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="text-sm text-gray-500">
              All fields marked with an asterisk (*) are required
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AddProperty;
