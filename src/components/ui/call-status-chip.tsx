import React from 'react';
import { cn } from '@/lib/utils';

export type CallStatus = 'completed' | 'missed' | 'voicemail';

interface CallStatusChipProps {
  status: CallStatus;
  className?: string;
}

export const CallStatusChip: React.FC<CallStatusChipProps> = ({ 
  status, 
  className 
}) => {
  const getStatusConfig = (status: CallStatus) => {
    switch (status) {
      case 'completed':
        return {
          label: 'Completed',
          className: 'bg-green-100 text-green-700'
        };
      case 'missed':
        return {
          label: 'Missed',
          className: 'bg-red-100 text-red-700'
        };
      case 'voicemail':
        return {
          label: 'Voicemail',
          className: 'bg-amber-100 text-amber-700'
        };
    }
  };

  const config = getStatusConfig(status);

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