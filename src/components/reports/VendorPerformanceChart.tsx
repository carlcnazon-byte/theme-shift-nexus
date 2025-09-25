import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface VendorPerformanceData {
  vendor: string;
  jobs: number;
  rating: number;
}

interface VendorPerformanceChartProps {
  data: VendorPerformanceData[];
}

export const VendorPerformanceChart: React.FC<VendorPerformanceChartProps> = ({ data }) => {
  // Sort data by jobs completed (descending) and take top 8
  const sortedData = [...data].sort((a, b) => b.jobs - a.jobs).slice(0, 8);

  const getBarColor = (rating: number) => {
    if (rating >= 4.7) return 'hsl(var(--chart-1))'; // Excellent - Blue
    if (rating >= 4.3) return 'hsl(var(--chart-2))'; // Good - Green  
    if (rating >= 4.0) return 'hsl(var(--chart-3))'; // Average - Orange
    return 'hsl(var(--chart-4))'; // Poor - Red
  };

  const formatVendorName = (name: string) => {
    return name.length > 25 ? `${name.substring(0, 22)}...` : name;
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="text-foreground font-medium">{data.vendor}</p>
          <p className="text-sm text-muted-foreground mt-1">
            {data.jobs} jobs • {data.rating}/5.0 rating
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={sortedData} 
          layout="horizontal"
          margin={{ top: 20, right: 30, left: 120, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            type="number"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis 
            type="category"
            dataKey="vendor"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickFormatter={formatVendorName}
            width={110}
          />
          <Tooltip content={<CustomTooltip />} />
          
          <Bar 
            dataKey="jobs" 
            radius={[0, 4, 4, 0]}
          >
            {sortedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.rating)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      
      {/* Clean Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: 'hsl(var(--chart-1))' }} />
          <span className="text-muted-foreground">Excellent</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: 'hsl(var(--chart-2))' }} />
          <span className="text-muted-foreground">Good</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: 'hsl(var(--chart-3))' }} />
          <span className="text-muted-foreground">Average</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: 'hsl(var(--chart-4))' }} />
          <span className="text-muted-foreground">Poor</span>
        </div>
      </div>
    </div>
  );
};