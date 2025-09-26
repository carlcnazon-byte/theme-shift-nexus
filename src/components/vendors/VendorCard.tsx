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
    <Card className="bg-card border-border hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <CardContent className="p-6">
        {/* Header with Avatar and Status */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={vendor.logo} alt={vendor.company_name} />
              <AvatarFallback className="bg-primary/10 text-primary font-medium">
                {vendor.company_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{vendor.company_name}</h3>
              <VendorStatusChip status={vendor.is_active ? 'active' : 'inactive'} />
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
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

        {/* Service Categories */}
        <div className="flex flex-wrap gap-2 mb-4">
          {(vendor.service_categories || []).map((category) => (
            <ServiceCategoryChip 
              key={category} 
              category={category as ServiceCategory} 
            />
          ))}
          {/* Fallback to vendor type if no service categories */}
          {(!vendor.service_categories || vendor.service_categories.length === 0) && vendor.type && (
            <ServiceCategoryChip 
              category={vendor.type as ServiceCategory} 
            />
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {renderStars(vendor.average_rating || 0)}
          </div>
          <span className="text-sm font-medium text-foreground">{vendor.average_rating || '0.0'}</span>
          <span className="text-sm text-muted-foreground">({vendor.total_jobs || 0} jobs)</span>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-accent/50 rounded-lg">
          <div className="text-center">
            <div className="text-sm font-medium text-foreground">{vendor.on_time_percentage || 85}%</div>
            <div className="text-xs text-muted-foreground">On-time</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium text-foreground">{vendor.jobs_per_month || Math.round((vendor.total_jobs || 0) / 12)}</div>
            <div className="text-xs text-muted-foreground">Jobs/month</div>
          </div>
        </div>

        {/* Performance Stats */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Briefcase className="h-4 w-4" />
              <span>Jobs Completed</span>
            </div>
            <span className="font-medium text-foreground">{vendor.total_jobs || 0}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Response Time</span>
            </div>
            <span className="font-medium text-foreground">{vendor.average_response_time || 'N/A'}{vendor.average_response_time ? 'min' : ''}</span>
          </div>
          {vendor.hourly_rate && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Hourly Rate</span>
              <span className="font-medium text-foreground">${vendor.hourly_rate}</span>
            </div>
          )}
        </div>

        {/* Contact Info */}
        <div className="space-y-2 mb-4 pt-3 border-t border-border">
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground">{vendor.phone_number}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground truncate">{vendor.email || 'contact@company.com'}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Eye className="h-3 w-3 mr-1" />
            Details
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <UserPlus className="h-3 w-3 mr-1" />
            Assign
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};