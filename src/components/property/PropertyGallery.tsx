
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

const PropertyGallery = ({ images, title }: PropertyGalleryProps) => {
  const [currentImage, setCurrentImage] = useState(0);

  // Handle thumbnail click
  const handleThumbnailClick = (index: number) => {
    setCurrentImage(index);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        {/* Main carousel */}
        <Carousel 
          className="w-full" 
          opts={{
            align: "start",
            loop: true,
          }}
          onSlideChange={(api) => {
            const current = api?.selectedScrollSnap();
            if (typeof current === 'number') {
              setCurrentImage(current);
            }
          }}
          defaultSlide={currentImage}
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index} className="overflow-hidden rounded-lg aspect-[16/9]">
                <img 
                  src={image} 
                  alt={`${title} - view ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 hover:opacity-100 transition-opacity">
            <CarouselPrevious className="h-9 w-9 rounded-full bg-white/70 backdrop-blur-sm text-estate-800 hover:bg-white hover:text-estate-900" />
            <CarouselNext className="h-9 w-9 rounded-full bg-white/70 backdrop-blur-sm text-estate-800 hover:bg-white hover:text-estate-900" />
          </div>
        </Carousel>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-5 gap-2">
        {images.map((image, index) => (
          <div 
            key={index}
            className={cn(
              "aspect-video cursor-pointer rounded-md overflow-hidden transition-all duration-200 border-2",
              currentImage === index ? "border-blue-500 ring-2 ring-blue-300" : "border-transparent opacity-70 hover:opacity-100"
            )}
            onClick={() => handleThumbnailClick(index)}
          >
            <img 
              src={image} 
              alt={`${title} - thumbnail ${index + 1}`} 
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyGallery;
