import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
    <div className="space-y-6 bg-background">
      {/* Header */}
      <div>
        <h3 className="text-xl font-semibold text-foreground">Top Vendor Performance</h3>
        <p className="text-sm text-muted-foreground mt-1">Jobs completed by top {sortedData.length} vendors</p>
      </div>

      {/* Chart */}
      <div className="h-96 bg-background">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={sortedData} 
            layout="horizontal"
            margin={{ top: 20, right: 30, left: 120, bottom: 20 }}
            barCategoryGap="20%"
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="hsl(var(--muted))" 
              strokeOpacity={0.3}
              horizontal={true}
              vertical={false}
            />
            <XAxis 
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              tickMargin={8}
            />
            <YAxis 
              type="category"
              dataKey="vendor"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: 'hsl(var(--foreground))' }}
              tickFormatter={formatVendorName}
              width={110}
              tickMargin={8}
            />
            <Tooltip content={<CustomTooltip />} />
            
            <Bar 
              dataKey="jobs" 
              fill="hsl(var(--primary))"
              radius={[0, 8, 8, 0]}
              stroke="none"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};