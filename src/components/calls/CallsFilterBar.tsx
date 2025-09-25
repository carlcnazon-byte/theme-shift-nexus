import React from 'react';
import { Search, Calendar, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { CallFilters } from '@/pages/Calls';

interface CallsFilterBarProps {
  filters: CallFilters;
  onFiltersChange: (filters: Partial<CallFilters>) => void;
  totalResults: number;
}

export const CallsFilterBar: React.FC<CallsFilterBarProps> = ({
  filters,
  onFiltersChange,
  totalResults,
}) => {
  const durationOptions = [
    { value: 'all', label: 'All Durations' },
    { value: 'short', label: '< 1 min' },
    { value: 'medium', label: '1-5 min' },
    { value: 'long', label: '> 5 min' }
  ];

  const ticketOptions = [
    { value: 'all', label: 'All Calls' },
    { value: 'yes', label: 'With Ticket' },
    { value: 'no', label: 'No Ticket' }
  ];

  const hasActiveFilters = filters.search || 
    filters.dateRange || 
    filters.duration !== 'all' || 
    filters.hasTicket !== 'all';

  const handleClearFilters = () => {
    onFiltersChange({
      search: '',
      dateRange: null,
      duration: 'all',
      hasTicket: 'all',
    });
  };

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <Tabs 
        value={filters.tab} 
        onValueChange={(value: 'all' | 'incoming' | 'outgoing' | 'voicemails') => 
          onFiltersChange({ tab: value })
        }
      >
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
          <TabsTrigger value="all">All Calls</TabsTrigger>
          <TabsTrigger value="incoming">Incoming</TabsTrigger>
          <TabsTrigger value="outgoing">Outgoing</TabsTrigger>
          <TabsTrigger value="voicemails">Voicemails</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Search and Filters Row */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search calls, names, phone numbers..."
            className="pl-10 bg-background border-border focus:border-primary focus:ring-primary/20"
            value={filters.search}
            onChange={(e) => onFiltersChange({ search: e.target.value })}
          />
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Filters:</span>
        </div>

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

        {/* Duration Filter */}
        <Select 
          value={filters.duration} 
          onValueChange={(value: 'all' | 'short' | 'medium' | 'long') => 
            onFiltersChange({ duration: value })
          }
        >
          <SelectTrigger className="w-auto min-w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {durationOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Ticket Association Filter */}
        <Select 
          value={filters.hasTicket} 
          onValueChange={(value: 'all' | 'yes' | 'no') => 
            onFiltersChange({ hasTicket: value })
          }
        >
          <SelectTrigger className="w-auto min-w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ticketOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={handleClearFilters}
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
          {filters.duration !== 'all' && (
            <Badge variant="secondary" className="gap-2">
              Duration: {durationOptions.find(o => o.value === filters.duration)?.label}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onFiltersChange({ duration: 'all' })}
              />
            </Badge>
          )}
          {filters.hasTicket !== 'all' && (
            <Badge variant="secondary" className="gap-2">
              Ticket: {ticketOptions.find(o => o.value === filters.hasTicket)?.label}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onFiltersChange({ hasTicket: 'all' })}
              />
            </Badge>
          )}
        </div>
      )}

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {totalResults} call{totalResults !== 1 ? 's' : ''}
      </div>
    </div>
  );
};