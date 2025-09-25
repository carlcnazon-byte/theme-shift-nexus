import React from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export type StatusLevel = 'open' | 'vendor_notified' | 'in_progress' | 'resolved' | 'canceled';

interface StatusChipProps {
  status: StatusLevel;
  compact?: boolean;
  className?: string;
}

export const StatusChip: React.FC<StatusChipProps> = ({ 
  status, 
  compact = false, 
  className 
}) => {
  const getStatusConfig = (level: StatusLevel) => {
    switch (level) {
      case 'open':
        return {
          label: 'Open',
          className: 'bg-yellow-100 text-yellow-700',
          dotClassName: 'bg-yellow-500'
        };
      case 'vendor_notified':
        return {
          label: 'Vendor Notified',
          className: 'bg-indigo-100 text-indigo-700',
          dotClassName: 'bg-indigo-500'
        };
      case 'in_progress':
        return {
          label: 'In Progress',
          className: 'bg-blue-100 text-blue-700',
          dotClassName: 'bg-blue-500'
        };
      case 'resolved':
        return {
          label: 'Resolved',
          className: 'bg-green-100 text-green-700',
          dotClassName: 'bg-green-500'
        };
      case 'canceled':
        return {
          label: 'Canceled',
          className: 'bg-gray-100 text-gray-700',
          dotClassName: 'bg-gray-500'
        };
    }
  };

  const config = getStatusConfig(status);

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

  return (
    <div className={cn(
      'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
      config.className,
      className
    )}>
      {config.label}
    </div>
  );
};