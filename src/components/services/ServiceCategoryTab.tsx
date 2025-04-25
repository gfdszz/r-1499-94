
import { Button } from "@/components/ui/button";
import { ServiceCard } from "./ServiceCard";
import { ServiceCategory } from "@/types/service";

interface ServiceCategoryTabProps {
  category: ServiceCategory;
}

export const ServiceCategoryTab = ({ category }: ServiceCategoryTabProps) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {category.services.map((service, index) => (
          <ServiceCard 
            key={index}
            service={service}
            category={category.category}
          />
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <Button className="bg-estate-800 hover:bg-estate-700 shadow-sm">
          View All {category.title} Services
        </Button>
      </div>
    </div>
  );
};
