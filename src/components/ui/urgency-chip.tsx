import React from 'react';
import { AlertTriangle, Clock, Wrench } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export type UrgencyLevel = 'emergency' | 'urgent' | 'standard';

interface UrgencyChipProps {
  urgency: UrgencyLevel;
  compact?: boolean;
  className?: string;
}

export const UrgencyChip: React.FC<UrgencyChipProps> = ({ 
  urgency, 
  compact = false, 
  className 
}) => {
  const getUrgencyConfig = (level: UrgencyLevel) => {
    switch (level) {
      case 'emergency':
        return {
          label: 'Emergency',
          className: 'bg-red-100 text-red-700',
          dotClassName: 'bg-red-500',
          icon: AlertTriangle
        };
      case 'urgent':
        return {
          label: 'Urgent', 
          className: 'bg-amber-100 text-amber-700',
          dotClassName: 'bg-amber-500',
          icon: Clock
        };
      case 'standard':
        return {
          label: 'Standard',
          className: 'border border-gray-300 text-gray-600 bg-transparent',
          dotClassName: 'bg-gray-400',
          icon: Wrench
        };
    }
  };

  const config = getUrgencyConfig(urgency);

  if (compact) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cn('w-2 h-2 rounded-full', config.dotClassName, className)} />
        </TooltipTrigger>
        <TooltipContent>
          <p>{config.label}</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  const IconComponent = config.icon;

  return (
    <div className={cn(
      'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium',
      config.className,
      className
    )}>
      <IconComponent className="w-3 h-3" />
      {config.label}
    </div>
  );
};