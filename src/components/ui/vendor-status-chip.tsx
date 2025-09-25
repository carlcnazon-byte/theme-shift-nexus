import React from 'react';
import { cn } from '@/lib/utils';

export type VendorStatus = 'active' | 'inactive';

interface VendorStatusChipProps {
  status: VendorStatus;
  className?: string;
}

export const VendorStatusChip: React.FC<VendorStatusChipProps> = ({ 
  status, 
  className 
}) => {
  const getStatusConfig = (status: VendorStatus) => {
    switch (status) {
      case 'active':
        return {
          label: 'Active',
          className: 'bg-green-100 text-green-700'
        };
      case 'inactive':
        return {
          label: 'Inactive',
          className: 'bg-gray-100 text-gray-700'
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