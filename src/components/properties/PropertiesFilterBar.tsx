import React from 'react';
import { PropertyFilters } from '@/types/property';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Search, X, Filter } from 'lucide-react';

interface PropertiesFilterBarProps {
  filters: PropertyFilters;
  onFiltersChange: (filters: Partial<PropertyFilters>) => void;
  onClearFilters: () => void;
  totalResults: number;
}

export const PropertiesFilterBar: React.FC<PropertiesFilterBarProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
  totalResults,
}) => {
  const hasActiveFilters = 
    filters.search || 
    filters.is_active !== null || 
    filters.is_occupied !== null || 
    filters.has_emergency;

  return (
    <div className="space-y-4">
      {/* Main Filter Controls */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
        {/* Search */}
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search properties, addresses, tenants..."
            value={filters.search}
            onChange={(e) => onFiltersChange({ search: e.target.value })}
            className="pl-10"
          />
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2">
            <Label htmlFor="active-filter" className="text-sm font-medium">
              Active Only
            </Label>
            <Switch
              id="active-filter"
              checked={filters.is_active === true}
              onCheckedChange={(checked) => 
                onFiltersChange({ is_active: checked ? true : null })
              }
            />
          </div>

          <div className="flex items-center space-x-2">
            <Label htmlFor="occupied-filter" className="text-sm font-medium">
              Occupied Only
            </Label>
            <Switch
              id="occupied-filter"
              checked={filters.is_occupied === true}
              onCheckedChange={(checked) => 
                onFiltersChange({ is_occupied: checked ? true : null })
              }
            />
          </div>

          <div className="flex items-center space-x-2">
            <Label htmlFor="emergency-filter" className="text-sm font-medium">
              Emergency Available
            </Label>
            <Switch
              id="emergency-filter"
              checked={filters.has_emergency}
              onCheckedChange={(checked) => 
                onFiltersChange({ has_emergency: checked })
              }
            />
          </div>

          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Active filters:</span>
          
          {filters.search && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Search: "{filters.search}"
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onFiltersChange({ search: '' })}
              />
            </Badge>
          )}
          
          {filters.is_active === true && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Active Properties
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onFiltersChange({ is_active: null })}
              />
            </Badge>
          )}
          
          {filters.is_occupied === true && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Occupied Properties
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onFiltersChange({ is_occupied: null })}
              />
            </Badge>
          )}
          
          {filters.has_emergency && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Emergency Available
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onFiltersChange({ has_emergency: false })}
              />
            </Badge>
          )}
        </div>
      )}

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        {totalResults} {totalResults === 1 ? 'property' : 'properties'} found
      </div>
    </div>
  );
};