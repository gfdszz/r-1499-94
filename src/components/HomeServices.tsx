import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Wrench, Plug, ShowerHead, Paintbrush, Thermometer, Leaf } from "lucide-react";

const servicesData = [
  {
    category: "maintenance",
    title: "Home Maintenance",
    icon: Wrench,
    services: [
      {
        title: "Regular Home Inspection",
        description: "Comprehensive inspection of your home's structure, systems, and components.",
        price: "$150",
        duration: "2-3 hours"
      },
      {
        title: "Seasonal Maintenance Package",
        description: "Prepare your home for seasonal changes with our comprehensive maintenance package.",
        price: "$350/season",
        duration: "1 day"
      },
      {
        title: "Handyman Services",
        description: "General repairs and installations around your home.",
        price: "From $95/hour",
        duration: "Varies"
      }
    ]
  },
  {
    category: "electrical",
    title: "Electrical Services",
    icon: Plug,
    services: [
      {
        title: "Electrical System Inspection",
        description: "Complete inspection of your home's electrical system to ensure safety and efficiency.",
        price: "$125",
        duration: "1-2 hours"
      },
      {
        title: "Fixture Installation",
        description: "Professional installation of lighting fixtures, ceiling fans, and other electrical fixtures.",
        price: "From $85/fixture",
        duration: "30-60 minutes/fixture"
      },
      {
        title: "Wiring Upgrade",
        description: "Upgrade your home's wiring to meet modern standards and needs.",
        price: "From $500",
        duration: "1-3 days"
      }
    ]
  },
  {
    category: "plumbing",
    title: "Plumbing Services",
    icon: ShowerHead,
    services: [
      {
        title: "Plumbing Inspection",
        description: "Thorough inspection of your home's plumbing system to identify issues.",
        price: "$120",
        duration: "1-2 hours"
      },
      {
        title: "Leak Detection & Repair",
        description: "Advanced leak detection and professional repair services.",
        price: "From $150",
        duration: "1-4 hours"
      },
      {
        title: "Fixture Installation",
        description: "Installation of sinks, faucets, toilets, and other plumbing fixtures.",
        price: "From $120/fixture",
        duration: "1-3 hours/fixture"
      }
    ]
  },
  {
    category: "painting",
    title: "Interior & Exterior Painting",
    icon: Paintbrush,
    services: [
      {
        title: "Interior Painting",
        description: "Professional painting for interior walls, ceilings, and trim.",
        price: "From $2.50/sq.ft",
        duration: "Varies by room size"
      },
      {
        title: "Exterior Painting",
        description: "Complete exterior painting services for your home.",
        price: "From $3.50/sq.ft",
        duration: "3-7 days"
      },
      {
        title: "Cabinet Refinishing",
        description: "Refresh your kitchen or bathroom with professional cabinet refinishing.",
        price: "From $85/cabinet",
        duration: "2-5 days"
      }
    ]
  },
  {
    category: "hvac",
    title: "HVAC Services",
    icon: Thermometer,
    services: [
      {
        title: "HVAC Inspection & Tune-up",
        description: "Comprehensive inspection and tune-up of your heating and cooling systems.",
        price: "$140",
        duration: "1-2 hours"
      },
      {
        title: "Air Duct Cleaning",
        description: "Professional cleaning of your home's air ducts to improve air quality.",
        price: "From $350",
        duration: "3-5 hours"
      },
      {
        title: "HVAC System Installation",
        description: "Expert installation of new heating, ventilation, and air conditioning systems.",
        price: "From $3,500",
        duration: "1-2 days"
      }
    ]
  },
  {
    category: "landscaping",
    title: "Landscaping & Gardening",
    icon: Leaf,
    services: [
      {
        title: "Garden Design & Installation",
        description: "Professional garden design and installation services to transform your outdoor space.",
        price: "From $1,200",
        duration: "2-5 days"
      },
      {
        title: "Lawn Care & Maintenance",
        description: "Regular lawn maintenance including mowing, fertilization, and weed control.",
        price: "From $120/month",
        duration: "Bi-weekly visits"
      },
      {
        title: "Tree & Shrub Pruning",
        description: "Expert pruning and trimming of trees and shrubs to maintain health and appearance.",
        price: "From $200",
        duration: "3-6 hours"
      }
    ]
  }
];

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
            <TabsContent key={category.category} value={category.category} className="focus-visible:outline-none focus-visible:ring-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {category.services.map((service, index) => (
                  <Card 
                    key={index} 
                    className="overflow-hidden border-estate-100 transition-all duration-300 hover:shadow-md hover:border-estate-200"
                  >
                    <CardHeader className="pb-4">
                      <CardTitle className="text-xl text-estate-800">{service.title}</CardTitle>
                      <CardDescription className="text-estate-600">{service.description}</CardDescription>
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
                ))}
              </div>
              
              <div className="mt-12 text-center">
                <Button className="bg-estate-800 hover:bg-estate-700 shadow-sm">
                  View All {category.title} Services
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default HomeServices;
