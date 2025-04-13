
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const SettingsTab = () => {
  const { user } = useAuth();
  
  // Get user's initials for avatar fallback
  const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || "User";
  const userInitials = userName.substring(0, 2).toUpperCase();
  
  return (
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
  );
};

export default SettingsTab;
