
import PropertyCard from "./PropertyCard";

const PropertyGrid = () => {
  const properties = [
    {
      id: "1",
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
      title: "Forest Retreat",
      location: "Aspen, Colorado",
      price: "$2,450,000",
    },
    {
      id: "2",
      image: "https://images.unsplash.com/photo-1524230572899-a752b3835840",
      title: "Modern Villa",
      location: "Beverly Hills, CA",
      price: "$5,900,000",
    },
    {
      id: "3",
      image: "https://images.unsplash.com/photo-1433832597046-4f10e10ac764",
      title: "Urban Penthouse",
      location: "Manhattan, NY",
      price: "$3,750,000",
    },
    {
      id: "4",
      image: "https://images.unsplash.com/photo-1486718448742-163732cd1544",
      title: "Lake House",
      location: "Lake Tahoe, NV",
      price: "$4,200,000",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
      {properties.map((property) => (
        <PropertyCard key={property.id} {...property} />
      ))}
    </div>
  );
};

export default PropertyGrid;
