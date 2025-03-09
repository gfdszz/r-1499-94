
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProperties } from "@/hooks/useProperties";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyGrid from "@/components/PropertyGrid";
import { Plus } from "lucide-react";

const Dashboard = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { properties, loading } = useProperties();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-estate-800"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-28 pb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-display text-estate-800">My Dashboard</h1>
            <p className="text-estate-500">Welcome back, {user?.user_metadata?.name || user?.email}</p>
          </div>
          <Button 
            onClick={() => navigate("/add-property")}
            className="bg-estate-800 hover:bg-estate-700"
          >
            <Plus className="mr-2 h-4 w-4" /> Add New Property
          </Button>
        </div>

        <Tabs defaultValue="properties" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="properties">My Properties</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
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
                {properties.length > 0 ? (
                  <PropertyGrid 
                    properties={properties.filter(p => p.user_id === user?.id)} 
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
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium text-estate-800 mb-2">Settings</h3>
                  <p className="text-estate-500">Account settings will be available soon</p>
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
