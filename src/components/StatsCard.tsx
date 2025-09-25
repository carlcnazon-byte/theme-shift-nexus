import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  description 
}) => {
  return (
    <Card className="bg-panel/80 backdrop-blur-panel border-border-subtle hover:shadow-panel transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-text-secondary text-sm font-medium">{title}</p>
            <p className="text-3xl font-bold text-text-primary">{value}</p>
            {trend && (
              <div className="flex items-center space-x-1">
                <span className={`text-sm font-medium ${
                  trend.isPositive ? 'text-success' : 'text-destructive'
                }`}>
                  {trend.isPositive ? '+' : ''}{trend.value}%
                </span>
                {description && (
                  <span className="text-text-secondary text-sm">{description}</span>
                )}
              </div>
            )}
          </div>
          <div className="h-12 w-12 rounded-xl bg-accent-gradient flex items-center justify-center">
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};