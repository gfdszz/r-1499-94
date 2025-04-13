
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PropertyGrid from "@/components/PropertyGrid";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FavoritesTabProps {
  favorites: any[];
  loading: boolean;
}

const FavoritesTab = ({ favorites, loading }: FavoritesTabProps) => {
  const navigate = useNavigate();
  
  // Map favorites to property format that PropertyGrid can display
  const favoriteProperties = favorites.map(fav => ({
    id: fav.property_id,
    ...fav.properties,
  }));
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Favorite Properties</CardTitle>
        <CardDescription>View your saved properties</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-estate-800" />
          </div>
        ) : favoriteProperties.length > 0 ? (
          <PropertyGrid 
            properties={favoriteProperties} 
            loading={false}
            fromSupabase={true}
          />
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-estate-800 mb-2">No favorites yet</h3>
            <p className="text-estate-500 mb-6">Browse properties and save your favorites</p>
            <Button 
              onClick={() => navigate("/properties")}
              className="bg-estate-800 hover:bg-estate-700"
            >
              Browse Properties
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FavoritesTab;
