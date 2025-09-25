'use client';

import React, { useMemo } from 'react';
import {
  BarChart,
  LinearYAxis,
  LinearYAxisTickSeries,
  LinearYAxisTickLabel,
  LinearXAxis,
  LinearXAxisTickSeries,
  BarSeries,
  Bar,
  GridlineSeries,
  Gridline,
} from 'reaviz';

interface VendorPerformanceData {
  vendor: string;
  jobs: number;
  rating: number;
}

interface VendorPerformanceChartProps {
  data: VendorPerformanceData[];
}

// Diverse color scheme for better distinction
const chartColors = [
  '#14b8a6', // Teal
  '#8b5cf6', // Purple
  '#f59e0b', // Amber
  '#06b6d4', // Cyan
  '#ef4444', // Red
  '#10b981', // Emerald
  '#f97316', // Orange
  '#6366f1', // Indigo
];

// Rating categories with colors
const ratingCategories = [
  { label: 'Excellent (4.7+)', color: '#10b981', min: 4.7 },
  { label: 'Good (4.3+)', color: '#06b6d4', min: 4.3 },
  { label: 'Average (4.0+)', color: '#f59e0b', min: 4.0 },
  { label: 'Poor (<4.0)', color: '#ef4444', min: 0 },
];

export const VendorPerformanceChart: React.FC<VendorPerformanceChartProps> = ({ data }) => {
  // Sort data by jobs completed (descending) and take top 8, then format for reaviz
  const chartData = useMemo(() => {
    const sortedData = [...data]
      .sort((a, b) => b.jobs - a.jobs)
      .slice(0, 8)
      .map((vendor, index) => ({
        key: vendor.vendor.length > 15 ? `${vendor.vendor.substring(0, 12)}...` : vendor.vendor,
        data: vendor.jobs,
        originalData: vendor,
        color: chartColors[index % chartColors.length]
      }));
    
    return sortedData;
  }, [data]);

  const formatVendorName = (name: string) => {
    return name.length > 20 ? `${name.substring(0, 17)}...` : name;
  };

  // Calculate stats
  const stats = useMemo(() => {
    const totalVendors = data.length;
    const totalJobs = data.reduce((sum, vendor) => sum + vendor.jobs, 0);
    const avgRating = data.length > 0 ? data.reduce((sum, vendor) => sum + vendor.rating, 0) / data.length : 0;
    const topPerformer = data.sort((a, b) => b.jobs - a.jobs)[0];
    
    // Categorize vendors by rating
    const ratingStats = ratingCategories.map(category => {
      let count = 0;
      if (category.min === 4.7) {
        count = data.filter(v => v.rating >= 4.7).length;
      } else if (category.min === 4.3) {
        count = data.filter(v => v.rating >= 4.3 && v.rating < 4.7).length;
      } else if (category.min === 4.0) {
        count = data.filter(v => v.rating >= 4.0 && v.rating < 4.3).length;
      } else {
        count = data.filter(v => v.rating < 4.0).length;
      }
      return { ...category, count };
    });

    return {
      totalVendors,
      totalJobs,
      avgRating,
      topPerformer,
      ratingStats
    };
  }, [data]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-xl font-semibold text-foreground">Top Vendor Performance</h3>
        <p className="text-sm text-muted-foreground mt-1">Jobs completed by top {chartData.length} vendors</p>
      </div>

      {/* Chart */}
      <div className="h-80">
        <BarChart
          id="vendor-performance-horizontal-chart"
          height={320}
          data={chartData}
          yAxis={
            <LinearYAxis
              type="category"
              tickSeries={
                <LinearYAxisTickSeries
                  label={
                    <LinearYAxisTickLabel
                      format={(text: string) => formatVendorName(text)}
                      fill="hsl(var(--muted-foreground))"
                    />
                  }
                />
              }
            />
          }
          xAxis={
            <LinearXAxis
              type="value"
              axisLine={null}
              tickSeries={
                <LinearXAxisTickSeries
                  label={null}
                  line={null}
                  tickSize={10}
                />
              }
            />
          }
          series={
            <BarSeries
              layout="horizontal"
              bar={
                <Bar
                  glow={{
                    blur: 8,
                    opacity: 0.3,
                  }}
                  gradient={null}
                  rx={4}
                />
              }
              colorScheme={chartColors}
              padding={0.2}
            />
          }
          gridlines={
            <GridlineSeries
              line={<Gridline strokeColor="hsl(var(--border))" />}
            />
          }
        />
      </div>

      {/* Rating Categories Legend */}
      <div className="flex flex-wrap gap-4 justify-center">
        {ratingCategories.map((category, index) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: category.color }}
            />
            <span className="text-sm text-muted-foreground">{category.label}</span>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 gap-6 pt-4 border-t">
        {/* Top Performer */}
        <div className="space-y-2">
          <span className="text-sm text-muted-foreground">Top Performer</span>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground text-lg">
              {stats.topPerformer?.vendor.substring(0, 15)}{stats.topPerformer?.vendor.length > 15 ? '...' : ''}
            </span>
            <div className="px-2 py-1 bg-primary/10 rounded-full">
              <span className="text-xs font-medium text-primary">
                {stats.topPerformer?.jobs} jobs
              </span>
            </div>
          </div>
          <span className="text-xs text-muted-foreground">
            Rating: {stats.topPerformer?.rating}/5.0
          </span>
        </div>

        {/* Total Jobs */}
        <div className="space-y-2">
          <span className="text-sm text-muted-foreground">Total Jobs</span>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground text-lg">
              {stats.totalJobs.toLocaleString()}
            </span>
            <div className="px-2 py-1 bg-accent/10 rounded-full">
              <span className="text-xs font-medium text-accent-foreground">
                {stats.totalVendors} vendors
              </span>
            </div>
          </div>
          <span className="text-xs text-muted-foreground">
            Across all vendors
          </span>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-3 gap-4 pt-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path d="M13.3333 5.83333C13.3333 7.67428 11.8409 9.16667 10 9.16667C8.15905 9.16667 6.66667 7.67428 6.66667 5.83333C6.66667 3.99238 8.15905 2.5 10 2.5C11.8409 2.5 13.3333 3.99238 13.3333 5.83333ZM3.33333 15.8333C3.33333 12.6117 5.94467 10 9.16667 10H10.8333C14.0553 10 16.6667 12.6117 16.6667 15.8333V17.5H3.33333V15.8333Z" fill="hsl(var(--primary))"/>
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{stats.totalVendors}</p>
            <p className="text-xs text-muted-foreground">Active Vendors</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path d="M4.16667 4.16667C4.16667 3.24619 4.91286 2.5 5.83333 2.5H14.1667C15.0871 2.5 15.8333 3.24619 15.8333 4.16667V5.83333H16.6667C17.1269 5.83333 17.5 6.20643 17.5 6.66667C17.5 7.1269 17.1269 7.5 16.6667 7.5H15.8333V15.8333C15.8333 16.7538 15.0871 17.5 14.1667 17.5H5.83333C4.91286 17.5 4.16667 16.7538 4.16667 15.8333V7.5H3.33333C2.8731 7.5 2.5 7.1269 2.5 6.66667C2.5 6.20643 2.8731 5.83333 3.33333 5.83333H4.16667V4.16667ZM5.83333 7.5V15.8333H14.1667V7.5H5.83333ZM5.83333 4.16667V5.83333H14.1667V4.16667H5.83333Z" fill="hsl(var(--accent))"/>
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{stats.totalJobs.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Total Jobs Completed</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path d="M10 1.25L12.8167 6.91667L19.25 7.83333L14.625 12.3333L15.6333 18.75L10 15.7833L4.36667 18.75L5.375 12.3333L0.75 7.83333L7.18333 6.91667L10 1.25Z" fill="#eab308"/>
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{stats.avgRating.toFixed(1)}/5.0</p>
            <p className="text-xs text-muted-foreground">Average Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
};