import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Badge } from '@/components/ui/badge';

interface PropertyDistributionData {
  property: string;
  count: number;
  percentage: number;
}

interface PropertyDistributionChartProps {
  data: PropertyDistributionData[];
}

const COLORS = [
  '#14b8a6', // teal
  '#06b6d4', // cyan
  '#3b82f6', // blue
  '#8b5cf6', // violet
  '#f59e0b', // amber
  '#ef4444', // red
  '#10b981', // emerald
  '#f97316', // orange
];

export const PropertyDistributionChart: React.FC<PropertyDistributionChartProps> = ({ data }) => {
  const totalTickets = data.reduce((sum, item) => sum + item.count, 0);
  
  // Sort data by count for ranking
  const sortedData = [...data].sort((a, b) => b.count - a.count);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="text-foreground font-medium">{data.property}</p>
          <div className="space-y-1 mt-2">
            <div className="text-sm">
              <span className="text-muted-foreground">Tickets: </span>
              <span className="text-foreground font-medium">{data.count}</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Percentage: </span>
              <span className="text-foreground font-medium">{data.percentage}%</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value, index }: any) => {
    // Remove labels from pie slices to make it cleaner - all info is in the side list
    return null;
  };

  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="mt-4">
        <h4 className="text-base font-semibold text-foreground mb-6 flex items-center gap-2">
          <span>List Properties</span>
          <div className="flex-1 h-px bg-border" />
        </h4>
        <div className="space-y-3">
          {payload?.map((entry: any, index: number) => {
            const itemData = data.find(d => d.property === entry.value);
            const rank = sortedData.findIndex(d => d.property === entry.value) + 1;
            
            return (
              <div key={index} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg py-4 px-4 hover:bg-gray-100 dark:hover:bg-gray-800/70 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <div 
                      className="w-4 h-4 rounded-full flex-shrink-0" 
                      style={{ backgroundColor: entry.color }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-foreground truncate pr-2">
                        {entry.value}
                      </div>
                      {rank <= 3 && (
                        <Badge variant="secondary" className="text-xs mt-1">
                          #{rank}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <div className="text-base font-bold text-foreground">
                      {itemData?.count}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {itemData?.percentage}%
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Top 3 Properties Summary */}
      <div className="flex justify-center gap-2">
        {sortedData.slice(0, 3).map((item, index) => (
          <Badge 
            key={index} 
            variant={index === 0 ? "default" : "secondary"} 
            className="text-xs"
          >
            #{index + 1} {item.property.length > 15 ? `${item.property.substring(0, 13)}...` : item.property}: {item.count}
          </Badge>
        ))}
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6 items-stretch min-h-[320px]">
        {/* Pie Chart */}
        <div className="w-full lg:w-1/2 flex">
          <div className="flex-1">
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={110}
                  innerRadius={45}
                  fill="#8884d8"
                  dataKey="count"
                  paddingAngle={1}
                  animationBegin={0}
                  animationDuration={800}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                
                {/* Center Text */}
                <text 
                  x="50%" 
                  y="48%" 
                  textAnchor="middle" 
                  dominantBaseline="middle" 
                  className="fill-foreground"
                  fontSize={32}
                  fontWeight="bold"
                >
                  {totalTickets}
                </text>
                <text 
                  x="50%" 
                  y="58%" 
                  textAnchor="middle" 
                  dominantBaseline="middle" 
                  className="fill-muted-foreground"
                  fontSize={14}
                  fontWeight="medium"
                >
                  Total Tickets
                </text>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Properties List */}
        <div className="w-full lg:w-1/2 flex">
          <div className="flex-1 bg-gray-50 dark:bg-gray-900/50 rounded-lg border shadow-sm p-4 flex flex-col">
            <div className="mb-6">
              <h4 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
                <span>List Properties</span>
                <div className="flex-1 h-px bg-border" />
              </h4>
            </div>
            <div className="flex-1 overflow-y-auto space-y-3 pr-2">
              {data.map((item, index) => {
                const rank = sortedData.findIndex(d => d.property === item.property) + 1;
                
                return (
                  <div key={index} className="bg-background rounded-lg py-4 px-4 border hover:shadow-sm transition-all duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 min-w-0 flex-1">
                        <div 
                          className="w-4 h-4 rounded-full flex-shrink-0" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium text-foreground truncate pr-2">
                            {item.property}
                          </div>
                          {rank <= 3 && (
                            <Badge variant="secondary" className="text-xs mt-1">
                              #{rank}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 ml-4">
                        <div className="text-base font-bold text-foreground">
                          {item.count}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {item.percentage}%
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};