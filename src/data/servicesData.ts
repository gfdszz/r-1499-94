import { Wrench, Plug, ShowerHead, Paintbrush, Thermometer, Leaf, Brush } from "lucide-react";
import { ServiceCategory } from "@/types/service";

export const servicesData: ServiceCategory[] = [
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
    title: "Landscaping & Garden",
    icon: Leaf,
    services: [
      {
        title: "Garden Design",
        description: "Professional garden design and installation services.",
        price: "From $500",
        duration: "Varies"
      },
      {
        title: "Lawn Maintenance",
        description: "Regular lawn care including mowing and fertilization.",
        price: "$150/month",
        duration: "Bi-weekly"
      },
      {
        title: "Tree Services",
        description: "Tree trimming, removal, and maintenance services.",
        price: "From $200",
        duration: "Varies"
      }
    ]
  },
  {
    category: "interior",
    title: "Interior Design",
    icon: Brush,
    services: [
      {
        title: "Design Consultation",
        description: "Professional interior design consultation and planning.",
        price: "$200",
        duration: "2 hours"
      },
      {
        title: "Room Makeover",
        description: "Complete room redesign and styling services.",
        price: "From $1000",
        duration: "1-2 weeks"
      },
      {
        title: "Color Consultation",
        description: "Expert color scheme selection for your space.",
        price: "$150",
        duration: "1 hour"
      }
    ]
  },
  {
    category: "smart-home",
    title: "Smart Home",
    icon: "house-plug",
    services: [
      {
        title: "Smart Security",
        description: "Installation of smart cameras and security systems.",
        price: "From $500",
        duration: "1 day"
      },
      {
        title: "Home Automation",
        description: "Setup of smart lighting, thermostats, and automation.",
        price: "From $300",
        duration: "4-6 hours"
      },
      {
        title: "Entertainment Systems",
        description: "Smart TV and home theater installation.",
        price: "From $400",
        duration: "3-5 hours"
      }
    ]
  }
];
