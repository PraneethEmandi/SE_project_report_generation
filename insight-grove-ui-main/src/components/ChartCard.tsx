
import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ChartCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const ChartCard = ({ title, children, className }: ChartCardProps) => {
  return (
    <Card className={className}>
      <CardHeader className="pb-0">
        <CardTitle className="text-md font-medium text-gray-700">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-3">
        {children}
      </CardContent>
    </Card>
  );
};

export default ChartCard;
