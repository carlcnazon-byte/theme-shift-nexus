import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { Badge } from '@/components/ui/badge';

interface VendorPerformanceData {
  vendor: string;
  jobs: number;
  rating: number;
}

interface VendorPerformanceChartProps {
  data: VendorPerformanceData[];
}

export const VendorPerformanceChart: React.FC<VendorPerformanceChartProps> = ({ data }) => {
  // Sort data by jobs completed (descending)
  const sortedData = [...data].sort((a, b) => b.jobs - a.jobs).slice(0, 8);

  const getBarColor = (rating: number) => {
    if (rating >= 4.7) return '#10b981'; // Excellent
    if (rating >= 4.3) return '#06b6d4'; // Good
    if (rating >= 4.0) return '#f59e0b'; // Average
    return '#ef4444'; // Poor
  };

  const formatVendorName = (name: string) => {
    // Truncate long vendor names for display
    return name.length > 20 ? `${name.substring(0, 18)}...` : name;
  };

  const formatVendorWithRating = (vendor: string) => {
    const vendorData = sortedData.find(d => d.vendor === vendor);
    if (!vendorData) return vendor;
    
    const performanceLevel = vendorData.rating >= 4.7 ? 'Excellent' : 
                           vendorData.rating >= 4.3 ? 'Good' : 
                           vendorData.rating >= 4.0 ? 'Average' : 'Poor';
    
    return `${formatVendorName(vendor)} (${vendorData.rating}/5 - ${performanceLevel})`;
  };

  const CustomLabel = (props: any) => {
    const { x, y, width, height, value } = props;
    return (
      <text 
        x={x + width + 5} 
        y={y + height / 2} 
        fill="hsl(var(--foreground))" 
        textAnchor="start" 
        dominantBaseline="middle"
        fontSize={12}
        fontWeight="medium"
      >
        {`${value} jobs`}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg max-w-xs">
          <p className="text-foreground font-medium">{data.vendor}</p>
          <div className="space-y-1 mt-2">
            <div className="text-sm">
              <span className="text-muted-foreground">Jobs Completed: </span>
              <span className="text-foreground font-medium">{data.jobs}</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Average Rating: </span>
              <span className="text-foreground font-medium">{data.rating}/5.0</span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              {Array.from({ length: 5 }, (_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i < Math.floor(data.rating)
                      ? 'bg-yellow-400'
                      : i < data.rating
                      ? 'bg-yellow-400/50'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
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
          margin={{ top: 20, right: 30, left: 80, bottom: 5 }}
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
            fontSize={10}
            tickFormatter={formatVendorWithRating}
            width={150}
          />
          <Tooltip content={<CustomTooltip />} />
          
          <Bar 
            dataKey="jobs" 
            radius={[0, 4, 4, 0]}
          >
            {sortedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.rating)} />
            ))}
            <LabelList content={<CustomLabel />} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      
      {/* Top Performer Badge */}
      <div className="flex justify-center mb-2">
        <Badge variant="default" className="text-sm">
          🏆 Top Performer: {sortedData[0]?.vendor} ({sortedData[0]?.jobs} jobs, {sortedData[0]?.rating}/5)
        </Badge>
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-green-500" />
          <span className="text-muted-foreground">Excellent (4.7+)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-cyan-500" />
          <span className="text-muted-foreground">Good (4.3+)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-amber-500" />
          <span className="text-muted-foreground">Average (4.0+)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-red-500" />
          <span className="text-muted-foreground">Poor (&lt;4.0)</span>
        </div>
      </div>
    </div>
  );
};