
import { useState } from "react";

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

const PropertyGallery = ({ images, title }: PropertyGalleryProps) => {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div>
      <div className="relative aspect-video overflow-hidden rounded-lg mb-4">
        <img 
          src={images[currentImage]} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {images.map((image: string, index: number) => (
          <div 
            key={index}
            className={`aspect-video cursor-pointer rounded-md overflow-hidden ${
              currentImage === index ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setCurrentImage(index)}
          >
            <img 
              src={image} 
              alt={`${title} - view ${index + 1}`} 
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyGallery;
