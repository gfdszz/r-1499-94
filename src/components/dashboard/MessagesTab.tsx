
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const MessagesTab = () => {
  return (
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
  );
};

export default MessagesTab;
