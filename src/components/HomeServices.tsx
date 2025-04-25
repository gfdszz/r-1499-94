
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ServiceCategoryTab } from "./services/ServiceCategoryTab";
import { servicesData } from "@/data/servicesData";

export const HomeServices = () => {
  return (
    <section id="services" className="py-24 bg-gradient-to-b from-white to-estate-50/50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display text-estate-800 mb-4">
            Home Services & Maintenance
            <div className="w-20 h-1 bg-gradient-to-r from-amber-300 to-amber-400 mx-auto mt-4 rounded-full"></div>
          </h2>
          <p className="text-estate-600 max-w-2xl mx-auto">
            From routine maintenance to specialized repairs, our network of certified professionals ensures your home stays in perfect condition.
          </p>
        </div>

        <Tabs defaultValue="maintenance" className="w-full">
          <TabsList className="mb-8 flex flex-wrap justify-center gap-2 sm:gap-4">
            {servicesData.map((category) => (
              <TabsTrigger 
                key={category.category} 
                value={category.category}
                className="flex items-center gap-2 px-4 py-2 data-[state=active]:bg-estate-100"
              >
                <category.icon className="w-4 h-4" />
                <span>{category.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {servicesData.map((category) => (
            <TabsContent 
              key={category.category} 
              value={category.category} 
              className="focus-visible:outline-none focus-visible:ring-0"
            >
              <ServiceCategoryTab category={category} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default HomeServices;
