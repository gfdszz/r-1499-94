
import { useState, useCallback } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface PropertyMapProps {
  location: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

const PropertyMap = ({ location, coordinates }: PropertyMapProps) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  
  // Default coordinates (will use these if specific coordinates aren't provided)
  const defaultCenter = coordinates || {
    lat: 34.0522, // Los Angeles default
    lng: -118.2437,
  };
  
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
    borderRadius: "0.5rem",
  };
  
  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);
  
  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return (
    <div className="mt-8">
      <h3 className="font-medium text-lg mb-4">Property Location</h3>
      <LoadScript googleMapsApiKey="YOUR_API_KEY">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={defaultCenter}
          zoom={15}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            disableDefaultUI: false,
            zoomControl: true,
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true,
          }}
        >
          <Marker position={defaultCenter} title={location} />
        </GoogleMap>
      </LoadScript>
      <p className="text-estate-500 mt-2 text-sm">Address: {location}</p>
    </div>
  );
};

export default PropertyMap;
