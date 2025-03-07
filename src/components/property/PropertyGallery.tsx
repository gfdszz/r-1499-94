
import { useState, useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious,
  type CarouselApi 
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

const PropertyGallery = ({ images, title }: PropertyGalleryProps) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});
  const observerRef = useRef<IntersectionObserver | null>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  // Handle thumbnail click
  const handleThumbnailClick = (index: number) => {
    setCurrentImage(index);
    api?.scrollTo(index);
  };

  // Update the current image index when the carousel slides
  const onSelect = useCallback(() => {
    if (!api) return;
    const selectedIndex = api.selectedScrollSnap();
    setCurrentImage(selectedIndex);
  }, [api]);

  // Image load handler
  const handleImageLoad = (index: number) => {
    setImagesLoaded(prev => ({ ...prev, [index]: true }));
  };

  // Connect the onSelect callback to the carousel's events
  useEffect(() => {
    if (!api) return;
    
    api.on("select", onSelect);
    // Initial call to set the starting slide
    onSelect();

    // Cleanup
    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  // Setup intersection observer for lazy loading
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const dataSrc = img.dataset.src;
            if (dataSrc) {
              img.src = dataSrc;
              img.removeAttribute('data-src');
              observerRef.current?.unobserve(img);
            }
          }
        });
      },
      { rootMargin: '200px' }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Initialize image refs and observe them
  useEffect(() => {
    imageRefs.current = imageRefs.current.slice(0, images.length);
    
    imageRefs.current.forEach((img) => {
      if (img && observerRef.current) {
        observerRef.current.observe(img);
      }
    });

    return () => {
      if (observerRef.current) {
        imageRefs.current.forEach((img) => {
          if (img) observerRef.current?.unobserve(img);
        });
      }
    };
  }, [images]);

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
          setApi={setApi}
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index} className="overflow-hidden rounded-lg aspect-[16/9] relative">
                {!imagesLoaded[index] && (
                  <Skeleton className="w-full h-full absolute inset-0 bg-gray-200" />
                )}
                <img 
                  ref={el => imageRefs.current[index] = el}
                  data-src={image}
                  src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                  alt={`${title} - view ${index + 1}`} 
                  className={cn(
                    "w-full h-full object-cover transition-opacity duration-300",
                    imagesLoaded[index] ? "opacity-100" : "opacity-0"
                  )}
                  onLoad={() => handleImageLoad(index)}
                  loading="lazy"
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
            <div className="relative w-full h-full">
              {!imagesLoaded[index] && (
                <Skeleton className="w-full h-full absolute inset-0 bg-gray-200" />
              )}
              <img 
                ref={el => imageRefs.current[index + images.length] = el}
                data-src={image}
                src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                alt={`${title} - thumbnail ${index + 1}`} 
                className={cn(
                  "w-full h-full object-cover transition-opacity duration-300",
                  imagesLoaded[index] ? "opacity-100" : "opacity-0"
                )}
                onLoad={() => handleImageLoad(index)}
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyGallery;
