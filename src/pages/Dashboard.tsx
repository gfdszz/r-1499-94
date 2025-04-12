import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProperties } from "@/hooks/useProperties";
import { useFavorites } from "@/hooks/useFavorites";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyGrid from "@/components/PropertyGrid";
import { Plus, Settings, User, Heart, MessageCircle, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";

const Dashboard = () => {
  const { user, isLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { properties, loading } = useProperties();
  const { favorites, loading: favoritesLoading, refreshFavorites } = useFavorites();
  const [profileProgress, setProfileProgress] = useState(65);
  
  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);
  
  // Calculate profile completion
  useEffect(() => {
    if (user) {
      let progress = 50; // Base progress for having an account
      if (user.user_metadata?.name) progress += 15;
      if (user.user_metadata?.avatar_url) progress += 15;
      if (user.phone) progress += 20;
      setProfileProgress(progress);
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-estate-800"></div>
      </div>
    );
  }
  
  // Get user's name or email for display
  const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || "User";
  const userInitials = userName.substring(0, 2).toUpperCase();
  
  // Filter to get only user's properties
  const userProperties = properties.filter(p => p.user_id === user?.id);

  // Map favorites to property format that PropertyGrid can display
  const favoriteProperties = favorites.map(fav => ({
    id: fav.property_id,
    ...fav.properties,
  }));
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-28 pb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-white shadow-md">
              <AvatarImage src={user?.user_metadata?.avatar_url} />
              <AvatarFallback className="bg-estate-800 text-white">{userInitials}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-display text-estate-800">Welcome, {userName}</h1>
              <p className="text-estate-500">{user?.email}</p>
            </div>
          </div>
          
          <Button 
            onClick={() => navigate("/add-property")}
            className="bg-estate-800 hover:bg-estate-700"
          >
            <Plus className="mr-2 h-4 w-4" /> Add New Property
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Profile Completion</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={profileProgress} className="h-2 mb-2" />
              <p className="text-sm text-estate-500">{profileProgress}% complete</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">My Properties</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-display text-estate-800">{userProperties.length}</p>
              <p className="text-sm text-estate-500">Listed properties</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Views</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-display text-estate-800">327</p>
              <p className="text-sm text-estate-500">Property views this month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-display text-estate-800">12</p>
              <p className="text-sm text-estate-500">New messages</p>
            </CardContent>
          </Card>
        </div>

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
            <Card>
              <CardHeader>
                <CardTitle>My Listed Properties</CardTitle>
                <CardDescription>
                  View and manage all your listed properties
                </CardDescription>
              </CardHeader>
              <CardContent>
                {userProperties.length > 0 ? (
                  <PropertyGrid 
                    properties={userProperties} 
                    loading={loading}
                    fromSupabase={true}
                  />
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-medium text-estate-800 mb-2">No properties listed yet</h3>
                    <p className="text-estate-500 mb-6">Get started by adding your first property listing</p>
                    <Button 
                      onClick={() => navigate("/add-property")}
                      className="bg-estate-800 hover:bg-estate-700"
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add Property
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="favorites">
            <Card>
              <CardHeader>
                <CardTitle>Favorite Properties</CardTitle>
                <CardDescription>View your saved properties</CardDescription>
              </CardHeader>
              <CardContent>
                {favoritesLoading ? (
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
          </TabsContent>
          
          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>Communicate with buyers and sellers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium text-estate-800 mb-2">No messages yet</h3>
                  <p className="text-estate-500">Your messages will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Update your profile information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div>
                    <label className="block text-sm font-medium text-estate-700 mb-1">Profile Picture</label>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={user?.user_metadata?.avatar_url} />
                        <AvatarFallback className="bg-estate-800 text-white text-xl">{userInitials}</AvatarFallback>
                      </Avatar>
                      <Button variant="outline">Change Picture</Button>
                    </div>
                  </div>
                  
                  <div className="grid gap-4">
                    <div>
                      <label className="block text-sm font-medium text-estate-700 mb-1">Full Name</label>
                      <Input 
                        type="text" 
                        placeholder="Enter your name" 
                        defaultValue={user?.user_metadata?.name || ""} 
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-estate-700 mb-1">Email</label>
                      <Input 
                        type="email" 
                        value={user?.email || ""} 
                        disabled 
                      />
                      <p className="text-xs text-estate-500 mt-1">Email cannot be changed</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-estate-700 mb-1">Phone</label>
                      <Input 
                        type="tel" 
                        placeholder="Enter your phone number" 
                        defaultValue={user?.phone || ""} 
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button className="bg-estate-800 hover:bg-estate-700">
                      Save Changes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
