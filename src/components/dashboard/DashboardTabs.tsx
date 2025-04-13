
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, MessageCircle, Settings, User } from "lucide-react";
import PropertiesTab from "./PropertiesTab";
import FavoritesTab from "./FavoritesTab";
import MessagesTab from "./MessagesTab";
import SettingsTab from "./SettingsTab";

interface DashboardTabsProps {
  userProperties: any[];
  favorites: any[];
  propertiesLoading: boolean;
  favoritesLoading: boolean;
}

const DashboardTabs = ({ 
  userProperties, 
  favorites, 
  propertiesLoading, 
  favoritesLoading 
}: DashboardTabsProps) => {
  return (
    <Tabs defaultValue="properties" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="properties" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span className="hidden sm:inline">My Properties</span>
        </TabsTrigger>
        <TabsTrigger value="favorites" className="flex items-center gap-2">
          <Heart className="h-4 w-4" />
          <span className="hidden sm:inline">Favorites</span>
        </TabsTrigger>
        <TabsTrigger value="messages" className="flex items-center gap-2">
          <MessageCircle className="h-4 w-4" />
          <span className="hidden sm:inline">Messages</span>
        </TabsTrigger>
        <TabsTrigger value="settings" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          <span className="hidden sm:inline">Settings</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="properties">
        <PropertiesTab 
          properties={userProperties} 
          loading={propertiesLoading} 
        />
      </TabsContent>
      
      <TabsContent value="favorites">
        <FavoritesTab 
          favorites={favorites} 
          loading={favoritesLoading} 
        />
      </TabsContent>
      
      <TabsContent value="messages">
        <MessagesTab />
      </TabsContent>
      
      <TabsContent value="settings">
        <SettingsTab />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
