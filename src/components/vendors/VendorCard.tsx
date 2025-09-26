import React from 'react';
import { Phone, Mail, Star, Clock, Briefcase, MoreHorizontal, Eye, Edit, UserPlus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { VendorStatusChip } from '@/components/ui/vendor-status-chip';
import { ServiceCategoryChip, ServiceCategory } from '@/components/ui/service-category-chip';
import { ServiceProvider } from '@/pages/Vendors';

interface VendorCardProps {
  vendor: ServiceProvider;
}

export const VendorCard: React.FC<VendorCardProps> = ({ vendor }) => {

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? 'fill-yellow-400 text-yellow-400'
            : i < rating
            ? 'fill-yellow-400/50 text-yellow-400/50'
            : 'fill-gray-300 text-gray-300 dark:fill-gray-600 dark:text-gray-600'
        }`}
      />
    ));
  };

  return (
    <Card className="bg-card border-border hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-[480px] flex flex-col">
      <CardContent className="p-5 flex-1 flex flex-col h-full">
        {/* Header with Avatar and Status - Fixed height section */}
        <div className="flex items-start justify-between mb-4 h-[60px]">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <Avatar className="h-12 w-12 flex-shrink-0">
              <AvatarImage src={vendor.logo} alt={vendor.company_name} />
              <AvatarFallback className="bg-primary/10 text-primary font-medium text-sm">
                {vendor.company_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-semibold text-foreground truncate leading-tight mb-1">
                {vendor.company_name}
              </h3>
              <VendorStatusChip status={vendor.is_active ? 'active' : 'inactive'} />
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem className="cursor-pointer">
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Edit className="mr-2 h-4 w-4" />
                Edit Vendor
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <UserPlus className="mr-2 h-4 w-4" />
                Assign Job
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Service Categories - Fixed height section */}
        <div className="flex flex-wrap gap-1.5 mb-4 min-h-[36px]">
          {(vendor.service_categories || []).slice(0, 3).map((category) => (
            <ServiceCategoryChip 
              key={category} 
              category={category as ServiceCategory}
              className="text-xs px-2 py-1" 
            />
          ))}
          {/* Fallback to vendor type if no service categories */}
          {(!vendor.service_categories || vendor.service_categories.length === 0) && vendor.type && (
            <ServiceCategoryChip 
              category={vendor.type as ServiceCategory}
              className="text-xs px-2 py-1" 
            />
          )}
          {/* Show +X more if there are additional categories */}
          {vendor.service_categories && vendor.service_categories.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
              +{vendor.service_categories.length - 3} more
            </span>
          )}
        </div>

        {/* Rating - Fixed height section */}
        <div className="flex items-center gap-2 mb-4 h-[20px]">
          <div className="flex items-center">
            {renderStars(vendor.average_rating || 0)}
          </div>
          <span className="text-sm font-medium text-foreground">
            {(vendor.average_rating || 0).toFixed(1)}
          </span>
          <span className="text-sm text-muted-foreground">
            ({vendor.total_jobs || 0} jobs)
          </span>
        </div>

        {/* Key Metrics - Fixed height section */}
        <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-accent/50 rounded-lg h-[64px]">
          <div className="text-center flex flex-col justify-center">
            <div className="text-base font-semibold text-foreground">
              {vendor.on_time_percentage || 85}%
            </div>
            <div className="text-xs text-muted-foreground">On-time</div>
          </div>
          <div className="text-center flex flex-col justify-center">
            <div className="text-base font-semibold text-foreground">
              {vendor.jobs_per_month || Math.round((vendor.total_jobs || 0) / 12)}
            </div>
            <div className="text-xs text-muted-foreground">Jobs/month</div>
          </div>
        </div>

        {/* Performance Stats - Fixed height section */}
        <div className="space-y-3 mb-4 h-[84px]">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Briefcase className="h-4 w-4 flex-shrink-0" />
              <span>Jobs Completed</span>
            </div>
            <span className="font-semibold text-foreground">{vendor.total_jobs || 0}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4 flex-shrink-0" />
              <span>Response Time</span>
            </div>
            <span className="font-semibold text-foreground">
              {vendor.average_response_time || 30}min
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Hourly Rate</span>
            <span className="font-semibold text-foreground">
              ${vendor.hourly_rate || 75}/hr
            </span>
          </div>
        </div>

        {/* Spacer to push footer content to bottom */}
        <div className="flex-1"></div>

        {/* Contact Info - Fixed position at bottom */}
        <div className="space-y-2 mb-4 pt-3 border-t border-border">
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="text-foreground truncate font-medium">
              {vendor.phone_number}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="text-foreground truncate">
              {vendor.email || 'contact@company.com'}
            </span>
          </div>
        </div>

        {/* Action Buttons - Fixed at bottom */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 h-9">
            <Eye className="h-3 w-3 mr-1.5" />
            Details
          </Button>
          <Button variant="outline" size="sm" className="flex-1 h-9">
            <UserPlus className="h-3 w-3 mr-1.5" />
            Assign
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};