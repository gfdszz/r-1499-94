
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

// Types for our Supabase tables
export type PropertyInsert = {
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: 'sale' | 'rent';
  user_id: string;
  images?: string[];
  features?: string[];
  coordinates?: { lat: number; lng: number };
};

export type Property = PropertyInsert & {
  id: string;
  created_at: string;
};
