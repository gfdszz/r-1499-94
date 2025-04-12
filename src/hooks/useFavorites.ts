
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import * as favoriteService from '@/services/favoriteService';

export const useFavorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const fetchFavorites = useCallback(async () => {
    if (!user) {
      setFavorites([]);
      setLoading(false);
      return;
    }
    
    setLoading(true);
    const { data } = await favoriteService.getUserFavorites(user.id);
    setFavorites(data);
    setLoading(false);
  }, [user]);
  
  // Load favorites when the user changes
  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);
  
  const toggleFavorite = async (propertyId: string) => {
    if (!user) {
      // User is not logged in
      return { success: false, message: 'Please log in to save favorites' };
    }
    
    const { isFavorite } = await favoriteService.isPropertyFavorite(user.id, propertyId);
    
    if (isFavorite) {
      // Remove from favorites
      const result = await favoriteService.removeFavorite(user.id, propertyId);
      if (result.success) {
        // Update local state
        setFavorites(favorites.filter(fav => fav.property_id !== propertyId));
      }
      return result;
    } else {
      // Add to favorites
      const result = await favoriteService.addFavorite(user.id, propertyId);
      if (result.success && !result.alreadyExists) {
        // Refresh favorites list to get the full data
        fetchFavorites();
      }
      return result;
    }
  };
  
  const checkFavorite = useCallback(async (propertyId: string) => {
    if (!user) return false;
    
    const { isFavorite } = await favoriteService.isPropertyFavorite(user.id, propertyId);
    return isFavorite;
  }, [user]);
  
  return {
    favorites,
    loading,
    toggleFavorite,
    checkFavorite,
    refreshFavorites: fetchFavorites
  };
};
