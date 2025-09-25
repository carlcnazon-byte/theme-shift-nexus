import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';

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

  // Get gradient color based on position (rank)
  const getBarColor = (index: number) => {
    const intensity = 1 - (index / (sortedData.length - 1)) * 0.6; // From 1.0 to 0.4
    return `hsl(220 91% ${Math.round(45 + intensity * 20)}%)`; // Blue gradient from dark to light
  };

  const formatVendorName = (name: string) => {
    return name.length > 20 ? `${name.substring(0, 17)}...` : name;
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

  const CustomLabel = (props: any) => {
    const { x, y, width, height, value, payload } = props;
    
    // Add null checks and fallback
    if (!payload || !payload.vendor) {
      return null;
    }
    
    const vendorName = formatVendorName(payload.vendor);
    
    return (
      <text
        x={x + 12}
        y={y + height / 2}
        fill="white"
        fontSize={12}
        fontWeight={500}
        textAnchor="start"
        dominantBaseline="middle"
      >
        {vendorName}
      </text>
    );
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Top Vendor Performance</h3>
          <p className="text-sm text-muted-foreground">{sortedData.length} vendors</p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={sortedData} 
            layout="horizontal"
            margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
          >
            <XAxis 
              type="number"
              axisLine={false}
              tickLine={false}
              tick={false}
            />
            <YAxis 
              type="category"
              axisLine={false}
              tickLine={false}
              tick={false}
              width={0}
            />
            <Tooltip content={<CustomTooltip />} />
            
            <Bar 
              dataKey="jobs" 
              radius={[0, 6, 6, 0]}
              stroke="none"
            >
              <LabelList content={<CustomLabel />} />
              {sortedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(index)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};