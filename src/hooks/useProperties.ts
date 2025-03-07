
import { useState, useEffect } from 'react';
import { supabase, type Property, type PropertyInsert } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';

export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all properties
  const fetchProperties = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (err: any) {
      console.error('Error fetching properties:', err);
      setError(err.message);
      toast({
        title: 'Error',
        description: 'Failed to load properties',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Get property by ID
  const getPropertyById = async (id: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (err: any) {
      console.error('Error fetching property:', err);
      toast({
        title: 'Error',
        description: 'Failed to load property details',
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Add a new property
  const addProperty = async (property: PropertyInsert) => {
    try {
      setLoading(true);
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
      
      return data;
    } catch (err: any) {
      console.error('Error adding property:', err);
      toast({
        title: 'Error',
        description: 'Failed to add property',
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update a property
  const updateProperty = async (id: string, updates: Partial<PropertyInsert>) => {
    try {
      setLoading(true);
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
      
      return data;
    } catch (err: any) {
      console.error('Error updating property:', err);
      toast({
        title: 'Error',
        description: 'Failed to update property',
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Delete a property
  const deleteProperty = async (id: string) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: 'Success',
        description: 'Property deleted successfully',
      });
      
      return true;
    } catch (err: any) {
      console.error('Error deleting property:', err);
      toast({
        title: 'Error',
        description: 'Failed to delete property',
        variant: 'destructive',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Upload an image to storage
  const uploadPropertyImage = async (file: File, propertyId: string) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${propertyId}/${Date.now()}.${fileExt}`;
      const filePath = `properties/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('property-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('property-images')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast({
        title: 'Upload Failed',
        description: error.message || 'Failed to upload image',
        variant: 'destructive',
      });
      return null;
    }
  };

  // Listen for real-time changes to properties
  useEffect(() => {
    fetchProperties();

    // Set up real-time subscription
    const subscription = supabase
      .channel('table-db-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'properties' }, (payload) => {
        console.log('Real-time update:', payload);
        fetchProperties();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return {
    properties,
    loading,
    error,
    fetchProperties,
    getPropertyById,
    addProperty,
    updateProperty,
    deleteProperty,
    uploadPropertyImage,
  };
};
