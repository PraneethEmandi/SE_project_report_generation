
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Update {
  id: string;
  text: string;
}

interface UpdatesCardProps {
  title: string;
  updates: Update[];
  className?: string;
}

const UpdatesCard = ({ title, updates, className }: UpdatesCardProps) => {
  return (
    <Card className={className}>
      <CardHeader className="pb-1">
        <CardTitle className="text-md font-medium text-gray-700">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {updates.map((update) => (
            <div 
              key={update.id} 
              className="p-3 bg-blue-50 rounded-md text-sm text-gray-800"
            >
              • {update.text}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpdatesCard;
