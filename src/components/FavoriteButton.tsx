
import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useFavorites } from '@/hooks/useFavorites';
import { useNavigate } from 'react-router-dom';

interface FavoriteButtonProps {
  propertyId: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  showText?: boolean;
  onSuccess?: (favorited: boolean) => void;
}

const FavoriteButton = ({ 
  propertyId, 
  variant = 'outline',
  size = 'default',
  className = '',
  showText = true,
  onSuccess
}: FavoriteButtonProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { checkFavorite, toggleFavorite } = useFavorites();
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkStatus = async () => {
      if (user) {
        setIsLoading(true);
        const status = await checkFavorite(propertyId);
        setIsFavorite(status);
        setIsLoading(false);
      } else {
        setIsFavorite(false);
        setIsLoading(false);
      }
    };
    
    checkStatus();
  }, [propertyId, user, checkFavorite]);
  
  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation if button is inside a link
    e.stopPropagation(); // Prevent event bubbling
    
    if (!user) {
      navigate('/login');
      return;
    }
    
    setIsLoading(true);
    const result = await toggleFavorite(propertyId);
    setIsLoading(false);
    
    if (result.success) {
      const newStatus = !isFavorite;
      setIsFavorite(newStatus);
      if (onSuccess) onSuccess(newStatus);
    }
  };
  
  const buttonClass = isFavorite 
    ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100 hover:text-red-700' 
    : 'border-estate-300 text-estate-600 hover:bg-estate-50';
  
  return (
    <Button
      variant={variant}
      size={size}
      disabled={isLoading}
      onClick={handleToggleFavorite}
      className={`${buttonClass} ${className}`}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart 
        className={`w-4 h-4 ${isFavorite ? 'fill-red-500' : ''} ${showText ? 'mr-2' : ''}`} 
      />
      {showText && (isFavorite ? 'Saved' : 'Save')}
    </Button>
  );
};

export default FavoriteButton;
