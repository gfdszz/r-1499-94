
import { useState } from "react";
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface FilterSidebarProps {
  priceRange: [number, number];
  setPriceRange: (value: [number, number]) => void;
  bedrooms: string;
  setBedrooms: (value: string) => void;
  bathrooms: string;
  setBathrooms: (value: string) => void;
  minArea: number | null;
  setMinArea: (value: number | null) => void;
  maxArea: number | null;
  setMaxArea: (value: number | null) => void;
  propertyType: "sale" | "rent" | "all";
  setPropertyType: React.Dispatch<React.SetStateAction<"sale" | "rent" | "all">>;
  resetFilters: () => void;
}

export const FilterSidebar = ({ 
  priceRange, 
  setPriceRange, 
  bedrooms, 
  setBedrooms,
  bathrooms,
  setBathrooms,
  minArea,
  setMinArea,
  maxArea,
  setMaxArea, 
  propertyType, 
  setPropertyType,
  resetFilters
}: FilterSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  
  const formatPrice = (value: number) => {
    return `$${(value / 1000000).toFixed(1)}M`;
  };

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-estate-700">Price Range</h3>
        <div className="px-2">
          <Slider 
            defaultValue={priceRange} 
            value={priceRange}
            max={10000000} 
            step={100000} 
            onValueChange={(value) => setPriceRange(value as [number, number])}
            className="my-6"
          />
        </div>
        <div className="flex justify-between mt-2 text-sm text-estate-600">
          <span>{formatPrice(priceRange[0])}</span>
          <span>{formatPrice(priceRange[1])}</span>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-estate-700">Bedrooms</h3>
        <Select value={bedrooms} onValueChange={setBedrooms}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="4">4</SelectItem>
            <SelectItem value="5+">5+</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-estate-700">Bathrooms</h3>
        <Select value={bathrooms} onValueChange={setBathrooms}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="4+">4+</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-estate-700">Property Type</h3>
        <Select 
          value={propertyType} 
          onValueChange={(value: "sale" | "rent" | "all") => setPropertyType(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="sale">For Sale</SelectItem>
            <SelectItem value="rent">For Rent</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen} className="border-t pt-4">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="flex w-full justify-between p-0 h-auto font-normal">
            <span className="text-sm font-medium text-estate-700">Advanced Filters</span>
            {isAdvancedOpen ? 
              <ChevronUp className="h-4 w-4" /> : 
              <ChevronDown className="h-4 w-4" />
            }
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-estate-700">Square Footage</h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Input
                  type="number"
                  placeholder="Min"
                  className="w-full"
                  value={minArea || ''}
                  onChange={(e) => setMinArea(e.target.value ? Number(e.target.value) : null)}
                />
              </div>
              <div>
                <Input
                  type="number"
                  placeholder="Max"
                  className="w-full"
                  value={maxArea || ''}
                  onChange={(e) => setMaxArea(e.target.value ? Number(e.target.value) : null)}
                />
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      <Button 
        className="w-full mt-6"
        variant="outline"
        onClick={() => {
          resetFilters();
          setIsOpen(false);
        }}
      >
        Reset Filters
      </Button>
    </div>
  );

  // Mobile view uses Sheet component
  return (
    <>
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader className="mb-6">
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <FilterContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop view */}
      <div className="hidden lg:block sticky top-24">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-medium text-estate-800 mb-6">Filters</h2>
          <FilterContent />
        </div>
      </div>
    </>
  );
};
