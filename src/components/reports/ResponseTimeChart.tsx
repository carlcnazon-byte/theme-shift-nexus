import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, LabelList } from 'recharts';
import { Badge } from '@/components/ui/badge';

interface ResponseTimeData {
  urgency: string;
  avgTime: number;
  target: number;
}

interface ResponseTimeChartProps {
  data: ResponseTimeData[];
}

export const ResponseTimeChart: React.FC<ResponseTimeChartProps> = ({ data }) => {
  const getBarColor = (avgTime: number, target: number) => {
    const ratio = avgTime / target;
    if (ratio <= 0.7) return '#10b981'; // Green - Good
    if (ratio <= 1.0) return '#f59e0b'; // Amber - Okay
    return '#ef4444'; // Red - Needs improvement
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const ratio = data.avgTime / data.target;
      const status = ratio <= 0.7 ? 'Excellent' : ratio <= 1.0 ? 'On Target' : 'Needs Improvement';
      
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="text-foreground font-medium">{label}</p>
          <div className="space-y-1 mt-2">
            <div className="text-sm">
              <span className="text-muted-foreground">Average: </span>
              <span className="text-foreground font-medium">{data.avgTime} min</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Target: </span>
              <span className="text-foreground font-medium">{data.target} min</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Status: </span>
              <span 
                className={`font-medium ${
                  ratio <= 0.7 ? 'text-green-500' : 
                  ratio <= 1.0 ? 'text-amber-500' : 'text-red-500'
                }`}
              >
                {status}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomBar = (props: any) => {
    const { fill, ...rest } = props;
    const color = getBarColor(props.payload.avgTime, props.payload.target);
    return <Bar {...rest} fill={color} />;
  };

  const CustomLabel = (props: any) => {
    const { x, y, width, value } = props;
    return (
      <text 
        x={x + width / 2} 
        y={y - 5} 
        fill="hsl(var(--foreground))" 
        textAnchor="middle" 
        fontSize={12}
        fontWeight="medium"
      >
        {`${value} min`}
      </text>
    );
  };

  const getStatusBadge = (avgTime: number, target: number) => {
    const ratio = avgTime / target;
    if (ratio <= 0.7) return { label: 'Excellent', variant: 'default' as const };
    if (ratio <= 1.0) return { label: 'On Target', variant: 'secondary' as const };
    return { label: 'Needs Improvement', variant: 'destructive' as const };
  };

  return (
    <div className="space-y-4">
      {/* Status Badges */}
      <div className="flex flex-wrap gap-2 justify-center">
        {data.map((item, index) => {
          const status = getStatusBadge(item.avgTime, item.target);
          return (
            <div key={index} className="text-center">
              <div className="text-xs text-muted-foreground mb-1">{item.urgency}</div>
              <Badge variant={status.variant} className="text-xs">
                {status.label}
              </Badge>
            </div>
          );
        })}
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="urgency" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip content={<CustomTooltip />} />
          
          {/* Target reference lines */}
          {data.map((item, index) => (
            <ReferenceLine 
              key={index}
              y={item.target} 
              stroke="#6b7280" 
              strokeDasharray="4 4"
              strokeWidth={1}
            />
          ))}
          
          <Bar 
            dataKey="avgTime" 
            radius={[4, 4, 0, 0]}
            shape={<CustomBar />}
          >
            <LabelList content={<CustomLabel />} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      </div>

      {/* Performance Summary */}
      <div className="bg-muted/50 rounded-lg p-3">
        <div className="grid grid-cols-3 gap-4 text-center">
          {data.map((item, index) => (
            <div key={index} className="text-sm">
              <div className="text-muted-foreground">{item.urgency}</div>
              <div className="font-medium text-foreground">
                {item.avgTime}min / {item.target}min target
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};