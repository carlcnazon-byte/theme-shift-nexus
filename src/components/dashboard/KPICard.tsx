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
      return <span className="text-lg sm:text-2xl">{icon}</span>;
    }
    const Icon = icon as LucideIcon;
    return <Icon className="h-5 w-5 sm:h-8 sm:w-8 text-white" />;
  };

  return (
    <Card className={`${gradient} border-0 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}>
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1 sm:space-y-2 flex-1 min-w-0">
            <p className="text-white/90 text-xs sm:text-sm font-medium">{title}</p>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <p className="text-xl sm:text-3xl font-bold text-white">{value}</p>
              {trend && (
                <span className={`text-xs sm:text-sm font-medium px-1 sm:px-2 py-0.5 sm:py-1 rounded-full ${
                  trend.isPositive 
                    ? 'bg-white/20 text-white' 
                    : 'bg-red-500/20 text-red-100'
                }`}>
                  {trend.isPositive ? '↗' : '↘'} {trend.value}%
                </span>
              )}
            </div>
          </div>
          <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm flex-shrink-0">
            {renderIcon()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};