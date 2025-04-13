
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfileHeader = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Get user's name or email for display
  const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || "User";
  const userInitials = userName.substring(0, 2).toUpperCase();
  
  return (
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
  );
};

export default ProfileHeader;
