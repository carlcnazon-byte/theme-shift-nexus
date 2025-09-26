import React from 'react';
import { cn } from '@/lib/utils';

export type ServiceCategory = 'Plumbing' | 'Electrical' | 'HVAC' | 'General' | 'Locksmith' | 'Pest Control';

interface ServiceCategoryChipProps {
  category: ServiceCategory;
  className?: string;
}

export const ServiceCategoryChip: React.FC<ServiceCategoryChipProps> = ({ 
  category, 
  className 
}) => {
  const getCategoryConfig = (category: ServiceCategory) => {
    switch (category) {
      case 'Plumbing':
        return {
          label: 'Plumbing',
          className: 'bg-blue-100 text-blue-700'
        };
      case 'Electrical':
        return {
          label: 'Electrical',
          className: 'bg-yellow-100 text-yellow-700'
        };
      case 'HVAC':
        return {
          label: 'HVAC',
          className: 'bg-purple-100 text-purple-700'
        };
      case 'General':
        return {
          label: 'General',
          className: 'bg-gray-100 text-gray-700'
        };
      case 'Locksmith':
        return {
          label: 'Locksmith',
          className: 'bg-red-100 text-red-700'
        };
      case 'Pest Control':
        return {
          label: 'Pest',
          className: 'bg-green-100 text-green-700'
        };
      default:
        return {
          label: category,
          className: 'bg-gray-100 text-gray-700'
        };
    }
  };

  const config = getCategoryConfig(category);

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