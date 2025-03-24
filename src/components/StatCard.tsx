
import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  className?: string;
}

const StatCard = ({ title, value, icon, className }: StatCardProps) => {
  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
          </div>
          {icon && <div className="text-student-500">{icon}</div>}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
