import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

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
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const percentage = data[index]?.percentage;

    // Only show label if percentage is greater than 5%
    if (percentage && percentage > 5) {
      return (
        <text 
          x={x} 
          y={y} 
          fill="white" 
          textAnchor={x > cx ? 'start' : 'end'} 
          dominantBaseline="central"
          fontSize={12}
          fontWeight="medium"
        >
          {`${percentage}%`}
        </text>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {payload?.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-xs">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">
              {entry.value.length > 15 ? `${entry.value.substring(0, 13)}...` : entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            labelLine={false}
            label={<CustomLabel />}
            outerRadius={100}
            innerRadius={40}
            fill="#8884d8"
            dataKey="count"
            paddingAngle={2}
            animationBegin={0}
            animationDuration={800}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
          
          {/* Center Text */}
          <text 
            x="50%" 
            y="45%" 
            textAnchor="middle" 
            dominantBaseline="middle" 
            className="fill-foreground"
            fontSize={24}
            fontWeight="bold"
          >
            {totalTickets}
          </text>
          <text 
            x="50%" 
            y="55%" 
            textAnchor="middle" 
            dominantBaseline="middle" 
            className="fill-muted-foreground"
            fontSize={12}
          >
            Total Tickets
          </text>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};