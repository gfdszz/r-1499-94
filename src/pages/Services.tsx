import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomeServices from '@/components/HomeServices';
import ServiceRequest from '@/components/ServiceRequest';
import QuoteRequestForm from '@/components/QuoteRequestForm';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Check, Clock, MapPin, Phone, Wrench } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import BookingCalendar from '@/components/BookingCalendar';

const ServiceRequestLocal = () => {
  const [formData, setFormData] = useState({
    serviceType: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    date: '',
    description: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Service request submitted",
        description: "We'll contact you shortly to confirm your appointment.",
      });
      setIsSubmitting(false);
      setFormData({
        serviceType: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        date: '',
        description: '',
      });
    }, 1500);
  };
  
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-estate-100 p-6 md:p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-display text-estate-800 mb-2">Request a Service</h3>
        <p className="text-estate-600">Fill out the form below to schedule a service or get a quote.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="serviceType">Service Type</Label>
          <Select 
            value={formData.serviceType} 
            onValueChange={(value) => handleSelectChange('serviceType', value)}
            required
          >
            <SelectTrigger id="serviceType">
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="maintenance">Home Maintenance</SelectItem>
              <SelectItem value="electrical">Electrical Services</SelectItem>
              <SelectItem value="plumbing">Plumbing Services</SelectItem>
              <SelectItem value="painting">Painting Services</SelectItem>
              <SelectItem value="hvac">HVAC Services</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              name="email"
              type="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input 
              id="phone" 
              name="phone"
              type="tel" 
              value={formData.phone} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date">Preferred Date</Label>
            <Input 
              id="date" 
              name="date"
              type="date" 
              value={formData.date} 
              onChange={handleChange} 
              required 
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="address">Service Address</Label>
          <Input 
            id="address" 
            name="address"
            value={formData.address} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Service Description</Label>
          <Textarea 
            id="description" 
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Please provide details about the service you need..."
            rows={4}
            required
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-estate-800 hover:bg-estate-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Request Service'}
        </Button>
      </form>
    </div>
  );
};

const ServiceProcess = () => {
  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h3 className="text-2xl font-display text-estate-800 mb-2">How It Works</h3>
        <p className="text-estate-600 max-w-lg mx-auto">
          Our service process is designed to be simple and efficient, ensuring you get the help you need without any hassle.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            icon: <Phone className="w-8 h-8 text-amber-500" />,
            title: "Request Service",
            description: "Fill out our simple form or call us to describe your service needs."
          },
          {
            icon: <Calendar className="w-8 h-8 text-amber-500" />,
            title: "Schedule Appointment",
            description: "We'll contact you to confirm a convenient date and time."
          },
          {
            icon: <Wrench className="w-8 h-8 text-amber-500" />,
            title: "Service Delivery",
            description: "Our professional technicians will arrive and complete the work."
          },
          {
            icon: <Check className="w-8 h-8 text-amber-500" />,
            title: "Follow-up",
            description: "We'll follow up to ensure you're completely satisfied with our service."
          }
        ].map((step, index) => (
          <div 
            key={index} 
            className="relative p-6 bg-white rounded-lg border border-estate-100 shadow-sm hover:shadow-md transition-shadow"
          >
            {index < 3 && (
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-6 h-0.5 bg-estate-200" />
            )}
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 p-3 bg-estate-50 rounded-full">{step.icon}</div>
              <h4 className="text-lg font-medium text-estate-800 mb-2">{step.title}</h4>
              <p className="text-estate-600 text-sm">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ServiceProfessionals = () => {
  const professionals = [
    {
      name: "Robert Johnson",
      title: "Master Electrician",
      experience: "15+ years experience",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&h=256"
    },
    {
      name: "Sarah Williams",
      title: "HVAC Specialist",
      experience: "12+ years experience",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=256&h=256"
    },
    {
      name: "Michael Chen",
      title: "Master Plumber",
      experience: "18+ years experience",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=256&h=256"
    },
    {
      name: "Amanda Torres",
      title: "Interior Painter",
      experience: "10+ years experience",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&h=256"
    }
  ];
  
  return (
    <div className="py-12 bg-estate-50/50 rounded-xl px-6">
      <div className="text-center mb-12">
        <h3 className="text-2xl font-display text-estate-800 mb-2">Our Service Professionals</h3>
        <p className="text-estate-600 max-w-lg mx-auto">
          Meet some of our experienced professionals who deliver exceptional service quality.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {professionals.map((pro, index) => (
          <div 
            key={index}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="aspect-square overflow-hidden">
              <img 
                src={pro.image} 
                alt={pro.name} 
                className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
              />
            </div>
            <div className="p-4 text-center">
              <h4 className="font-medium text-estate-800">{pro.name}</h4>
              <p className="text-amber-600 font-medium text-sm">{pro.title}</p>
              <p className="text-estate-600 text-xs mt-1">{pro.experience}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="py-8 mb-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-estate-800 mb-4">
              Home Services & Maintenance
            </h1>
            <p className="text-xl text-estate-600 max-w-3xl">
              Professional home services tailored to your needs. From routine maintenance to emergency repairs, our network of certified professionals has you covered.
            </p>
          </div>
          
          <Tabs defaultValue="services" className="w-full mb-12">
            <TabsList className="w-full max-w-md mx-auto mb-8">
              <TabsTrigger value="services" className="flex-1">Our Services</TabsTrigger>
              <TabsTrigger value="booking" className="flex-1">Book Service</TabsTrigger>
              <TabsTrigger value="request" className="flex-1">Request Service</TabsTrigger>
              <TabsTrigger value="quote" className="flex-1">Get Quote</TabsTrigger>
            </TabsList>
            
            <TabsContent value="services" className="focus-visible:outline-none focus-visible:ring-0">
              <HomeServices />
              <ServiceProfessionals />
              <ServiceProcess />
            </TabsContent>

            <TabsContent value="booking" className="focus-visible:outline-none focus-visible:ring-0">
              <div className="max-w-md mx-auto">
                <BookingCalendar />
              </div>
            </TabsContent>
            
            <TabsContent value="request" className="focus-visible:outline-none focus-visible:ring-0">
              <ServiceRequestLocal />
            </TabsContent>

            <TabsContent value="quote" className="focus-visible:outline-none focus-visible:ring-0">
              <QuoteRequestForm />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <section className="bg-estate-800 text-white py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-display mb-6">Emergency Services Available 24/7</h2>
              <p className="text-estate-100 mb-8">
                We understand that emergencies don't follow a schedule. Our emergency response team is available around the clock to address urgent issues.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <Clock className="text-amber-300 mr-2 h-5 w-5" />
                  <span>24/7 Availability</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="text-amber-300 mr-2 h-5 w-5" />
                  <span>Service in All Areas</span>
                </div>
                <div className="flex items-center">
                  <Phone className="text-amber-300 mr-2 h-5 w-5" />
                  <span>Quick Response Time</span>
                </div>
              </div>
              <Button className="mt-8 bg-amber-500 hover:bg-amber-600 text-black">
                Call Emergency Line
              </Button>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1577401239170-897942555fb3?auto=format&fit=crop&w=600&h=600" 
                alt="Emergency Services" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Services;
