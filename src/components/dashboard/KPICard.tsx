import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon | string;
  gradient: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export const KPICard: React.FC<KPICardProps> = ({ 
  title, 
  value, 
  icon, 
  gradient,
  trend 
}) => {
  const renderIcon = () => {
    if (typeof icon === 'string') {
      return <span className="text-2xl">{icon}</span>;
    }
    const Icon = icon as LucideIcon;
    return <Icon className="h-8 w-8 text-white" />;
  };

  return (
    <Card className={`${gradient} border-0 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-white/90 text-sm font-medium">{title}</p>
            <div className="flex items-center space-x-2">
              <p className="text-3xl font-bold text-white">{value}</p>
              {trend && (
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                  trend.isPositive 
                    ? 'bg-white/20 text-white' 
                    : 'bg-red-500/20 text-red-100'
                }`}>
                  {trend.isPositive ? '↗' : '↘'} {trend.value}%
                </span>
              )}
            </div>
          </div>
          <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
            {renderIcon()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};