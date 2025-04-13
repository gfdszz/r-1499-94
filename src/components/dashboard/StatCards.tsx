
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface StatCardsProps {
  profileProgress: number;
  propertiesCount: number;
}

const StatCards = ({ profileProgress, propertiesCount }: StatCardsProps) => {
  return (
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
          <p className="text-3xl font-display text-estate-800">{propertiesCount}</p>
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
  );
};

export default StatCards;
