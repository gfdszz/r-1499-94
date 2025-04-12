
import { createClient } from '@supabase/supabase-js';

// Use placeholder values when environment variables are missing (for development)
// In production, these should be properly set in the environment
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Log warning if using fallback values
if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn(
    'Supabase environment variables are missing. Using placeholder values. ' +
    'Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.'
  );
}

let supabaseInstance;
try {
  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
} catch (error) {
  console.error('Failed to initialize Supabase client:', error);
  // Provide a mock client that doesn't cause the app to crash
  supabaseInstance = {
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signInWithPassword: () => Promise.resolve({ error: new Error('Supabase not properly configured') }),
      signUp: () => Promise.resolve({ error: new Error('Supabase not properly configured') }),
      signOut: () => Promise.resolve({ error: null }),
    },
  };
}

export const supabase = supabaseInstance;

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
