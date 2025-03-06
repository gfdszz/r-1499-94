
interface PropertyDescriptionProps {
  description: string;
  features: string[];
}

const PropertyDescription = ({ description, features }: PropertyDescriptionProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium text-lg mb-3">Description</h3>
        <p className="text-estate-600">{description}</p>
      </div>
      
      <div>
        <h3 className="font-medium text-lg mb-3">Features</h3>
        <ul className="grid grid-cols-2 gap-2">
          {features.map((feature: string, index: number) => (
            <li key={index} className="text-estate-600">• {feature}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PropertyDescription;
