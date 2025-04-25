
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

const ServiceRequest = () => {
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
              <SelectItem value="landscaping">Landscaping & Gardening</SelectItem>
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

export default ServiceRequest;
