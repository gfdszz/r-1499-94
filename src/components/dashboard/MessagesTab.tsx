
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Send } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const MessagesTab = () => {
  const { user } = useAuth();
  const [messages] = useState([
    {
      id: 1,
      sender: "Agent Smith",
      content: "Hello, I saw you're interested in the Lake House property. Would you like to schedule a viewing?",
      timestamp: "2 days ago",
      read: true,
      senderAvatar: "AS"
    },
    {
      id: 2,
      sender: "Property Team",
      content: "Your favorite property 'Modern Villa' has had a price reduction! It's now available for $5,500,000.",
      timestamp: "1 day ago",
      read: false,
      senderAvatar: "PT"
    }
  ]);

  const userInitials = user?.user_metadata?.name 
    ? user.user_metadata.name.substring(0, 2).toUpperCase() 
    : user?.email?.substring(0, 2).toUpperCase() || "ME";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Messages</CardTitle>
        <CardDescription>Communicate with buyers and sellers</CardDescription>
      </CardHeader>
      <CardContent>
        {messages.length > 0 ? (
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`p-4 rounded-lg border ${message.read ? 'bg-white' : 'bg-blue-50 border-blue-100'}`}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-estate-700 text-white">{message.senderAvatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-medium text-estate-800">{message.sender}</h4>
                      <span className="text-xs text-estate-500">{message.timestamp}</span>
                    </div>
                    <p className="text-estate-600 text-sm">{message.content}</p>
                    <div className="mt-3 flex justify-end">
                      <Button size="sm" variant="outline" className="flex items-center gap-1">
                        <Send className="h-3.5 w-3.5" />
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="flex justify-center pt-4">
              <Button variant="outline" className="text-estate-600">
                View all messages
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <MessageCircle className="h-12 w-12 text-estate-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-estate-800 mb-2">No messages yet</h3>
            <p className="text-estate-500">Your messages will appear here</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MessagesTab;
