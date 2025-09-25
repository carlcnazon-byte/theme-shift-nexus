import React from 'react';
import { Calendar, Filter, X, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { ReportFilters } from '@/pages/Reports';

interface ReportsFilterBarProps {
  filters: ReportFilters;
  onFiltersChange: (filters: Partial<ReportFilters>) => void;
}

export const ReportsFilterBar: React.FC<ReportsFilterBarProps> = ({
  filters,
  onFiltersChange,
}) => {
  const properties = [
    'Sunset Apartments',
    'Riverside Condos',
    'Garden View Townhouse',
    'Metro Lofts',
    'Downtown Plaza',
    'Oak Street Complex',
    'Pine Ridge Estates'
  ];

  const vendors = [
    'Emergency Plumbing Co.',
    'PowerTech Electric',
    'Climate Control Experts',
    'General Maintenance LLC',
    'SecureLock Services',
    'AllServices Pro',
    'QuickFix Solutions'
  ];

  const urgencyLevels = [
    { id: 'emergency', label: 'Emergency' },
    { id: 'urgent', label: 'Urgent' },
    { id: 'standard', label: 'Standard' }
  ];

  const hasActiveFilters = filters.properties.length > 0 || 
    filters.vendors.length > 0 || 
    filters.urgencyLevels.length < 3 || 
    filters.dateRange !== null;

  const handlePropertyChange = (property: string, checked: boolean) => {
    const newProperties = checked 
      ? [...filters.properties, property]
      : filters.properties.filter(p => p !== property);
    onFiltersChange({ properties: newProperties });
  };

  const handleVendorChange = (vendor: string, checked: boolean) => {
    const newVendors = checked 
      ? [...filters.vendors, vendor]
      : filters.vendors.filter(v => v !== vendor);
    onFiltersChange({ vendors: newVendors });
  };

  const handleUrgencyChange = (urgency: string, checked: boolean) => {
    const newUrgency = checked 
      ? [...filters.urgencyLevels, urgency]
      : filters.urgencyLevels.filter(u => u !== urgency);
    onFiltersChange({ urgencyLevels: newUrgency });
  };

  const handleClearFilters = () => {
    onFiltersChange({
      properties: [],
      vendors: [],
      urgencyLevels: ['emergency', 'urgent', 'standard'],
      dateRange: null,
    });
  };

  return (
    <div className="space-y-4">
      {/* Time Period Selector */}
      <div className="flex items-center justify-between">
        <Tabs 
          value={filters.timePeriod} 
          onValueChange={(value: '7days' | '30days' | '3months' | 'custom') => 
            onFiltersChange({ timePeriod: value })
          }
        >
          <TabsList>
            <TabsTrigger value="7days">Last 7 Days</TabsTrigger>
            <TabsTrigger value="30days">Last 30 Days</TabsTrigger>
            <TabsTrigger value="3months">Last 3 Months</TabsTrigger>
            <TabsTrigger value="custom">Custom Range</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Custom Date Range */}
      {filters.timePeriod === 'custom' && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-auto justify-start text-left font-normal",
                      !filters.dateRange && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {filters.dateRange?.from ? (
                      filters.dateRange.to ? (
                        <>
                          {format(filters.dateRange.from, "LLL dd, y")} -{" "}
                          {format(filters.dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(filters.dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    initialFocus
                    mode="range"
                    defaultMonth={filters.dateRange?.from}
                    selected={filters.dateRange ? {
                      from: filters.dateRange.from,
                      to: filters.dateRange.to
                    } : undefined}
                    onSelect={(range) => onFiltersChange({ dateRange: range || null })}
                    numberOfMonths={2}
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Advanced Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Advanced Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Properties Filter */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Properties</Label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {properties.map((property) => (
                  <div key={property} className="flex items-center space-x-2">
                    <Checkbox
                      id={`property-${property}`}
                      checked={filters.properties.includes(property)}
                      onCheckedChange={(checked) => handlePropertyChange(property, checked as boolean)}
                    />
                    <Label htmlFor={`property-${property}`} className="text-sm cursor-pointer">
                      {property}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Vendors Filter */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Vendors</Label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {vendors.map((vendor) => (
                  <div key={vendor} className="flex items-center space-x-2">
                    <Checkbox
                      id={`vendor-${vendor}`}
                      checked={filters.vendors.includes(vendor)}
                      onCheckedChange={(checked) => handleVendorChange(vendor, checked as boolean)}
                    />
                    <Label htmlFor={`vendor-${vendor}`} className="text-sm cursor-pointer">
                      {vendor}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Urgency Levels Filter */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Urgency Levels</Label>
              <div className="space-y-2">
                {urgencyLevels.map((urgency) => (
                  <div key={urgency.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`urgency-${urgency.id}`}
                      checked={filters.urgencyLevels.includes(urgency.id)}
                      onCheckedChange={(checked) => handleUrgencyChange(urgency.id, checked as boolean)}
                    />
                    <Label htmlFor={`urgency-${urgency.id}`} className="text-sm cursor-pointer">
                      {urgency.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Active Filters and Clear Button */}
          {hasActiveFilters && (
            <div className="space-y-3 pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Active Filters:</Label>
                <Button variant="ghost" size="sm" onClick={handleClearFilters}>
                  <X className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {filters.properties.map((property) => (
                  <Badge key={property} variant="secondary" className="gap-2">
                    Property: {property}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => handlePropertyChange(property, false)}
                    />
                  </Badge>
                ))}
                {filters.vendors.map((vendor) => (
                  <Badge key={vendor} variant="secondary" className="gap-2">
                    Vendor: {vendor}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => handleVendorChange(vendor, false)}
                    />
                  </Badge>
                ))}
                {urgencyLevels.filter(u => !filters.urgencyLevels.includes(u.id)).map((urgency) => (
                  <Badge key={urgency.id} variant="secondary" className="gap-2">
                    Excluded: {urgency.label}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => handleUrgencyChange(urgency.id, true)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};