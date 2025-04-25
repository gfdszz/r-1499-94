
import { LucideIcon } from 'lucide-react';

export interface ServiceItem {
  title: string;
  description: string;
  price: string;
  duration: string;
}

export interface ServiceCategory {
  category: 'maintenance' | 'electrical' | 'plumbing' | 'painting' | 'hvac' | 'landscaping' | 'interior' | 'smart-home';
  title: string;
  icon: LucideIcon;
  services: ServiceItem[];
}
