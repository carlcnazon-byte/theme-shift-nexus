import React from 'react';
import { Search, X, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { VendorFilters } from '@/pages/Vendors';

interface VendorsFilterBarProps {
  filters: VendorFilters;
  onFiltersChange: (filters: Partial<VendorFilters>) => void;
  onClearFilters: () => void;
  totalResults: number;
}

export const VendorsFilterBar: React.FC<VendorsFilterBarProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
  totalResults,
}) => {
  const serviceTypes = [
    { value: 'plumbing', label: 'Plumbing' },
    { value: 'electrical', label: 'Electrical' },
    { value: 'hvac', label: 'HVAC' },
    { value: 'general', label: 'General' },
    { value: 'locksmith', label: 'Locksmith' },
    { value: 'pest control', label: 'Pest Control' }
  ];

  const sortOptions = [
    { value: 'rating', label: 'Highest Rating' },
    { value: 'jobs', label: 'Most Jobs' },
    { value: 'response_time', label: 'Fastest Response' }
  ];

  const hasActiveFilters = filters.search || 
    (filters.serviceType && filters.serviceType !== 'all') || 
    filters.availability !== null;

  return (
    <div className="space-y-4">
      {/* Search and Primary Controls Row */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search vendors by name or email..."
            className="pl-10 bg-background border-border focus:border-primary focus:ring-primary/20"
            value={filters.search}
            onChange={(e) => onFiltersChange({ search: e.target.value })}
          />
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-3 items-center">
        {/* Service Type Filter */}
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select 
            value={filters.serviceType} 
            onValueChange={(value) => onFiltersChange({ serviceType: value })}
          >
            <SelectTrigger className="w-auto min-w-32">
              <SelectValue placeholder="Service Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              {serviceTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Availability Toggle */}
        <div className="flex items-center gap-2">
          <Switch
            id="availability"
            checked={filters.availability === true}
            onCheckedChange={(checked) => 
              onFiltersChange({ availability: checked ? true : null })
            }
          />
          <Label htmlFor="availability" className="text-sm">
            Active Only
          </Label>
        </div>

        {/* Sort By */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Select 
            value={filters.sortBy} 
            onValueChange={(value: 'rating' | 'jobs' | 'response_time') => 
              onFiltersChange({ sortBy: value })
            }
          >
            <SelectTrigger className="w-auto min-w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={onClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>

      {/* Active Filter Badges */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.search && (
            <Badge variant="secondary" className="gap-2">
              Search: "{filters.search}"
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onFiltersChange({ search: '' })}
              />
            </Badge>
          )}
          {filters.serviceType && filters.serviceType !== 'all' && (
            <Badge variant="secondary" className="gap-2">
              Service: {serviceTypes.find(t => t.value === filters.serviceType)?.label}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onFiltersChange({ serviceType: 'all' })}
              />
            </Badge>
          )}
          {filters.availability === true && (
            <Badge variant="secondary" className="gap-2">
              Active Only
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onFiltersChange({ availability: null })}
              />
            </Badge>
          )}
        </div>
      )}

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {totalResults} vendor{totalResults !== 1 ? 's' : ''}
      </div>
    </div>
  );
};