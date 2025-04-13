
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface PropertyDescriptionProps {
  description: string;
  features: string[];
}

const PropertyDescription = ({ description, features }: PropertyDescriptionProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium text-lg mb-3">Description</h3>
        <div className="text-estate-600 prose-sm max-w-none">
          <p className="mb-4">{description}</p>
          
          <Accordion type="single" collapsible className="mt-4">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-sm font-medium">Read more about this property</AccordionTrigger>
              <AccordionContent>
                <p className="text-estate-600 mb-4">
                  This exceptional property offers a perfect blend of comfort, style, and convenience.
                  The thoughtful design maximizes natural light and creates a seamless flow between indoor and outdoor living spaces.
                </p>
                <p className="text-estate-600">
                  Recent upgrades include modern appliances, smart home technology, and energy-efficient features
                  that contribute to reduced utility costs and environmental impact.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      
      <div>
        <h3 className="font-medium text-lg mb-3">Features</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
          {features.map((feature: string, index: number) => (
            <li key={index} className="text-estate-600 flex items-center">
              <span className="h-1.5 w-1.5 rounded-full bg-estate-400 mr-2 flex-shrink-0"></span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PropertyDescription;
