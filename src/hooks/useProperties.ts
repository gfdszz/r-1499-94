
import { useState, useEffect } from 'react';
import { type Property } from '@/lib/supabase';
import * as propertyService from '@/services/propertyService';
import { uploadPropertyImage } from '@/services/storageService';
import { subscribeToProperties, unsubscribeFromChannel } from '@/services/realtimeService';

export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = async () => {
    setLoading(true);
    const { data, error } = await propertyService.fetchProperties();
    setProperties(data);
    if (error) setError(error);
    setLoading(false);
  };

  const getPropertyById = async (id: string) => {
    setLoading(true);
    const { data } = await propertyService.getPropertyById(id);
    setLoading(false);
    return data;
  };

  const addProperty = async (property: any) => {
    setLoading(true);
    const { data } = await propertyService.addProperty(property);
    setLoading(false);
    return data;
  };

  const updateProperty = async (id: string, updates: any) => {
    setLoading(true);
    const { data } = await propertyService.updateProperty(id, updates);
    setLoading(false);
    return data;
  };

  const deleteProperty = async (id: string) => {
    setLoading(true);
    const { success } = await propertyService.deleteProperty(id);
    setLoading(false);
    return success;
  };

  // Listen for real-time changes to properties
  useEffect(() => {
    fetchProperties();

    // Set up real-time subscription
    const subscription = subscribeToProperties(fetchProperties);

    return () => {
      unsubscribeFromChannel(subscription);
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
