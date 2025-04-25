
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ServiceBadge } from "@/components/ui/service-badge";
import { ArrowRight } from "lucide-react";
import { ServiceItem } from "@/types/service";

interface ServiceCardProps {
  service: ServiceItem;
  category: string;
}

export const ServiceCard = ({ service, category }: ServiceCardProps) => {
  return (
    <Card className="overflow-hidden border-estate-100 transition-all duration-300 hover:shadow-md hover:border-estate-200">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl text-estate-800">{service.title}</CardTitle>
          <ServiceBadge type={category as any} />
        </div>
        <CardDescription className="text-estate-600 mt-2">{service.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="flex justify-between items-center">
          <div className="font-semibold text-estate-800 text-lg">{service.price}</div>
          <div className="text-estate-500 text-sm">{service.duration}</div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full group">
          Request Service
          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};
