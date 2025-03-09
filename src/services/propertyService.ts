
import { supabase, type Property, type PropertyInsert } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';

// Fetch all properties
export const fetchProperties = async () => {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data: data || [], error: null };
  } catch (err: any) {
    console.error('Error fetching properties:', err);
    toast({
      title: 'Error',
      description: 'Failed to load properties',
      variant: 'destructive',
    });
    return { data: [], error: err.message };
  }
};

// Get property by ID
export const getPropertyById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (err: any) {
    console.error('Error fetching property:', err);
    toast({
      title: 'Error',
      description: 'Failed to load property details',
      variant: 'destructive',
    });
    return { data: null, error: err.message };
  }
};

// Add a new property
export const addProperty = async (property: PropertyInsert) => {
  try {
    const { data, error } = await supabase
      .from('properties')
      .insert(property)
      .select()
      .single();

    if (error) throw error;
    
    toast({
      title: 'Success',
      description: 'Property added successfully',
    });
    
    return { data, error: null };
  } catch (err: any) {
    console.error('Error adding property:', err);
    toast({
      title: 'Error',
      description: 'Failed to add property',
      variant: 'destructive',
    });
    return { data: null, error: err.message };
  }
};

// Update a property
export const updateProperty = async (id: string, updates: Partial<PropertyInsert>) => {
  try {
    const { data, error } = await supabase
      .from('properties')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    
    toast({
      title: 'Success',
      description: 'Property updated successfully',
    });
    
    return { data, error: null };
  } catch (err: any) {
    console.error('Error updating property:', err);
    toast({
      title: 'Error',
      description: 'Failed to update property',
      variant: 'destructive',
    });
    return { data: null, error: err.message };
  }
};

// Delete a property
export const deleteProperty = async (id: string) => {
  try {
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id);

    if (error) throw error;
    
    toast({
      title: 'Success',
      description: 'Property deleted successfully',
    });
    
    return { success: true, error: null };
  } catch (err: any) {
    console.error('Error deleting property:', err);
    toast({
      title: 'Error',
      description: 'Failed to delete property',
      variant: 'destructive',
    });
    return { success: false, error: err.message };
  }
};
