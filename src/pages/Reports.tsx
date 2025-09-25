import React, { useState, useMemo } from 'react';
import { ReportsFilterBar } from '@/components/reports/ReportsFilterBar';
import { TicketVolumeChart } from '@/components/reports/TicketVolumeChart';
import { ResponseTimeChart } from '@/components/reports/ResponseTimeChart';
import { VendorPerformanceChart } from '@/components/reports/VendorPerformanceChart';
import { PropertyDistributionChart } from '@/components/reports/PropertyDistributionChart';
import { ExportPanel } from '@/components/reports/ExportPanel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Clock, Users, Building } from 'lucide-react';

export interface ReportData {
  ticketTrends: { date: string; count: number; urgency: string; emergency: number; urgent: number; standard: number }[];
  responseMetrics: { urgency: string; avgTime: number; target: number }[];
  vendorPerformance: { vendor: string; jobs: number; rating: number }[];
  propertyDistribution: { property: string; count: number; percentage: number }[];
}

export interface ReportFilters {
  timePeriod: '7days' | '30days' | '3months' | 'custom';
  dateRange: { from?: Date; to?: Date } | null;
  properties: string[];
  vendors: string[];
  urgencyLevels: string[];
}

const Reports = () => {
  const [filters, setFilters] = useState<ReportFilters>({
    timePeriod: '30days',
    dateRange: null,
    properties: [],
    vendors: [],
    urgencyLevels: ['emergency', 'urgent', 'standard'],
  });

  // Mock report data
  const mockData: ReportData = {
    ticketTrends: [
      { date: '2024-01-01', count: 45, urgency: 'total', emergency: 8, urgent: 15, standard: 22 },
      { date: '2024-01-02', count: 52, urgency: 'total', emergency: 12, urgent: 18, standard: 22 },
      { date: '2024-01-03', count: 38, urgency: 'total', emergency: 6, urgent: 14, standard: 18 },
      { date: '2024-01-04', count: 61, urgency: 'total', emergency: 15, urgent: 22, standard: 24 },
      { date: '2024-01-05', count: 55, urgency: 'total', emergency: 10, urgent: 20, standard: 25 },
      { date: '2024-01-06', count: 28, urgency: 'total', emergency: 4, urgent: 8, standard: 16 },
      { date: '2024-01-07', count: 22, urgency: 'total', emergency: 3, urgent: 6, standard: 13 },
      { date: '2024-01-08', count: 47, urgency: 'total', emergency: 9, urgent: 16, standard: 22 },
      { date: '2024-01-09', count: 58, urgency: 'total', emergency: 14, urgent: 21, standard: 23 },
      { date: '2024-01-10', count: 43, urgency: 'total', emergency: 7, urgent: 15, standard: 21 },
      { date: '2024-01-11', count: 51, urgency: 'total', emergency: 11, urgent: 18, standard: 22 },
      { date: '2024-01-12', count: 39, urgency: 'total', emergency: 6, urgent: 13, standard: 20 },
      { date: '2024-01-13', count: 46, urgency: 'total', emergency: 8, urgent: 16, standard: 22 },
      { date: '2024-01-14', count: 54, urgency: 'total', emergency: 12, urgent: 19, standard: 23 },
      { date: '2024-01-15', count: 41, urgency: 'total', emergency: 7, urgent: 14, standard: 20 },
    ],
    responseMetrics: [
      { urgency: 'Emergency', avgTime: 15, target: 30 },
      { urgency: 'Urgent', avgTime: 75, target: 120 },
      { urgency: 'Standard', avgTime: 180, target: 240 },
    ],
    vendorPerformance: [
      { vendor: 'Emergency Plumbing Co.', jobs: 156, rating: 4.8 },
      { vendor: 'PowerTech Electric', jobs: 234, rating: 4.9 },
      { vendor: 'Climate Control Experts', jobs: 89, rating: 4.6 },
      { vendor: 'General Maintenance LLC', jobs: 312, rating: 4.3 },
      { vendor: 'SecureLock Services', jobs: 78, rating: 4.7 },
      { vendor: 'AllServices Pro', jobs: 198, rating: 4.5 },
      { vendor: 'QuickFix Solutions', jobs: 67, rating: 4.2 },
      { vendor: 'Metro HVAC Specialists', jobs: 145, rating: 4.4 },
      { vendor: 'Elite Electrical', jobs: 92, rating: 4.6 },
      { vendor: 'Rapid Repairs Inc.', jobs: 127, rating: 4.3 },
    ],
    propertyDistribution: [
      { property: 'Sunset Apartments', count: 89, percentage: 24.3 },
      { property: 'Riverside Condos', count: 76, percentage: 20.7 },
      { property: 'Garden View Townhouse', count: 65, percentage: 17.8 },
      { property: 'Metro Lofts', count: 54, percentage: 14.7 },
      { property: 'Downtown Plaza', count: 43, percentage: 11.7 },
      { property: 'Oak Street Complex', count: 32, percentage: 8.7 },
      { property: 'Pine Ridge Estates', count: 8, percentage: 2.2 },
    ],
  };

  const filteredData = useMemo(() => {
    // In a real app, you would filter the data based on the selected filters
    // For now, we'll return the mock data as-is
    return mockData;
  }, [filters]);

  const handleFilterChange = (newFilters: Partial<ReportFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Calculate summary metrics
  const totalTickets = filteredData.ticketTrends.reduce((sum, item) => sum + item.count, 0);
  const avgResponseTime = filteredData.responseMetrics.reduce((sum, item) => sum + item.avgTime, 0) / filteredData.responseMetrics.length;
  const totalVendors = filteredData.vendorPerformance.length;
  const totalProperties = filteredData.propertyDistribution.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Analytics & Reports
          </h1>
          <p className="text-muted-foreground">
            Comprehensive insights into property management performance and trends.
          </p>
        </div>
        <ExportPanel />
      </div>

      {/* Filter Bar */}
      <ReportsFilterBar
        filters={filters}
        onFiltersChange={handleFilterChange}
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Total Tickets</p>
                <p className="text-3xl font-bold text-foreground">{totalTickets}</p>
                <Badge variant="secondary" className="bg-green-500/20 text-green-300 mt-2">
                  +12% vs last period
                </Badge>
              </div>
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Avg Response Time</p>
                <p className="text-3xl font-bold text-foreground">{Math.round(avgResponseTime)}min</p>
                <Badge variant="secondary" className="bg-amber-500/20 text-amber-300 mt-2">
                  -5% vs last period
                </Badge>
              </div>
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center">
                <Clock className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Active Vendors</p>
                <p className="text-3xl font-bold text-foreground">{totalVendors}</p>
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 mt-2">
                  +2 new this month
                </Badge>
              </div>
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Properties</p>
                <p className="text-3xl font-bold text-foreground">{totalProperties}</p>
                <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-300 mt-2">
                  All monitored
                </Badge>
              </div>
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                <Building className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ticket Volume Trends */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Ticket Volume Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <TicketVolumeChart data={filteredData.ticketTrends} />
          </CardContent>
        </Card>

        {/* Response Time Performance */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Response Time Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponseTimeChart data={filteredData.responseMetrics} />
          </CardContent>
        </Card>

        {/* Vendor Performance */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Top Vendor Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <VendorPerformanceChart data={filteredData.vendorPerformance.slice(0, 10)} />
          </CardContent>
        </Card>

        {/* Property Distribution */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Ticket Distribution by Property</CardTitle>
          </CardHeader>
          <CardContent>
            <PropertyDistributionChart data={filteredData.propertyDistribution} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;