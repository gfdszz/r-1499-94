
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';

const QuoteRequestForm = () => {
  const [formData, setFormData] = useState({
    serviceType: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    description: '',
    propertyType: '',
    budget: '',
    preferredContact: 'email',
    urgency: 'normal',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachFile, setAttachFile] = useState(false);

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
        title: "Quote request submitted",
        description: "We'll review your project details and get back to you with a custom quote soon.",
      });
      setIsSubmitting(false);
      setFormData({
        serviceType: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        description: '',
        propertyType: '',
        budget: '',
        preferredContact: 'email',
        urgency: 'normal',
      });
      setAttachFile(false);
    }, 1500);
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-estate-100 p-6 md:p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-display text-estate-800 mb-2">Request a Custom Quote</h3>
        <p className="text-estate-600">Fill out the form below with your project details and we'll prepare a personalized quote.</p>
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
              <SelectItem value="renovation">Home Renovation</SelectItem>
              <SelectItem value="custom_furniture">Custom Furniture</SelectItem>
              <SelectItem value="landscaping">Landscaping Project</SelectItem>
              <SelectItem value="home_automation">Smart Home Installation</SelectItem>
              <SelectItem value="interior_design">Interior Design</SelectItem>
              <SelectItem value="other">Other (Please Specify)</SelectItem>
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
            <Label htmlFor="propertyType">Property Type</Label>
            <Select 
              value={formData.propertyType} 
              onValueChange={(value) => handleSelectChange('propertyType', value)}
              required
            >
              <SelectTrigger id="propertyType">
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="condo">Condominium</SelectItem>
                <SelectItem value="townhouse">Townhouse</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="address">Project Address</Label>
          <Input 
            id="address" 
            name="address"
            value={formData.address} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="budget">Budget Range</Label>
            <Select 
              value={formData.budget} 
              onValueChange={(value) => handleSelectChange('budget', value)}
              required
            >
              <SelectTrigger id="budget">
                <SelectValue placeholder="Select budget range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="under_1000">Under $1,000</SelectItem>
                <SelectItem value="1000_5000">$1,000 - $5,000</SelectItem>
                <SelectItem value="5000_10000">$5,000 - $10,000</SelectItem>
                <SelectItem value="10000_25000">$10,000 - $25,000</SelectItem>
                <SelectItem value="25000_plus">$25,000+</SelectItem>
                <SelectItem value="not_sure">Not Sure Yet</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="urgency">Project Urgency</Label>
            <Select 
              value={formData.urgency} 
              onValueChange={(value) => handleSelectChange('urgency', value)}
              required
            >
              <SelectTrigger id="urgency">
                <SelectValue placeholder="Select urgency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="urgent">Urgent (ASAP)</SelectItem>
                <SelectItem value="normal">Normal (Within a month)</SelectItem>
                <SelectItem value="flexible">Flexible (No rush)</SelectItem>
                <SelectItem value="planning">Just Planning</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Project Description</Label>
          <Textarea 
            id="description" 
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Please provide details about your project including scope, timeline, specific requirements, etc."
            rows={5}
            required
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="attachFile" 
              checked={attachFile}
              onCheckedChange={(checked) => setAttachFile(checked === true)}
            />
            <Label htmlFor="attachFile" className="text-sm font-normal cursor-pointer">
              I would like to attach photos or documents
            </Label>
          </div>
          {attachFile && (
            <Input
              type="file"
              className="mt-2"
              multiple
            />
          )}
        </div>
        
        <div className="space-y-2">
          <p className="text-sm text-estate-600">Preferred Contact Method</p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <input 
                type="radio" 
                id="email_contact" 
                name="preferredContact"
                value="email"
                checked={formData.preferredContact === 'email'}
                onChange={handleChange}
                className="text-estate-800 focus:ring-estate-800"
              />
              <Label htmlFor="email_contact" className="text-sm font-normal">Email</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input 
                type="radio" 
                id="phone_contact" 
                name="preferredContact"
                value="phone"
                checked={formData.preferredContact === 'phone'}
                onChange={handleChange}
                className="text-estate-800 focus:ring-estate-800"
              />
              <Label htmlFor="phone_contact" className="text-sm font-normal">Phone</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input 
                type="radio" 
                id="either_contact" 
                name="preferredContact"
                value="either"
                checked={formData.preferredContact === 'either'}
                onChange={handleChange}
                className="text-estate-800 focus:ring-estate-800"
              />
              <Label htmlFor="either_contact" className="text-sm font-normal">Either</Label>
            </div>
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-estate-800 hover:bg-estate-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Request Quote'}
        </Button>

        <p className="text-xs text-estate-500 text-center mt-4">
          By submitting this form, you agree to our privacy policy and terms of service.
        </p>
      </form>
    </div>
  );
};

export default QuoteRequestForm;
