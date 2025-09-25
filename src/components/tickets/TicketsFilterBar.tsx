import React from 'react';
import { Search, Filter, X, Plus, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { TicketFilters } from '@/pages/Tickets';

interface TicketsFilterBarProps {
  filters: TicketFilters;
  onFiltersChange: (filters: Partial<TicketFilters>) => void;
  onClearFilters: () => void;
  totalResults: number;
}

export const TicketsFilterBar: React.FC<TicketsFilterBarProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
  totalResults,
}) => {
  const properties = [
    'Sunset Apartments',
    'Riverside Condos', 
    'Garden View Townhouse',
    'Metro Lofts',
    'Downtown Plaza'
  ];

  const urgencyOptions = [
    { value: 'emergency', label: 'Emergency' },
    { value: 'urgent', label: 'Urgent' },
    { value: 'standard', label: 'Standard' }
  ];

  const statusOptions = [
    { value: 'open', label: 'Open' },
    { value: 'vendor_notified', label: 'Vendor Notified' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'resolved', label: 'Resolved' }
  ];

  const hasActiveFilters = filters.search || filters.property || filters.urgency || filters.status || filters.dateRange;

  return (
    <div className="space-y-4">
      {/* Search and Create Button Row */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tickets, properties, descriptions..."
            className="pl-10 bg-background border-border focus:border-primary focus:ring-primary/20"
            value={filters.search}
            onChange={(e) => onFiltersChange({ search: e.target.value })}
          />
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground whitespace-nowrap">
          <Plus className="h-4 w-4 mr-2" />
          Create Ticket
        </Button>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-3">
        {/* Property Filter */}
        <Select value={filters.property} onValueChange={(value) => onFiltersChange({ property: value })}>
          <SelectTrigger className="w-auto min-w-32">
            <SelectValue placeholder="Property" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Properties</SelectItem>
            {properties.map((property) => (
              <SelectItem key={property} value={property}>
                {property}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Urgency Filter */}
        <Select value={filters.urgency} onValueChange={(value) => onFiltersChange({ urgency: value })}>
          <SelectTrigger className="w-auto min-w-32">
            <SelectValue placeholder="Urgency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Urgency</SelectItem>
            {urgencyOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Status Filter */}
        <Select value={filters.status} onValueChange={(value) => onFiltersChange({ status: value })}>
          <SelectTrigger className="w-auto min-w-32">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Status</SelectItem>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Date Range Filter */}
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
                <span>Date Range</span>
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
          {filters.property && (
            <Badge variant="secondary" className="gap-2">
              Property: {filters.property}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onFiltersChange({ property: '' })}
              />
            </Badge>
          )}
          {filters.urgency && (
            <Badge variant="secondary" className="gap-2">
              Urgency: {urgencyOptions.find(o => o.value === filters.urgency)?.label}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onFiltersChange({ urgency: '' })}
              />
            </Badge>
          )}
          {filters.status && (
            <Badge variant="secondary" className="gap-2">
              Status: {statusOptions.find(o => o.value === filters.status)?.label}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onFiltersChange({ status: '' })}
              />
            </Badge>
          )}
          {filters.dateRange && (
            <Badge variant="secondary" className="gap-2">
              Date: {filters.dateRange.from && format(filters.dateRange.from, "MMM dd")}
              {filters.dateRange.to && ` - ${format(filters.dateRange.to, "MMM dd")}`}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onFiltersChange({ dateRange: null })}
              />
            </Badge>
          )}
        </div>
      )}

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {totalResults} ticket{totalResults !== 1 ? 's' : ''}
      </div>
    </div>
  );
};